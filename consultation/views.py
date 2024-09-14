from django.contrib.auth import get_user_model
from django.db.models import Q
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .permissions import *
from .models import *
from .serializers import *
from .dyte_api_client import DyteAPIClient, DYTE_ORG_PRESET_NAME, DYTE_ORG_PRESET_NAME_CL
from decouple import config

User=get_user_model()

class ClientsViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.select_related('client').all()
    serializer_class = ClientsSerializer
    permission_classes = [IsAdminOrReadOnly]

    @action(detail=False, methods=['GET', 'PUT'], permission_classes=[IsAuthenticated])
    def me(self, request):
        client = Client.objects.get(
            client_id=request.user.id)
        if request.method == 'GET':
            serializer = ClientsSerializer(client)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = ClientsModSerializer(client, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)


class ConsultantsViewSet(viewsets.ModelViewSet):
    queryset = Consultant.objects.select_related('consultant').select_related('service').all()
    serializer_class = ConsultantsSerailizer
    permission_classes = [IsAdminOrReadOnly]

    @action(detail=False, methods=['GET', 'PUT'], permission_classes=[IsConsultant])
    def me(self, request):
        consultant = Consultant.objects\
            .get(consultant_id = request.user.id)
        if request.method == 'GET':
            serializer = ConsultantsSerailizer(consultant)
            return Response(serializer.data)
        if request.method == 'PUT':
            serializer = ConsultantModSerializer(consultant, data=request.data)
            if 'profile_img' in request.data:
                consultant.profile_img.delete()
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)


class ServicesViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServicesSerializer

class AppointmentRequestListView(mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsConsultant]
    serializer_class = AppointmentRequestListSerializer

    def get_queryset(self):
        user = self.request.user
        return AppointmentRequest.objects.select_related('consultant__consultant')\
        .select_related('client__client').select_related('consultant__service')\
        .filter(consultant__consultant_id  = user.id).all().order_by('-proposed_time')

class AppointmentRequestViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return AppointmentRequestListSerializer
        return AppointmentRequestSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return AppointmentRequest.objects.all()

        return AppointmentRequest.objects.select_related('consultant__consultant')\
        .select_related('client').select_related('consultant__service')\
        .filter(Q(consultant__consultant_id  = user.id) | Q(client__client_id  = user.id)).all()

    def create(self, request, *args, **kwargs):
        user=User.objects.get(id=self.request.user.id)
        client=Client.objects.get(client_id=user.id)
        serializer = AppointmentRequestSerializer(
            data=request.data,
            context={'client':client}
        )
        serializer.is_valid(raise_exception=True)
        appoint_req = serializer.save()
        serializer=AppointmentRequestSerializer(appoint_req)
        return Response(serializer.data)
    
    def get_serializer_context(self):
        user_id = self.request.user.id
        try:
            client=Client.objects.get(client_id=user_id)
        except Client.DoesNotExist:
            app_req=AppointmentRequest.objects.get(id=self.kwargs['pk'])
            client_id=app_req.client.client.id
            client=Client.objects.get(client_id=client_id)
        return {'client' : client}
        

class AppointmentsViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return AppointmentListSerializer
        return AppointmentsSerializer
    
    def get_permissions(self):
        if self.request.method in ['DELETE']:
            return [IsAdminUser()]
        if self.request.method in ['PUT','PATCH']:
            return [IsConsultant()]
        return [IsAuthenticated()]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Appointment.objects.all()

        return Appointment.objects.select_related('appointment__consultant__service')\
        .select_related('appointment__consultant__consultant').select_related('appointment__client__client')\
        .filter(Q(appointment__consultant__consultant_id  = user.id)\
                 | Q(appointment__client__client_id  = user.id)).all()


class ClientDocumentsViewSet(viewsets.ModelViewSet):
    serializer_class= ClientsDocumentsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        apps = Appointment.objects.filter(appointment__client__client_id  = user.id).all()
        if user.is_staff:
            return ClientDocument.objects.all()
        client_doks = [ClientDocument.objects.filter(appointment = app).all() for app in apps]   
        return client_doks
    


class LiveVideoRequestViewSet(viewsets.ModelViewSet):
    queryset = LiveVideoRequest.objects.all()
    serializer_class = LiveVideoRequestSerializer
    permission_classes=[IsAuthenticated] 

    def create(self, request):
        data = request.data
        serializer = LiveVideoRequestSerializer(data=data)
        if serializer.is_valid():
            consultant:Consultant = serializer.validated_data.get("consultant")
            dyte_meeting = DyteAPIClient.create_meeting(
                f"Live appointment for: {consultant.title} {consultant.consultant.last_name}",
                False,
            )
            participant = DyteAPIClient.add_participant(
                dyte_meeting["id"],
                consultant.consultant.last_name,
                DYTE_ORG_PRESET_NAME,
                custom_participant_id=consultant.consultant.username,
            )
            live_request = LiveVideoRequest.objects.create(
                dyte_meeting_id=dyte_meeting["id"],
                status=LiveVideoRequest.PENDING,
                consultant=consultant,
                consultant_meeting_id= participant["id"]
            )
            live_request_serializer = LiveVideoRequestSerializer(live_request)
            return Response(
                live_request_serializer.data, status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, permission_classes=[IsAuthenticated])
    def me(self, request, pk=None, url_path='live-requests/(?P<pk>[^/.]+)'):
        live_req = LiveVideoRequest.objects.get(
            consultant__id=pk)
        if request.method == 'GET':
            serializer = LiveVideoRequestSerializer(live_req)
            return Response(serializer.data)
        
    @action(methods=["post"], detail=True)
    def start(self, request, pk=None):
        live_request = get_object_or_404(LiveVideoRequest, pk=pk)
        if live_request.consultant_meeting_id:
            token = DyteAPIClient.refresh_participant_token(
                live_request.dyte_meeting_id,
                live_request.consultant_meeting_id,
            )
            return Response({"dyte_auth_token": token["token"]})
        participant = DyteAPIClient.add_participant(
            live_request.dyte_meeting_id,
            live_request.consultant.consultant.last_name,
            DYTE_ORG_PRESET_NAME,
            "1",
        )
        live_request.consultant_meeting_id = participant["id"]
        live_request.status = LiveVideoRequest.ACTIVE
        live_request.save()
        return Response(
            {"dyte_auth_token": participant["token"]}, status=status.HTTP_201_CREATED
        )

    @action(methods=["post"], detail=True)
    def done(self, request, pk=None):
        live_request = get_object_or_404(LiveVideoRequest, pk=pk)
        live_request.status = LiveVideoRequest.DONE
        live_request.save()
        serializer = LiveVideoRequestSerializer(live_request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=["get"], detail=True, url_path="user-token")
    def user_token(self, request, pk=None):
        live_request = get_object_or_404(LiveVideoRequest, pk=pk)
        participant = DyteAPIClient.add_participant(
            live_request.dyte_meeting_id,
            "Client",
            DYTE_ORG_PRESET_NAME_CL,
            "client1",
        )
        client_meeting_id = participant["id"]
        token = DyteAPIClient.refresh_participant_token(
            live_request.dyte_meeting_id, client_meeting_id
        )
        return Response({"dyte_auth_token": token["token"]})

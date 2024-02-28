from datetime import *
from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework.settings import api_settings
from rest_framework import serializers
from .models import *

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields=['id','username','email','first_name', 'last_name']

class ClientsModSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'
        read_only_fields = ['client']

class ClientsSerializer(serializers.ModelSerializer):
    client = UserSerializer()
    class Meta:
        model = Client
        fields = '__all__'
        read_only_fields = ['client']

class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class ConsultantModSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultant
        fields = ['id','consultant', 'title','service','session_charge','about','profile_img']
        read_only_fields = ['consultant']
        
class ConsultantsSerailizer(serializers.ModelSerializer):
    consultant = UserSerializer()
    service=ServicesSerializer()
    class Meta:
        model = Consultant
        fields = ['id','consultant', 'title','service','session_charge','about','profile_img', 'live']
        read_only_fields = ['consultant']

class AppointmentRequestListSerializer(serializers.ModelSerializer):
    client = ClientsSerializer()
    consultant = ConsultantsSerailizer()
    proposed_time=serializers.DateTimeField(format=None)
    scheduled_time= serializers.DateTimeField(format=None)
    s_time = serializers.DateTimeField(format=None, read_only=True)
    p_time = serializers.DateTimeField(format=None, read_only=True)

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        if rep['proposed_time'] is not None:
            rep['p_time'] = datetime.ctime(rep['proposed_time'])

        if rep['scheduled_time'] is not None:
            rep['s_time'] = datetime.ctime(rep['scheduled_time'])
            
        return rep

    class Meta:
        model = AppointmentRequest
        fields=["id",'proposed_time', "scheduled_time","request_note", "accepted", "client","consultant", "s_time","p_time"]

class AppointmentRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentRequest
        fields = '__all__'
        read_only_fields = ['client']

    def save(self, **kwargs):
        client = self.context['client']
        consultant=self.validated_data['consultant']
        scheduled_time= self.validated_data['scheduled_time']
        request_note = self.validated_data['request_note']
        try:
            app_req= AppointmentRequest.objects.get(
                client=client,consultant=consultant, accepted=False
            )
            app_req.scheduled_time=scheduled_time
            app_req.request_note = request_note
            app_req.save()
            self.instance= app_req
        except AppointmentRequest.DoesNotExist:
            self.instance = AppointmentRequest.objects.create(
                client=client, **self.validated_data
            )
        return self.instance
    def create(self, validated_data):
        return super().create(validated_data)


class ClientsDocumentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientDocument
        fields= ['appointment', 'documents']


class AppointmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id','appointment', 'duration', 'charges', 'notes', 'prescription','docs']
        read_only_fields = ['docs']

    def create(self, validated_data):
        duration= self.validated_data['duration']
        charges = self.validated_data['charges']
        app = self.validated_data['appointment']
        appointment = AppointmentRequest.objects.get(id=app.id)
        appointment.accepted = True
        appointment.save()

        return Appointment.objects.create(appointment=app, duration=duration,charges=charges)
    def save(self, **kwargs):
        return super().save(**kwargs)
    
class AppointmentListSerializer(serializers.ModelSerializer):
    appointment = AppointmentRequestListSerializer()
    docs=ClientsDocumentsSerializer()
    expired = serializers.SerializerMethodField()
    booking = serializers.DateTimeField(format=None)
    today = serializers.SerializerMethodField()

    def to_representation(self, instance):
        val = super().to_representation(instance)
        val['booking'] = datetime.ctime(val['booking'])
        return val

    def get_expired(self, appointment:Appointment):
        expiry = timezone.now() - appointment.appointment.scheduled_time
        if expiry.days >= 1:
            return True
        # if expiry.seconds > appointment.duration.seconds:
        #     return True
        return False

    def get_today(self, appointment:Appointment):
        expiry = timezone.now() - appointment.appointment.scheduled_time
        if expiry.days == 0:
            return True
        else:
            return False


    class Meta:
        model = Appointment
        fields ='__all__'


class LiveVideoRequestSerializer(serializers.ModelSerializer):
    
    # consultant = ConsultantsSerailizer()
    class Meta:
        model = LiveVideoRequest
        fields = ["id", "status",
              "dyte_meeting_id", 'consultant',"consultant_meeting_id" ]
        read_only_fields = [
            "id", "status", "dyte_meeting_id", "consultant_meeting_id","dyte_meeting_id"
        ]

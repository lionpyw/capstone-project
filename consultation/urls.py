from django.urls import include, path
from rest_framework import routers
from .views import *


router = routers.DefaultRouter()
router.register('client', ClientsViewSet)
router.register('consultant', ConsultantsViewSet)
router.register('services', ServicesViewSet)
router.register('app_req', AppointmentRequestViewSet, basename='request')
router.register('appointment', AppointmentsViewSet, basename='appointment')
router.register('documents', ClientDocumentsViewSet, basename='dokus')
router.register('list_requests', AppointmentRequestListView, basename='list_req')
router.register("live-requests", LiveVideoRequestViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
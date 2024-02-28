from django.contrib import admin
from consultation.models import *

# Register your models here.

admin.site.register(Client)
admin.site.register(Consultant)
admin.site.register(Service)
admin.site.register(AppointmentRequest)
admin.site.register(Appointment)
admin.site.register(ClientDocument)
admin.site.register(LiveVideoRequest)

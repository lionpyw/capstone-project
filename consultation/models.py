from datetime import timedelta
from uuid import uuid4
from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator


class Client(models.Model):
    GENDER=[
        ('M', 'Masculine'),
        ('F', 'Feminine'),
        ('O', 'Other')
        ]
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='client')
    birth_date = models.DateField(null=True, blank=True)
    phone = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(max_length=1,choices=GENDER,default='M')

    def __str__(self):
        return self.client.username


class Service(models.Model):
    SERVICE_CATEGORY=[
        ('MD', 'Medicine'),
        ('BS', 'Business'),
        ('AD', 'Alternative Medicine'),
        ('LW', 'Law'),
        ('OR', 'Other')
        ]
    category = models.CharField(max_length=2,choices=SERVICE_CATEGORY,default='OR')

    def __str__(self):
        return self.category


class Consultant(models.Model):
    title = models.CharField(max_length=36, null=True, blank=True)
    consultant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, blank=True)
    profile_img = models.ImageField(upload_to='consult/images', default='consult/default.jpg')
    session_charge = models.DecimalField(max_digits=6, decimal_places=2, validators=[MinValueValidator(1)])
    about = models.TextField(blank=True)

    def __str__(self):
        return f' {self.title} {self.consultant.username} - {self.service}'


class AppointmentRequest(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='appointment_req')
    consultant = models.ForeignKey(Consultant, on_delete=models.CASCADE, related_name='termin')
    proposed_time = models.DateTimeField(blank=True, null=True)
    scheduled_time = models.DateTimeField(blank=True, null=True)
    request_note = models.CharField(max_length=1024, blank=True, null=True)
    accepted = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'{self.id}:{self.client} request for {self.consultant}'
    class Meta:
        ordering = ['-proposed_time']
    

class Appointment(models.Model):
    appointment = models.OneToOneField(AppointmentRequest,on_delete=models.CASCADE, related_name='schedule')
    duration = models.DurationField(default=timedelta(minutes=30))
    booking = models.DateTimeField(auto_now_add=True)
    charges= models.DecimalField(max_digits=6, decimal_places=2, validators=[MinValueValidator(0)], default=0)
    notes= models.TextField(max_length=5120, blank=True, null=True)
    prescription = models.CharField(max_length=1024, blank=True, null=True)
    expired = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'{self.id}: {self.appointment.client.client.username} booked with {self.appointment.consultant.consultant.username}'
    class Meta:
        ordering = ['-appointment__scheduled_time']

class ClientDocument(models.Model):
    appointment = models.OneToOneField(Appointment,on_delete=models.PROTECT, related_name='docs')
    documents= models.FileField(upload_to='consult/docs',null=True,blank=True)

    def __str__(self) -> str:
        return f'{self.appointment}'
    

class LiveVideoRequest(models.Model):
    PENDING = "PENDING"
    ACTIVE = "ACTIVE"
    DONE = "DONE"
    STATUS_CHOICES = [
        (PENDING, "Pending"),
        (ACTIVE, "Active"),
        (DONE, "Done"),
    ]
    dyte_meeting_id = models.UUIDField(unique=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=PENDING)
    consultant = models.ForeignKey(Consultant, on_delete=models.DO_NOTHING, related_name="live")
    consultant_meeting_id = models.UUIDField(default=uuid4, null=True)

    def __str__(self) -> str:
        return f"{self.id}: {self.consultant.consultant.username}"
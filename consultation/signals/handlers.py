from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from consultation.models import Client, Consultant


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_profile_for_new_user(sender, **kwargs):
    if kwargs['created']:
        user=kwargs['instance']
        if getattr(user, "is_service_provider") == 0:
            Client.objects.create(client=user)
        else:
            Consultant.objects.create(consultant=user, session_charge=10)
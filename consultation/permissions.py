from rest_framework import permissions
from django.contrib.auth import get_user_model

user=get_user_model()

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)

class IsConsultant(permissions.BasePermission):
    """
    Allows access only to consultant users.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_service_provider)
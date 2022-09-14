from django.urls import path

from permissions.api import PermissionsAPI

urlpatterns = [
    path("", PermissionsAPI.as_view()),
]

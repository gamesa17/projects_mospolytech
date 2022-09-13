from django.urls import path

from permissions.views import PermissionsView

urlpatterns = [
    path("", PermissionsView.as_view()),
]

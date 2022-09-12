from django.urls import path

from permissions.views import PermissionsView

urlpatterns = [
    path("permissions", PermissionsView.as_view()),
]

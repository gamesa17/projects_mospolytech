from django.urls import path

from users.views import MeView, UserProfileView, UserProfilesView

urlpatterns = [
    path("/profiles", UserProfilesView.as_view(), name="profiles"),
    path("/<int:userId>/profile", UserProfileView.as_view(), name="profile"),
    path("/me", MeView.as_view()),
]

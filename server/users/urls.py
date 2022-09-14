from django.urls import path

from users.api import MeAPI, UserAPI, UsersAPI

urlpatterns = [
    path("", UsersAPI.as_view()),
    path("/<int:userId>", UserAPI.as_view()),
    path("/me", MeAPI.as_view()),
]

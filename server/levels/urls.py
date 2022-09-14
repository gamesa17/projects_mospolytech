from django.urls import path

from levels.api import LevelsAPI

urlpatterns = [
    path("", LevelsAPI.as_view()),
]

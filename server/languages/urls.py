from django.urls import path

from languages.api import LanguagesAPI

urlpatterns = [
    path("", LanguagesAPI.as_view()),
]

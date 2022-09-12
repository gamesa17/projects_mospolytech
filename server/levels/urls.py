from django.urls import path

from levels.views import LevelView

urlpatterns = [
    path("levels", LevelView.as_view()),
]

from django.urls import path

from languages.views import LanguageTeachersView

urlpatterns = [
    path("", LanguageTeachersView.as_view()),
]

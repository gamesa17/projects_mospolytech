from django.urls import path

from languages.views import LanguageTeachersView

urlpatterns = [
    path("languages", LanguageTeachersView.as_view()),
]

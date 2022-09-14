from django.urls import path

from homeworks.api import HomeworkAPI, HomeworksAPI

urlpatterns = [
    path("", HomeworksAPI.as_view()),
    path("/<int:homeworkId>", HomeworkAPI.as_view()),
]

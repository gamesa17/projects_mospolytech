from django.urls import path

from courses.api import CourseAPI, CoursesAPI

urlpatterns = [
    path("", CoursesAPI.as_view()),
    path("/<int:courseId>", CourseAPI.as_view()),
]

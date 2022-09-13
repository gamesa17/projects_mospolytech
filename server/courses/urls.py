from django.urls import path

from courses.views import CoursesView, CourseView

urlpatterns = [
    path("", CoursesView.as_view()),
    path("/<int:courseId>", CourseView.as_view()),
]

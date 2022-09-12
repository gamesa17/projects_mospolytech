from django.urls import path

from courses.views import CoursesView, CourseView

urlpatterns = [
    path("courses", CoursesView.as_view()),
    path("courses/<int:courseId>", CourseView.as_view()),
]

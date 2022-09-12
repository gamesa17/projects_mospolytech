from django.urls import path

from users.views import StudentsView, UserProfileView

urlpatterns = [
    path("profile/<int:userId>", UserProfileView.as_view(), name="profile"),
    path("courses/<int:courseId>/students", StudentsView.as_view()),
]

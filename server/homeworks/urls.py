from django.urls import path

from homeworks.views import AllHomeworksView

urlpatterns = [
    path("", AllHomeworksView.as_view()),
    # path("courses/<int:courseId>/homeworks", HomeworksView.as_view()),
    # path("courses/<int:courseId>/homeworks/<int:homeworkId>", HomeworkView.as_view()),
]

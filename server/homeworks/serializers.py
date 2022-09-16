from rest_framework import serializers

from courses.serializers import CourseDtoSerializer
from homeworks.models import Homework


class HomeworkDtoSerializer(serializers.ModelSerializer):
    course = CourseDtoSerializer()

    class Meta:
        model = Homework
        fields = "__all__"


class AddHomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = ("course", "name", "description", "link", "deadlineAt")


class UpdateHomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = ("name", "description", "link", "deadlineAt", "isOnEveryLesson")

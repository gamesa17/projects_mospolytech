from rest_framework import serializers

from courses.serializers import CourseSerializer
from homeworks.models import Homework


class AllHomeworksSerializer(serializers.ModelSerializer):
    course = CourseSerializer()

    class Meta:
        model = Homework
        fields = "__all__"


class HomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        exclude = ("course", "link")


class AddHomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = ("name", "link", "description", "deadline", "onEveryLesson", "course", "draft")


class UpdateHomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = ("name", "link", "description", "deadline", "onEveryLesson", "draft")

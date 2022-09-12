from rest_framework import serializers

from courses.models import Course
from languages.serializers import LanguageSerializer
from levels.serializers import LevelSerializer


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class CourseInfoSerializer(serializers.ModelSerializer):
    level = LevelSerializer()
    language = LanguageSerializer()

    class Meta:
        model = Course
        fields = "__all__"


class AddCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ("name", "language", "level", "teacher")


class UpdateCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"

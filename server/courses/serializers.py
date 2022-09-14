from rest_framework import serializers

from courses.models import Course
from languages.serializers import LanguageDtoSerializer
from levels.serializers import LevelDtoSerializer


class CourseDtoSerializer(serializers.ModelSerializer):
    level = LevelDtoSerializer()
    language = LanguageDtoSerializer()

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

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
    level = serializers.IntegerField(source="levelId")
    language = serializers.IntegerField(source="languageId")
    teacher = serializers.IntegerField(source="teacherId")

    class Meta:
        model = Course
        fields = ("name", "language", "level", "teacher")


class UpdateCourseSerializer(serializers.ModelSerializer):
    level = serializers.IntegerField(source="levelId")
    language = serializers.IntegerField(source="languageId")
    teacher = serializers.IntegerField(source="teacherId")

    class Meta:
        model = Course
        fields = "__all__"

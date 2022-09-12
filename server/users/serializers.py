from rest_framework import serializers

from courses.models import Course
from users.models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = UserProfile
        fields = "__all__"


class StudentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ("students", )

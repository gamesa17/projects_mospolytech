from rest_framework import serializers

from users.models import User


class UserDtoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "role", "firstName", "lastName", "avatar", "email", "phone", "languages")


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("firstName", "lastName", "avatar", "email", "phone", "languages")


class ShortUserDtoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "role", "firstName", "lastName", "avatar")

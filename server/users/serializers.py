from rest_framework import serializers

from users.models import User


class UserDtoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "role", "firstName", "lastName", "avatar", "email", "phone", "languages", )

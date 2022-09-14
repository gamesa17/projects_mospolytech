from rest_framework import serializers

from permissions.models import Permission


class PermissionDtoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ("key", )

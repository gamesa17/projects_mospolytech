from rest_framework import serializers

from levels.models import Level


class LevelDtoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = "__all__"

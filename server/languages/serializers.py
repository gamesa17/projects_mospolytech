from rest_framework import serializers

from languages.models import Language


class LanguageDtoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = "__all__"

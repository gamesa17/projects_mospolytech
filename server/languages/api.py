from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from languages.models import Language
from languages.serializers import LanguageDtoSerializer


class LanguagesAPI(APIView):
    permission_classes = [permissions.AllowAny]

    @staticmethod
    def get(request):
        try:
            language = Language.objects.filter(pk__in=request.user.languages.all())

            languagesDtos = LanguageDtoSerializer(instance=language, many=True)

            return Response(languagesDtos.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

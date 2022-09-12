from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from languages.models import Language
from languages.serializers import LanguageSerializer
from users.models import Teacher


class LanguageTeachersView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self):
        try:

            user = self.request.user

            user = Teacher.objects.get(user=user)

            language = Language.objects.filter(pk__in=user.language.all())

            language = LanguageSerializer(language, many=True)

            return Response(language.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

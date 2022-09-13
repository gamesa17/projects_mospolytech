from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from levels.models import Level
from levels.serializers import LevelSerializer


class LevelsView(APIView):
    permission_classes = [permissions.AllowAny]

    @staticmethod
    def get(request):
        try:
            levels = Level.objects.all()

            levels = LevelSerializer(levels, many=True)

            return Response(levels.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

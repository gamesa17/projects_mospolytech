from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from permissions.models import Permission
from permissions.serializers import PermissionDtoSerializer


class PermissionsAPI(APIView):
    @staticmethod
    def get(request):
        try:
            permissions = Permission.objects.filter(user=request.user)
            serializedPermissions = PermissionDtoSerializer(instance=permissions, many=True)

            return Response(
                data=(permission["key"] for permission in serializedPermissions.data),
                status=status.HTTP_200_OK,
            )

        except Exception as error:
            return Response(
                data={"error": str(error)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

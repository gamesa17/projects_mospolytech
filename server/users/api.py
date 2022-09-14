from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from courses.models import Course
from permissions.models import Permission
from users.models import User
from users.serializers import UserDtoSerializer


class UserAPI(APIView):
    @staticmethod
    def get(request, userId=None):
        try:
            user = User.objects.get(pk=userId)

            if not user:
                return Response(data={"error": "Невалидный пользователь"}, status=status.HTTP_400_BAD_REQUEST)

            userCourses = Course.objects.filter(students=user)

            if (
                not Permission.CanReadUserProfileSpecificUsers(user=request.user, targetUserId=userId) and
                not any(
                    Permission.CanReadUserProfileAnyUsersSpecificCourses(
                        user=request.user, targetCourseId=course.id) for course in userCourses
                )
            ):
                return Permission.GetNoPermissionResponse()

            userDto = UserDtoSerializer(instance=user)

            return Response(data=userDto.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MeAPI(APIView):
    @staticmethod
    def get(request):
        try:
            print(request.user)

            userDto = UserDtoSerializer(instance=request.user)

            return Response(data=userDto.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UsersAPI(APIView):
    @staticmethod
    def get(request):
        try:
            courseId = request.GET.get('courseId', None)

            if not courseId:
                return Response(data={"error": "Неверный courseId"}, status=status.HTTP_400_BAD_REQUEST)

            courseId = int(courseId)

            skip = request.query_params.get("skip", None)
            limit = request.query_params.get("limit", None)

            course = Course.objects.get(pk=courseId)

            if not course:
                return Response(data={"error": "Невалидный id курса"}, status=status.HTTP_400_BAD_REQUEST)

            if (not Permission.CanReadUserProfileAnyUsersSpecificCourses(user=request.user, targetCourseId=courseId)):
                return Permission.GetNoPermissionResponse()

            studentsIds = course.students.all()

            if skip:
                studentsIds = studentsIds[int(skip):]

            if limit:
                studentsIds = studentsIds[:int(skip) + int(limit)]

            usersProfiles = User.objects.filter(pk__in=studentsIds)
            usersProfilesDto = UserDtoSerializer(instance=usersProfiles, many=True)

            return Response(data=usersProfilesDto.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

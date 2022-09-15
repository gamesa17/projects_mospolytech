from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from courses.models import Course
from permissions.models import Permission, PermissionTargetKey
from users.models import User, UserRole
from users.serializers import ShortUserDtoSerializer, UpdateUserSerializer, UserDtoSerializer  # noqa I001
# noqa I005


class UserAPI(APIView):
    @staticmethod
    def get(request, userId=None):
        try:
            user = User.objects.get(Q(pk=userId) & ~Q(username="admin"))

            if not user:
                return Response(data={"error": "Невалидный пользователь"}, status=status.HTTP_400_BAD_REQUEST)

            userCoursesIds = []

            if request.user.role == UserRole.STUDENT:
                userCoursesIds = PermissionTargetKey.GetTargetsIds(
                    user=request.user, key=PermissionTargetKey.STUDY_COURSES_IDS,
                )

            if request.user.role == UserRole.TEACHER:
                userCoursesIds = PermissionTargetKey.GetTargetsIds(
                    user=request.user,
                    key=PermissionTargetKey.TEACH_COURSES_IDS,
                )

            if (
                not Permission.CanReadUserProfileSpecificUsers(user=request.user, targetUserId=userId) and
                not any(
                    Permission.CanReadUserProfileAnyUsersSpecificCourses(
                        user=request.user, targetCourseId=courseId) for courseId in userCoursesIds
                )
            ):
                return Permission.GetNoPermissionResponse()

            userDto = UserDtoSerializer(instance=user)

            return Response(data=userDto.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def put(request, userId=None):
        try:
            user = User.objects.get(Q(pk=userId) & ~Q(username="admin"))

            if not user:
                return Response(data={"error": "Невалидный id пользователя"}, status=status.HTTP_400_BAD_REQUEST)

            if (not Permission.CanUpdateUserProfileSpecificUsers(user=request.user, targetUserId=userId)):
                return Permission.GetNoPermissionResponse()

            updatedUser = UpdateUserSerializer(instance=user, data=request.data)

            if not updatedUser.is_valid():
                return Response(data={"error": str(updatedUser.errors)}, status=status.HTTP_400_BAD_REQUEST)

            updatedUser.save()

            return Response(data=updatedUser.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MeAPI(APIView):
    @staticmethod
    def get(request):
        try:
            userDto = UserDtoSerializer(instance=request.user)

            return Response(data=userDto.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UsersAPI(APIView):
    @staticmethod
    def get(request):
        try:
            courseId = request.query_params.get("courseId", None)

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

            users = User.objects.filter(Q(pk__in=studentsIds) & ~Q(username="admin"))
            usersDto = UserDtoSerializer(instance=users, many=True)

            return Response(data=usersDto.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UsersSearchAPI(APIView):
    @staticmethod
    def get(request):
        try:
            search = request.query_params.get("q", "")
            role = request.query_params.get("role", "")

            if not search:
                return Response(data=[], status=status.HTTP_200_OK)

            skip = request.query_params.get("skip", 0)
            limit = request.query_params.get("limit", 0)

            users = User.objects.filter(
                (
                    Q(username__icontains=search)
                    | Q(firstName__icontains=search)
                    | Q(lastName__icontains=search)
                )
                & Q(role=role)
                & ~Q(username="admin"),
            )

            if skip:
                users = users[int(skip):]

            if limit:
                users = users[:int(skip) + int(limit)]

            usersDto = ShortUserDtoSerializer(instance=users, many=True)

            return Response(data=usersDto.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

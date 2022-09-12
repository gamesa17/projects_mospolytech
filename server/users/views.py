from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from courses.models import Course
from permissions.models import Permission
from users.models import UserProfile
from users.serializers import StudentsSerializer


class UserProfileView(APIView):
    @staticmethod
    def get(request, userId=None):
        try:
            user = request.user

            targetUser = User.objects.get(pk=userId)

            targetUserCourses = Course.objects.filter(students__user=targetUser)

            if (
                not Permission.CanReadUserProfileSpecificUsers(user=user, targetUserId=userId) and
                not any(
                    Permission.CanReadUserProfileAnyUsersSpecificCourses(
                        user=user, targetCourseId=course.id) for course in targetUserCourses
                )
            ):
                return Permission.GetNoPermissionResponse()

            userProfile = UserProfile.objects.get(user=userId)

            if not userProfile:
                Response(
                    data={"error": "Невалидный пользователь"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            return Response(
                data={
                    "id": targetUser.id,
                    "username": targetUser.username,
                    "role": userProfile.role,
                    "firstName": userProfile.firstName,
                    "lastName": userProfile.lastName,
                    "phone": userProfile.phone,
                    "city": userProfile.city,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as error:
            return Response(
                data={"error": str(error)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class StudentsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @staticmethod
    def get(request, courseId=None):
        try:

            user = request.user

            if not Permission.CanReadUserProfileAnyUsersSpecificCourses(
                    user=user, targetCourseId=courseId):
                return Permission.GetNoPermissionResponse()

            course = Course.objects.get(pk=courseId)
            students = StudentsSerializer(course)

            return Response(students.data, status=status.HTTP_200_OK)
        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

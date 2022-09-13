from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from courses.models import Course
from courses.serializers import CourseSerializer
from permissions.models import Permission
from users.models import Student
from users.serializers import StudentSerializer, UserProfileSerializer
from users.models import UserProfile


class UserProfilesView(APIView):
    @staticmethod
    def get(request):
        try:
            user = request.user

            courseId = int(request.GET.get('courseId', None))
            skip = request.GET.get('skip', 0)
            limit = request.GET.get('limit', None)

            if (not Permission.CanReadUserProfileAnyUsersSpecificCourses(user=user, targetCourseId=courseId)):
                return Permission.GetNoPermissionResponse()

            course = Course.objects.get(pk=courseId)
            courseDto = CourseSerializer(course).data

            if not course:
                Response(
                    data={"error": "Невалидный id курса"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            studentsIds = courseDto["students"]

            if skip:
                studentsIds = studentsIds[int(skip):]

            if limit:
                studentsIds = studentsIds[:int(skip) + int(limit)]

            students = Student.objects.filter(pk__in=studentsIds)
            studentsDtos = StudentSerializer(students, many=True).data

            usersIds = [dict(studentDto)["user"] for studentDto in studentsDtos]

            usersProfiles = UserProfile.objects.filter(user__pk__in=usersIds)
            usersProfilesDto = UserProfileSerializer(usersProfiles, many=True)

            return Response(data=usersProfilesDto.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(
                data={"error": str(error)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


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

            userProfileDto = UserProfileSerializer(userProfile)

            return Response(data=userProfileDto.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(
                data={"error": str(error)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class MeView(APIView):
    @staticmethod
    def get(request):
        try:
            user = request.user

            if not user:
                Response(data={"error": "Невалидный пользователь"}, status=status.HTTP_400_BAD_REQUEST)

            userProfile = UserProfile.objects.get(user=user)

            if not userProfile:
                Response(data={"error": "Невалидный пользователь"}, status=status.HTTP_400_BAD_REQUEST)

            return Response(
                data={
                    "id": user.id,
                    "username": user.username,
                    "role": userProfile.role,
                    "firstName": userProfile.firstName,
                    "lastName": userProfile.lastName,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from courses.models import Course
from homeworks.models import Homework
from homeworks.serializers import AddHomeworkSerializer, HomeworkDtoSerializer, UpdateHomeworkSerializer  # noqa I001
from permissions.models import Permission  # noqa I005


class HomeworksAPI(APIView):
    @staticmethod
    def get(request):
        try:
            courses = []

            if Permission.CanReadAssignedHomeworkSpecificUsers(user=request.user, targetUserId=request.user.id):
                courses = Course.objects.filter(students=request.user.id)

            if Permission.CanReadCreatedHomeworkSpecificUsers(user=request.user, targetUserId=request.user.id):
                courses = Course.objects.filter(teacher=request.user.id)

            homeworks = Homework.objects.filter(course__in=courses).select_related("course")
            homeworksDtos = HomeworkDtoSerializer(instance=homeworks, many=True)

            return Response(homeworksDtos.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def post(request):
        try:
            if not Permission.CanCreateHomeworkSpecificCourses(
                user=request.user, targetCourseId=request.data["course"],
            ):
                return Permission.GetNoPermissionResponse()

            createdHomework = AddHomeworkSerializer(data=request.data)

            if not createdHomework.is_valid():
                Response(data={"error": str(createdHomework.errors)}, status=status.HTTP_400_BAD_REQUEST)

            createdHomework = createdHomework.save()

            createdHomeworkDto = HomeworkDtoSerializer(instance=createdHomework)

            return Response(createdHomeworkDto.data, status=status.HTTP_201_CREATED)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class HomeworkAPI(APIView):
    @staticmethod
    def get(request, homeworkId=None):
        try:
            homework = Homework.objects.get(pk=int(homeworkId))

            course = homework.course

            if (
                not Permission.CanReadAssignedHomeworkSpecificUsers(user=request.user, targetUserId=request.user.id) or
                not course.students.get(pk=request.user.id)
            ):
                return Permission.GetNoPermissionResponse()

            if (
                not Permission.CanReadCreatedHomeworkSpecificUsers(user=request.user, targetUserId=request.user.id) or
                course.teacher.id != request.user.id
            ):
                return Permission.GetNoPermissionResponse()

            homeworkDto = HomeworkDtoSerializer(instance=homework)

            return Response(data=homeworkDto.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def put(request, homeworkId=None):
        try:
            homework = Homework.objects.get(pk=int(homeworkId))

            if not Permission.CanUpdateHomeworkSpecificCourses(user=request.user, targetCourseId=homework.course.id):
                return Permission.GetNoPermissionResponse()

            updatedHomework = UpdateHomeworkSerializer(instance=homework, data=request.data)

            if not updatedHomework.is_valid():
                Response(data={"error": str(updatedHomework.errors)}, status=status.HTTP_400_BAD_REQUEST)

            updatedHomework = updatedHomework.save()

            updatedHomeworkDto = HomeworkDtoSerializer(instance=updatedHomework)

            return Response(updatedHomeworkDto.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def delete(request, homeworkId=None):
        try:
            homework = Homework.objects.get(pk=int(homeworkId))

            if not Permission.CanDeleteHomeworkSpecificCourses(user=request.user, targetCourseId=homework.course.id):
                return Permission.GetNoPermissionResponse()

            homework.delete()

            return Response(status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

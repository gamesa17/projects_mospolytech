from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from courses.models import Course
from homeworks.models import Homework
from homeworks.serializers import (AllHomeworksSerializer, AddHomeworkSerializer,  # noqa I001
                                   HomeworkSerializer, UpdateHomeworkSerializer)  # noqa I001
from permissions.models import Permission  # noqa I001
from users.models import Teacher, Student  # noqa I001
# noqa I005


class HomeworksView(APIView):
    @staticmethod
    def get(request, courseId=None):
        try:
            user = request.user

            if (not Permission.CanReadAssignedHomeworkSpecificUsers(user=user, targetUserId=user.id) and
                not Permission.CanReadCreatedHomeworkSpecificUsers(
                    user=user, targetUserId=user.id)):
                return Permission.GetNoPermissionResponse()

            homeworks = Homework.objects.filter(course=courseId)

            homeworks = HomeworkSerializer(homeworks, many=True)

            return Response(homeworks.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def post(request, courseId=None):
        try:
            user = request.user

            if not Permission.CanCreateHomeworkSpecificCourses(user=user, targetCourseId=courseId):
                return Permission.GetNoPermissionResponse()

            homework = AddHomeworkSerializer(data={
                "name": request.data["name"],
                "link": request.data["link"],
                "description": request.data["description"],
                "deadline": request.data["deadline"],
                "onEveryLesson": request.data["onEveryLesson"],
                "course": courseId,
                "draft": request.data["draft"],
            })

            if homework.is_valid():
                homework.save()

            return Response(homework.data, status=status.HTTP_201_CREATED)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class HomeworkView(APIView):
    @staticmethod
    def put(request, courseId=None, homeworkId=None):
        try:
            user = request.user

            if not Permission.CanUpdateHomeworkSpecificCourses(user=user, targetCourseId=courseId):
                return Permission.GetNoPermissionResponse()

            homework = Homework.objects.get(pk=homeworkId)
            homework = UpdateHomeworkSerializer(instance=homework, data=request.data)
            if homework.is_valid():
                homework.save()
            return Response(homework.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def delete(request, courseId=None, homeworkId=None):
        try:
            user = request.user

            if not Permission.CanDeleteHomeworkSpecificCourses(user=user, targetCourseId=courseId):
                return Permission.GetNoPermissionResponse()

            homework = Homework.objects.get(pk=homeworkId)
            homework.delete()

            return Response(status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AllHomeworksView(APIView):
    @staticmethod
    def get(request):
        try:
            user = request.user

            if Permission.CanReadAssignedHomeworkSpecificUsers(
                    user=user, targetUserId=user.id):

                student = Student.objects.get(user=user)
                courses = Course.objects.filter(students=student.id)

                homeworks = Homework.objects.filter(course__in=courses).select_related("course")
                homeworks = AllHomeworksSerializer(homeworks, many=True)

                return Response(homeworks.data, status=status.HTTP_200_OK)

            if Permission.CanReadCreatedHomeworkSpecificUsers(user=user, targetUserId=user.id):

                teacher = Teacher.objects.get(user=user)
                courses = Course.objects.filter(teacher=teacher.id)

                homeworks = Homework.objects.filter(course__in=courses).select_related("course")
                homeworks = AllHomeworksSerializer(homeworks, many=True)

                return Response(homeworks.data, status=status.HTTP_200_OK)

            return Permission.GetNoPermissionResponse()

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

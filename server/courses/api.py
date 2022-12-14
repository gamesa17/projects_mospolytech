from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from courses.models import Course
from courses.serializers import AddCourseSerializer, CourseDtoSerializer, UpdateCourseSerializer  # noqa I001
from permissions.models import Permission, PermissionTargetKey  # noqa I001,I005
from users.models import UserRole  # noqa I005


class CoursesAPI(APIView):
    @staticmethod
    def get(request):
        try:
            skip = request.query_params.get("skip", None)
            limit = request.query_params.get("limit", None)

            if request.user.role == UserRole.STUDENT:
                accessibleCoursesIds = PermissionTargetKey.GetTargetsIds(
                    user=request.user, key=PermissionTargetKey.STUDY_COURSES_IDS,
                )

            if request.user.role == UserRole.TEACHER:
                accessibleCoursesIds = PermissionTargetKey.GetTargetsIds(
                    user=request.user,
                    key=PermissionTargetKey.TEACH_COURSES_IDS,
                )

            courses = Course.objects.filter(pk__in=accessibleCoursesIds).select_related("level", "language")

            if skip:
                courses = courses[int(skip):]

            if limit:
                courses = courses[:int(skip) + int(limit)]

            courses = CourseDtoSerializer(instance=courses, many=True)

            return Response(data=courses.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def post(request):
        try:
            if not Permission.CanCreateCourse(user=request.user):
                return Permission.GetNoPermissionResponse()

            request.data["teacherId"] = request.user.id

            createdCourse = AddCourseSerializer(data=request.data)

            if not createdCourse.is_valid():
                return Response(data={"error": str(createdCourse.errors)}, status=status.HTTP_400_BAD_REQUEST)

            createdCourse = createdCourse.save()

            createdCourseDto = CourseDtoSerializer(instance=createdCourse)

            return Response(data=createdCourseDto.data, status=status.HTTP_201_CREATED)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CourseAPI(APIView):
    @staticmethod
    def put(request, courseId=None):
        try:
            user = request.user

            if (
                not Permission.CanUpdateSpecificCourses(user=user, targetCourseId=courseId) or
                not Permission.CanUpdateSpecificCoursesMembers(user=user, targetCourseId=courseId)
            ):
                return Permission.GetNoPermissionResponse()

            course = Course.objects.get(pk=courseId)

            request.data["teacherId"] = request.user.id

            updatedCourse = UpdateCourseSerializer(instance=course, data=request.data)

            if not updatedCourse.is_valid():
                return Response(data={"error": str(updatedCourse.errors)}, status=status.HTTP_400_BAD_REQUEST)

            updatedCourse.save()

            updatedCourse = Course.objects.get(pk=courseId)
            updatedCourseDto = CourseDtoSerializer(instance=updatedCourse)

            return Response(data=updatedCourseDto.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def delete(request, courseId=None):
        try:
            if not Permission.CanDeleteSpecificCourses(user=request.user, targetCourseId=courseId):
                return Permission.GetNoPermissionResponse()

            course = Course.objects.get(pk=courseId)
            course.delete()

            return Response(status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

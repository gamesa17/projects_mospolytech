from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from courses.models import Course
from courses.serializers import AddCourseSerializer, CourseInfoSerializer, UpdateCourseSerializer  # noqa I001
from permissions.models import Permission, PermissionTargetKey  # noqa I005
from users.models import Teacher, UserProfile, UserRole


class CoursesView(APIView):
    @staticmethod
    def get(request):
        try:
            user = request.user
            userprofile = UserProfile.objects.get(user=user)

            params = request.query_params

            skip = params.get("skip", None)
            limit = params.get("limit", None)

            if userprofile.role == UserRole.STUDENT:
                accessibleCoursesIds = PermissionTargetKey.GetTargetsIds(
                    user=user, key=PermissionTargetKey.STUDY_COURSES_IDS,
                )
            else:
                accessibleCoursesIds = PermissionTargetKey.GetTargetsIds(
                    user=user,
                    key=PermissionTargetKey.TEACH_COURSES_IDS,
                )

            courses = Course.objects.filter(pk__in=accessibleCoursesIds).select_related("level", "language")

            if skip:
                courses = courses[int(skip):]

            if limit:
                courses = courses[:int(limit)]

            courses = CourseInfoSerializer(courses, many=True)

            return Response(data=courses.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def post(request):
        try:
            user = request.user

            if not Permission.CanCreateCourse(user=user):
                return Permission.GetNoPermissionResponse()

            teacher = Teacher.objects.get(user=user)

            course = AddCourseSerializer(data={
                "name": request.data["name"],
                "level": request.data["levelId"],
                "language": request.data["languageId"],
                "teacher": teacher.id,
            })

            if not course.is_valid():
                return Response(data=course.errors, status=status.HTTP_400_BAD_REQUEST)

            course.save()

            return Response(data=course.data, status=status.HTTP_201_CREATED)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CourseView(APIView):
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

            updateData = {
                "name": request.data["name"],
                "level": request.data["levelId"],
                "language": request.data["languageId"],
                "students": request.data["students"],
                "teacher": course.teacher.id,
            }

            updatedCourse = UpdateCourseSerializer(instance=course, data=updateData)

            if not updatedCourse.is_valid():
                return Response(data=updatedCourse.errors, status=status.HTTP_400_BAD_REQUEST)

            updatedCourse.save()

            return Response(data=updatedCourse.data, status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def delete(request, courseId=None):
        try:
            user = request.user

            if not Permission.CanDeleteSpecificCourses(user=user, targetCourseId=courseId):
                return Permission.GetNoPermissionResponse()

            course = Course.objects.get(pk=courseId)
            course.delete()

            return Response(status=status.HTTP_200_OK)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

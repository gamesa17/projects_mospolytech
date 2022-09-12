from django.contrib import admin

from courses.models import Course


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("name", "language", "level", "teacher")
    list_filter = ("language", "level", "teacher__user")
    search_fields = ("name", "teacher__user__username")
    raw_id_fields = ["teacher", "students"]
    save_on_top = True
    save_as = True
    fieldsets = (
        (None, {
            "fields": (("name", "teacher", "price"),),
        }),
        (None, {
            "fields": (("language", "level"),),
        }),
        (None, {
            "fields": ("students", ),
        }),
    )

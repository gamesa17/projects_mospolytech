from django.contrib import admin

from homeworks.models import Homework


@admin.register(Homework)
class HomeworkAdmin(admin.ModelAdmin):
    list_display = ("name", "course", "link", "createdAt", "deadlineAt")

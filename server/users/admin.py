from django.contrib import admin

from users.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    fields = ("firstName", "lastName", "avatar", "email", "phone", "languages")
    list_display = ("username", "role", "firstName", "lastName")

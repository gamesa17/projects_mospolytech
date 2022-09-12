from django.contrib import admin

from levels.models import Level


@admin.register(Level)
class LevelAdmin(admin.ModelAdmin):
    list_display = ("name", )
    search_fields = ("name", )

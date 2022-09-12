from django.contrib import admin

from homeworks.models import Homework


@admin.register(Homework)
class HomeworkAdmin(admin.ModelAdmin):
    list_display = ("name", "course", "link", "created", "deadline", "onEveryLesson", "draft")
    list_filter = ("onEveryLesson", "draft")
    list_editable = ("draft",)
    search_fields = ("name", "course__name")
    actions = ["Publish", "Unpublish"]
    raw_id_fields = ["course"]
    save_as = True
    list_editable = ("onEveryLesson",)
    fieldsets = (
        (None, {
            "fields": (("name", "link"),),
        }),
        (None, {
            "fields": ("description", "onEveryLesson", "course", "draft"),
        }),
        (None, {
            "fields": (("created", "deadline"),),
        }),
    )

    def Unpublish(self, request, queryset):
        rowUpdate = queryset.update(draft=True)

        if rowUpdate == 1:
            messageBit = "1 record was changed"
        else:
            messageBit = f"{rowUpdate} records were changed"

        self.message_user(request, f"{messageBit}")

    def Publish(self, request, queryset):
        rowUpdate = queryset.update(draft=False)

        if rowUpdate == 1:
            messageBit = "1 record was changed"
        else:
            messageBit = f"{rowUpdate} records were changed"

        self.message_user(request, f"{messageBit}")

    Publish.short_description = "Опубликовать"
    Publish.allowed_permissions = ("change", )

    Unpublish.short_description = "Снять с публикации"
    Unpublish.allowed_permissions = ("change",)

import django.utils.timezone
from django.db import models

from courses.models import Course


class Homework(models.Model):
    class Meta:
        verbose_name = "Домашнее задание"
        verbose_name_plural = "Домашние задания"

    course = models.ForeignKey(verbose_name="Курс", to=Course, on_delete=models.SET_NULL, null=True)

    name = models.CharField(verbose_name="Название", max_length=150)
    description = models.TextField(verbose_name="Описание", null=True, blank=True)
    link = models.URLField(null=True, blank=True)

    isOnEveryLesson = models.BooleanField(verbose_name="Длительное", default=False)

    createdAt = models.DateTimeField(verbose_name="Дата создания", default=django.utils.timezone.now)
    deadlineAt = models.DateTimeField(verbose_name="Дата дедлайна")

    def __str__(self):
        return f"[ID={self.pk}] {self.name} for course({self.course})"

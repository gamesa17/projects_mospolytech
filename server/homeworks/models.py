import django.utils.timezone
from django.db import models

from courses.models import Course


class Homework(models.Model):
    class Meta:
        verbose_name = "Домашнее задание"
        verbose_name_plural = "Домашние задания"

    name = models.CharField(verbose_name="Название", max_length=150)
    link = models.URLField(null=True, blank=True)
    description = models.TextField(verbose_name="Описание", null=True, blank=True)
    created = models.DateTimeField(verbose_name="Дата создания", default=django.utils.timezone.now)
    deadline = models.DateTimeField(verbose_name="Дата дедлайна")
    onEveryLesson = models.BooleanField(verbose_name="Длительное", default=False)
    course = models.ForeignKey(verbose_name="Курс", to=Course, on_delete=models.SET_NULL, null=True)
    draft = models.BooleanField(verbose_name="Черновик", default=False)

    def __str__(self):
        return str(self.name)

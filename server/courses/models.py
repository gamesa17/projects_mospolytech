from django.db import models

from languages.models import Language
from levels.models import Level
from users.models import Student, Teacher


class Course(models.Model):
    class Meta:
        verbose_name = "Курс"
        verbose_name_plural = "Курсы"

    name = models.CharField(verbose_name="Курс", max_length=150)
    level = models.ForeignKey(verbose_name="Уровень", to=Level, on_delete=models.PROTECT, null=True, blank=True)
    price = models.PositiveIntegerField(verbose_name="Цена", default=0, null=True, blank=True)
    language = models.ForeignKey(verbose_name="Язык", to=Language, on_delete=models.PROTECT)
    teacher = models.ForeignKey(verbose_name="Учитель", to=Teacher, on_delete=models.PROTECT)
    students = models.ManyToManyField(verbose_name="Студенты", to=Student, blank=True)

    def __str__(self):
        return str(self.name)

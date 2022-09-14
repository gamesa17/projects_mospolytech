from django.contrib.auth.models import AbstractUser
from django.db import models

from languages.models import Language


class UserRole(models.TextChoices):
    STUDENT = "STUDENT"
    TEACHER = "TEACHER"


class User(AbstractUser):
    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    # username
    # password
    # email

    role = models.CharField(verbose_name="Роль", max_length=20, choices=UserRole.choices, default="")

    avatar = models.ImageField(verbose_name="Аватар", null=True, blank=True)
    firstName = models.CharField(verbose_name="Имя", max_length=255, default="")
    lastName = models.CharField(verbose_name="Фамилия", max_length=255, default="")

    phone = models.CharField(verbose_name="Телефон", max_length=20, default="")

    # UserRole.TEACHER specific
    languages = models.ManyToManyField(verbose_name="Язык", to=Language, blank=True)

    def __str__(self):
        return f"[ID={self.pk}] {self.username}"

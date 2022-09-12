from django.db import models


class Level(models.Model):
    class Meta:
        verbose_name = "Уровень"
        verbose_name_plural = "Уровни"

    name = models.CharField("Уровень", max_length=50)

    def __str__(self):
        return str(self.name)

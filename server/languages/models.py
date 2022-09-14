from django.db import models


class Language(models.Model):
    class Meta:
        verbose_name = "Язык"
        verbose_name_plural = "Языки"

    name = models.CharField("Язык", max_length=150)

    def __str__(self):
        return f"[ID={self.pk}] {self.name}"

# Generated by Django 4.1.1 on 2022-09-14 07:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('permissions', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='permission',
            name='targetUserId',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='target', to=settings.AUTH_USER_MODEL, verbose_name='User ID цели доступа'),
        ),
        migrations.AddField(
            model_name='permission',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owner', to=settings.AUTH_USER_MODEL, verbose_name='Пользователь'),
        ),
    ]
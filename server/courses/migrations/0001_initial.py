# Generated by Django 4.1.1 on 2022-09-14 07:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('levels', '0001_initial'),
        ('languages', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='Курс')),
                ('price', models.PositiveIntegerField(blank=True, default=0, null=True, verbose_name='Цена')),
                ('language', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='languages.language', verbose_name='Язык')),
                ('level', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='levels.level', verbose_name='Уровень')),
            ],
            options={
                'verbose_name': 'Курс',
                'verbose_name_plural': 'Курсы',
            },
        ),
    ]

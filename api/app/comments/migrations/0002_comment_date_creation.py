# Generated by Django 3.2.8 on 2021-10-20 14:52

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='date_creation',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]

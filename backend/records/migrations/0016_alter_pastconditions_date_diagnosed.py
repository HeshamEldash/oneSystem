# Generated by Django 4.0.5 on 2022-11-01 18:06

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0015_patienticdcode_title_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pastconditions',
            name='date_diagnosed',
            field=models.DateField(blank=True, default=datetime.date(2022, 11, 1)),
        ),
    ]

# Generated by Django 4.0.5 on 2022-12-13 15:04

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0018_alter_pastconditions_date_diagnosed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pastconditions',
            name='date_diagnosed',
            field=models.DateField(blank=True, default=datetime.date(2022, 12, 13)),
        ),
    ]

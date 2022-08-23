# Generated by Django 4.0.5 on 2022-08-23 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_remove_employment_unique_employment_and_more'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='registration',
            constraint=models.UniqueConstraint(fields=('provider', 'patient', 'is_active'), name='unique_registration'),
        ),
    ]

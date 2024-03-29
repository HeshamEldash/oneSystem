# Generated by Django 4.0.5 on 2022-08-24 11:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_registration_unique_registration'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='employment',
            name='unique_employment',
        ),
        migrations.AddConstraint(
            model_name='employment',
            constraint=models.UniqueConstraint(condition=models.Q(('is_active', True)), fields=('provider', 'staff'), name='unique_employment'),
        ),
    ]

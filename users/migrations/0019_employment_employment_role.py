# Generated by Django 4.0.5 on 2022-12-17 20:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0018_alter_staff_professional_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='employment',
            name='employment_role',
            field=models.CharField(choices=[('DR', 'Doctor'), ('NR', 'Nurse'), ('MG', 'Manger'), ('PC', 'Practitioner'), ('AD', 'Admin')], max_length=2, null=True, verbose_name='user role'),
        ),
    ]

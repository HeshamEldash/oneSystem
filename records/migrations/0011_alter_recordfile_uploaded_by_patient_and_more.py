# Generated by Django 4.0.6 on 2022-10-05 12:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0015_patient_gender'),
        ('records', '0010_recordfile_file_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recordfile',
            name='uploaded_by_patient',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='users.patient'),
        ),
        migrations.AlterField(
            model_name='recordfile',
            name='uploaded_by_staff',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='users.staff'),
        ),
    ]

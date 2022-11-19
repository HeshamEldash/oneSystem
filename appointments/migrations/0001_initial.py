# Generated by Django 4.0.5 on 2022-11-08 16:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0015_patient_gender'),
    ]

    operations = [
        migrations.CreateModel(
            name='Clinic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('speciality', models.CharField(blank=True, max_length=1000, null=True)),
                ('clinican', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.staff')),
                ('provider', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.provider')),
            ],
        ),
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.DateTimeField()),
                ('end', models.DateTimeField()),
                ('clinic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appointments.clinic')),
            ],
        ),
        migrations.CreateModel(
            name='Slot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('planned_start', models.TimeField()),
                ('slot_duration', models.DurationField()),
                ('session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appointments.session')),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('actual_start', models.TimeField(blank=True, null=True)),
                ('actual_end', models.TimeField(blank=True, null=True)),
                ('presentation', models.CharField(blank=True, max_length=1000, null=True)),
                ('clincian', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='users.staff')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='users.patient')),
                ('slot', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='appointments.slot')),
            ],
        ),
    ]

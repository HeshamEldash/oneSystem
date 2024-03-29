# Generated by Django 4.0.6 on 2022-09-10 18:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0015_patient_gender'),
        ('records', '0004_recordupdateevent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='users.staff'),
        ),
        migrations.AlterField(
            model_name='note',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.patient'),
        ),
        migrations.AlterField(
            model_name='record',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='users.staff'),
        ),
        migrations.AlterField(
            model_name='record',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.patient'),
        ),
        migrations.AlterField(
            model_name='recordupdateevent',
            name='record',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='records.record'),
        ),
        migrations.AlterField(
            model_name='recordupdateevent',
            name='staff',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='users.staff'),
        ),
        migrations.AlterField(
            model_name='viewedrecordevenet',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='users.patient'),
        ),
        migrations.AlterField(
            model_name='viewedrecordevenet',
            name='staff',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='users.staff'),
        ),
    ]

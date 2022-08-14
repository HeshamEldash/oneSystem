# Generated by Django 4.0.5 on 2022-08-14 18:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_alter_logintoproviderevent_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='address',
            name='content_type',
        ),
        migrations.RemoveField(
            model_name='address',
            name='object_id',
        ),
        migrations.AddField(
            model_name='address',
            name='patient',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.patient'),
        ),
        migrations.AddField(
            model_name='address',
            name='provider',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.provider'),
        ),
        migrations.AddField(
            model_name='address',
            name='staff',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.staff'),
        ),
    ]

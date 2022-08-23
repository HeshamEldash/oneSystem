# Generated by Django 4.0.5 on 2022-08-14 18:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        ('users', '0006_rename_logintoprovider_logintoproviderevent'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='logintoproviderevent',
            options={'ordering': ['start_time']},
        ),
        migrations.RemoveField(
            model_name='address',
            name='patient',
        ),
        migrations.RemoveField(
            model_name='address',
            name='provider',
        ),
        migrations.RemoveField(
            model_name='address',
            name='staff',
        ),
        migrations.AddField(
            model_name='address',
            name='content_type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='address',
            name='object_id',
            field=models.PositiveIntegerField(default=1),
            preserve_default=False,
        ),
    ]
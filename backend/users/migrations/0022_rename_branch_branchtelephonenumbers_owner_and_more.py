# Generated by Django 4.0.5 on 2022-12-27 12:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0021_stafftelephonenumbers_providertelephonenumbers_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='branchtelephonenumbers',
            old_name='branch',
            new_name='owner',
        ),
        migrations.RenameField(
            model_name='patienttelephonenumbers',
            old_name='patient',
            new_name='owner',
        ),
        migrations.RenameField(
            model_name='providertelephonenumbers',
            old_name='provider',
            new_name='owner',
        ),
        migrations.RenameField(
            model_name='stafftelephonenumbers',
            old_name='staff',
            new_name='owner',
        ),
    ]

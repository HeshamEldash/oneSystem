# Generated by Django 4.0.6 on 2022-07-31 15:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_address_city_alter_address_first_line_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='patient',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.patient'),
        ),
        migrations.AlterField(
            model_name='address',
            name='provider',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.provider'),
        ),
        migrations.AlterField(
            model_name='address',
            name='staff',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.staff'),
        ),
        migrations.AlterField(
            model_name='telephonenumber',
            name='patient',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.patient'),
        ),
        migrations.AlterField(
            model_name='telephonenumber',
            name='provider',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.provider'),
        ),
        migrations.AlterField(
            model_name='telephonenumber',
            name='staff',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.staff'),
        ),
    ]
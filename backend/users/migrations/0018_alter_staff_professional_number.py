# Generated by Django 4.0.5 on 2022-12-16 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0017_remove_branch_address_remove_branch_telephone_number_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='staff',
            name='professional_number',
            field=models.CharField(blank=True, default='', max_length=100, verbose_name='professional number'),
        ),
    ]
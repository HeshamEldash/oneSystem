# Generated by Django 4.0.6 on 2023-01-18 19:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0022_rename_branch_branchtelephonenumbers_owner_and_more'),
        ('appointments', '0004_slot_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='clinic',
            name='branch',
            field=models.ForeignKey(default=50, on_delete=django.db.models.deletion.CASCADE, to='users.branch'),
            preserve_default=False,
        ),
    ]

# Generated by Django 4.2 on 2024-09-05 16:18

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("manager", "0004_rename_email_manager_acc"),
    ]

    operations = [
        migrations.AlterField(
            model_name="manager",
            name="id",
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]

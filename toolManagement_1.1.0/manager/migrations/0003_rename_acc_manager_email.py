# Generated by Django 4.2 on 2024-09-04 16:53

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("manager", "0002_manager_oid"),
    ]

    operations = [
        migrations.RenameField(
            model_name="manager",
            old_name="acc",
            new_name="email",
        ),
    ]

# Generated by Django 5.0.6 on 2024-09-02 21:50

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("user", "0002_user_oid"),
    ]

    operations = [
        migrations.CreateModel(
            name="UserRegisterRequest",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("studentId", models.CharField(max_length=256)),
                ("name", models.CharField(max_length=256)),
                ("college", models.CharField(max_length=256)),
                ("email", models.CharField(max_length=256)),
                ("phone", models.CharField(max_length=256)),
                ("password", models.CharField(max_length=256)),
                ("isDeleted", models.BooleanField(default=False)),
            ],
            options={
                "db_table": "user_register_request",
            },
        ),
    ]
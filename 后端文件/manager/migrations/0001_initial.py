# Generated by Django 3.2 on 2022-03-28 15:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Manager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('acc', models.CharField(max_length=96, null=True, unique=True, verbose_name='邮箱')),
                ('pwd', models.CharField(max_length=96, null=True, verbose_name='密码')),
                ('name', models.CharField(max_length=96, unique=True, verbose_name='姓名')),
                ('teacherId', models.CharField(max_length=256, null=True, verbose_name='教师工号')),
                ('phoneNumber', models.CharField(max_length=512, null=True, verbose_name='手机号码')),
                ('update_time', models.CharField(max_length=256, null=True, verbose_name='上一次更新时间')),
                ('is_supperUser', models.BooleanField(default=False, verbose_name='是否是超级管理员')),
                ('isActive', models.BooleanField(default=False, verbose_name='是否通过审核')),
            ],
        ),
    ]

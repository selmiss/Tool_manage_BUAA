# Generated by Django 3.2 on 2022-05-09 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tool', '0004_auto_20220505_1536'),
    ]

    operations = [
        migrations.AlterField(
            model_name='toolrequest',
            name='address',
            field=models.CharField(default=None, max_length=1000, null=True, verbose_name='取件地点'),
        ),
        migrations.AlterField(
            model_name='toolrequest',
            name='date_endTime',
            field=models.CharField(default=None, max_length=1000, null=True, verbose_name='取件结束时间'),
        ),
        migrations.AlterField(
            model_name='toolrequest',
            name='date_startTime',
            field=models.CharField(default=None, max_length=1000, null=True, verbose_name='取件开始时间'),
        ),
        migrations.AlterField(
            model_name='toolrequest',
            name='get_date',
            field=models.CharField(default=None, max_length=1000, null=True, verbose_name='取件日期'),
        ),
    ]
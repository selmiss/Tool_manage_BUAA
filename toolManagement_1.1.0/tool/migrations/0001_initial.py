# Generated by Django 3.2 on 2022-03-28 15:00

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Label',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256, null=True, verbose_name='标签名称')),
                ('level', models.IntegerField(default=1, verbose_name='标签等级')),
                ('createTime', models.DateTimeField(default=datetime.datetime.now, null=True, verbose_name='标签建立时间')),
                ('firstLabel', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='lowerLabel', to='tool.label', verbose_name='父级标签')),
            ],
            options={
                'ordering': ['-createTime'],
            },
        ),
        migrations.CreateModel(
            name='Tool',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256, null=True, verbose_name='工具名称')),
                ('totalCount', models.IntegerField(default=0, verbose_name='工具总数量')),
                ('leftCount', models.IntegerField(default=0, verbose_name='现有可用工具数量')),
                ('image', models.ImageField(upload_to='image', verbose_name='工具图片')),
                ('portrait', models.CharField(blank=True, default='', max_length=512, verbose_name='图片路径url')),
                ('createTime', models.DateTimeField(default=datetime.datetime.now, null=True, verbose_name='标签建立时间')),
                ('intro', models.CharField(max_length=2560, null=True, verbose_name='工具简介')),
                ('labelBelong', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='labelTools', to='tool.label', verbose_name='所属标签')),
            ],
            options={
                'ordering': ['-createTime'],
            },
        ),
        migrations.CreateModel(
            name='ToolRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('purpose', models.CharField(default=None, max_length=1000, verbose_name='用途')),
                ('borrowCount', models.IntegerField(verbose_name='需借工具数量')),
                ('request_time', models.DateTimeField(default=datetime.datetime.now, null=True, verbose_name='申请时间')),
                ('start_time', models.DateTimeField(verbose_name='开始时间')),
                ('return_time', models.DateTimeField(verbose_name='归还时间')),
                ('Status', models.CharField(choices=[('W', 'Wait'), ('A', 'Accept'), ('R', 'Refuse'), ('F', 'Finish')], default='W', max_length=1, verbose_name='审批情况')),
                ('refuseReason', models.CharField(default=None, max_length=1000, null=True, verbose_name='拒绝里有')),
                ('borrowTool', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='requestTool', to='tool.tool')),
                ('request_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='toolRequest', to='user.user')),
            ],
            options={
                'ordering': ['-request_time'],
            },
        ),
        migrations.CreateModel(
            name='RequestPostpone',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('postponeTime', models.DateTimeField(verbose_name='延期时间')),
                ('request_time', models.DateTimeField(default=datetime.datetime.now, null=True, verbose_name='提交延期申请时间')),
                ('Status', models.CharField(choices=[('W', 'Wait'), ('A', 'Accept'), ('R', 'Refuse'), ('F', 'Finish')], default='W', max_length=1, verbose_name='审批情况')),
                ('refuseReason', models.CharField(default=None, max_length=1000, null=True, verbose_name='拒绝里有')),
                ('purpose', models.CharField(default=None, max_length=1000, null=True, verbose_name='原因')),
                ('request', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='postPoneRequest', to='tool.toolrequest')),
                ('request_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='postponeRequest', to='user.user')),
            ],
            options={
                'ordering': ['-request_time'],
            },
        ),
    ]

from django.db import models

import user
from user.hypers import *
from datetime import datetime


class Manager(models.Model):
    @staticmethod
    def get_manager_by_id(id):
        u = Manager.objects.filter(id=id)
        return u.get() if u.exists() else None

    # basic fields
    oid = models.CharField(verbose_name='微信id',max_length=1000,null=True)
    acc = models.CharField(unique=True, verbose_name='邮箱', max_length=96, null=True)  # 邮箱作为账号进行登录注册
    pwd = models.CharField(verbose_name='密码', max_length=96, null=True)
    name = models.CharField(verbose_name='姓名', max_length=96, unique=True)
    teacherId = models.CharField(verbose_name='教师工号', max_length=256, null=True)
    phoneNumber = models.CharField(verbose_name='手机号码', max_length=512,null=True)
    update_time = models.CharField(verbose_name='上一次更新时间', max_length=256, null=True)
    is_supperUser=models.BooleanField(verbose_name='是否是超级管理员', default=False)
    isActive = models.BooleanField(verbose_name='是否通过审核', default=False)
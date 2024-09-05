from datetime import datetime

from django.db import models
from user.hypers import *

class User(models.Model):
    @staticmethod
    def get_user_byid(id):
        u = User.objects.filter(id=id)
        return u.get() if u.exists() else None
    id = models.AutoField(primary_key=True)
    oid = models.CharField(verbose_name='微信id', max_length=1000, null=True)
    acc = models.EmailField(unique=True, verbose_name='账号', max_length=96, null=True)#邮箱作为账号进行登录注册
    pwd = models.CharField(verbose_name='密码', max_length=96, null=True)
    name = models.CharField(verbose_name='姓名', max_length=256,null=True)
    studentId = models.CharField(verbose_name='学号', max_length=256,null=True)
    college = models.CharField(verbose_name='学院',max_length=1024,null=True)
    phoneNumber = models.CharField(verbose_name='学号', max_length=256,null=True)

    #portrait = models.CharField(blank=True, verbose_name="头像路径", max_length=512, default='')#todo:在路径中加上用户名
    #img=models.ImageField(upload_to='%Y%M')


class EmailRecord(models.Model):
    @staticmethod
    def get_user_byid(id):
        u = User.objects.filter(id=id)
        return u.get() if u.exists() else None
    @property
    def encoded_id(self):
        return self.id
    id = models.AutoField(primary_key=True)
    code = models.CharField(max_length=20, verbose_name='验证码',default='')
    acc = models.EmailField(max_length=50, verbose_name='用户邮箱', null=True, default='')
    send_time = models.DateTimeField(default=datetime.now, verbose_name='发送时间', null=True, blank=True)
    #expire_time = models.DateTimeField(null=True)
    email_type = models.CharField(choices=(('register', '注册邮件'), ('forget', '找回密码')), max_length=10)

    class Meta:
        verbose_name = '邮件'
        verbose_name_plural = verbose_name

class UserRegisterRequest(models.Model):
    id = models.AutoField(primary_key=True)
    studentId = models.CharField(max_length=256)
    name = models.CharField(max_length=256)
    college = models.CharField(max_length=256)
    email = models.CharField(max_length=256)
    phone = models.CharField(max_length=256)
    password = models.CharField(max_length=256)

    isDeleted = models.BooleanField(default=False)
    class Meta:
        db_table = 'user_register_request'
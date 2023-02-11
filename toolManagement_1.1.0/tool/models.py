from django.db import models
from user.models import *
from manager.models import *

class Label(models.Model):
    def get_label_by_id(id):
        u = Label.objects.filter(id=id)
        return u.get() if u.exists() else None

        # basic fields

    name = models.CharField(verbose_name='标签名称', max_length=256, null=True)  # 邮箱作为账号进行登录注册
    level = models.IntegerField(verbose_name='标签等级',default=1)
    firstLabel = models.ForeignKey('tool.Label', related_name='lowerLabel', verbose_name="父级标签", on_delete=models.CASCADE, null=True)
    createTime = models.DateTimeField(null=True,default=datetime.now,verbose_name='标签建立时间')
    image = models.ImageField(upload_to='image', verbose_name='工具图片',null=True)  # todo:添加图片时同时添加url方便返回
    portrait = models.CharField(blank=True, verbose_name="图片路径url", max_length=512, default='')
    class Meta:
        ordering = ["-createTime"]

class Tool(models.Model):
    def get_tool_by_id(id):
        u = Tool.objects.filter(id=id)
        return u.get() if u.exists() else None

    name = models.CharField(verbose_name='工具名称', max_length=256, null=True)
    totalCount = models.IntegerField(verbose_name='工具总数量',default=0)
    leftCount = models.IntegerField(verbose_name='现有可用工具数量',default=0)
    labelBelong = models.ForeignKey(to='tool.Label',related_name='labelTools',verbose_name='所属标签',on_delete=models.CASCADE,null=False)
    image = models.ImageField(upload_to='image',verbose_name='工具图片') #todo:添加图片时同时添加url方便返回
    portrait = models.CharField(blank=True, verbose_name="图片路径url", max_length=512, default='')
    createTime = models.DateTimeField(null=True, default=datetime.now, verbose_name='标签建立时间')
    intro = models.CharField(verbose_name='工具简介', max_length=2560, null=True)
    limit_days=models.IntegerField(verbose_name='现有可用工具数量',default=1000)
    class Meta:
        ordering = ["-createTime"]


class ToolRequest(models.Model):
    def get_request_by_id(id):
        u = ToolRequest.objects.filter(id=id)
        return u.get() if u.exists() else None

    request_user = models.ForeignKey(to=User, related_name="toolRequest", on_delete=models.CASCADE, null=False)
    purpose = models.CharField(verbose_name="用途", default=None,max_length=1000)
    borrowCount = models.IntegerField(verbose_name='需借工具数量')
    borrowTool = models.ForeignKey(to=Tool,related_name='requestTool',on_delete=models.CASCADE,null=False)
    request_time = models.DateTimeField(null=True, default=datetime.now, verbose_name='申请时间')
    start_time= models.DateTimeField(null=False, verbose_name='开始时间')
    return_time = models.DateTimeField(null=False, verbose_name='归还时间')

    get_date = models.CharField(null=True, verbose_name='取件日期',max_length=1000,default=None)
    date_startTime= models.CharField(null=True, verbose_name='取件开始时间',max_length=1000,default=None)
    date_endTime = models.CharField(null=True, verbose_name='取件结束时间',max_length=1000,default=None)
    address = models.CharField(null=True, verbose_name='取件地点',max_length=1000,default=None)

    STATUS_CHOICES = (('W', 'Wait'), ('A', 'Accept'), ('R', 'Refuse'),('F', 'Finish'))
    Status = models.CharField(
        verbose_name='审批情况', choices=STATUS_CHOICES, max_length=1, default='W')
    refuseReason= models.CharField(verbose_name="拒绝里有", default=None,max_length=1000,null=True)
    class Meta:
        ordering = ["-request_time"]

class RequestPostpone(models.Model):
    def get_request_by_id(id):
        u = RequestPostpone.objects.filter(id=id)
        return u.get() if u.exists() else None

    request_user = models.ForeignKey(to=User, related_name="postponeRequest", on_delete=models.CASCADE, null=False)
    request = models.ForeignKey(to=ToolRequest,related_name='postPoneRequest',on_delete=models.CASCADE,null=False)
    postponeTime = models.DateTimeField(null=False, verbose_name='延期时间')
    request_time = models.DateTimeField(null=True, default=datetime.now, verbose_name='提交延期申请时间')
    STATUS_CHOICES = (('W', 'Wait'), ('A', 'Accept'), ('R', 'Refuse'),('F', 'Finish'))
    Status = models.CharField(
        verbose_name='审批情况', choices=STATUS_CHOICES, max_length=1, default='W')
    refuseReason= models.CharField(verbose_name="拒绝里有", default=None,max_length=1000,null=True)
    purpose = models.CharField(verbose_name="原因", default=None,max_length=1000,null=True)

    class Meta:
        ordering = ["-request_time"]

class RepealPostpone(models.Model):
    def get_request_by_id(id):
        u = RepealPostpone.objects.filter(id=id)
        return u.get() if u.exists() else None

    request_user = models.ForeignKey(to=User, related_name="RepealRequest", on_delete=models.CASCADE, null=False)
    request = models.ForeignKey(to=ToolRequest,related_name='RepealRequest',on_delete=models.CASCADE,null=False)
    request_time = models.DateTimeField(null=True, default=datetime.now, verbose_name='提交延期申请时间')
    STATUS_CHOICES = (('W', 'Wait'), ('A', 'Accept'), ('R', 'Refuse'),('F', 'Finish'))
    Status = models.CharField(
        verbose_name='审批情况', choices=STATUS_CHOICES, max_length=1, default='W')
    refuseReason = models.CharField(verbose_name="拒绝里有", default=None, max_length=1000, null=True)
    purpose = models.CharField(verbose_name="原因", default=None,max_length=1000,null=True)

    class Meta:
        ordering = ["-request_time"]

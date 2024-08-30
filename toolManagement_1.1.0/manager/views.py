from threading import Timer

from django.shortcuts import render
import json
import random
import string
import hashlib


import time

import sched
from django.conf import settings
from datetime import datetime, date
from django.http import FileResponse, StreamingHttpResponse
from django.template.defaultfilters import striptags
from django.utils.encoding import escape_uri_path
from easydict import EasyDict
from django.views import View
from django.db.utils import IntegrityError, DataError
from django.db.models import Q, QuerySet
from django.http import JsonResponse, HttpResponse
from user.hypers import *
from user.models import *
from manager.models import *
from tool.models import *
from django.core.mail import send_mail
from datetime import date, timedelta
from datetime import datetime as pydatetime

# from apscheduler.schedulers.background import BackgroundScheduler
# from django_apscheduler.jobstores import DjangoJobStore, register_job
# from apscheduler.schedulers.background import BackgroundScheduler
# from django_apscheduler.jobstores import DjangoJobStore, register_events, register_job

# #开启定时工作
# try:
#     # 实例化调度器
#     scheduler = BackgroundScheduler()
#     # 调度器使用DjangoJobStore()
#     scheduler.add_jobstore(DjangoJobStore(), "default")
#     # 设置定时任务，选择方式为interval，时间间隔为10s
#     # 另一种方式为每天固定时间执行任务，对应代码为：
#     @register_job(scheduler, 'cron', day_of_week='mon-fri', hour='9', minute='30', second='10',id='task_time')
#     def my_job():
#         requests=ToolRequest.objects.filter(Status='A')
#         for i in requests:
#             if datetime.now()>i.return_time:
#                 send_overTimeLimit_mail(i)
#     register_events(scheduler)
#     scheduler.start()
# except Exception as e:
#     print(e)
#     # 有错误就停止定时器
#     scheduler.shutdown()

def hash_password(pwd):  # 哈希处理用户密码
    m = hashlib.md5()
    m.update(pwd.encode('utf-8'))
    m.update(b"It's DiaDoc!")
    return m.digest()



def wx_Register(request):
    if request.method == 'POST':
        new_user = Manager()
        new_user.acc = request.POST['acc']
        new_user.pwd = hash_password(request.POST['pwd'])
        new_user.name=request.POST['name']
        new_user.phoneNumber = request.POST['phoneNumber']
        new_user.teacherId=request.POST['teacherId']
        new_user.oid = request.POST['openid']
        new_user.save()
        return JsonResponse({'error_code': 0})


def RegisterTeacherAcc(request):
    if request.method == 'POST':
        E = EasyDict()
        E.uk = -1
        E.key, E.emailuni, E.no_code, E.code_error = 1, 2, 3, 4
        kwargs = json.loads(request.body.decode("utf-8"))
        if kwargs.keys() != {'acc', 'pwd', 'key','name','teacherId','phoneNumber'}:
            return JsonResponse({'error_code': E.key})  # 注册信息输入不完整
        ac = Manager.objects.filter(acc=kwargs['acc'])
        if ac.exists():
            return JsonResponse({'error_code': E.emailuni})  # 输入的邮箱已注册账号
        re = EmailRecord.objects.filter(acc=kwargs['phoneNumber'])
        if not re.exists():
            return JsonResponse({"error_code": E.no_code})
        re = re.get()
        if str(re.code).upper() != str(kwargs['key']).upper():
            return JsonResponse({"error_code": E.code_error})
        new_user = Manager()
        new_user.acc = kwargs['acc']
        new_user.pwd = hash_password(kwargs['pwd'])
        new_user.name=kwargs['name']
        new_user.phoneNumber = kwargs['phoneNumber']
        new_user.teacherId=kwargs['teacherId']
        new_user.save()
        return JsonResponse({'error_code': 0, 'uid': new_user.id})
def searchStudentByName(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key= 1
        if kwargs.keys() != {'Name'}:
            return JsonResponse({'error_code': Error.key})
        users=User.objects.filter(name__contains=kwargs['Name'])
        dataList = []
        for i in users:
            dataList.append({"name": i.name, "studentId": i.studentId, "uid": i.id, "acc": i.acc, "phoneNumber":i.phoneNumber, "college":i.college})
        return JsonResponse({'error_code': 0, 'dataList': dataList})

from user import TOKEN_DIC


def delToken(token):
    print("自动删除了token")
    print(token)
    if TOKEN_DIC[token]:
        del TOKEN_DIC[token]



def hashLogin(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.name, Error.pwd,Error.noUser = 1, 2, 3, 4
        if kwargs.keys() != {'pwd', 'acc'}:
            return JsonResponse({'error_code': Error.key})
        users = Manager.objects.filter(acc=kwargs['acc'])
        if not users.exists():
            return JsonResponse({'error_code': Error.noUser})  # 输入的用户不存在
        user = Manager.objects.get(acc=kwargs['acc'])
        if str(user.pwd) != str(kwargs['pwd']):
            return JsonResponse({'error_code': Error.pwd})
        # else:
        #     request.session['Is_login'] = True
        #     request.session['acc'] = kwargs['acc']
        #     request.session['uid'] = user.id
        #     request.session.save()
        uid=user.id
        key = None
        for k,v in TOKEN_DIC.items():
            if v == uid:
                key=k
        if key:
            del TOKEN_DIC[key]
        now = datetime.now()
        strnow = datetime.strftime(now, '%Y-%m-%d %H:%M:%S')
        hash_pre = strnow + "".format(user.id)
        hash_after = myhash(hash_pre)
        TOKEN_DIC[hash_after] = user.id
        print(TOKEN_DIC)
        Timer(127000, delToken, args=[hash_after]).start()
        return JsonResponse({'error_code': 0, 'uid': -2, 'is_superUser': user.is_supperUser, 'hash_code': hash_after})


def Login(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.name, Error.pwd,Error.noUser = 1, 2, 3, 4
        if kwargs.keys() != {'pwd', 'acc'}:
            return JsonResponse({'error_code': Error.key})
        users = Manager.objects.filter(acc=kwargs['acc'])
        if not users.exists():
            return JsonResponse({'error_code': Error.noUser})  # 输入的用户不存在
        user = Manager.objects.get(acc=kwargs['acc'])
        if str(user.pwd) != str(hash_password(kwargs['pwd'])):
            return JsonResponse({'error_code': Error.pwd})
        # else:
        #     request.session['Is_login'] = True
        #     request.session['acc'] = kwargs['acc']
        #     request.session['uid'] = user.id
        #     request.session.save()
        uid=user.id
        key = None
        for k,v in TOKEN_DIC.items():
            if v == uid:
                key=k
        if key:
            del TOKEN_DIC[key]
        now = datetime.now()
        strnow = datetime.strftime(now, '%Y-%m-%d %H:%M:%S')
        hash_pre = strnow + "".format(user.id)
        hash_after = myhash(hash_pre)
        TOKEN_DIC[hash_after] = user.id
        print(TOKEN_DIC)
        Timer(127000, delToken, args=[hash_after]).start()
        return JsonResponse({'error_code': 0, 'uid': -2, 'is_superUser': user.is_supperUser, 'hash_code': hash_after})


def setPwd(request):  # 设置密码
    if request.method == 'POST':
        kwargs: dict = json.loads(request.body)
        error = EasyDict()
        error.key, error.noAcc, error.pwdIllegal, error.codeError = 1, 2, 3, 4
        if kwargs.keys() != {'acc', 'pwd', 'key','phoneNumber'}:
            return JsonResponse({"error_code": error.key})
        u = Manager.objects.filter(acc=kwargs['acc'])
        if not u.exists():
            return JsonResponse({"error_code": error.noAcc})
        u = u.get()
        if not CHECK_PWD(kwargs['pwd']):
            return JsonResponse({"error_code": error.pwdIllegal})
        # if not EmailRecord.objects.filter(code=kwargs['key']).exists():
        #     return JsonResponse({"error_code": error.codeError})
        er = EmailRecord.objects.filter(Q(acc=kwargs['phoneNumber']) | Q(code=kwargs['key'])).get()
        if er is None:
            return JsonResponse({"error_code": error.codeError})
        u.pwd = hash_password(kwargs['pwd'])
        u.save()
        return JsonResponse({"error_code": 0, "name": u.name})

def putInfo(request):  # 上传个人信息
    if request.method == 'POST':
        kwargs: dict = json.loads(request.body)
        error = EasyDict()
        error.unknown = -1
        error.key, error.nouser = 1, 2
        kwargs: dict = json.loads(request.body)
        if kwargs.keys() != {'uid', 'teacherId','name'}:
            return JsonResponse({"error_code": error.key})
        u = Manager.get_manager_by_id(request.POST.get('uid'))
        if u is None:
            return JsonResponse({"error_code": error.nouser})
        u.studentId=kwargs['studentId']
        u.name=kwargs['name']
        u.college=kwargs['college']
        try:
            u.save()
        except:
            return JsonResponse({"error_code": error.unknown})
        return JsonResponse({"error_code": 0})


def getInfo(request):  # 获取个人信息
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        e = EasyDict()
        e.uk, e.key,e.noUser = -1, 1, 2
        if kwargs.keys() != {'uid'}:
            return JsonResponse({"error_code": e.key})
        u = Manager.objects.filter(id=request.POST.get('uid'))
        if not u.exists():
            return JsonResponse({"error_code": e.noUser})
        u = u.get()
        return JsonResponse({"error_code": 0, 'name': u.name,'acc': u.acc, 'teacherId': u.teacherId,
                             'uid': u.id, 'phoneNumber':u.phoneNumber})
def getStudentList(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.name, Error.pwd, Error.noTeacher, Error.illegalStatus = 1, 2, 3, 4, 5
        users = User.objects.all()
        dataList = []
        for i in users:
            dataList.append({"name": i.name, "studentId": i.studentId, "uid": i.id, "acc": i.acc, "phoneNumber":i.phoneNumber, "college":i.college})
        return JsonResponse({'error_code': 0, 'dataList': dataList, "handleCount": len(dataList)})
def getTeacherList(request):
    print("进入函数")
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.name, Error.pwd, Error.noTeacher, Error.illegalStatus = 1, 2, 3, 4, 5
        users = Manager.objects.all()
        dataList = []
        for i in users:
            if i.isActive:
                dataList.append(
                    {"name": i.name, "teacherId": i.teacherId, "uid": i.id, "acc": i.acc, "phoneNumber": i.phoneNumber})
        return JsonResponse({'error_code': 0, 'dataList': dataList, "handleCount": len(dataList)})


def deleteTeacher(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key,Error.noTeacher= 1, 2
        if kwargs.keys() != {'uid'}:
            return JsonResponse({'error_code': Error.key})
        teacher = Manager.get_manager_by_id(kwargs['uid'])
        if teacher is None:
            return JsonResponse({'error_code': Error.noTeacher})
        teacher.delete()
        return JsonResponse({'error_code': 0})


def deleteStudent(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.name ,Error.noTeacher= 1, 2, 3
        if kwargs.keys() != {'uid','stu_uid'}:
            return JsonResponse({'error_code': Error.key})
        teacher = User.get_user_byid(kwargs['stu_uid'])
        if teacher is None:
            return JsonResponse({'error_code': Error.noTeacher})
        teacher.delete()
        return JsonResponse({'error_code': 0})




def getTeacherApproveList(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.name, Error.pwd ,Error.noTeacher, Error.illegalStatus= 1, 2, 3, 4, 5
        users = Manager.objects.filter(isActive=False)
        if users:
            print("user非空")
        dataList = []
        for i in users:
            dataList.append({"name":i.name,"teacherId":i.teacherId,"uid":i.id,"acc":i.acc})
        print("可以运行结束")
        return JsonResponse({'error_code': 0,'dataList':dataList,"handleCount":len(dataList)})

# def getTeacherList(request):
#     if request.method == 'POST':
#         kwargs = json.loads(request.body.decode("utf-8"))
#         Error = EasyDict()
#         Error.key, Error.name, Error.pwd ,Error.noTeacher, Error.illegalStatus= 1, 2, 3, 4, 5
#         users = Manager.objects.filter(isActive=True)
#         dataList = []
#         for i in users:
#             dataList.append({"name":i.name,"teacherId":i.teacherId,"uid":i.id,"acc":i.acc})
#         return JsonResponse({'error_code': 0,'dataList':dataList,"handleCount":len(dataList)})

def getToolUseList(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.name, Error.pwd, Error.noTeacher, Error.illegalStatus = 1, 2, 3, 4, 5
        if kwargs.keys() != {'toolId'}:
            return JsonResponse({'error_code': Error.key})
        requests = ToolRequest.objects.filter(Status='A',borrowTool=kwargs['toolId'])
        dataList = []
        for i in requests:
            dataList.append({
                             "requestUserName": i.request_user.name,
                             "userId": i.request_user.id,
                             "stuCollege": i.request_user.college,
                             "phoneNumber": i.request_user.phoneNumber,
                             "stuEmail": i.request_user.acc,
                             "borrowCount": i.borrowCount,
                             "purpose": i.purpose,
                             "returnTime": datetime.strftime(i.return_time, TIME_FORMAT),
                             "startTime": datetime.strftime(i.start_time, TIME_FORMAT),
                             "requestId": i.id,
                             })
        return JsonResponse({'error_code': 0, 'dataList': dataList})
def sendExpirationReminder(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.noRequest,Error.uk = 1, 2,3
        if kwargs.keys() != {'requestId'}:
            return JsonResponse({'error_code': Error.key})
        toolreq=ToolRequest.get_request_by_id(kwargs['requestId'])
        if toolreq is None:
            return JsonResponse({'error_code': Error.noRequest})
        try:
            send_expriation_mail(toolreq)
        except:
            return JsonResponse({'error_code': Error.uk})
        return JsonResponse({'error_code':0})


def approveTeacher(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.name, Error.pwd ,Error.noTeacher, Error.illegalStatus= 1, 2, 3, 4, 5
        if kwargs.keys() != {'uid', 'teacherId','status'}:
            return JsonResponse({'error_code': Error.key})
        user = Manager.get_manager_by_id(request.POST.get('uid'))
        if user is None:
            return JsonResponse({'error_code': Error.name})  # 输入的用户不存在
        teacher = Manager.get_manager_by_id(kwargs['teacherId'])
        if teacher is None or teacher.isActive:
            return JsonResponse({'error_code': Error.noTeacher})
        if not kwargs['status'] in ('Accept','Refuse'):
            return JsonResponse({'error_code': Error.illegalStatus})
        if_accept = True if str(kwargs['status']) == 'Accept' else False
        if if_accept:
            teacher.isActive = True
            teacher.save()
        else:
            teacher.delete()
        return JsonResponse({'error_code': 0})


def allBorrowList(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.no_user, Error.no_tool = 1, 2, 3
        if kwargs.keys() != {'uid','stu_uid'}:
            return JsonResponse({'error_code': Error.key})
        print("在views函数中uid为")
        print(request.POST.get('stu_uid'))
        user = User.get_user_byid(str(kwargs['stu_uid']))
        if user is None:
            return JsonResponse({'error_code': Error.no_user})
        toolRequests = ToolRequest.objects.filter(request_user=user)
        ret = [{
            "toolName": i.borrowTool.name,
            "borrowCount": i.borrowCount,
            "startTime": datetime.strftime(i.start_time, TIME_FORMAT),  # todo:转换成字符串返回，strftime
            "returnTime": datetime.strftime(i.return_time, TIME_FORMAT),
            "status": i.Status,
            "label": i.borrowTool.labelBelong.id,
            "requestId": i.id,
            "address": i.address,
            "sttime": i.date_startTime,
            "endtime": i.date_endTime,
            "getdate": i.get_date,
        } for i in toolRequests]
        return JsonResponse({"error_code": 0, "requestList": ret})





def reSetPwd(request):  # 登录状态下更改密码
    if request.method == 'POST':
        E = EasyDict()
        E.uk = -1
        E.key, E.wr_pwd, E.ill_pwd, E.no_login = 1, 2, 3, 4
        kwargs: dict = json.loads(request.body)
        if kwargs.keys() != {'uid', 'old_pwd', 'new_pwd'}:
            return JsonResponse({"error_code": E.key})
        u = Manager.objects.filter(id=request.POST.get('uid'))
        if not u.exists():
            return JsonResponse({"error_code": E.no_login})
        u = u.get()
        if str(hash_password(kwargs['old_pwd'])) != u.pwd:
            return JsonResponse({"error_code": E.wr_pwd})
        if not CHECK_PWD(kwargs['new_pwd']):
            return JsonResponse({"error_code": E.ill_pwd})
        u.pwd = hash_password(kwargs['new_pwd'])
        try:
            u.save()
        except:
            return JsonResponse({"error_code": E.uk})
        return JsonResponse({"error_code": 0})
#管理员功能


def getToolRequestList(request):#获取借出请求列表
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.uk = -1
        Error.key, Error.no_user, Error.no_request, Error.illegalRequest, Error.noEnoughCount = 1, 2, 3, 4, 5
        requests = ToolRequest.objects.filter(Status='W')
        dataList=[]
        for i in requests:
            dataList.append({"toolName":i.borrowTool.name,"toolId":i.borrowTool.id,
                             "requestUserName":i.request_user.name,
                             "userId":i.request_user.id,
                             "stuCollege": i.request_user.college,
                             "phoneNumber": i.request_user.phoneNumber,
                             "stuEmail":i.request_user.acc,
                             "borrowCount":i.borrowCount,
                             "purpose":i.purpose,
                             "returnTime":datetime.strftime(i.return_time,TIME_FORMAT),
                             "startTime": datetime.strftime(i.start_time,TIME_FORMAT),
                             "requestId":i.id,
                             })
        return JsonResponse({"error_code": 0, "dataList": dataList,"handleCount":len(dataList)})


def approveBorrowRequest(request):#处理借出请求
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.uk=-1
        Error.key, Error.no_user, Error.no_request,Error.illegalRequest ,Error.noEnoughCount, Error.mailFail= 1, 2, 3, 4, 5, 6
        if kwargs.keys() != {'requestId','status','isChangeTime','changeTime','refuseReason','getDate','startTime', 'endTime', 'address'}:
            return JsonResponse({'error_code': Error.key})
        toolReq = ToolRequest.objects.filter(id=str(kwargs['requestId']), Status='W')
        if not toolReq.exists():
            return JsonResponse({"error_code": Error.no_request})
        toolReq = toolReq.get()
        if not kwargs['status'] in ('Accept', 'Refuse'):
            return JsonResponse({"error_code": Error.illegalRequest})
        toolReq.Status = 'R'
        if_accept = True if str(kwargs['status']) == 'Accept' else False
        isChangeTime = True if str(kwargs['isChangeTime']) in ('True', 'true') else False
        if if_accept:
            tool = toolReq.borrowTool
            if toolReq.borrowCount > tool.leftCount:
                return JsonResponse({"error_code": Error.noEnoughCount})
            toolReq.get_date=kwargs['getDate']
            toolReq.date_startTime = kwargs['startTime']
            toolReq.date_endTime = kwargs['endTime']
            toolReq.address = kwargs['address']

            toolReq.Status = 'A'
            toolReq.save()
            tool.leftCount=tool.leftCount-toolReq.borrowCount
            tool.save()
            if isChangeTime: #todo:邮件提醒
                toolReq.return_time = datetime.strptime(str(kwargs['changeTime']),TIME_FORMAT)
        else:
            toolReq.refuseReason=kwargs['refuseReason']
            toolReq.save()
        toolReq.save()
        if not send_request_mail(toolReq,isChangeTime):
            return JsonResponse({"error_code": Error.mailFail})
        expirEmail(toolReq)
        return JsonResponse({"error_code": 0})




def expirEmail(toolReq):
    if toolReq.Status == 'A':
        print("执行".format(toolReq.return_time))
        now = datetime.now()
        t = toolReq.return_time
        if (t - now).days <= 2:
            tool=toolReq.borrowTool
            message="您借用的工具"+tool.name+"即将到期，请按时归还"
            send_mail("北航工训借用平台通知", message, settings.EMAIL_FROM, [toolReq.request_user.acc])
        t = Timer(43200, expirEmail,args=[toolReq])
        t.start()





def getPostponeRequestList(request):#获取延期请求列表
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.uk = -1
        Error.key, Error.no_user, Error.no_request, Error.illegalRequest, Error.noEnoughCount = 1, 2, 3, 4, 5
        requests =RequestPostpone.objects.filter(Status='W')
        dataList=[]
        for i in requests:
            dataList.append({"toolName":i.request.borrowTool.name,"toolId":i.request.borrowTool.id,
                             "requestUserName":i.request_user.name,
                             "userId":i.request_user.id,
                             "stuCollege":i.request_user.college,
                             "phoneNumber":i.request_user.phoneNumber,
                             "borrowCount":i.request.borrowCount,
                             "purpose":i.request.purpose,
                             "returnTime":datetime.strftime(i.request.return_time,TIME_FORMAT),
                             "postPoneTime":datetime.strftime(i.postponeTime,TIME_FORMAT),
                             "startTime":datetime.strftime(i.request.start_time,TIME_FORMAT),
                             "requestId":i.id,
                             "postponePurpose":i.purpose,
                             "stuEmail":i.request_user.acc,
                             })
        return JsonResponse({"error_code": 0, "data_list": dataList,"handleCount":len(dataList)})

def getRepealRequestList(request):#获取撤销申请请求
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.uk = -1
        Error.key, Error.no_user, Error.no_request, Error.illegalRequest, = 1, 2, 3, 4
        requests =RepealPostpone.objects.filter(Status='W')
        dataList=[]
        for i in requests:
            dataList.append({"toolName":i.request.borrowTool.name,"toolId":i.request.borrowTool.id,
                             "requestUserName":i.request_user.name,
                             "userId":i.request_user.id,
                             "stuCollege":i.request_user.college,
                             "phoneNumber":i.request_user.phoneNumber,
                             "borrowCount":i.request.borrowCount,
                             "purpose":i.request.purpose,
                             "returnTime":datetime.strftime(i.request.return_time,TIME_FORMAT),
                             "postPoneTime":datetime.strftime(i.postponeTime,TIME_FORMAT),
                             "startTime":datetime.strftime(i.request.start_time,TIME_FORMAT),
                             "requestId":i.id,
                             "postponePurpose":i.purpose,
                             "stuEmail":i.request_user.acc,
                             })
        return JsonResponse({"error_code": 0, "data_list": dataList,"handleCount":len(dataList)})

def approvePostponeRequest(request):#处理延期请求
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.uk=-1
        Error.key, Error.no_user, Error.no_request,Error.illegalRequest ,Error.noEnoughCount,Error.mailFail= 1, 2, 3, 4, 5, 6
        if kwargs.keys() != {'requestId','status','refuseReason'}:
            return JsonResponse({'error_code': Error.key})
        toolReq = RequestPostpone.objects.filter(id=str(kwargs['requestId']), Status='W')
        if not toolReq.exists():
            return JsonResponse({"error_code": Error.no_request})
        toolReq = toolReq.get()
        if not kwargs['status'] in ('Accept', 'Refuse'):
            return JsonResponse({"error_code": Error.illegalRequest})
        toolReq.Status = 'R'
        if_accept = True if str(kwargs['status']) == 'Accept' else False
        if if_accept:
            toolReq.Status = 'A'
            toolreq = toolReq.request
            toolreq.return_time=toolReq.postponeTime
            toolreq.save()
        else:
            toolReq.refuseReason=kwargs['refuseReason']
            toolReq.save()
        toolReq.save()
        if not send_postponeOut_mail(toolReq):
            return JsonResponse({"error_code": Error.mailFail})
        return JsonResponse({"error_code": 0})

def setReturnTime(request):#修改借出设备的归还时间
    kwargs = json.loads(request.body.decode("utf-8"))
    Error = EasyDict()
    Error.uk = -1
    Error.key, Error.no_user, Error.no_request, Error.illegalRequest, Error.noEnoughCount = 1, 2, 3, 4, 5
    if kwargs.keys() != {'requestId', 'changeTime'}:
        return JsonResponse({'error_code': Error.key})
    toolReq = ToolRequest.objects.filter(id=str(kwargs['requestId']), Status='A')
    if not toolReq.exists():
        return JsonResponse({"error_code": Error.no_request})
    toolReq = toolReq.get()
    toolReq.return_time=datetime.strptime(str(kwargs['changeTime']),TIME_FORMAT)
    toolReq.save()
    return JsonResponse({"error_code": 0})

def getAllNeedReturnList(request):#获取待归还请求列表
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.uk = -1
        Error.key, Error.no_user, Error.no_request, Error.illegalRequest, Error.noEnoughCount = 1, 2, 3, 4, 5
        requests = ToolRequest.objects.filter(Status='A')
        dataList=[]
        for i in requests:
            dataList.append({"toolName":i.borrowTool.name,"toolId":i.borrowTool.id,
                             "requestUserName":i.request_user.name,
                             "userId":i.request_user.id,
                             "borrowCount":i.borrowCount,
                             "purpose":i.purpose,
                             "returnTime":datetime.strftime(i.return_time,TIME_FORMAT),
                             "startTime":datetime.strftime(i.start_time,TIME_FORMAT),
                             "stuCollege": i.request_user.college,
                             "phoneNumber": i.request_user.phoneNumber,
                             "requestId":i.id,
                             "stuEmail":i.request_user.acc,
                             })
        return JsonResponse({"error_code": 0, "data_list": dataList,"handleCount":len(dataList)})

def affirmWait(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.uk = -1
        Error.key, Error.no_user, Error.no_request, Error.illegalRequest, Error.noEnoughCount = 1, 2, 3, 4, 5
        if kwargs.keys() != {'toolId'}:
            return JsonResponse({'error_code': Error.key})
        requests = ToolRequest.objects.filter(Status='W',borrowTool=kwargs['toolId'])
        if requests.exists():
            dataList = []
            for i in requests:
                dataList.append({"toolName": i.borrowTool.name, "toolId": i.borrowTool.id,
                                 "requestUserName": i.request_user.name,
                                 "userId": i.request_user.id,
                                 "borrowCount": i.borrowCount,
                                 "purpose": i.purpose,
                                 "returnTime": datetime.strftime(i.return_time, TIME_FORMAT),
                                 "startTime": datetime.strftime(i.start_time, TIME_FORMAT),
                                 "stuCollege": i.request_user.college,
                                 "phoneNumber": i.request_user.phoneNumber,
                                 "requestId": i.id,
                                 "stuEmail": i.request_user.acc,
                                 })
            return JsonResponse({"error_code": 0, "data_list": dataList,"out":True})
        else:
            return JsonResponse({"error_code": 0, "data_list": None, "out": False})
def returnTool(request):#归还
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.uk=-1
        Error.key, Error.no_user, Error.no_request,Error.illegalRequest ,Error.noEnoughCount= 1, 2, 3, 4, 5
        if kwargs.keys() != {'requestId'}:
            return JsonResponse({'error_code': Error.key})
        toolReq = ToolRequest.objects.filter(id=str(kwargs['requestId']), Status='A')
        if not toolReq.exists():
            return JsonResponse({"error_code": Error.no_request})
        toolReq = toolReq.get()
        tool=toolReq.borrowTool
        tool.leftCount += toolReq.borrowCount
        tool.save()
        toolReq.Status='F'
        toolReq.save()
        return JsonResponse({"error_code": 0})


def send_request_mail(toolReq:ToolRequest,ifChange:bool):
    message=''
    if toolReq.Status == 'A':
        if ifChange:
            message=toolReq.request_user.name+"同学，你的借出请求已被接受且设备归还时间为"+datetime.strftime(toolReq.return_time,TIME_FORMAT)+"。\n请于"+toolReq.get_date\
                    +toolReq.date_startTime+"~"+toolReq.date_endTime+"到"+toolReq.address+"处使用。\n"+"如有疑问可联系工训处老师"
        else:
            message=toolReq.request_user.name+"同学，你的借出请求已被接受可于近期取走设备。"+"\n请于"+toolReq.get_date\
                    +toolReq.date_startTime+"~"+toolReq.date_endTime+"到"+toolReq.address+"处使用。\n"+"如有疑问可联系工训处老师"
    elif toolReq.Status == 'R':
        message=toolReq.request_user.name+"同学，你的借出请求已被拒绝\n"+"理由如下：\n"+toolReq.refuseReason+"\n如有疑问可联系工训处老师"
    else:
        return False
    try:
        acc=toolReq.request_user.acc
        send_mail("北航工训借用平台申请处理结果通知", message, settings.EMAIL_FROM, [acc])
    except:
        return False
    return True
def send_postponeOut_mail(toolReq:RequestPostpone):
    message=''
    if toolReq.Status == 'A':
        message=toolReq.request_user.name+"同学，你的延期申请已通过"+"如有疑问可联系工训处老师"
    elif toolReq.Status == 'R':
        message=toolReq.request_user.name+"同学，你的延期请求已被拒绝，"+"理由如下：\n"+toolReq.refuseReason+"\n如有疑问可联系工训处老师"
    else:
        return False
    try:
        acc=toolReq.request_user.acc
        send_mail("北航工训借用平台延期申请处理结果通知", message, settings.EMAIL_FROM, [acc])
    except:
        return False
    return True
def send_overTimeLimit_mail(toolReq:ToolRequest):
    message="同学，您的工具借用已逾期，请尽快归还"
    try:
        acc = toolReq.request_user.acc
        send_mail("北航工训借用平台申请处理结果通知", message, settings.EMAIL_FROM, [acc])
    except:
        return False
    return True
def send_expriation_mail(toolReq:ToolRequest):
    message="同学，您的工具借用即将到期，请尽快归还"
    try:
        acc = toolReq.request_user.acc
        send_mail("北航工训借用平台申请处理结果通知", message, settings.EMAIL_FROM, [acc])
    except:
        return False
    return True
#标签工具修改

def addFirstLable(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.uk = -1
        Error.key, Error.no_user, Error.nameExists= 1, 2, 3
        if kwargs.keys() != {'name','uid'}:
            return JsonResponse({'error_code': Error.key})
        manager=Manager.get_manager_by_id(str(request.POST.get('uid')))
        if manager is None:
            return JsonResponse({'error_code': Error.no_user})
        label=Label.objects.filter(name=str(kwargs['name']))
        if label.exists():
            return JsonResponse({'error_code': Error.nameExists})
        new_label=Label.objects.create(name=str(kwargs['name']))
        new_label.save()
        return JsonResponse({'error_code': 0,'labelId':new_label.id})

def addSecondLable(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.uk = -1
        Error.key, Error.no_user, Error.nameExists, Error.noFirstLabelExists= 1, 2, 3, 4
        if kwargs.keys() != {'name','uid','firstLabelId'}:
            return JsonResponse({'error_code': Error.key})
        manager=Manager.get_manager_by_id(str(request.POST.get('uid')))
        if manager is None:
            return JsonResponse({'error_code': Error.no_user})
        label=Label.objects.filter(name=str(kwargs['name']))
        if label.exists():
            return JsonResponse({'error_code': Error.nameExists})
        label2=Label.get_label_by_id(kwargs['firstLabelId'])
        if label2 is None:
            return JsonResponse({'error_code': Error.noFirstLabelExists})
        new_label=Label.objects.create(name=str(kwargs['name']),firstLabel=label2,level=2)
        new_label.save()
        return JsonResponse({'error_code': 0,'labelId':new_label.id})

def editLabel(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.uk = -1
        Error.key, Error.no_user, Error.nameExists, Error.noFirstLabelExists = 1, 2, 3, 4
        if kwargs.keys() != {'newName', 'uid', 'LabelId'}:
            return JsonResponse({'error_code': Error.key})
        manager = Manager.get_manager_by_id(str(request.POST.get('uid')))
        if manager is None:
            return JsonResponse({'error_code': Error.no_user})
        label = Label.objects.filter(name=str(kwargs['newName']))
        # if label.exists():
        #     return JsonResponse({'error_code': Error.nameExists})
        label2 = Label.get_label_by_id(kwargs['LabelId'])
        if label2 is None:
            return JsonResponse({'error_code': Error.noFirstLabelExists})
        label2.name=str(kwargs['newName'])
        label2.save()
        return JsonResponse({'error_code': 0})
def putLabelImage(request):
    if request.method == 'POST':
        LabelId = request.POST.get('LabelId')
        img = request.FILES.get('img')
        tool=Label.get_label_by_id(str(LabelId))
        if tool is None:
            return JsonResponse({'error_code': 2})
        tool.image = img
        tool.save()
        head_path = 'http://121.4.160.157' + settings.MEDIA_URL + tool.image.name
        tool.portrait = head_path
        tool.save()
        return JsonResponse({'error_code': 0})

def deleteLabel(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.uk = -1
        Error.key, Error.no_user, Error.nameExists, Error.noFirstLabelExists = 1, 2, 3, 4
        if kwargs.keys() != {'uid', 'LabelId'}:
            return JsonResponse({'error_code': Error.key})
        manager = Manager.get_manager_by_id(str(request.POST.get('uid')))
        if manager is None:
            return JsonResponse({'error_code': Error.no_user})
        label2 = Label.get_label_by_id(kwargs['LabelId'])
        if label2 is None:
            return JsonResponse({'error_code': Error.noFirstLabelExists})
        label2.delete()
        return JsonResponse({'error_code': 0})




def editTool1(request):
    if request.method == 'POST':
        Error = EasyDict()
        Error.uk = -1
        Error.key, Error.no_user, Error.noFirstLabelExists, Error.illegalCount,Error.noTool= 1, 2, 3, 4, 5
        uid = request.POST.get('uid')
        print("views里面的uid")
        print(uid)
        name = request.POST.get('name')
        setCount = request.POST.get('setCount')
        intro = request.POST.get('intro')
        toolId=request.POST.get('toolId')
        limit_days=int(request.POST.get('limit_days'))
        manager = Manager.get_manager_by_id(uid)
        if manager is None:
            return JsonResponse({'error_code': Error.no_user})
        setCount=int(setCount)
        if setCount < 0:
            return JsonResponse({'error_code': Error.illegalCount})
        tool=Tool.get_tool_by_id(toolId)
        if tool is None:
            return JsonResponse({'error_code': Error.noTool})
        addCount = setCount-tool.totalCount
        if tool.leftCount + addCount <= 0:
            return JsonResponse({'error_code': Error.illegalCount})
        tool.intro = intro
        tool.name = name
        tool.totalCount = setCount
        tool.leftCount = tool.leftCount + addCount
        tool.limit_days = limit_days
        tool.save()

        img = request.FILES.get('img')
        tool.image = img
        tool.save()
        now = datetime.now()
        strnow = datetime.strftime(now, '%Y-%m-%d %H:%M:%S')
        hash_cun = 'll' + strnow
        name = myhash(hash_cun)
        print(name)
        img = os.path.join("image/", name)
        img += '.jpg'
        img_root = os.path.join(settings.MEDIA_ROOT, img)

        tool.portrait = img_root
        tool.save()

        return JsonResponse({'error_code': 0})


def wxlogin(request):
    print("到达函数")
    isM = request.POST.get('isM')
    openid = request.POST.get('openid')
    print(isM)
    if isM == '1':
        print("是老师")
        try:
            ur = Manager.objects.get(oid=openid)
        except Manager.DoesNotExist:
            print('出现异常')
        if ur:
            return JsonResponse({'haveuser':"1",'email':ur.acc,'pwd':ur.pwd})
        else:
            return JsonResponse({'haveuser':"0"})
    else:
        print("是学生")
        try:
            ur = User.objects.get(oid=openid)
        except User.DoesNotExist:
            print("出现异常")
        if ur:
            acc=ur.acc
            pwd= ur.pwd
            print(pwd)
            return JsonResponse({'haveuser': "1", 'email': acc, 'pwd': pwd,})
        else:
            return JsonResponse({'haveuser': "0"})





#工具添加删除
def createTool(request):#todo：考虑修改工具数量导致其leftcount是否合理
    if request.method == 'POST':
        #kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.uk = -1
        Error.key, Error.no_user,  Error.noFirstLabelExists, Error.notSecondLevel= 1, 2, 3, 4
        # if kwargs.keys() != {'uid', 'LabelId','name','addCount','intro'}:
        #     return JsonResponse({'error_code': Error.key})
        uid=request.POST.get('uid')
        LabelId = request.POST.get('LabelId')
        print("labelid是")
        print(LabelId)
        name = request.POST.get('name')
        addCount = request.POST.get('addCount')
        intro = request.POST.get('intro')
        limit_days = request.POST.get('limit_days')
        manager = Manager.get_manager_by_id(uid)
        if manager is None:
            return JsonResponse({'error_code': Error.no_user})
        label = Label.get_label_by_id(LabelId)
        if label is None:
            return JsonResponse({'error_code': Error.noFirstLabelExists})
        if label.level != 2:
            return JsonResponse({'error_code': Error.notSecondLevel})
        tool=Tool.objects.create(name=name,labelBelong=label)
        tool.leftCount=int(addCount)
        tool.intro=intro
        tool.limit_days=limit_days
        #tool.save()
        tool.totalCount=tool.leftCount
        
        
        img = request.FILES.get('img')

        print(dir(img))
        print(img)
        tool.image = img
        tool.save()
        # now = datetime.now()
        # strnow = datetime.strftime(now, '%Y-%m-%d %H:%M:%S')
        # hash_cun = 'll'+ strnow
        # name = myhash(hash_cun)
        # print(name)
        # img = os.path.join("image/", name)
        # img += '.jpg'
        # img_root = os.path.join(settings.MEDIA_ROOT, img)
        

        tool.portrait= "http://10.212.87.185/media/image/" + img.name
        # tool.portrait= "http://10.212.87.185/media/image/"
        tool.save()
        return JsonResponse({'error_code': 0,'toolId':tool.id})


def uploadImag(request):
    if request.method == "POST":
        f = request.FILES['csv_file']
        file_path = os.path.join('media/image', f.name)
        with open(file_path, 'wb') as fp:
            for info in f.chunks():
                fp.write(info)
            fp.close()
            message = '上传成功'

def uploadImg1(request):
    print("进入")
    if request.method == 'POST':
        toolId = request.POST.get('toolId')
        tool = Tool.get_tool_by_id(toolId)
        if tool is None:
            return JsonResponse({'message': 1})
        img=request.FILES.get('img')
        file_path = os.path.join('media/image', img.name)
        with open(file_path, 'wb') as fp:
            for info in img.chunks():
                fp.write(info)
            fp.close()
        tool.save()
        print("执行完毕")
        return JsonResponse({'message':"上传成功"})

def editTool(request):
    if request.method == 'POST':
        Error = EasyDict()
        Error.uk = -1
        Error.key, Error.no_user, Error.noFirstLabelExists, Error.illegalCount,Error.noTool= 1, 2, 3, 4, 5
        uid = request.POST.get('uid')
        name = request.POST.get('name')
        setCount = request.POST.get('setCount')
        intro = request.POST.get('intro')
        img = request.POST.get('imgurl')
        toolId=request.POST.get('toolId')
        print("views里面的uid")
        print(uid)
        
        print(name)
        
        print(setCount)
        
        print(intro)
        
        print("bugs",request.POST.get('limit_days'))
        Limit = request.POST.get('limit_days')
        limit_days= Limit
        manager = Manager.get_manager_by_id(uid)
        if manager is None:
            return JsonResponse({'error_code': Error.no_user})
        setCount= int(setCount)
        if setCount < 0:
            return JsonResponse({'error_code': Error.illegalCount})
        tool=Tool.get_tool_by_id(toolId)
        if tool is None:
            return JsonResponse({'error_code': Error.noTool})
        addCount = setCount-tool.totalCount
        if tool.leftCount + addCount <= 0:
            return JsonResponse({'error_code': Error.illegalCount})
        tool.intro = intro
        tool.name = name
        tool.image = img
        tool.totalCount = setCount
        tool.leftCount = tool.leftCount + addCount
        tool.limit_days = limit_days
        head_path = img
        tool.portrait = head_path
        tool.save()
        return JsonResponse({'error_code': 0})

def editToolLabel(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.uk = -1
        Error.key, Error.no_user, Error.noLabel, Error.notSecondLabel, Error.noTool= 1, 2, 3, 4, 5
        if kwargs.keys() != {'uid','toolId','labelId'}:
            return JsonResponse({'error_code': Error.key})
        manager = Manager.get_manager_by_id(str(request.POST.get('uid')))
        if manager is None:
            return JsonResponse({'error_code': Error.no_user})
        tool = Tool.get_tool_by_id(kwargs['toolId'])
        if tool is None:
            return JsonResponse({'error_code': Error.noTool})
        label=Label.get_label_by_id(kwargs['labelId'])
        if label is None:
            return JsonResponse({'error_code': Error.noLabel})
        if label.level != 2:
            return JsonResponse({'error_code': Error.notSecondLabel})
        tool.labelBelong=label
        tool.save()
        return JsonResponse({'error_code': 0})

import hashlib
from hashlib import sha256

def myhash(str):
    res = hashlib.sha256(str.encode(encoding="utf-8"))
    hash_str = res.hexdigest()
    ans = hash_str[10:30]
    return ans



def imgText(request):
    if request.method == 'POST':
        img_a = request.FILES.get('files')
        now = datetime.now()
        strnow = datetime.strftime(now, '%Y-%m-%d %H:%M:%S')
        hash_cun = "123abc" + strnow
        name = myhash(hash_cun)
        print(name)
        img = os.path.join("image/", name)
        img +='.jpg'
        img_root = os.path.join(settings.MEDIA_ROOT,img)
        print(img)
        with open(img_root, 'wb') as f:
            for zipFile_Part in request.FILES.get('files').chunks():
                f.write(zipFile_Part)
        return JsonResponse({'url': img})
    else:
        return HttpResponse('method 方法 错误')


def deleteTool(request):#todo：判断工具是否全部收回？
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.uk = -1
        Error.key, Error.no_user, Error.noTool, Error.toolNotReturn= 1, 2, 3, 4
        if kwargs.keys() != {'uid','toolId'}:
            return JsonResponse({'error_code': Error.key})
        manager = Manager.get_manager_by_id(str(request.POST.get('uid')))
        if manager is None:
            return JsonResponse({'error_code': Error.no_user})
        tool=Tool.get_tool_by_id(kwargs['toolId'])
        if tool is None:
            return JsonResponse({'error_code': Error.noTool})
        if tool.leftCount != tool.totalCount:
            return JsonResponse({'error_code': Error.toolNotReturn})
        tool.delete()
        return JsonResponse({'error_code': 0})

def deleteWithoutJduge(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.uk = -1
        Error.key, Error.noTool= 1, 2
        if kwargs.keys() != {'toolId'}:
            return JsonResponse({'error_code': Error.key})
        tool = Tool.get_tool_by_id(kwargs['toolId'])
        if tool is None:
            return JsonResponse({'error_code': Error.noTool})
        tool.delete()
        return JsonResponse({'error_code': 0})

def moveSecondLabel(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.uk = -1
        Error.key, Error.no_user, Error.noLabel, Error.noFirstLabelExists,Error.notSecondLabel ,Error.notFirstLabel= 1, 2, 3, 4, 5, 6
        if kwargs.keys() != {'newFirstLabelId', 'uid', 'LabelId'}:
            return JsonResponse({'error_code': Error.key})
        manager = Manager.get_manager_by_id(str(request.POST.get('uid')))
        if manager is None:
            return JsonResponse({'error_code': Error.no_user})
        label=Label.get_label_by_id(kwargs['newFirstLabelId'])
        if label is None:
            return JsonResponse({'error_code': Error.noFirstLabelExists})
        if label.level != 1:
            return JsonResponse({'error_code': Error.notFirstLabel})
        label2 = Label.get_label_by_id(kwargs['LabelId'])
        if label2 is None:
            return JsonResponse({'error_code': Error.noLabel})
        if label2.level != 2:
            return JsonResponse({'error_code': Error.notSecondLabel})
        label2.firstLabel=label
        label2.save()
        return JsonResponse({'error_code': 0})


#获取某个工具的借出记录
def toolRequestRecord(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.uk = -1
        Error.key, Error.noTool= 1, 2
        if kwargs.keys() != {'toolId'}:
            return JsonResponse({'error_code': Error.key})
        tool = Tool.get_tool_by_id(kwargs['toolId'])
        if tool is None:
            return JsonResponse({'error_code': Error.noTool})
        requests=ToolRequest.objects.filter(borrowTool=tool)
        outList=[{
            "toolName": i.borrowTool.name,
            "borrowCount": i.borrowCount,
            "startTime": i.start_time,
            "returnTime": i.return_time,
            "status": i.Status,
            "label": i.borrowTool.labelBelong.id,
            "requestId": i.id,
        }for i in requests if i.Status == 'A' or i.Status=='F'] #只展示借出成功的记录
        return JsonResponse({'error_code': 0,'recordList':outList})
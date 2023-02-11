import json
import random
import string
import hashlib
from threading import Timer

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
from django.core.mail import send_mail
from datetime import date, timedelta, datetime
from tool.models import *
from django.conf import settings

# from __future__ import print_function

import ssl, hmac, base64, hashlib
from datetime import datetime as pydatetime

try:
    from urllib import urlencode
    from urllib2 import Request, urlopen
except ImportError:
    from urllib.parse import urlencode
    from urllib.request import Request, urlopen


def hash_password(pwd):  # 哈希处理用户密码
    m = hashlib.md5()
    m.update(pwd.encode('utf-8'))
    m.update(b"It's toolBorrow!")
    return m.digest()


def wx_Register(request):
            new_user = User()
            new_user.acc = request.POST['acc']
            new_user.pwd = hash_password(request.POST['pwd'])
            new_user.name = request.POST['name']
            new_user.studentId = request.POST['studentId']
            new_user.college = request.POST['college']
            new_user.phoneNumber = request.POST['phoneNumber']
            new_user.oid = request.POST['openid']
            new_user.save()
            print("函数结束")
            return JsonResponse({'error_code': 0})







def Register(request):
    if request.method == 'POST':
        E = EasyDict()
        E.uk = -1
        E.key, E.emailuni, E.no_code, E.code_error = 1, 2, 3, 4
        kwargs = json.loads(request.body.decode("utf-8"))
        if kwargs.keys() != {'acc', 'pwd', 'key', 'name', 'studentId', 'college', 'phoneNumber'}:
            return JsonResponse({'error_code': E.key})  # 注册信息输入不完整
        ac = User.objects.filter(acc=kwargs['acc'])
        if ac.exists():
            return JsonResponse({'error_code': E.emailuni})  # 输入的邮箱已注册账号
        re = EmailRecord.objects.filter(acc=kwargs['phoneNumber'])
        if not re.exists():
            return JsonResponse({"error_code": E.no_code})
        re = re.get()
        if str(re.code).upper() != str(kwargs['key']).upper():
            return JsonResponse({"error_code": E.code_error})
        new_user = User()
        new_user.acc = kwargs['acc']
        new_user.pwd = hash_password(kwargs['pwd'])
        new_user.name = kwargs['name']
        new_user.studentId = kwargs['studentId']
        new_user.college = kwargs['college']
        new_user.phoneNumber = kwargs['phoneNumber']
        new_user.save()
        return JsonResponse({'error_code': 0, 'uid': new_user.id})


def uniNameJudge(request):
    if request.method == 'POST':
        E = EasyDict()
        E.uk = -1
        E.key, E.nameuni = 1, 2
        kwargs = json.loads(request.body.decode("utf-8"))
        if kwargs.keys() != {'name'}:
            return JsonResponse({'error_code': E.key})  # 注册信息输入不完整
        users = User.objects.filter(name=kwargs['name'])
        if users.exists():
            return JsonResponse({'error_code': E.nameuni})  # 输入的用户名已存在
        return JsonResponse({'error_code': 0})


import hashlib
from hashlib import sha256


def myhash(str):
    res = hashlib.sha256(str.encode(encoding="utf-8"))
    hash_str = res.hexdigest()
    ans = hash_str[10:30]
    return ans


from user import TOKEN_DIC


def delToken(token):
    print("自动删除了token")
    print(token)
    if TOKEN_DIC[token]:
        del TOKEN_DIC[token]


def hashLogin(request):
    print("进来Login函数")
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.name, Error.pwd = 1, 2, 3
        if kwargs.keys() != {'pwd', 'acc'}:
            return JsonResponse({'error_code': Error.key})
        users = User.objects.filter(acc=kwargs['acc'])
        if not users.exists():
            return JsonResponse({'error_code': Error.name})  # 输入的用户不存在
        user = User.objects.get(acc=kwargs['acc'])
        if str(user.pwd) != str(kwargs['pwd']):
            return JsonResponse({'error_code': Error.pwd})
        # else:
        #     request.session['Is_login'] = True
        #     request.session['acc'] = kwargs['acc']
        #     request.session['uid'] = user.id
        #     request.session.save()
        now = datetime.now()
        strnow = datetime.strftime(now, '%Y-%m-%d %H:%M:%S')
        hash_pre = strnow + "".format(user.id)
        hash_after = myhash(hash_pre)
        TOKEN_DIC[hash_after] = user.id
        print(hash_after + "这是新生成的token")
        print(TOKEN_DIC)
        Timer(1270000, delToken, args=[hash_after]).start()
        return JsonResponse({'error_code': 0, 'uid': -2, 'hash_code': hash_after})







def Login(request):
    print("进来Login函数")
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.name, Error.pwd = 1, 2, 3
        if kwargs.keys() != {'pwd', 'acc'}:
            return JsonResponse({'error_code': Error.key})
        users = User.objects.filter(acc=kwargs['acc'])
        if not users.exists():
            return JsonResponse({'error_code': Error.name})  # 输入的用户不存在
        user = User.objects.get(acc=kwargs['acc'])
        if str(user.pwd) != str(hash_password(kwargs['pwd'])):
            return JsonResponse({'error_code': Error.pwd})
        # else:
        #     request.session['Is_login'] = True
        #     request.session['acc'] = kwargs['acc']
        #     request.session['uid'] = user.id
        #     request.session.save()
        now = datetime.now()
        strnow = datetime.strftime(now, '%Y-%m-%d %H:%M:%S')
        hash_pre = strnow + "".format(user.id)
        hash_after = myhash(hash_pre)
        TOKEN_DIC[hash_after] = user.id
        print(hash_after + "这是新生成的token")
        print(TOKEN_DIC)
        Timer(1270000, delToken, args=[hash_after]).start()
        return JsonResponse({'error_code': 0, 'uid': -2, 'hash_code': hash_after})


def unLogin(request):
    kwargs = json.loads(request.body.decode("utf-8"))
    # token = request.META.get('HTTP_AUTHORIZATION')
    token = request.POST.get("token")
    del TOKEN_DIC[token]
    print(TOKEN_DIC)
    print('删除成功')
    return HttpResponse("退出成功")


def send_test(request):  # 忘记密码发送验证码邮件
    if request.method == 'POST':
        error = EasyDict()
        error.key, error.accNotExists, error.error = 1, 2, 3
        kwargs = json.loads(request.body.decode("utf-8"))
        if kwargs.keys() != {'acc'}:
            return JsonResponse({"error_code": error.key})
        acc = str(kwargs['acc'])
        code_list = []
        for i in range(10):  # 0~9
            code_list.append(str(i))
        for i in range(65, 91):  # A-Z
            code_list.append(chr(i))
        for i in range(97, 123):  # a-z
            code_list.append(chr(i))
        code = random.sample(code_list, 6)  # 随机取6位数
        code_num = ''.join(code)

        # 云市场分配的密钥Id
        secretId = "AKID7waThjDCHADr5wn5TIgWoQeKH5jDWH30gXyU"
        # 云市场分配的密钥Key
        secretKey = "5h5r5u5wB9lpgZE8fhYAu9DB3770biNt2ob8Gv0"
        source = "market"

        # 签名
        datetime = pydatetime.utcnow().strftime('%a, %d %b %Y %H:%M:%S GMT')
        signStr = "x-date: %s\nx-source: %s" % (datetime, source)
        sign = base64.b64encode(hmac.new(secretKey.encode('utf-8'), signStr.encode('utf-8'), hashlib.sha1).digest())
        auth = 'hmac id="%s", algorithm="hmac-sha1", headers="x-date x-source", signature="%s"' % (
            secretId, sign.decode('utf-8'))

        # 请求方法
        method = 'POST'
        # 请求头
        headers = {
            'X-Source': source,
            'X-Date': datetime,
            'Authorization': auth,

        }
        # 查询参数
        queryParams = {
        }
        # body参数（POST方法下存在）
        bodyParams = {
            "mobile": acc,
            "param": "131223",
            "templateId": "TPLID2"}
        # url参数拼接
        url = 'https://service-k7jkpysr-1307960160.sh.apigw.tencentcs.com/release/sms/send'
        if len(queryParams.keys()) > 0:
            url = url + '?' + urlencode(queryParams)

        request = Request(url, headers=headers)
        request.get_method = lambda: method
        if method in ('POST', 'PUT', 'PATCH'):
            request.data = urlencode(bodyParams).encode('utf-8')
            request.add_header('Content-Type', 'application/x-www-form-urlencoded')
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        response = urlopen(request, context=ctx)
        content = response.read()
        if content:
            print(content.decode('utf-8'))

        try:
            e = EmailRecord.objects.get(acc=acc)
            e.code = code_num
            e.save()
        except:
            EmailRecord.objects.create(code=code_num, acc=acc, email_type='注册验证码')
        return JsonResponse({"error_code": 0})  # 1,


def sendCode(request):
    if request.method == 'POST':
        error = EasyDict()
        error.key, error.accNotExists, error.error = 1, 2, 3
        kwargs = json.loads(request.body.decode("utf-8"))
        if kwargs.keys() != {'acc'}:
            return JsonResponse({"error_code": error.key})
        acc = str(kwargs['acc'])
        code_list = []
        for i in range(10):  # 0~9
            code_list.append(str(i))
        for i in range(65, 91):  # A-Z
            code_list.append(chr(i))
        for i in range(97, 123):  # a-z
            code_list.append(chr(i))
        code = random.sample(code_list, 6)  # 随机取6位数
        code_num = ''.join(code)

        # 云市场分配的密钥Id
        secretId = "AKID2Ovvus1N51uueq80b6b426Gdbtf2hng9as58"
        # 云市场分配的密钥Key
        secretKey = "br98n38xtj5tnxdrqn4k64h1opm88nkz45cdlhtk"
        source = "market"

        # 签名
        datetime = pydatetime.utcnow().strftime('%a, %d %b %Y %H:%M:%S GMT')
        signStr = "x-date: %s\nx-source: %s" % (datetime, source)
        sign = base64.b64encode(hmac.new(secretKey.encode('utf-8'), signStr.encode('utf-8'), hashlib.sha1).digest())
        auth = 'hmac id="%s", algorithm="hmac-sha1", headers="x-date x-source", signature="%s"' % (
            secretId, sign.decode('utf-8'))

        # 请求方法
        method = 'POST'
        # 请求头
        headers = {
            'X-Source': source,
            'X-Date': datetime,
            'Authorization': auth,

        }
        # 查询参数
        queryParams = {
        }
        # body参数（POST方法下存在）
        bodyParams = {
            "mobile": acc,
            "tag": code_num,
            "templateId": "MF3E78EFB8"}
        # url参数拼接
        url = 'https://service-5ipqbocr-1308811306.sh.apigw.tencentcs.com/release/sms/send'
        if len(queryParams.keys()) > 0:
            url = url + '?' + urlencode(queryParams)

        request = Request(url, headers=headers)
        request.get_method = lambda: method
        if method in ('POST', 'PUT', 'PATCH'):
            request.data = urlencode(bodyParams).encode('utf-8')
            request.add_header('Content-Type', 'application/x-www-form-urlencoded')
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        response = urlopen(request, context=ctx)
        content = response.read()
        if content:
            print(content.decode('utf-8'))

        try:
            e = EmailRecord.objects.get(acc=acc)
            e.code = code_num
            e.save()
        except:
            EmailRecord.objects.create(code=code_num, acc=acc, email_type='注册验证码')
        return JsonResponse({"error_code": 0})  # 1,


def codeJudge(request):
    if request.method == 'POST':
        kwargs: dict = json.loads(request.body)
        error = EasyDict()
        error.key, error.noAcc, error.codeError = 1, 2, 3
        if kwargs.keys() != {'acc', 'key'}:
            return JsonResponse({"error_code": error.key})
        # u = User.objects.filter(acc=kwargs['acc'])
        re = EmailRecord.objects.filter(acc=kwargs['acc'])
        if not re.exists():
            return JsonResponse({"error_code": error.noAcc})
        re = re.get()
        if str(re.code) != str(kwargs['key']):
            return JsonResponse({"error_code": error.codeError})
        return JsonResponse({"error_code": 0})


def setPwd(request):  # 设置密码
    if request.method == 'POST':
        kwargs: dict = json.loads(request.body)
        error = EasyDict()
        error.key, error.noAcc, error.pwdIllegal, error.codeError = 1, 2, 3, 4
        if kwargs.keys() != {'acc', 'pwd', 'key', 'phoneNumber'}:
            return JsonResponse({"error_code": error.key})
        u = User.objects.filter(acc=kwargs['acc'])
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


def reSetPwd(request):  # 登录状态下更改密码
    if request.method == 'POST':
        E = EasyDict()
        E.uk = -1
        E.key, E.wr_pwd, E.ill_pwd, E.no_login = 1, 2, 3, 4
        kwargs: dict = json.loads(request.body)
        if kwargs.keys() != {'uid', 'old_pwd', 'new_pwd'}:
            return JsonResponse({"error_code": E.key})
        u = User.objects.filter(id=request.POST.get('uid'))
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


def putInfo(request):  # 上传个人信息
    if request.method == 'POST':
        kwargs: dict = json.loads(request.body)
        error = EasyDict()
        error.unknown = -1
        error.key, error.nouser, error.ill_name, error.ill_intro, error.rename = 1, 2, 3, 4, 5
        kwargs: dict = json.loads(request.body)
        if kwargs.keys() != {'uid', 'studentId', 'name', 'college'}:
            return JsonResponse({"error_code": error.key})
        u = User.get_user_byid(request.POST.get('uid'))
        if u is None:
            return JsonResponse({"error_code": error.nouser})
        u.studentId = kwargs['studentId']
        u.name = kwargs['name']
        u.college = kwargs['college']
        try:
            u.save()
        except:
            return JsonResponse({"error_code": error.unknown})
        return JsonResponse({"error_code": 0})


def getInfo(request):  # 获取个人信息
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        e = EasyDict()
        e.uk, e.key, e.noUser = -1, 1, 2
        if kwargs.keys() != {'uid'}:
            return JsonResponse({"error_code": e.key})
        u = User.objects.filter(id=request.POST.get('uid'))
        if not u.exists():
            u = Manager.objects.filter(id=request.POST.get('uid'))
            if not u.exists():
                return JsonResponse({"error_code": e.noUser})
            u = u.get()
            return JsonResponse({"error_code": 0, 'name': u.name, 'acc': u.acc, 'teacherId': u.teacherId,
                     'uid': u.id,'phoneNumber': u.phoneNumber})
        u = u.get()
        return JsonResponse({"error_code": 0, 'name': u.name, 'acc': u.acc, 'studentId': u.studentId,
                             'uid': u.id, 'college': u.college, 'phoneNumber': u.phoneNumber})


# 借出工具操作

def getFirstLabelLists(request):
    if request.method == 'POST':
        # kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.name, Error.pwd = 1, 2, 3
        labels = Label.objects.all()
        ret = [{
            "name": i.name,
            "id": i.id,
            "level": i.level,
            "count": len(i.lowerLabel.all()),
        } for i in labels if i.level == 1]
        return JsonResponse({"error_code": 0, "labelList": ret})


def getFirstLabelList(request):  # 获取标签列表
    if request.method == 'POST':
        # kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.name, Error.pwd = 1, 2, 3
        labels = Label.objects.all()
        ret = [{
            "name": i.name,
            "id": i.id,
            "level": i.level,
            "lowerLabel": [{"name": j.name, "id": j.id, "level": j.level, "url": j.portrait} for j in
                           i.lowerLabel.all()]
        } for i in labels if i.level == 1]
        return JsonResponse({"error_code": 0, "labelList": ret})


def getSecondLabelList(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.no_label, Error.pwd, Error.noFirstLabel = 1, 2, 3, 4
        if kwargs.keys() != {'labelId'}:
            return JsonResponse({'error_code': Error.key})
        firstLabel = Label.get_label_by_id(kwargs['labelId'])
        if firstLabel is None:
            return JsonResponse({'error_code': Error.no_label})
        if not firstLabel.level == 1:
            return JsonResponse({'error_code': Error.noFirstLabel})
        secondLabels = firstLabel.lowerLabel.all()
        ret = [{
            "name": i.name,
            "id": i.id,
            "level": i.level,
            "count": len(i.labelTools.all()),
            "url": i.portrait,
        } for i in secondLabels if i.level == 2]
        return JsonResponse({"error_code": 0, "labelList": ret})


def getLabelToolList(request):  # 获取标签下设备列表
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.no_label, Error.noSecondLabel = 1, 2, 3
        if kwargs.keys() != {'labelId'}:
            return JsonResponse({'error_code': Error.key})
        secondLabel = Label.get_label_by_id(kwargs['labelId'])
        if secondLabel is None:
            return JsonResponse({'error_code': Error.no_label})
        if not secondLabel.level == 2:
            return JsonResponse({'error_code': Error.noSecondLabel})
        ret = []
        for i in secondLabel.labelTools.all():
            reqList = ToolRequest.objects.filter(Status='A', borrowTool=i).order_by('return_time')
            return_time = None
            if len(reqList) != 0:
                req = reqList[0]
                return_time = req.return_time
                return_time = datetime.strftime(return_time, TIME_FORMAT)
            ret.append({
                "name": i.name,
                "totalCount": i.totalCount,
                "leftCount": i.leftCount,
                "id": i.id,
                "url": i.portrait,  # todo:返回最短归还时间
                "shortReturnTime": return_time,
                "intro": i.intro,
                "limit_days": i.limit_days,
            })
        return JsonResponse({"error_code": 0, "toolList": ret})


def borrowRequest(request):  # 借出申请
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.no_user, Error.no_tool, Error.overLimitDays = 1, 2, 3, 4
        if kwargs.keys() != {'uid', 'toolId', 'borrowCount', 'returnTime', 'purpose', 'startTime'}:
            return JsonResponse({'error_code': Error.key})
        user = User.get_user_byid(str(request.POST.get('uid')))
        if user is None:
            return JsonResponse({'error_code': Error.no_user})
        tool = Tool.get_tool_by_id(kwargs['toolId'])
        if tool is None:
            return JsonResponse({'error_code': Error.no_tool})
        request_exsis1 = ToolRequest.objects.filter(borrowTool_id=kwargs['toolId'], request_user_id=request.POST.get('uid'),
                                                    Status='A')
        request_exsis2 = ToolRequest.objects.filter(borrowTool_id=kwargs['toolId'], request_user_id=request.POST.get('uid'),
                                                    Status='W')
        if request_exsis1 or request_exsis2:
            return JsonResponse({'error_code': 5})
        returnTime = datetime.strptime(str(kwargs['returnTime']), TIME_FORMAT)
        startTime = datetime.strptime(str(kwargs['startTime']), TIME_FORMAT)
        if (returnTime - startTime).days > tool.limit_days:
            return JsonResponse({'error_code': Error.overLimitDays})
        new_toolRequest = ToolRequest.objects.create(request_user=user, borrowTool=tool, return_time=returnTime,
                                                     start_time=startTime,
                                                     purpose=kwargs['purpose'], borrowCount=int(kwargs['borrowCount']),
                                                     )
        new_toolRequest.save()
        return JsonResponse({"error_code": 0, 'requestId': new_toolRequest.id})


# 个人记录查看
def allBorrowList(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.no_user, Error.no_tool = 1, 2, 3
        if kwargs.keys() != {'uid'}:
            return JsonResponse({'error_code': Error.key})
        print("在views函数中uid为")
        print(request.POST.get('uid'))
        user = User.get_user_byid(str(request.POST.get('uid')))

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


def repealRequest(request):  # todo:撤销申请 需要管理员审核
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.no_user, Error.no_request, Error.illegl_repeal = 1, 2, 3, 4
        if kwargs.keys() != {'uid', 'requestId', "purpose"}:
            return JsonResponse({'error_code': Error.key})
        user = User.get_user_byid(str(request.POST.get('uid')))
        if user is None:
            return JsonResponse({'error_code': Error.no_user})
        request = ToolRequest.get_request_by_id(kwargs['requestId'])
        if request is None:
            return JsonResponse({'error_code': Error.no_request})
        RepealRequest = RepealPostpone.objects.filter(request=kwargs['requestId'], Status='W')
        if not RepealRequest.exists():
            RepealRequest = RepealPostpone.objects.create(request=request, request_user=user)
            RepealRequest.purpose = kwargs['purpose']
            RepealRequest.save()
            request.delete()
            print("到此")
        else:
            RepealRequest = RequestPostpone.get()
            RepealRequest.purpose = kwargs['purpose']
            RepealRequest.save()
        return JsonResponse({"error_code": 0})


def applyPostpone(request):  # todo:申请延期，需管理员审核
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key, Error.no_user, Error.no_request, Error.illegal_postpone = 1, 2, 3, 4
        if kwargs.keys() != {'uid', 'requestId', 'postponeTime', "purpose"}:
            return JsonResponse({'error_code': Error.key})
        user = User.get_user_byid(str(request.POST.get('uid')))
        if user is None:
            return JsonResponse({'error_code': Error.no_user})
        request = ToolRequest.get_request_by_id(kwargs['requestId'])
        if request is None:
            return JsonResponse({'error_code': Error.no_request})
        # if datetime.now < request.return_time:
        # return JsonResponse({'error_code': Error.illegal_postpone})
        postponeRequest = RequestPostpone.objects.filter(request=kwargs['requestId'], Status='W')
        if not postponeRequest.exists():
            postponeRequest = RequestPostpone.objects.create(request=request, request_user=user,
                                                             postponeTime=datetime.strptime(kwargs['postponeTime'],
                                                                                            TIME_FORMAT))
            postponeRequest.purpose = kwargs['purpose']
            postponeRequest.save()
        else:
            postponeRequest = postponeRequest.get()
            postponeRequest.postponeTime = datetime.strptime(kwargs['postponeTime'], TIME_FORMAT)
            postponeRequest.purpose = kwargs['purpose']
            postponeRequest.save()
        postponeRequest.save()
        return JsonResponse({"error_code": 0})


def searchToolByName(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key = 1
        if kwargs.keys() != {'toolName'}:
            return JsonResponse({'error_code': Error.key})
        tools = Tool.objects.filter(name__contains=kwargs['toolName'])
        ret = []
        for i in tools:
            reqList = ToolRequest.objects.filter(Status='A', borrowTool=i).order_by('return_time')
            return_time = None
            if len(reqList) != 0:
                req = reqList[0]
                return_time = req.return_time
                return_time = datetime.strftime(return_time, TIME_FORMAT)
            ret.append({
                "name": i.name,
                "totalCount": i.totalCount,
                "leftCount": i.leftCount,
                "id": i.id,
                "url": i.portrait,  # todo:返回最短归还时间
                "shortReturnTime": return_time,
                "intro": i.intro,
            })
        return JsonResponse({"error_code": 0, "dataList": ret})


def searchLabelByName(request):
    if request.method == 'POST':
        kwargs = json.loads(request.body.decode("utf-8"))
        Error = EasyDict()
        Error.key = 1
        if kwargs.keys() != {'labelName'}:
            return JsonResponse({'error_code': Error.key})
        labels = Label.objects.filter(name__contains=kwargs['labelName'])
        ret = []
        for i in labels:
            if i.level == 2:
                ret.append({
                    "name": i.name,
                    "id": i.id,
                    "firstLabel": i.firstLabel.name,
                })
        return JsonResponse({"error_code": 0, "dataList": ret})

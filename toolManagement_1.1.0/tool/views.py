import json
import random
import string
import hashlib
import time

from django.conf import settings
from datetime import datetime, date
from django.http import FileResponse, StreamingHttpResponse
from django.template.defaultfilters import striptags
from django.utils.encoding import escape_uri_path
from django.views import View
from django.db.utils import IntegrityError, DataError
from django.db.models import Q, QuerySet
from django.http import JsonResponse, HttpResponse
from user.hypers import *
from user.models import *
from tool.models import *
from django.core.mail import send_mail
from datetime import date, timedelta

from utils.utils import md5, save_file


def toolapi(request):
	if request.method == "GET":
		label = request.GET.get("label")
		if label:
			tools = Tool.objects.filter(labelBelong=label)
		else:
			tools = Tool.objects.all()
		return JsonResponse({
			"data": [{
				"id": t.id,
				"name": t.name,
				"total_count": t.totalCount,
				"left_count": t.leftCount,
				"label": t.labelBelong.name,
				"portrait": t.portrait,
				"created_at": t.createTime,
				"intro": t.intro,
				"limit_days": t.limit_days,
			} for t in tools],
			"msg": "获取成功",
		})
	elif request.method == "POST":
		uid = request.POST.get("uid")
		label = request.POST.get("label")
		name = request.POST.get('name')
		totalCount = request.POST.get('total_count')
		intro = request.POST.get('intro')
		limitDays = request.POST.get('limit_days')
		img = request.FILES.get('img')
		# check uid
		# manager = Manager.objects.filter(id=uid)
		# if not manager.exists():
		#     return JsonResponse({
		#         "msg": "找不到uid对应的用户",
		#     }, status=403)
		# todo
		label = Label.objects.filter(id=label)
		if not label.exists():
			print("fucked")
		label = label.get()
		_, imgExt = os.path.splitext(img.name)
		imgMd5 = md5(img.name+str(time.time()))
		imgName = f"{imgMd5}{imgExt}"
		imgPath = os.path.join("media/image", imgName)
		save_file(imgPath, img)
		tool = Tool.objects.create(
			name=name,
			totalCount=totalCount,
			leftCount=totalCount,
			labelBelong=label,
			image="undefiled",
			portrait=imgName,
			intro=intro,
			limit_days=limitDays,
		)
		return JsonResponse({
			"data": {
				"id": tool.id,
			},
			"msg": "创建成功",
		}, status=201)

def toolsapi(request, tid):
	tool = Tool.objects.filter(id=tid)
	if not tool.exists():
		return JsonResponse({
			"msg": "工具不存在",
		}, status=404)
	tool = tool.get()
	if request.method == "GET":
		return JsonResponse({
			"data": {
				"id": tool.id,
				"name": tool.name,
				"total_count": tool.totalCount,
				"left_count": tool.leftCount,
				"label": tool.labelBelong.name,
				"portrait": tool.portrait,
				"created_at": tool.createTime,
				"intro": tool.intro,
				"limit_days": tool.limit_days,
			},
			"msg": "获取成功",
		})
	elif request.method == "PUT":
		uid = request.POST.get("uid")
		# label = request.POST.get("label")
		name = request.POST.get('name')
		totalCount = request.POST.get('total_count')
		intro = request.POST.get('intro')
		limitDays = request.POST.get('limit_days')
		img = request.FILES.get('img')
		tool.name = name
		tool.intro = intro
		tool.limit_days = limitDays
		if img:
			_, imgExt = os.path.splitext(img.name)
			imgMd5 = md5(img.name+str(time.time()))
			imgName = f"{imgMd5}{imgExt}"
			imgPath = os.path.join("media/image", imgName)
			save_file(imgPath, img)
			tool.portrait = imgName
		delta = int(totalCount) - tool.totalCount
		tool.totalCount = totalCount
		tool.leftCount += delta
		if tool.leftCount < 0:
			return JsonResponse({
				"msg": "剩余数量不能小于0",
			}, status=400)
		tool.save()
		return JsonResponse({
			"msg": "工具信息修改成功",
		})
	elif request.method == "DELETE":
		tool.delete()
		return JsonResponse({
			"msg": "工具删除成功",
		})

def usersapi(request):
	if request.method == "GET":
		users = User.objects.all()
		return JsonResponse({
			"data": [{
				"id": u.id,
				"student_id": u.studentId,
				"name": u.name,
				"email": u.acc,
				"phone": u.phoneNumber,
				"college": u.college,
			} for u in users],
			"msg": "学生列表获取成功",
		})

def userapi(request, uid: int):
	user = User.objects.filter(id=uid)
	if not user.exists():
		return JsonResponse({
			"msg": "学生不存在",
		}, status=404)
	user = user.get()
	if request.method == "GET":
		return JsonResponse({
			"data": {
				"id": user.id,
				"student_id": user.studentId,
				"name": user.name,
				"email": user.acc,
				"phone": user.phoneNumber,
				"college": user.college,
			},
			"msg": "学生列表获取成功",
		})
	elif request.method == "PUT":
		pass
	elif request.method == "DELETE":
		user.delete()
		return JsonResponse({
			"msg": "学生删除成功",
		})

def managersapi(request):
	if request.method == "GET":
		managers = Manager.objects.filter(isActive=True)
		return JsonResponse({
			"data": [{
				"id": m.id,
				"name": m.name,
				"teacher_id": m.teacherId,
				"email": m.acc,
				"phone": m.phoneNumber,
			} for m in managers],
			"msg": "教师列表获取成功",
		})
	
def managerapi(request, mid: int):
	manager = Manager.objects.filter(id=mid)
	if not manager.exists():
		return JsonResponse({
			"msg": "教师不存在",
		}, status=404)
	manager = manager.get()
	if request.method == 'DELETE':
		manager.delete()
		return JsonResponse({
			"msg": "教师删除成功",
		})
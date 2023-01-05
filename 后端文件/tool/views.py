import json
import random
import string
import hashlib

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
from tool.models import *
from django.core.mail import send_mail
from datetime import date, timedelta

def uploadImage(request):
    if request.method == 'POST':
        E = EasyDict()
        E.uk = -1
        E.key, E.no_tool = 1, 2
        kwargs = json.loads(request.body.decode("utf-8"))
        ac = Tool.objects.filter(id=kwargs['toolId'])
        if not ac.exists():
            return JsonResponse({'error_code': E.no_tool})
        ac=ac.get()
        img=request.FILES.get('img')
        ac.image=img
        return JsonResponse({"error_code": 0})
def returnImage(request):
    if request.method == 'POST':
        E = EasyDict()
        E.uk = -1
        E.key, E.no_tool,E.no_image = 1, 2, 3
        kwargs = json.loads(request.body.decode("utf-8"))
        ac = Tool.objects.filter(id=kwargs['toolId'])
        if not ac.exists():
            return JsonResponse({'error_code': E.no_tool})
        ac = ac.get()
        if not ac.image:
            return JsonResponse({'error_code': E.no_image})
        head_path = 'http://21.4.160.157' + settings.MEDIA_URL
        return JsonResponse({"error_code": 0,"imageUrl":head_path+ac.image.name})



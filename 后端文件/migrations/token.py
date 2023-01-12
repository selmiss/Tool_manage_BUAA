import mutable as mutable
from django.utils.deprecation import MiddlewareMixin
import json
from user import TOKEN_DIC
from django.http import JsonResponse,HttpResponse

class ware1(MiddlewareMixin):

    def process_request(self, request):
        token = request.META.get('HTTP_AUTHORIZATION')
        print("前端带来的Token是"+token)
        if token != "wutoken":
            if token in TOKEN_DIC.keys():
                request.POST._mutable = True
                print("验证了token")
                request.POST["uid"] = TOKEN_DIC[token]
                request.POST._mutable = mutable
                print(request.POST["uid"])
            else:
                print(token)
                print("token错误被返回了")
                print(TOKEN_DIC)
                return HttpResponse("token错误")
        else:
            print("不属于需要验证的请求")




    def process_response(self, request, response):
        print("middle_ware1.process_response")
        return response
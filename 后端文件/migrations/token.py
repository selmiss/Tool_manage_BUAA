import mutable as mutable
from django.utils.deprecation import MiddlewareMixin
import json
from user import TOKEN_DIC
from django.http import JsonResponse,HttpResponse

class ware1(MiddlewareMixin):

    def process_request(self, request):
        token = request.META.get('HTTP_AUTHORIZATION')
        print("前端带来的Token是".format(token))
        print(TOKEN_DIC)
        if token != "wutoken":
            if token in TOKEN_DIC.keys():
                request.POST._mutable = True   #让post的body是可以改变的
                print("验证了token")
                request.POST["uid"] = TOKEN_DIC[token]
                request.POST._mutable = mutable #重新改变post的body为不可改变
                print(request.POST["uid"])
            else:
                print(token)
                print("token错误被返回了")
                #return JsonResponse({"token_message" : "token错误"})
        else:
            print("不属于需要验证的请求")




    def process_response(self, request, response):
        print("middle_ware1.process_response")
        response['message'] = True
        return response
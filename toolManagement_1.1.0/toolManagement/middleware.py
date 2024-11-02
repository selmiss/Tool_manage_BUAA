import json
import logging
from django.http import QueryDict
from django.utils.deprecation import MiddlewareMixin
from user import TOKEN_DIC
from django.http import JsonResponse, HttpResponse

class Http2Middleware(object):
	def __init__(self, get_response):
		self.get_response = get_response

	def __call__(self, request):
		try:
			method = request.method.upper()
			if method not in ['GET', 'POST']:
				origin_method = method
				request.method = 'POST'
				request._load_post_and_files()
				request.method = origin_method
				setattr(request, method, request.POST)
		except Exception as e:
			logging.error(e)
		response = self.get_response(request)
		return response


class Auth(MiddlewareMixin):
	def process_request(self, request):
		token = request.META.get('HTTP_AUTHORIZATION')
		print("auth", token, TOKEN_DIC.get(token, None))
		if not token:
			token = request.META.get('authorization')
		request.POST._mutable = True
		request.POST["uid"] = token
		# if token != "wutoken":
		# 	if token in TOKEN_DIC.keys():
		# 		request.POST._mutable = True   #让post的body是可以改变的
		# 		request.POST["uid"] = TOKEN_DIC[token]
		# 		#request.POST._mutable = mutable #重新改变post的body为不可改变
		# 		# print(request.POST["uid"])
		# 	else:
		# 		pass
		# else:
		# 	pass

	def process_response(self, request, response):
		print("middle_ware1.process_response")
		response['message'] = True
		return response
import json
import logging
from django.http import QueryDict

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

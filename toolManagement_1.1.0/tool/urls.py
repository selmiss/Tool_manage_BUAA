from django.urls import path, re_path
from . import views

urlpatterns = [
		path('tools', views.toolapi),
		path('tools/<int:tid>', views.toolsapi),
]

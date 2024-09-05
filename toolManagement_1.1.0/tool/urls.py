from django.urls import path, re_path
from . import views

urlpatterns = [
	path('tools', views.toolapi),
	path('tools/<int:tid>', views.toolsapi),
	path('users', views.usersapi),
	path('users/<int:uid>', views.userapi),
	path('managers', views.managersapi),
	path('managers/<int:mid>', views.managerapi),
]

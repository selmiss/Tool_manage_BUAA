from django.urls import path, re_path
from . import views

urlpatterns = [
    # 用户基础功能

    # 用户注册
    path('register', views.Register, name='register'),
	path('register/verify', views.RegisterVerify, name='registerVerify'),
    # 用户登录
    path('login', views.Login, name='login'),
    # 发送验证码
    path('forget/sendCode', views.sendCode, name='forgetPwd'),
    path('forget/send_test', views.send_test, name='forgetPwd'),
    path('unLogin', views.unLogin, name='unLogin'),
    # 通过验证码重置密码
    path('forget/setPwd', views.setPwd, name='setPwd'),
    # 登录状态下重设密码
    path('reSetPwd', views.reSetPwd, name='reSetPwd'),
    # 上传用户信息
    path('putInfo', views.putInfo, name='putInfo'),
    # 获取用户信息
    path('getInfo', views.getInfo, name='getInfo'),

    # 获取一级标签列表
    path('getFirstLabelList', views.getFirstLabelList, name='getFirstLabelList'),
    # 获取一级标签列表
    path('getFirstLabelLists', views.getFirstLabelLists, name='getFirstLabelLists'),
    # 获取一级标签列表
    path('getSecondLabelList', views.getSecondLabelList, name='getSecondLabelList'),
    # 获取二级标签下工具列表
    path('getLabelToolList', views.getLabelToolList, name='getLabelToolList'),
    # 学生借出工具申请
    path('borrowRequest', views.borrowRequest, name='borrowRequest'),
    # 个人借出记录查看
    path('allBorrowList', views.allBorrowList, name='allBorrowList'),
    # 个人借出延期申请
    path('applyPostpone', views.applyPostpone, name='applyPostpone'),
    #个人撤销申请
    path('repealRequest',views.repealRequest, name='repealRequest'),
    # 搜索工具
    path('searchToolByName', views.searchToolByName, name='searchToolByName'),
    # 搜索工具
    path('searchLabelByName', views.searchLabelByName, name='searchLabelByName'),
    path('wx_Register', views.wx_Register, name='wx_Register'),
    path('hashLogin', views.hashLogin, name='hashLogin'),
]

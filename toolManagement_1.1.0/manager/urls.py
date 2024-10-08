from django.urls import path, re_path
from . import views

urlpatterns = [
    # 用户基础功能

    # 管理员添加教师账号
    path('RegisterTeacherAcc', views.RegisterTeacherAcc, name='register'),
    # 教师用户登录
    path('Login', views.Login, name='login'),
    path('login', views.Login, name='login'),

    path('forget/setPwd', views.setPwd, name='setPwd'),
    # 上传用户信息
    path('putInfo', views.putInfo, name='putInfo'),
    # 获取用户信息
    path('getInfo', views.getInfo, name='getInfo'),
    # 登录状态下重设密码
    path('reSetPwd', views.reSetPwd, name='reSetPwd'),
    # 获取教师申请注册列表
    path('getTeacherApproveList', views.getTeacherApproveList, name='getTeacherApproveList'),
    # 处理注册请求
    path('approveTeacher', views.approveTeacher, name='approveTeacher'),

    # 获取工具借用用户列表
    path('getToolUseList', views.getToolUseList, name='getToolUseList'),

    # 发送即将到期提醒
    path('sendExpirationReminder', views.sendExpirationReminder, name='sendExpirationReminder'),

    # 获取请求借出列表
    path('getToolRequestList', views.getToolRequestList, name='getToolRequestList'),
    # 处理借出请求
    path('approveBorrowRequest', views.approveBorrowRequest, name='approveBorrowRequest'),
    # 获取延期请求列表
    path('getPostponeRequestList', views.getPostponeRequestList, name='getPostponeRequestList'),
    # 处理延期请求
    path('approvePostponeRequest', views.approvePostponeRequest, name='approvePostponeRequest'),
    # 获取撤回申请列表
    path('getRepealRequestList', views.getRepealRequestList, name='getRepealRequestList'),
    # 获取所有待归还请求列表
    path('getAllNeedReturnList', views.getAllNeedReturnList, name='getAllNeedReturnList'),
    # 归还工具
    path('returnTool', views.returnTool, name='returnTool'),
    # 获取某个工具的借出记录
    path('toolRequestRecord', views.toolRequestRecord, name='toolRequestRecord'),
    # 确认工具是否有等待借出
    path('affirmWait', views.affirmWait, name='affirmWait'),
    path('imgText',views.imgText,name='imgText'),
    # 管理员添加一级标签
    path('addFirstLable', views.addFirstLable, name='addFirstLabel'),
    # 添加二级标签
    path('addSecondLable', views.addSecondLable, name='addSecondLable'),
    # 编辑标签名称
    path('editLabel', views.editLabel, name='editLabel'),
    # 上传标签图片
    path('putLabelImage', views.putLabelImage, name='putLabelImage'),
    # 删除标签
    path('deleteLabel', views.deleteLabel, name='deleteLabel'),
    # 新增工具
    path('createTool', views.createTool, name='createTool'),
    # 编辑工具
    path('editTool', views.editTool, name='editTool'),
    # 移动二级标签
    path('moveSecondLabel', views.moveSecondLabel, name='moveSecondLabel'),
    # 修改工具标签
    path('editToolLabel', views.editToolLabel, name='editToolLabel'),

    path('allBorrowList', views.allBorrowList, name='allBorrowList'),
    path('editTool1', views.editTool1, name='editTool1'),
    path('wxlogin', views.wxlogin, name='wxlogin'),
    path('wx_Register', views.wx_Register, name='wx_Register'),
    path('hashLogin', views.hashLogin, name='hashLogin'),
]

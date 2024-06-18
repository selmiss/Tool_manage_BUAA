# Tool_manage_BUAA
北航工程训练中心，工具管理平台

工训信息平台
 wechat appSecret:
848074b9ed6b0d0eed7fe08eb2602744

部署服务器位置： ssh root@121.4.160.157
密码：toolManagement@2022

前端访问链接：http://121.4.160.157:8080/
域名指向：selmiss.cn => 121.4.160.157

Nginx配置位置:
vim /usr/local/nginx/nginx.conf


用户名 
shichk@buaa.edu.cn
密码
824600

系统发邮件的邮箱:
buaatools2022@163.com
374985Abc

前端部署：
/usr/local/nginx/html/dist
scp -r dist root@121.4.160.157:/usr/local/nginx/html/dist

后端启动：
uwsgi 启动
不常用启动方式：(python manage.py runserver_plus 0.0.0.0:8000 --cert selmiss.xyz_bundle.crt --key-file selmiss.xyz.key)


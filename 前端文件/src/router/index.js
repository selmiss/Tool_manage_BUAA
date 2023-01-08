import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'StudentLogin',
    component: ()=>import('@/views/Entry/S_Entry.vue')
  },
  {
    path:'/ChangeInfo',
    name:'ChangeInfo',
    component: ()=>import('@/views/Entry/ChangeInfo.vue')
  },
  {
    path:'/ChangePwd',
    name:'ChangePwd',
    component: ()=>import('@/views/Entry/ChangePwd.vue')
  },
  {
    path:'/UserRecord',
    name:'UserRecord',
    component: ()=>import('@/views/manager_views/UserRecord.vue')
  },
  {
    path:'/TeacherRecord',
    name:'TeacherRecord',
    component: ()=>import('@/views/manager_views/TeacherRecord.vue')
  },
  {
    path:'/AllToolRecord',
    name:'AllToolRecord',
    component: ()=>import('@/views/manager_views/AllToolRecord.vue')
  },
  {
    path:'/teacherChangeInfo',
    name:'teacherChangeInfo',
    component: ()=>import('@/views/Entry/T_ChangeInfo.vue')
  },
  {
    path:'/teacherChangePwd',
    name:'teacherChangePwd',
    component: ()=>import('@/views/Entry/T_ChangePwd.vue')
  },
  {
    path:'/home',
    name:'Home',
    component: ()=>import('@/views/Home.vue')
  },
  {
    path:'/studentlogin',
    name:'StudentLogin',
    component: ()=>import('@/views/Entry/S_Entry.vue')
  },
  {
    path:'/teacherlogin',
    name:'TeacherLogin',
    component: ()=>import('@/views/Entry/T_Entry.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/borrowProcessing',
    name: 'BorrowProcessing.vue',
    component: () => import('../views/teacher_views/BorrowProcessing.vue')
  },
  {
    path: '/Repealapply',
    name: 'Repealapply.vue',
    component: () => import('../views/teacher_views/Repealapply.vue')
  },
  {
    path: '/messageProcessing',
    name: 'MessageProcessing.vue',
    component: () => import('../views/teacher_views/MessageProcessing.vue')
  },
  {
    path: '/toolRecord',
    name: 'ToolRecord',
    component: () => import('../views/teacher_views/ToolRecord.vue')
  },
  {
    path: '/addTeacher',
    name: 'AddTeacher',
    component: () => import('../views/manager_views/AddTeacher.vue')
  },
  {
    path: '/settools',
    name: 'ToolManagement',
    component: () => import('../views/teacher_views/ToolManage.vue')
  },
  {
    path: '/addtool',
    name: 'AddTool',
    component: () => import('@/views/Manage/AddTool.vue')
  },
  {
    path: '/teacherForgetPwd',
    name: 'TeacherForgetPwd',
    component: () => import('@/views/Entry/T_ForgetPwd.vue')
  },
  {
    path: '/studentForgetPwd',
    name: 'StudentForgetPwd',
    component: () => import('@/views/Entry/S_ForgetPwd.vue')
  },
  {
    path: '/borrowRecord',
    name: 'BorrowRecord',
    component: () => import('../views/student_views/BorrowRecord.vue')
  },
  {
    path:'/tools',
    name:'BorrowTools',
    component: () => import('@/views/student_views/BorrowTools.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

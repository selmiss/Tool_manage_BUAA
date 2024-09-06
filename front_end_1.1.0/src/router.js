import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/testlogin', component: () => import('@/components/myLogin.vue') },
  { path: '/t', component: () => import('@/views/fk.vue') },
  { path: '/', component: () => import('@/views/Entry/S_Entry.vue') },
  { path: '/ChangeInfo', component: () => import('@/views/Entry/ChangeInfo.vue') },
  { path: '/ChangePwd', component: () => import('@/views/Entry/ChangePwd.vue') },
  { path: '/teacherChangeInfo', component: () => import('@/views/Entry/T_ChangeInfo.vue') },
  { path: '/teacherChangePwd', component: () => import('@/views/Entry/T_ChangePwd.vue') },
  { path: '/teacherForgetPwd', component: () => import('@/views/Entry/T_ForgetPwd.vue') },
  { path: '/studentForgetPwd', component: () => import('@/views/Entry/S_ForgetPwd.vue') },
  { path: '/studentlogin', component: () => import('@/views/Entry/S_Entry.vue') },
  { path: '/teacherlogin', component: () => import('@/views/Entry/T_Entry.vue') },
  { path: '/UserRecord', component: () => import('@/views/teacher_views/UserRecord.vue') },
  { path: '/TeacherRecord', component: () => import('@/views/teacher_views/TeacherRecord.vue') },
  { path: '/AllToolRecord', component: () => import('@/views/teacher_views/AllToolRecord.vue') },
  { path: '/borrowProcessing', component: () => import('@/views/teacher_views/BorrowProcessing.vue') },
  { path: '/messageProcessing', component: () => import('@/views/teacher_views/MessageProcessing.vue') },
  { path: '/toolRecord', component: () => import('@/views/teacher_views/ToolRecord.vue') },
  { path: '/addTeacher', component: () => import('@/views/teacher_views/AddTeacher.vue') },
  { path: '/settools', component: () => import('@/views/teacher_views/ToolManage.vue') },
  { path: '/addtool', component: () => import('@/views/teacher_views/AddTool.vue') },
  { path: '/register_verify', component: () => import('@/views/teacher_views/RegisterVerify.vue') },
  { path: '/borrowRecord', component: () => import('@/views/student_views/BorrowRecord.vue') },
  { path: '/tools', component: () => import('@/views/student_views/BorrowTools.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})


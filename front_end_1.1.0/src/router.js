import { createRouter, createWebHistory } from 'vue-router'
// Vue.http.interceptors.push((request, next) => {
//   //请求发送前的处理逻辑
//   request.headers.set('Authorization', localStorage.getItem('token'))
//   next((response) => {
//       //请求发送后的处理逻辑
//       //根据请求的状态，response参数返回给successCallback或errorCallback
//       return response
//   })
// })
const routes = [
  { path: '/t', component: () => import('@/views/fk.vue') },
  { path: '/testlogin', component: () => import('@/components/myLogin.vue') },
  { path: '/', component: () => import('@/views/Entry/S_Entry.vue') },
  { path: '/ChangeInfo', component: () => import('@/views/Entry/ChangeInfo.vue') },
  { path: '/ChangePwd', component: () => import('@/views/Entry/ChangePwd.vue') },
  { path: '/UserRecord', component: () => import('@/views/manager_views/UserRecord.vue') },
  { path: '/TeacherRecord', component: () => import('@/views/manager_views/TeacherRecord.vue') },
  { path: '/AllToolRecord', component: () => import('@/views/manager_views/AllToolRecord.vue') },
  { path: '/teacherChangeInfo', component: () => import('@/views/Entry/T_ChangeInfo.vue') },
  { path: '/teacherChangePwd', component: () => import('@/views/Entry/T_ChangePwd.vue') },
  { path: '/home', component: () => import('@/views/Home.vue') },
  { path: '/studentlogin', component: () => import('@/views/Entry/S_Entry.vue') },
  { path: '/teacherlogin', component: () => import('@/views/Entry/T_Entry.vue') },
  { path: '/about', component: () => import('@/views/About.vue') },
  { path: '/borrowProcessing', component: () => import('@/views/teacher_views/BorrowProcessing.vue') },
  { path: '/messageProcessing', component: () => import('@/views/teacher_views/MessageProcessing.vue') },
  { path: '/toolRecord', component: () => import('@/views/teacher_views/ToolRecord.vue') },
  { path: '/addTeacher', component: () => import('@/views/manager_views/AddTeacher.vue') },
  { path: '/settools', component: () => import('@/views/teacher_views/ToolManage.vue') },
  { path: '/addtool', component: () => import('@/views/manager_views/AddTool.vue') },
  { path: '/teacherForgetPwd', component: () => import('@/views/Entry/T_ForgetPwd.vue') },
  { path: '/studentForgetPwd', component: () => import('@/views/Entry/S_ForgetPwd.vue') },
  { path: '/borrowRecord', component: () => import('@/views/student_views/BorrowRecord.vue') },
  { path: '/tools', component: () => import('@/views/student_views/BorrowTools.vue') },
  { path: '/register_verify', component: () => import('@/views/teacher_views/RegisterVerify.vue') },
]
// const routes = [
//   {
//     path:"/testlogin",
//     name: "loginOK",
//     component: ()=>import('@/components/myLogin.vue')
//   },
//   {
//     path:'/',
//     name:'StudentLogin',
//     component: ()=>import('./views/Entry/S_Entry.vue')
//   },
//   {
//     path:'/ChangeInfo',
//     name:'ChangeInfo',
//     component: ()=>import('@/views/Entry/ChangeInfo.vue')
//   },
//   {
//     path:'/ChangePwd',
//     name:'ChangePwd',
//     component: ()=>import('@/views/Entry/ChangePwd.vue')
//   },
//   {
//     path:'/UserRecord',
//     name:'UserRecord',
//     component: ()=>import('@/views/manager_views/UserRecord.vue')
//   },
//   {
//     path:'/TeacherRecord',
//     name:'TeacherRecord',
//     component: ()=>import('@/views/manager_views/TeacherRecord.vue')
//   },
//   {
//     path:'/AllToolRecord',
//     name:'AllToolRecord',
//     component: ()=>import('@/views/manager_views/AllToolRecord.vue')
//   },
//   {
//     path:'/teacherChangeInfo',
//     name:'teacherChangeInfo',
//     component: ()=>import('@/views/Entry/T_ChangeInfo.vue')
//   },
//   {
//     path:'/teacherChangePwd',
//     name:'teacherChangePwd',
//     component: ()=>import('@/views/Entry/T_ChangePwd.vue')
//   },
//   {
//     path:'/home',
//     name:'Home',
//     component: ()=>import('@/views/Home.vue')
//   },
//   {
//     path:'/studentlogin',
//     name:'StudentLogin2',
//     component: ()=>import('@/views/Entry/S_Entry.vue')
//   },
//   {
//     path:'/teacherlogin',
//     name:'TeacherLogin',
//     component: ()=>import('@/views/Entry/T_Entry.vue')
//   },
//   {
//     path: '/about',
//     name: 'About',
//     component: () => import('@/views/About.vue')
//   },
//   {
//     path: '/borrowProcessing',
//     name: 'BorrowProcessing.vue',
//     component: () => import('@/views/teacher_views/BorrowProcessing.vue')
//   },
//   {
//     path: '/messageProcessing',
//     name: 'MessageProcessing.vue',
//     component: () => import('@/views/teacher_views/MessageProcessing.vue')
//   },
//   {
//     path: '/toolRecord',
//     name: 'ToolRecord',
//     component: () => import('@/views/teacher_views/ToolRecord.vue')
//   },
//   {
//     path: '/addTeacher',
//     name: 'AddTeacher',
//     component: () => import('@/views/manager_views/AddTeacher.vue')
//   },
//   {
//     path: '/settools',
//     name: 'ToolManagement',
//     component: () => import('@/views/teacher_views/ToolManage.vue')
//   },
//   {
//     path: '/addtool',
//     name: 'AddTool',
//     component: () => import('@/views/Manage/AddTool.vue')
//   },
//   {
//     path: '/teacherForgetPwd',
//     name: 'TeacherForgetPwd',
//     component: () => import('@/views/Entry/T_ForgetPwd.vue')
//   },
//   {
//     path: '/studentForgetPwd',
//     name: 'StudentForgetPwd',
//     component: () => import('@/views/Entry/S_ForgetPwd.vue')
//   },
//   {
//     path: '/borrowRecord',
//     name: 'BorrowRecord',
//     component: () => import('@/views/student_views/BorrowRecord.vue')
//   },
//   {
//     path:'/tools',
//     name:'BorrowTools',
//     component: () => import('@/views/student_views/BorrowTools.vue')
//   },
// ]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})


"use strict";(self["webpackChunktoolmanagement"]=self["webpackChunktoolmanagement"]||[]).push([[285],{6565:function(e,t,a){a.d(t,{A:function(){return c}});var n=a(285),l=a(9132);const r={style:{color:"white"}};function o(e,t,a,o,s,i){const d=(0,n.g2)("el-image"),u=(0,n.g2)("el-dropdown-item"),c=(0,n.g2)("el-dropdown-menu"),k=(0,n.g2)("el-dropdown"),h=(0,n.g2)("el-header"),g=(0,n.g2)("el-container");return(0,n.uX)(),(0,n.Wv)(g,null,{default:(0,n.k6)((()=>[(0,n.bF)(h,{class:"bg-gradient-to-r from-orange-400 to-amber-800 flex items-center justify-between cursor-pointer"},{default:(0,n.k6)((()=>[(0,n.bF)(d,{class:"h-full p-1",src:s.headerLogo,onClick:i.toMain},null,8,["src","onClick"]),(0,n.bF)(k,null,{dropdown:(0,n.k6)((()=>[(0,n.bF)(c,null,{default:(0,n.k6)((()=>[(0,n.bF)(u,{icon:"edit"},{default:(0,n.k6)((()=>[(0,n.Lk)("span",{onClick:t[0]||(t[0]=(...e)=>i.changePwd&&i.changePwd(...e)),style:{cursor:"pointer"}},"修改密码")])),_:1}),(0,n.bF)(u,{icon:"edit"},{default:(0,n.k6)((()=>[(0,n.Lk)("span",{onClick:t[1]||(t[1]=(...e)=>i.changeInfo&&i.changeInfo(...e)),style:{cursor:"pointer"}},"个人信息")])),_:1}),(0,n.bF)(u,{icon:"fold"},{default:(0,n.k6)((()=>[(0,n.Lk)("span",{onClick:t[2]||(t[2]=(...e)=>i.logout&&i.logout(...e)),style:{cursor:"pointer"}},"退出登录")])),_:1})])),_:1})])),default:(0,n.k6)((()=>[(0,n.Lk)("span",r,(0,l.v_)(this.mail),1)])),_:1})])),_:1})])),_:1})}a(9138);var s=a(4794),i={name:"teacherheadbar",data(){return{mail:localStorage.getItem("Mail"),headerLogo:s}},methods:{logout(){this.$router.push("/teacherLogin"),localStorage.setItem("Mail",null),localStorage.setItem("token","wutoken")},changeInfo(){this.$router.push("/teacherChangeInfo")},changePwd(){this.$router.push("/teacherChangePwd")},toMain(){this.$router.push("/borrowProcessing")}}},d=a(4307);const u=(0,d.A)(i,[["render",o]]);var c=u},358:function(e,t,a){a.d(t,{A:function(){return u}});var n=a(285);const l={style:{display:"flex"}},r={style:{"min-width":"200px"}};function o(e,t,a,o,s,i){const d=(0,n.g2)("el-icon"),u=(0,n.g2)("el-menu-item"),c=(0,n.g2)("el-sub-menu"),k=(0,n.g2)("el-menu"),h=(0,n.g2)("router-view");return(0,n.uX)(),(0,n.CE)("div",l,[(0,n.Lk)("div",r,[(0,n.bF)(k,{class:"el-menu-vertical-demo","active-text-color":"#a6dcff",router:""},{default:(0,n.k6)((()=>[(0,n.bF)(c,{index:"1"},{title:(0,n.k6)((()=>[(0,n.bF)(d,{class:"el-icon-s-promotion"}),t[0]||(t[0]=(0,n.eW)("审批管理"))])),default:(0,n.k6)((()=>[this.isSuperUser?((0,n.uX)(),(0,n.Wv)(u,{key:0,index:"/borrowProcessing"},{default:(0,n.k6)((()=>t[1]||(t[1]=[(0,n.Lk)("span",{slot:"title"},"借用审批",-1)]))),_:1})):(0,n.Q3)("",!0),this.isSuperUser?((0,n.uX)(),(0,n.Wv)(u,{key:1,index:"/messageProcessing"},{default:(0,n.k6)((()=>t[2]||(t[2]=[(0,n.Lk)("span",{slot:"title"},"延期审批",-1)]))),_:1})):(0,n.Q3)("",!0),this.isSuperUser?((0,n.uX)(),(0,n.Wv)(u,{key:2,index:"/toolRecord"},{default:(0,n.k6)((()=>t[3]||(t[3]=[(0,n.Lk)("span",{slot:"title"},"归还审批",-1)]))),_:1})):(0,n.Q3)("",!0)])),_:1}),(0,n.bF)(c,{index:"2"},{title:(0,n.k6)((()=>[(0,n.bF)(d,{class:"el-icon-s-order"}),t[4]||(t[4]=(0,n.eW)("用户管理"))])),default:(0,n.k6)((()=>[this.isSuperUser?((0,n.uX)(),(0,n.Wv)(u,{key:0,index:"/addTeacher"},{default:(0,n.k6)((()=>t[5]||(t[5]=[(0,n.Lk)("span",{slot:"title"},"添加教师",-1)]))),_:1})):(0,n.Q3)("",!0),this.isSuperUser?((0,n.uX)(),(0,n.Wv)(u,{key:1,index:"/UserRecord"},{default:(0,n.k6)((()=>t[6]||(t[6]=[(0,n.Lk)("span",{slot:"title"},"学生列表",-1)]))),_:1})):(0,n.Q3)("",!0),this.isSuperUser?((0,n.uX)(),(0,n.Wv)(u,{key:2,index:"/TeacherRecord"},{default:(0,n.k6)((()=>t[7]||(t[7]=[(0,n.Lk)("span",{slot:"title"},"教师列表",-1)]))),_:1})):(0,n.Q3)("",!0),this.isSuperUser?((0,n.uX)(),(0,n.Wv)(u,{key:3,index:"/register_verify"},{default:(0,n.k6)((()=>t[8]||(t[8]=[(0,n.Lk)("span",{slot:"title"},"学生注册",-1)]))),_:1})):(0,n.Q3)("",!0)])),_:1}),(0,n.bF)(c,{index:"3"},{title:(0,n.k6)((()=>[(0,n.bF)(d,{class:"el-icon-setting"}),t[9]||(t[9]=(0,n.eW)("工具管理"))])),default:(0,n.k6)((()=>[this.isSuperUser?((0,n.uX)(),(0,n.Wv)(u,{key:0,index:"/AllToolRecord"},{default:(0,n.k6)((()=>t[10]||(t[10]=[(0,n.Lk)("span",{slot:"title"},"工具列表",-1)]))),_:1})):(0,n.Q3)("",!0),(0,n.bF)(u,{index:"/addtool"},{default:(0,n.k6)((()=>t[11]||(t[11]=[(0,n.Lk)("span",{slot:"title"},"新增工具",-1)]))),_:1}),(0,n.bF)(u,{index:"/settools"},{default:(0,n.k6)((()=>t[12]||(t[12]=[(0,n.Lk)("span",{slot:"title"},"编辑工具",-1)]))),_:1})])),_:1})])),_:1})]),(0,n.Lk)("div",null,[(0,n.bF)(h)])])}var s={name:"teachermenu",mounted(){this.loadIsSuperUser()},data(){return{isSuperUser:!0}},methods:{loadIsSuperUser(){"false"==localStorage.getItem("isSuperUser")&&(this.isSuperUser=!1)}}},i=a(4307);const d=(0,i.A)(s,[["render",o]]);var u=d},6285:function(e,t,a){a.r(t),a.d(t,{default:function(){return h}});var n=a(285);const l={style:{margin:"0 auto","margin-top":"20px","align-items":"center"}};function r(e,t,a,r,o,s){const i=(0,n.g2)("TeacherHeadBar"),d=(0,n.g2)("TeacherMenu"),u=(0,n.g2)("el-aside"),c=(0,n.g2)("el-table-column"),k=(0,n.g2)("el-button"),h=(0,n.g2)("el-table"),g=(0,n.g2)("el-card"),p=(0,n.g2)("el-main"),f=(0,n.g2)("el-container");return(0,n.uX)(),(0,n.CE)("div",null,[(0,n.bF)(i),(0,n.bF)(f,null,{default:(0,n.k6)((()=>[(0,n.bF)(u,{width:"20%",style:{"min-height":"600px"}},{default:(0,n.k6)((()=>[(0,n.bF)(d)])),_:1}),(0,n.bF)(p,{width:"75%"},{default:(0,n.k6)((()=>[t[1]||(t[1]=(0,n.Lk)("div",{class:"title",style:{"margin-top":"20px"}},"教师信息表",-1)),(0,n.Lk)("div",l,[(0,n.bF)(g,{class:"box-card",style:{width:"80%"}},{default:(0,n.k6)((()=>[(0,n.bF)(h,{data:o.tableData,style:{width:"100%"},border:""},{default:(0,n.k6)((()=>[(0,n.bF)(c,{type:"index",align:"center"}),(0,n.bF)(c,{align:"center",prop:"name",label:"教师姓名","min-width":"50"}),(0,n.bF)(c,{align:"center",prop:"phone",label:"手机号","min-width":"80"}),(0,n.bF)(c,{align:"center",prop:"teacher_id",label:"工号","min-width":"60"}),(0,n.bF)(c,{align:"center",label:"操作","min-width":"60"},{default:(0,n.k6)((e=>[(0,n.bF)(k,{type:"danger",plain:"",onClick:t=>s.deleteTeacher(e.row)},{default:(0,n.k6)((()=>t[0]||(t[0]=[(0,n.eW)("删除教师")]))),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])])),_:1})])])),_:1}),(0,n.bF)(u,{width:"5%"})])),_:1})])}var o=a(6565),s=a(358),i=a(9093),d=a(7164),u={components:{TeacherHeadBar:o.A,TeacherMenu:s.A},inject:["reload"],mounted(){this.loadData()},data(){return{tableData:[]}},methods:{deleteTeacher(e){d.A.delete("managers/"+e.id).then((e=>{i.nk.success(e.data.msg),this.reload()})).catch((e=>{i.nk.error(e)}))},loadData(){d.A.get("managers").then((e=>{this.tableData=e.data.data,i.nk.success(e.data.msg)})).catch((e=>{i.nk.error(e)}))}}},c=a(4307);const k=(0,c.A)(u,[["render",r],["__scopeId","data-v-3f691842"]]);var h=k},4794:function(e,t,a){e.exports=a.p+"img/headerLogo.d1c84d2a.png"}}]);
//# sourceMappingURL=285.af08beed.js.map
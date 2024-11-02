"use strict";(self["webpackChunktoolmanagement"]=self["webpackChunktoolmanagement"]||[]).push([[823],{6565:function(e,t,a){a.d(t,{A:function(){return c}});var l=a(285),r=a(9132);const n={style:{color:"white"}};function i(e,t,a,i,o,s){const d=(0,l.g2)("el-image"),u=(0,l.g2)("el-dropdown-item"),c=(0,l.g2)("el-dropdown-menu"),g=(0,l.g2)("el-dropdown"),k=(0,l.g2)("el-header"),p=(0,l.g2)("el-container");return(0,l.uX)(),(0,l.Wv)(p,null,{default:(0,l.k6)((()=>[(0,l.bF)(k,{class:"bg-gradient-to-r from-orange-400 to-amber-800 flex items-center justify-between cursor-pointer"},{default:(0,l.k6)((()=>[(0,l.bF)(d,{class:"h-full p-1",src:o.headerLogo,onClick:s.toMain},null,8,["src","onClick"]),(0,l.bF)(g,null,{dropdown:(0,l.k6)((()=>[(0,l.bF)(c,null,{default:(0,l.k6)((()=>[(0,l.bF)(u,{icon:"edit"},{default:(0,l.k6)((()=>[(0,l.Lk)("span",{onClick:t[0]||(t[0]=(...e)=>s.changePwd&&s.changePwd(...e)),style:{cursor:"pointer"}},"修改密码")])),_:1}),(0,l.bF)(u,{icon:"edit"},{default:(0,l.k6)((()=>[(0,l.Lk)("span",{onClick:t[1]||(t[1]=(...e)=>s.changeInfo&&s.changeInfo(...e)),style:{cursor:"pointer"}},"个人信息")])),_:1}),(0,l.bF)(u,{icon:"fold"},{default:(0,l.k6)((()=>[(0,l.Lk)("span",{onClick:t[2]||(t[2]=(...e)=>s.logout&&s.logout(...e)),style:{cursor:"pointer"}},"退出登录")])),_:1})])),_:1})])),default:(0,l.k6)((()=>[(0,l.Lk)("span",n,(0,r.v_)(this.mail),1)])),_:1})])),_:1})])),_:1})}a(9138);var o=a(4794),s={name:"teacherheadbar",data(){return{mail:localStorage.getItem("Mail"),headerLogo:o}},methods:{logout(){this.$router.push("/teacherLogin"),localStorage.setItem("Mail",null),localStorage.setItem("token","wutoken")},changeInfo(){this.$router.push("/teacherChangeInfo")},changePwd(){this.$router.push("/teacherChangePwd")},toMain(){this.$router.push("/borrowProcessing")}}},d=a(4307);const u=(0,d.A)(s,[["render",i]]);var c=u},358:function(e,t,a){a.d(t,{A:function(){return u}});var l=a(285);const r={style:{display:"flex"}},n={style:{"min-width":"200px"}};function i(e,t,a,i,o,s){const d=(0,l.g2)("el-icon"),u=(0,l.g2)("el-menu-item"),c=(0,l.g2)("el-sub-menu"),g=(0,l.g2)("el-menu"),k=(0,l.g2)("router-view");return(0,l.uX)(),(0,l.CE)("div",r,[(0,l.Lk)("div",n,[(0,l.bF)(g,{class:"el-menu-vertical-demo","active-text-color":"#a6dcff",router:""},{default:(0,l.k6)((()=>[(0,l.bF)(c,{index:"1"},{title:(0,l.k6)((()=>[(0,l.bF)(d,{class:"el-icon-s-promotion"}),t[0]||(t[0]=(0,l.eW)("审批管理"))])),default:(0,l.k6)((()=>[this.isSuperUser?((0,l.uX)(),(0,l.Wv)(u,{key:0,index:"/borrowProcessing"},{default:(0,l.k6)((()=>t[1]||(t[1]=[(0,l.Lk)("span",{slot:"title"},"借用审批",-1)]))),_:1})):(0,l.Q3)("",!0),this.isSuperUser?((0,l.uX)(),(0,l.Wv)(u,{key:1,index:"/messageProcessing"},{default:(0,l.k6)((()=>t[2]||(t[2]=[(0,l.Lk)("span",{slot:"title"},"延期审批",-1)]))),_:1})):(0,l.Q3)("",!0),this.isSuperUser?((0,l.uX)(),(0,l.Wv)(u,{key:2,index:"/toolRecord"},{default:(0,l.k6)((()=>t[3]||(t[3]=[(0,l.Lk)("span",{slot:"title"},"归还审批",-1)]))),_:1})):(0,l.Q3)("",!0)])),_:1}),(0,l.bF)(c,{index:"2"},{title:(0,l.k6)((()=>[(0,l.bF)(d,{class:"el-icon-s-order"}),t[4]||(t[4]=(0,l.eW)("用户管理"))])),default:(0,l.k6)((()=>[this.isSuperUser?((0,l.uX)(),(0,l.Wv)(u,{key:0,index:"/addTeacher"},{default:(0,l.k6)((()=>t[5]||(t[5]=[(0,l.Lk)("span",{slot:"title"},"添加教师",-1)]))),_:1})):(0,l.Q3)("",!0),this.isSuperUser?((0,l.uX)(),(0,l.Wv)(u,{key:1,index:"/UserRecord"},{default:(0,l.k6)((()=>t[6]||(t[6]=[(0,l.Lk)("span",{slot:"title"},"学生列表",-1)]))),_:1})):(0,l.Q3)("",!0),this.isSuperUser?((0,l.uX)(),(0,l.Wv)(u,{key:2,index:"/TeacherRecord"},{default:(0,l.k6)((()=>t[7]||(t[7]=[(0,l.Lk)("span",{slot:"title"},"教师列表",-1)]))),_:1})):(0,l.Q3)("",!0),this.isSuperUser?((0,l.uX)(),(0,l.Wv)(u,{key:3,index:"/register_verify"},{default:(0,l.k6)((()=>t[8]||(t[8]=[(0,l.Lk)("span",{slot:"title"},"学生注册",-1)]))),_:1})):(0,l.Q3)("",!0)])),_:1}),(0,l.bF)(c,{index:"3"},{title:(0,l.k6)((()=>[(0,l.bF)(d,{class:"el-icon-setting"}),t[9]||(t[9]=(0,l.eW)("工具管理"))])),default:(0,l.k6)((()=>[this.isSuperUser?((0,l.uX)(),(0,l.Wv)(u,{key:0,index:"/AllToolRecord"},{default:(0,l.k6)((()=>t[10]||(t[10]=[(0,l.Lk)("span",{slot:"title"},"工具列表",-1)]))),_:1})):(0,l.Q3)("",!0),(0,l.bF)(u,{index:"/addtool"},{default:(0,l.k6)((()=>t[11]||(t[11]=[(0,l.Lk)("span",{slot:"title"},"新增工具",-1)]))),_:1}),(0,l.bF)(u,{index:"/settools"},{default:(0,l.k6)((()=>t[12]||(t[12]=[(0,l.Lk)("span",{slot:"title"},"编辑工具",-1)]))),_:1})])),_:1})])),_:1})]),(0,l.Lk)("div",null,[(0,l.bF)(k)])])}var o={name:"teachermenu",mounted(){this.loadIsSuperUser()},data(){return{isSuperUser:!0}},methods:{loadIsSuperUser(){"false"==localStorage.getItem("isSuperUser")&&(this.isSuperUser=!1)}}},s=a(4307);const d=(0,s.A)(o,[["render",i]]);var u=d},5823:function(e,t,a){a.r(t),a.d(t,{default:function(){return p}});var l=a(285);const r={style:{margin:"0 auto","margin-top":"20px","align-items":"center"}},n={style:{margin:"0 auto","align-items":"center"}};function i(e,t,a,i,o,s){const d=(0,l.g2)("TeacherHeadBar"),u=(0,l.g2)("TeacherMenu"),c=(0,l.g2)("el-aside"),g=(0,l.g2)("el-table-column"),k=(0,l.g2)("el-button"),p=(0,l.g2)("el-table"),h=(0,l.g2)("el-card"),m=(0,l.g2)("el-dialog"),b=(0,l.g2)("el-main"),f=(0,l.g2)("el-container");return(0,l.uX)(),(0,l.CE)("div",null,[(0,l.bF)(d),(0,l.bF)(f,null,{default:(0,l.k6)((()=>[(0,l.bF)(c,{width:"20%",style:{"min-height":"600px"}},{default:(0,l.k6)((()=>[(0,l.bF)(u)])),_:1}),(0,l.bF)(b,{width:"75%"},{default:(0,l.k6)((()=>[t[8]||(t[8]=(0,l.Lk)("div",{class:"title",style:{"margin-top":"20px"}},"用户记录表",-1)),(0,l.Lk)("div",r,[(0,l.bF)(h,{class:"box-card",style:{width:"80%"}},{default:(0,l.k6)((()=>[(0,l.bF)(p,{data:o.tableData,style:{width:"100%"},border:""},{default:(0,l.k6)((()=>[(0,l.bF)(g,{type:"index",align:"center"}),(0,l.bF)(g,{align:"center",prop:"name",label:"用户名","min-width":"50"}),(0,l.bF)(g,{align:"center",prop:"phone",label:"手机号","min-width":"80"}),(0,l.bF)(g,{align:"center",prop:"student_id",label:"学号","min-width":"60"}),(0,l.bF)(g,{align:"center",prop:"college",label:"学院","min-width":"50"}),(0,l.bF)(g,{align:"center",label:"操作","min-width":"160"},{default:(0,l.k6)((e=>[(0,l.bF)(k,{type:"primary",plain:"",onClick:t=>s.handleCreate(e.row)},{default:(0,l.k6)((()=>t[1]||(t[1]=[(0,l.eW)("查看记录")]))),_:2},1032,["onClick"]),(0,l.bF)(k,{type:"danger",plain:"",onClick:t=>s.deleteUser(e.row)},{default:(0,l.k6)((()=>t[2]||(t[2]=[(0,l.eW)("删除用户")]))),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"]),(0,l.bF)(m,{modelValue:o.dialogFormVisible,"onUpdate:modelValue":t[0]||(t[0]=e=>o.dialogFormVisible=e)},{default:(0,l.k6)((()=>[t[7]||(t[7]=(0,l.Lk)("div",{class:"title",style:{"margin-top":"0px"}},"工具借用记录表",-1)),(0,l.Lk)("div",n,[(0,l.bF)(h,{class:"box-card",style:{width:"80%"}},{default:(0,l.k6)((()=>[(0,l.bF)(p,{data:o.tableRecordData,style:{width:"100%"},border:""},{default:(0,l.k6)((()=>[(0,l.bF)(g,{align:"center",prop:"toolName",label:"工具名称","min-width":"120"}),(0,l.bF)(g,{align:"center",prop:"startTime",label:"借用开始时间","min-width":"100"}),(0,l.bF)(g,{align:"center",prop:"returnTime",label:"最晚归还时间","min-width":"100"}),(0,l.bF)(g,{align:"center",label:"状态","min-width":"120"},{default:(0,l.k6)((e=>["A"===e.row.status?((0,l.uX)(),(0,l.Wv)(k,{key:0,size:"mini",type:"warning"},{default:(0,l.k6)((()=>t[3]||(t[3]=[(0,l.eW)("工具借用中")]))),_:1})):(0,l.Q3)("",!0),"W"===e.row.status?((0,l.uX)(),(0,l.Wv)(k,{key:1,size:"mini",type:"primary"},{default:(0,l.k6)((()=>t[4]||(t[4]=[(0,l.eW)("等待审核中")]))),_:1})):(0,l.Q3)("",!0),"R"===e.row.status?((0,l.uX)(),(0,l.Wv)(k,{key:2,size:"mini",type:"danger"},{default:(0,l.k6)((()=>t[5]||(t[5]=[(0,l.eW)("申请被拒绝")]))),_:1})):(0,l.Q3)("",!0),"F"===e.row.status?((0,l.uX)(),(0,l.Wv)(k,{key:3,size:"mini",type:"success"},{default:(0,l.k6)((()=>t[6]||(t[6]=[(0,l.eW)("工具已归还")]))),_:1})):(0,l.Q3)("",!0)])),_:1})])),_:1},8,["data"])])),_:1})])])),_:1},8,["modelValue"])])),_:1})])])),_:1}),(0,l.bF)(c,{width:"5%"})])),_:1})])}var o=a(6565),s=a(358),d=a(7164),u=a(9093),c={components:{TeacherHeadBar:o.A,TeacherMenu:s.A},inject:["reload"],mounted(){this.loadData()},data(){return{dialogFormVisible:!1,tableRecordData:[{toolName:"",startTime:"",returnTime:"",requestId:"",status:""}],tableData:[{id:"",name:"",phone:"",college:"",student_id:"",email:""}]}},methods:{handleCreate(e){this.dialogFormVisible=!0,this.tableRecordData=[];let t=this;console.log(e.id),(0,d.A)({url:"manager/allBorrowList",method:"post",data:{uid:-2,stu_uid:e.id}}).then((a=>{a?0===a.data.error_code?(console.log("获取成功",a.data),t.tableRecordData=a.data.requestList):(console.log("获取失败"+a.data),alert(e.uid+" 获取失败,error: "+a.data.error_code)):(console.log("获取失败"+a.data),alert("获取失败，请检查网络"))}))},deleteUser(e){var t=e.id;d.A.delete("users/"+t).then((e=>{u.nk.success(e.data.msg),this.reload()})).catch((e=>{u.nk.error(e)}))},loadData(){d.A.get("users").then((e=>{this.tableData=e.data.data,u.nk.success(e.data.msg)})).catch((e=>{u.nk.error(e)}))}}},g=a(4307);const k=(0,g.A)(c,[["render",i],["__scopeId","data-v-8da7aa58"]]);var p=k},4794:function(e,t,a){e.exports=a.p+"img/headerLogo.d1c84d2a.png"}}]);
//# sourceMappingURL=823.c36d3bc0.js.map
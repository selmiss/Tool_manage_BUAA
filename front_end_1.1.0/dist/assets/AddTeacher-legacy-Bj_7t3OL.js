System.register(["./TeacherHeadBar-legacy-DRjSC2e9.js","./TeacherMenu-legacy-BuVDBrI3.js","./index-legacy-D4Q9cYOW.js","./headerLogo-legacy-B2ju6UB-.js"],(function(e,a){"use strict";var t,l,o,r,d,n,c,i,s,h,u,g,p;return{setters:[e=>{t=e.T},e=>{l=e.T},e=>{o=e._,r=e.a,d=e.r,n=e.c,c=e.h,i=e.i,s=e.o,h=e.b,u=e.e,g=e.p,p=e.g},null],execute:function(){var a=document.createElement("style");a.textContent=".box-card[data-v-dfe15098]{margin-left:100px}.title[data-v-dfe15098]{color:#cc7a00;margin-bottom:40px;font-family:微软雅黑;word-wrap:break-word;font-size:25px;font-weight:700}\n",document.head.appendChild(a);const m={inject:["reload"],components:{TeacherHeadBar:t,TeacherMenu:l},mounted(){this.loadTable()},data:()=>({tchData:[{name:"",teacherId:"",acc:"",uid:""}]}),methods:{loadTable(){r({method:"post",url:"/manager/getTeacherApproveList",data:{}}).then((e=>{e&&0===e.data.error_code?(console.log("获取成功",e.data),this.tchData=e.data.dataList):(console.log("获取失败"+e.data),alert("获取失败，请检查网络"))}))},handleAgree(e,a){console.log(e,a),r.post("manager/approveTeacher",{uid:localStorage.getItem("uid"),teacherId:a.uid,status:"Accept"}).then((e=>{e?0===e.data.error_code?(console.log("已添加该教师"),alert("已添加该教师"),this.reload()):(console.log("审批失败"+e.data),alert("error"+e.data.error_code)):(console.log("审批失败，请检查网络"+e.data),alert("审批失败，请检查网络"))}))},handleRefuse(e,a){console.log(e,a),r({url:"manager/approveTeacher",method:"post",data:{uid:localStorage.getItem("uid"),teacherId:a.uid,status:"Refuse"}}).then((e=>{e?0===e.data.error_code?(console.log("已拒绝该申请",e.data),alert("已拒绝该申请"),this.reload()):(console.log("审批失败"+e.data),alert("error"+e.data.error_code)):(console.log("审批失败，请检查网络"+e.data),alert("审批失败，请检查网络"))}))}}},f=(e=>(g("data-v-dfe15098"),e=e(),p(),e))((()=>h("div",{class:"title"},"教师添加",-1))),_={style:{margin:"0 auto","margin-top":"20px","align-items":"center"}};e("default",o(m,[["render",function(e,a,t,l,o,r){const g=d("TeacherHeadBar"),p=d("TeacherMenu"),m=d("el-aside"),b=d("el-table-column"),w=d("el-button"),y=d("el-table"),T=d("el-card"),v=d("el-main"),x=d("el-container");return s(),n("div",null,[c(g),c(x,null,{default:i((()=>[c(m,{width:"20%",style:{"min-height":"600px"}},{default:i((()=>[c(p)])),_:1}),c(v,{width:"75%"},{default:i((()=>[f,h("div",_,[c(T,{class:"box-card",style:{width:"90%"}},{default:i((()=>[c(y,{data:o.tchData,style:{width:"100%"},border:""},{default:i((()=>[c(b,{align:"center",prop:"name",label:"教师信息","min-width":"150"}),c(b,{align:"center",prop:"teacherId",label:"工号","min-width":"170"}),c(b,{align:"center",prop:"acc",label:"邮箱","min-width":"170"}),c(b,{align:"center",label:"操作","min-width":"200"},{default:i((e=>[c(w,{size:"mini",type:"success",plain:"",onClick:a=>r.handleAgree(e.$index,e.row)},{default:i((()=>[u("同意添加")])),_:2},1032,["onClick"]),c(w,{size:"mini",type:"danger",plain:"",onClick:a=>r.handleRefuse(e.$index,e.row)},{default:i((()=>[u("拒绝添加")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])])),_:1})])])),_:1}),c(m,{width:"5%"})])),_:1})])}],["__scopeId","data-v-dfe15098"]]))}}}));

(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-68cf7f18"],{"5d47":function(e,t,r){},"64bf":function(e,t,r){"use strict";r("5d47")},9723:function(e,t,r){"use strict";r("f7bf")},a09a:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e._self._c;return t("div",[t("TeacherHeadBar"),t("el-container",[t("el-aside",{staticStyle:{"min-height":"600px"},attrs:{width:"20%"}},[t("TeacherMenu")],1),t("el-main",{attrs:{width:"75%"}},[t("div",{staticClass:"title"},[e._v("待审批借用申请")]),t("div",{staticStyle:{margin:"0 auto","margin-top":"20px","align-items":"center"}},[t("el-card",{staticClass:"box-card",staticStyle:{width:"100%"}},[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.borrowList,border:""}},[t("el-table-column",{attrs:{align:"center",prop:"toolName",label:"工具名称","min-width":"110"}}),t("el-table-column",{attrs:{align:"center",prop:"borrowCount",label:"借用数量","min-width":"110"}}),t("el-table-column",{attrs:{align:"center",label:"借用者信息","min-width":"110"},scopedSlots:e._u([{key:"default",fn:function(r){return[t("el-popover",{attrs:{placement:"bottom",width:"250",trigger:"hover"}},[t("div",[e._v(e._s(r.row.requestUserName)+"       "+e._s(r.row.stuid))]),t("div",[e._v("学院:         "+e._s(r.row.stuCollege))]),t("div",[e._v("联系邮箱:  "+e._s(r.row.stuEmail))]),t("div",[e._v("联系电话:  "+e._s(r.row.phoneNumber))]),t("el-button",{attrs:{slot:"reference",size:"mini"},slot:"reference"},[e._v(e._s(r.row.requestUserName))])],1)]}}])}),t("el-table-column",{attrs:{align:"center",prop:"startTime",label:"借用开始时间","min-width":"100"}}),t("el-table-column",{attrs:{align:"center",prop:"returnTime",label:"原定归还时间","min-width":"100"}}),t("el-table-column",{attrs:{align:"center",label:"操作","min-width":"180"},scopedSlots:e._u([{key:"default",fn:function(r){return[t("el-popover",{attrs:{placement:"left",width:"250",trigger:"click"}},[t("div",[e._v("借用目的: "+e._s(r.row.purpose)+":")]),t("el-button",{staticStyle:{"margin-right":"10px"},attrs:{slot:"reference",size:"mini",plain:"",type:"primary"},slot:"reference"},[e._v("查看目的")])],1),t("el-button",{attrs:{size:"mini",type:"success",plain:""},on:{click:function(t){return e.handleCreate2(r.row)}}},[e._v("同意借出")]),t("el-button",{attrs:{size:"mini",type:"danger",plain:""},on:{click:function(t){return e.handleCreate(r.row)}}},[e._v("拒绝借出")]),t("el-dialog",{attrs:{visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[t("el-form",{ref:"dataForm",staticStyle:{width:"300px","margin-left":"50px"},attrs:{model:e.formData,"label-position":"left","label-width":"80px"}},[t("el-form-item",{attrs:{label:"拒绝原因"}},[t("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入拒绝原因"},model:{value:e.formData.refuseReason,callback:function(t){e.$set(e.formData,"refuseReason",t)},expression:"formData.refuseReason"}})],1)],1),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleRefuse(r.$index)}}},[e._v("拒绝")])],1)],1),t("el-dialog",{attrs:{visible:e.dialogFormVisible2},on:{"update:visible":function(t){e.dialogFormVisible2=t}}},[t("el-form",{ref:"dataForm",staticStyle:{width:"600px","margin-left":"50px"},attrs:{model:e.formAgree,"label-position":"left","label-width":"120px",align:"left"}},[t("el-form-item",{attrs:{label:"领取工具日期"}},[[t("el-date-picker",{attrs:{format:"yyyy年MM月dd日","value-format":"yyyy-MM-dd",align:"left",type:"date",placeholder:"选择日期","picker-options":e.pickerOptions},model:{value:e.formAgree.getDate,callback:function(t){e.$set(e.formAgree,"getDate",t)},expression:"formAgree.getDate"}})]],2),t("el-form-item",{attrs:{label:"领取工具时间"}},[[t("el-time-select",{attrs:{placeholder:"起始时间","picker-options":{start:"08:30",step:"00:30",end:"18:30"}},model:{value:e.startTime,callback:function(t){e.startTime=t},expression:"startTime"}}),t("el-time-select",{attrs:{placeholder:"结束时间","picker-options":{start:"08:30",step:"00:30",end:"22:30",minTime:e.startTime}},model:{value:e.endTime,callback:function(t){e.endTime=t},expression:"endTime"}})]],2),t("el-form-item",{attrs:{label:"领取工具地点"}},[t("el-input",{staticStyle:{width:"90%"},attrs:{type:"textarea",rows:1,placeholder:"请输入领取工具地点"},model:{value:e.formAgree.address,callback:function(t){e.$set(e.formAgree,"address",t)},expression:"formAgree.address"}})],1)],1),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.dialogFormVisible2=!1}}},[e._v("取消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleAgree(r.$index)}}},[e._v("借出")])],1)],1)]}}])})],1)],1)],1)]),t("el-aside",{attrs:{width:"5%"}})],1)],1)},o=[],s=r("8aad"),l=r.n(s),i=r("f18d"),n=r("cb7d"),d={inject:["reload"],components:{TeacherHeadBar:i["a"],TeacherMenu:n["a"]},mounted(){this.loadMessage()},data(){return{startTime:"",endTime:"",dialogFormVisible:!1,dialogFormVisible2:!1,formData:{refuseReason:""},formAgree:{address:"",getDate:""},borrowList:[{toolName:"",requestUserName:"",startTime:"",borrowTime:"",returnTime:"",stuid:"",stuCollege:"",userId:"",phoneNumber:"",purpose:"",stuEmail:"",borrowCount:""}],rowStore:null}},methods:{handleCreate(e){this.rowStore=e,this.formData={refuseReason:""},this.dialogFormVisible=!0},handleCreate2(e){this.rowStore=e,this.formAgree={address:"工程训练中心南208"},this.dialogFormVisible2=!0},handleAgree(e){var t=this.rowStore;console.log(e,t),l()({url:"manager/approveBorrowRequest",method:"post",data:{requestId:t.requestId,status:"Accept",isChangeTime:"false",changeTime:"",refuseReason:"",getDate:this.formAgree.getDate,startTime:this.startTime,endTime:this.endTime,address:this.formAgree.address}}).then(e=>{e?0===e.data.error_code?(console.log("已同意借用申请",e.data),alert("已同意该同学的借用申请，该设备最晚于"+t.returnTime+"归还"),this.reload()):5===e.data.error_code?alert("该设备数量不足，请拒绝该申请！"):(console.log("审批失败"+e.data),alert("error: "+e.data.error_code)):(console.log("error"+e.data),alert("error"+e.data.error_code))})},handleRefuse(e){var t=this.rowStore;console.log(this.formData.refuseReason),l()({url:"manager/approveBorrowRequest",method:"post",data:{requestId:t.requestId,status:"Refuse",isChangeTime:"false",changeTime:null,refuseReason:this.formData.refuseReason,getDate:"",startTime:"",endTime:"",address:""}}).then(e=>{e?(console.log("rejectpurpose: ",this.formData.refuseReason),0===e.data.error_code?(console.log("已拒绝该申请",e.data),alert("已拒绝该申请"),this.reload()):(console.log("审批失败"+e.data),alert("error: "+e.data.error_code))):(console.log("审批失败，请检查网络"+e.data),alert("审批失败，请检查网络"))})},loadMessage(){let e=this;l()({url:"manager/getToolRequestList",method:"post",data:{}}).then(t=>{t&&0===t.data.error_code?(console.log("获取成功",t.data),e.borrowList=t.data.dataList):(console.log("获取失败"+t.data),alert("获取失败，请检查网络"))})}}},c=d,u=(r("9723"),r("847b")),m=Object(u["a"])(c,a,o,!1,null,"dc02bb24",null);t["default"]=m.exports},cb7d:function(e,t,r){"use strict";var a=function(){var e=this,t=e._self._c;return t("div",{staticStyle:{display:"flex"}},[t("div",{staticStyle:{"min-width":"200px"}},[t("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"active-text-color":"#a6dcff",router:""}},[t("el-submenu",{attrs:{index:"1"}},[t("template",{slot:"title"},[t("i",{staticClass:"el-icon-s-promotion"}),e._v("审批管理")]),this.isSuperUser?t("el-menu-item",{attrs:{index:"/borrowProcessing"}},[t("span",{attrs:{slot:"title"},slot:"title"},[e._v("借用审批")])]):e._e(),this.isSuperUser?t("el-menu-item",{attrs:{index:"/messageProcessing"}},[t("span",{attrs:{slot:"title"},slot:"title"},[e._v("延期审批")])]):e._e(),this.isSuperUser?t("el-menu-item",{attrs:{index:"/toolRecord"}},[t("span",{attrs:{slot:"title"},slot:"title"},[e._v("归还审批")])]):e._e()],2),t("el-submenu",{attrs:{index:"2"}},[t("template",{slot:"title"},[t("i",{staticClass:"el-icon-s-order"}),e._v("用户管理")]),this.isSuperUser?t("el-menu-item",{attrs:{index:"/addTeacher"}},[t("span",{attrs:{slot:"title"},slot:"title"},[e._v("添加教师")])]):e._e(),this.isSuperUser?t("el-menu-item",{attrs:{index:"/UserRecord"}},[t("span",{attrs:{slot:"title"},slot:"title"},[e._v("学生列表")])]):e._e(),this.isSuperUser?t("el-menu-item",{attrs:{index:"/TeacherRecord"}},[t("span",{attrs:{slot:"title"},slot:"title"},[e._v("教师列表")])]):e._e()],2),t("el-submenu",{attrs:{index:"3"}},[t("template",{slot:"title"},[t("i",{staticClass:"el-icon-setting"}),e._v("工具管理")]),this.isSuperUser?t("el-menu-item",{attrs:{index:"/AllToolRecord"}},[t("span",{attrs:{slot:"title"},slot:"title"},[e._v("工具列表")])]):e._e(),t("el-menu-item",{attrs:{index:"/addtool"}},[t("span",{attrs:{slot:"title"},slot:"title"},[e._v("新增工具")])]),t("el-menu-item",{attrs:{index:"/settools"}},[t("span",{attrs:{slot:"title"},slot:"title"},[e._v("编辑工具")])])],2)],1)],1),t("div",[t("router-view")],1)])},o=[],s={name:"teachermenu",mounted(){this.loadIsSuperUser()},data(){return{isSuperUser:!0}},methods:{loadIsSuperUser(){"false"==localStorage.getItem("isSuperUser")&&(this.isSuperUser=!1)}}},l=s,i=r("847b"),n=Object(i["a"])(l,a,o,!1,null,null,null);t["a"]=n.exports},f18d:function(e,t,r){"use strict";var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"x-head"},[t("img",{staticStyle:{cursor:"pointer",height:"60px","margin-left":"10px","margin-top":"0.5%"},attrs:{src:"headerLogo.png"},on:{click:e.toMain}}),t("div",{staticStyle:{margin:"0 auto"}}),t("div",{staticStyle:{"line-height":"6vh",margin:"0 4vh 0 0"}},[t("el-dropdown",[t("div",{staticClass:"header-right"},[t("span",{staticStyle:{color:"white"}},[e._v(e._s(this.mail))])]),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[t("el-dropdown-item",{attrs:{icon:"el-icon-edit"}},[t("span",{staticStyle:{cursor:"pointer"},on:{click:e.changePwd}},[e._v("修改密码")])]),t("el-dropdown-item",{attrs:{icon:"el-icon-edit"}},[t("span",{staticStyle:{cursor:"pointer"},on:{click:e.changeInfo}},[e._v("个人信息")])]),t("el-dropdown-item",{attrs:{icon:"el-icon-s-fold"}},[t("span",{staticStyle:{cursor:"pointer"},on:{click:e.logout}},[e._v("退出登录")])])],1)],1)],1),e._m(0)])},o=[function(){var e=this,t=e._self._c;return t("div",[t("br")])}],s=(r("cdf1"),r("8aad")),l=r.n(s),i={name:"teacherheadbar",data(){return{mail:localStorage.getItem("Mail")}},methods:{goToLogin(){this.$router.push("/teacherLogin"),localStorage.setItem("Mail",null)},logout(){this.$router.push("/teacherLogin"),localStorage.setItem("Mail",null),l()({method:"post",url:"user/unLogin",data:{token:localStorage.getItem("token")}}),console.log("执行了"),localStorage.setItem("token","wutoken")},changeInfo(){console.log("Info"),this.$router.push("/teacherChangeInfo")},changePwd(){console.log("Pwd"),this.$router.push("/teacherChangePwd")},toMain(){this.$router.push("/borrowProcessing")}}},n=i,d=(r("64bf"),r("847b")),c=Object(d["a"])(n,a,o,!1,null,"03982c49",null);t["a"]=c.exports},f7bf:function(e,t,r){}}]);
//# sourceMappingURL=chunk-68cf7f18.08a6d125.js.map
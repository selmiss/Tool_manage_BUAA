(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9ff02b62"],{"23a1":function(t,e,a){"use strict";a("64a8")},"64a8":function(t,e,a){},"8fb8":function(t,e,a){"use strict";a("e9ed")},cb7d:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{display:"flex"}},[a("div",{staticStyle:{"min-width":"200px"}},[a("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"active-text-color":"#a6dcff",router:""}},[a("el-submenu",{attrs:{index:"1"}},[a("template",{slot:"title"},[a("i",{staticClass:"el-icon-s-promotion"}),t._v("审批管理")]),this.isSuperUser?a("el-menu-item",{attrs:{index:"/borrowProcessing"}},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v("借用审批")])]):t._e(),this.isSuperUser?a("el-menu-item",{attrs:{index:"/messageProcessing"}},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v("延期审批")])]):t._e(),this.isSuperUser?a("el-menu-item",{attrs:{index:"/toolRecord"}},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v("归还审批")])]):t._e()],2),a("el-submenu",{attrs:{index:"2"}},[a("template",{slot:"title"},[a("i",{staticClass:"el-icon-s-order"}),t._v("用户管理")]),this.isSuperUser?a("el-menu-item",{attrs:{index:"/addTeacher"}},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v("添加教师")])]):t._e(),this.isSuperUser?a("el-menu-item",{attrs:{index:"/UserRecord"}},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v("学生列表")])]):t._e(),this.isSuperUser?a("el-menu-item",{attrs:{index:"/TeacherRecord"}},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v("教师列表")])]):t._e()],2),a("el-submenu",{attrs:{index:"3"}},[a("template",{slot:"title"},[a("i",{staticClass:"el-icon-setting"}),t._v("工具管理")]),this.isSuperUser?a("el-menu-item",{attrs:{index:"/AllToolRecord"}},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v("工具列表")])]):t._e(),a("el-menu-item",{attrs:{index:"/addtool"}},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v("新增工具")])]),a("el-menu-item",{attrs:{index:"/settools"}},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v("编辑工具")])])],2)],1)],1),a("div",[a("router-view")],1)])},o=[],r={name:"teachermenu",mounted:function(){this.loadIsSuperUser()},data:function(){return{isSuperUser:!0}},methods:{loadIsSuperUser:function(){"false"==localStorage.getItem("isSuperUser")&&(this.isSuperUser=!1)}}},i=r,l=a("2877"),s=Object(l["a"])(i,n,o,!1,null,null,null);e["a"]=s.exports},dcee:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("TeacherHeadBar"),a("el-container",[a("el-aside",{staticStyle:{"min-height":"600px"},attrs:{width:"20%"}},[a("TeacherMenu")],1),a("el-main",{attrs:{width:"75%"}},[a("div",{staticClass:"title"},[t._v("教师添加")]),a("div",{staticStyle:{margin:"0 auto","margin-top":"20px","align-items":"center"}},[a("el-card",{staticClass:"box-card",staticStyle:{width:"90%"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tchData,border:""}},[a("el-table-column",{attrs:{align:"center",prop:"name",label:"教师信息","min-width":"150"}}),a("el-table-column",{attrs:{align:"center",prop:"teacherId",label:"工号","min-width":"170"}}),a("el-table-column",{attrs:{align:"center",prop:"acc",label:"邮箱","min-width":"170"}}),a("el-table-column",{attrs:{align:"center",label:"操作","min-width":"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"success",plain:""},on:{click:function(a){return t.handleAgree(e.$index,e.row)}}},[t._v("同意添加")]),a("el-button",{attrs:{size:"mini",type:"danger",plain:""},on:{click:function(a){return t.handleRefuse(e.$index,e.row)}}},[t._v("拒绝添加")])]}}])})],1)],1)],1)]),a("el-aside",{attrs:{width:"5%"}})],1)],1)},o=[],r=a("f18d"),i=a("cb7d"),l=a("bc3a"),s=a.n(l),c={inject:["reload"],components:{TeacherHeadBar:r["a"],TeacherMenu:i["a"]},mounted:function(){this.loadTable()},data:function(){return{tchData:[{name:"",teacherId:"",acc:"",uid:""}]}},methods:{loadTable:function(){var t=this;s()({method:"post",url:"http://121.4.160.157/manager/getTeacherApproveList",data:{}}).then((function(e){e&&0===e.data.error_code?(console.log("获取成功",e.data),t.tchData=e.data.dataList):(console.log("获取失败"+e.data),alert("获取失败，请检查网络"))}))},handleAgree:function(t,e){var a=this;console.log(t,e),s()({url:"http://121.4.160.157/manager/approveTeacher",method:"post",data:{managerId:localStorage.getItem("uid"),teacherId:e.uid,status:"Accept"}}).then((function(t){t?0===t.data.error_code?(console.log("已添加该教师"),alert("已添加该教师"),a.reload()):(console.log("审批失败"+t.data),alert("error"+t.data.error_code)):(console.log("审批失败，请检查网络"+t.data),alert("审批失败，请检查网络"))}))},handleRefuse:function(t,e){var a=this;console.log(t,e),s()({url:"http://121.4.160.157/manager/approveTeacher",method:"post",data:{managerId:localStorage.getItem("uid"),teacherId:e.uid,status:"Refuse"}}).then((function(t){t?0===t.data.error_code?(console.log("已拒绝该申请",t.data),alert("已拒绝该申请"),a.reload()):(console.log("审批失败"+t.data),alert("error"+t.data.error_code)):(console.log("审批失败，请检查网络"+t.data),alert("审批失败，请检查网络"))}))}}},d=c,u=(a("23a1"),a("2877")),h=Object(u["a"])(d,n,o,!1,null,"1d9e8746",null);e["default"]=h.exports},e9ed:function(t,e,a){},f18d:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"x-head"},[a("img",{staticStyle:{cursor:"pointer",height:"60px","margin-left":"10px","margin-top":"0.5%"},attrs:{src:"headerLogo.png"}}),a("div",{staticStyle:{margin:"0 auto"}}),a("div",{staticStyle:{"line-height":"6vh",margin:"0 4vh 0 0"}},[a("el-dropdown",[a("div",{staticClass:"header-right"},[a("span",{staticStyle:{color:"white"}},[t._v(t._s(this.mail))])]),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{icon:"el-icon-edit"}},[a("span",{staticStyle:{cursor:"pointer"},on:{click:t.changePwd}},[t._v("修改密码")])]),a("el-dropdown-item",{attrs:{icon:"el-icon-edit"}},[a("span",{staticStyle:{cursor:"pointer"},on:{click:t.changeInfo}},[t._v("个人信息")])]),a("el-dropdown-item",{attrs:{icon:"el-icon-s-fold"}},[a("span",{staticStyle:{cursor:"pointer"},on:{click:t.logout}},[t._v("退出登录")])])],1)],1)],1),t._m(0)])},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("br")])}],r={name:"teacherheadbar",data:function(){return{mail:localStorage.getItem("Mail")}},methods:{goToLogin:function(){this.$router.push("/teacherLogin"),localStorage.setItem("Mail",null)},logout:function(){this.$router.push("/teacherLogin"),localStorage.setItem("Mail",null)},changeInfo:function(){console.log("Info"),this.$router.push("/teacherChangeInfo")},changePwd:function(){console.log("Pwd"),this.$router.push("/teacherChangePwd")},toMain:function(){this.$router.push("/toolManagement")}}},i=r,l=(a("8fb8"),a("2877")),s=Object(l["a"])(i,n,o,!1,null,"9894a1be",null);e["a"]=s.exports}}]);
//# sourceMappingURL=chunk-9ff02b62.80150fe0.js.map
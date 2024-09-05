import{H as I}from"./HeadBar-DVH6TzpG.js";import{_ as x,d as u,c as V,a as e,w as o,e as m,r as n,o as b,b as w}from"./index-CIIbYJoP.js";import"./headerLogo-CGJBKw5C.js";const y={components:{HeadBar:I},mounted(){this.loadTable()},data(){return{userId:"",studentId:"",email:"",name:"",phone:"",college:""}},methods:{loadTable(){this.userId=this.$store.state.UID,console.log(localStorage.getItem("uid")),u({method:"post",url:"user/getInfo",data:{uid:localStorage.getItem("uid")}}).then(t=>{console.log(t),t.data.error_code==0&&(this.name=t.data.name,this.email=t.data.acc,this.college=t.data.college,this.studentId=t.data.studentId)})},confirm(){console.log(localStorage.getItem("uid")),u({method:"post",url:"user/putInfo",data:{uid:localStorage.getItem("uid"),studentId:this.studentId,name:this.name,college:this.college}}).then(t=>{console.log(t),t.data.error_code==0&&alert("修改成功！")})}}},C=m("div",{class:"title",style:{"margin-top":"80px"}},[m("h4",null,"修改个人信息")],-1),k={style:{margin:"0 auto","align-items":"center"}};function v(t,a,B,S,l,r){const _=n("head-bar"),c=n("el-aside"),i=n("el-input"),s=n("el-form-item"),p=n("el-button"),h=n("el-form"),f=n("el-main"),g=n("el-container");return b(),V("div",null,[e(_),C,e(g,null,{default:o(()=>[e(c,{width:"20%",style:{"min-height":"600px"}}),e(f,{width:"75%"},{default:o(()=>[m("div",k,[e(h,{"label-width":"80px"},{default:o(()=>[e(s,{label:"学号",style:{width:"80%"}},{default:o(()=>[e(i,{modelValue:l.studentId,"onUpdate:modelValue":a[0]||(a[0]=d=>l.studentId=d),type:"text",placeholder:l.studentId},null,8,["modelValue","placeholder"])]),_:1}),e(s,{label:"姓名",style:{width:"80%"}},{default:o(()=>[e(i,{modelValue:l.name,"onUpdate:modelValue":a[1]||(a[1]=d=>l.name=d),type:"text",placeholder:l.name},null,8,["modelValue","placeholder"])]),_:1}),e(s,{label:"学院",style:{width:"80%"}},{default:o(()=>[e(i,{modelValue:l.college,"onUpdate:modelValue":a[2]||(a[2]=d=>l.college=d),type:"text",placeholder:l.college},null,8,["modelValue","placeholder"])]),_:1}),e(s,{style:{width:"80%"}},{default:o(()=>[e(p,{onClick:r.confirm},{default:o(()=>[w("确认修改")]),_:1},8,["onClick"])]),_:1})]),_:1})])]),_:1}),e(c,{width:"5%"})]),_:1})])}const H=x(y,[["render",v]]);export{H as default};
import{_ as f,a as c,c as u,b as e,n as h,e as d,w as i,v as a,f as g,t as p,d as _,o as m,p as b,g as w}from"./index-B3rJzjPI.js";const y={name:"login-register",data(){return{isLogin:!0,stateReg:!1,emailError:!1,passwordError:!1,existed:!1,form:{email:"",phone:"",password:"",code:""},show:!0,count:"",timer:null}},methods:{sendCode(){this.timer||(console.log("已发送"),c({method:"post",url:"user/forget/sendCode",data:{acc:this.form.phone}}).then(t=>{console.log(t.data),alert("验证码已发送，请在手机信息中查看。")}),this.count=60,this.show=!1,this.timer=setInterval(()=>{this.count>0&&this.count<=60?this.count--:(this.show=!0,clearInterval(this.timer),this.timer=null)},1e3))},studentEntry(){this.$router.push("/studentLogin")},confirmChange(){this.form.phone!=""&&this.form.password!=""?c({method:"post",url:"user/forget/setPwd",data:{acc:this.form.email,phoneNumber:this.form.phone,pwd:this.form.password,key:this.form.code}}).then(l=>{console.log(l.data.error_code),l.data.error_code==0?(alert("重置密码成功！"),this.$router.push("/studentLogin")):l.data.error_code==1?alert("存在输入为空！"):l.data.error_code==2?alert("该邮箱不存在！"):l.data.error_code==3?alert("密码错误或格式不规范！请重新输入。"):alert("验证码错误，请重新输入。")}):alert("填写不能为空")},studentForgetPwd(){this.$router.push("/studentForgetPwd")},changeType(){this.isLogin=!this.isLogin,this.stateReg=!1,this.form.sid="",this.form.name="",this.form.college="",this.form.email="",this.form.password=""},teacherEntry(){this.$router.push("/teacherLogin")},changeRegState(){this.form.sid!=""&&this.form.name!=""&&this.form.college!=""?this.stateReg=!this.stateReg:alert("填写不能为空！")},login(){console.log(this.form.email+" : "+this.form.password),this.form.email!=""&&this.form.password!=""?c({method:"post",url:"user/login",data:{acc:this.form.email,pwd:this.form.password}}).then(l=>{l.data.error_code==0?(localStorage.setItem("uid",l.data.uid),localStorage.setItem("Mail",this.form.email),alert("登录成功！"),this.$router.push("/borrowRecord")):l.data.error_code==1?alert("输入有误！请重新登录。"):l.data.error_code==2?alert("请先进行注册！"):l.data.error_code==3&&alert("密码错误或格式不正确！请重新输入")}).catch(l=>{console.log(l)}):alert("填写不能为空！")},register(){console.log(this.form.email+" : "+this.form.password),this.form.password!=""&&this.form.email!=""?c({method:"post",url:"user/register",data:{studentId:this.form.sid,name:this.form.name,college:this.form.college,acc:this.form.email,pwd:this.form.password,key:this.form.code,phoneNumber:this.form.phone}}).then(l=>{console.log(l.data.error_code),l.data.error_code==0?this.changeType():l.data.error_code==1?alert("输入有误，请重新输入。"):l.data.error_code==2?alert("该邮箱已注册。"):l.data.error_code==3?alert("请输入正确验证码"):l.data.error_code==4&&alert("验证码错误，请重新输入!")}).catch(l=>{console.log(l)}):alert("填写不能为空！")}}},n=l=>(b("data-v-7e9f75e9"),l=l(),w(),l),v={class:"login-register"},C={class:"contain"},k={key:0,class:"big-contain"},x=n(()=>e("div",{class:"btitle"},"忘记密码",-1)),T={class:"bform"},E={class:"count"},U=n(()=>e("br",null,null,-1)),V={class:"count"},S=n(()=>e("br",null,null,-1)),I=n(()=>e("br",null,null,-1)),R={class:"count"},L=n(()=>e("br",null,null,-1)),N={class:"count"},M=n(()=>e("br",null,null,-1)),P={style:{"margin-top":"70px"}},B={key:1,class:"big-contain"},F={key:0},O=n(()=>e("div",{class:"btitle"},"学生注册",-1)),D={class:"bform"},z=n(()=>e("br",null,null,-1)),j={key:0,class:"errTips"},q=n(()=>e("br",null,null,-1)),A=n(()=>e("br",null,null,-1)),G=n(()=>e("br",null,null,-1)),H={key:1},J={class:"btitle"},K={class:"bform"},Q=n(()=>e("br",null,null,-1)),W=n(()=>e("br",null,null,-1)),X={key:0,class:"small-contain"},Y=n(()=>e("div",{class:"stitle"},[d("北航工程训练中心"),e("br"),d("工具信息平台")],-1)),Z=n(()=>e("p",{class:"scontent"},"尚无账号？点击下方按钮进行注册。",-1)),$=n(()=>e("br",null,null,-1)),ee={key:1,class:"small-contain"},te=n(()=>e("div",{class:"stitle"},"学生，您好！",-1)),oe=n(()=>e("p",{class:"scontent"},[d("注册工训中心账号，"),e("br"),d("轻松进行设备借还。")],-1)),se=n(()=>e("br",null,null,-1));function le(l,t,re,ne,s,r){return m(),u("div",v,[e("div",C,[e("div",{class:h(["big-box",{active:s.isLogin}])},[s.isLogin?(m(),u("div",k,[x,e("div",T,[e("span",E,[d("邮箱          :  "),i(e("input",{type:"text",placeholder:"邮箱","onUpdate:modelValue":t[0]||(t[0]=o=>s.form.email=o)},null,512),[[a,s.form.email]])]),U,e("span",V,[d("手机号码    :  "),i(e("input",{type:"text",placeholder:"手机号码","onUpdate:modelValue":t[1]||(t[1]=o=>s.form.phone=o)},null,512),[[a,s.form.phone]])]),S,e("button",{onClick:t[2]||(t[2]=(...o)=>r.sendCode&&r.sendCode(...o))},[d("获取验证码"),i(e("span",{class:"count"},p(s.count)+" s",513),[[g,!s.show]])]),I,e("span",R,[d("验证码       :  "),i(e("input",{type:"code",placeholder:"验证码","onUpdate:modelValue":t[3]||(t[3]=o=>s.form.code=o)},null,512),[[a,s.form.code]])]),L,e("span",N,[d("设置新密码:  "),i(e("input",{type:"password",placeholder:"设置新密码","onUpdate:modelValue":t[4]||(t[4]=o=>s.form.password=o)},null,512),[[a,s.form.password]])]),M]),e("div",P,[e("button",{class:"bbutton",onClick:t[5]||(t[5]=(...o)=>r.confirmChange&&r.confirmChange(...o))},"确认修改"),d("   "),e("button",{onClick:t[6]||(t[6]=(...o)=>r.studentEntry&&r.studentEntry(...o))},"返回登录")])])):(m(),u("div",B,[s.stateReg?(m(),u("div",H,[e("div",J,"欢迎！"+p(this.form.name),1),e("div",K,[i(e("input",{type:"text",placeholder:"手机号码","onUpdate:modelValue":t[12]||(t[12]=o=>s.form.phone=o)},null,512),[[a,s.form.phone]]),Q,i(e("input",{type:"password",placeholder:"密码","onUpdate:modelValue":t[13]||(t[13]=o=>s.form.password=o)},null,512),[[a,s.form.password]]),W,i(e("input",{type:"password",placeholder:"确认密码","onUpdate:modelValue":t[14]||(t[14]=o=>s.form.password2=o)},null,512),[[a,s.form.password2]])]),e("button",{class:"bbutton",onClick:t[15]||(t[15]=(...o)=>r.changeRegState&&r.changeRegState(...o))},"上一步"),d("  "),e("button",{class:"bbutton",onClick:t[16]||(t[16]=(...o)=>r.register&&r.register(...o))},"注册")])):(m(),u("div",F,[O,e("div",D,[i(e("input",{type:"text",placeholder:"学号","onUpdate:modelValue":t[7]||(t[7]=o=>s.form.sid=o)},null,512),[[a,s.form.sid]]),z,s.existed?(m(),u("span",j,"* 该学号已经注册！ *")):_("",!0),i(e("input",{type:"text",placeholder:"姓名","onUpdate:modelValue":t[8]||(t[8]=o=>s.form.name=o)},null,512),[[a,s.form.name]]),q,i(e("input",{type:"text",placeholder:"学院","onUpdate:modelValue":t[9]||(t[9]=o=>s.form.college=o)},null,512),[[a,s.form.college]]),A,i(e("input",{type:"email",placeholder:"邮箱","onUpdate:modelValue":t[10]||(t[10]=o=>s.form.email=o)},null,512),[[a,s.form.email]]),G,d(" 请确认您的个人信息无误。 ")]),e("button",{class:"bbutton",onClick:t[11]||(t[11]=(...o)=>r.changeRegState&&r.changeRegState(...o))},"下一步")]))]))],2),e("div",{class:h(["small-box",{active:s.isLogin}])},[s.isLogin?(m(),u("div",X,[Y,Z,e("button",{class:"sbutton",onClick:t[17]||(t[17]=(...o)=>r.changeType&&r.changeType(...o))},"前往注册"),$,e("button",{class:"sbutton",onClick:t[18]||(t[18]=(...o)=>r.teacherEntry&&r.teacherEntry(...o))},"教师入口")])):(m(),u("div",ee,[te,oe,e("button",{class:"sbutton",onClick:t[19]||(t[19]=(...o)=>r.changeType&&r.changeType(...o))},"前往登录"),se,e("button",{class:"sbutton",onClick:t[20]||(t[20]=(...o)=>r.teacherEntry&&r.teacherEntry(...o))},"教师入口")]))],2)])])}const de=f(y,[["render",le],["__scopeId","data-v-7e9f75e9"]]);export{de as default};

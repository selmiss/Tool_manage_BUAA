import{_ as f,d as p,c as a,e as o,n as g,f as i,v as n,g as h,b as u,t as c,h as _,o as m,p as b,i as w}from"./index-CIIbYJoP.js";const y={name:"login-register",data(){return{isLogin:!0,stateReg:!1,emailError:!1,passwordError:!1,existed:!1,form:{name:"",sid:"",college:"",email:"",password:"",code:"",phone:""},show:!0,count:"",timer:null}},methods:{sendCode(){this.timer||(console.log("已发送"),p({method:"post",url:"http://10.212.87.185/user/forget/sendCode",data:{acc:this.form.phone}}).then(e=>{console.log(e.data.error_code),alert("验证码已发送，请在手机信息中查看。")}),this.count=60,this.show=!1,this.timer=setInterval(()=>{this.count>0&&this.count<=60?this.count--:(this.show=!0,clearInterval(this.timer),this.timer=null)},1e3))},studentForgetPwd(){this.$router.push("/studentForgetPwd")},changeType(){this.isLogin=!this.isLogin,this.stateReg=!1,this.form.sid="",this.form.name="",this.form.college="",this.form.email="",this.form.password=""},teacherEntry(){this.$router.push("/teacherLogin")},changeRegState(){this.form.sid!=""&&this.form.name!=""&&this.form.college!=""?this.stateReg=!this.stateReg:alert("填写不能为空！")},login(){console.log(this.form.email+" : "+this.form.password),this.form.email!=""&&this.form.password!=""?p({method:"post",url:"http://10.212.87.185/user/login",data:{acc:this.form.email,pwd:this.form.password}}).then(l=>{l.data.error_code==0?(localStorage.setItem("uid",l.data.uid),localStorage.setItem("Mail",this.form.email),alert("登录成功！"),this.$router.push("/borrowRecord")):l.data.error_code==1?alert("输入有误！请重新登录。"):l.data.error_code==2?alert("请先进行注册！"):l.data.error_code==3&&alert("密码错误！请重新输入")}).catch(l=>{console.log(l)}):alert("填写不能为空！")},register(){console.log(this.form.email+" : "+this.form.password),this.form.password!=""&&this.form.email!=""?p({method:"post",url:"http://10.212.87.185/user/register",data:{studentId:this.form.sid,name:this.form.name,college:this.form.college,acc:this.form.email,pwd:this.form.password,key:this.form.code,phoneNumber:this.form.phone}}).then(l=>{console.log(l.data.error_code),l.data.error_code==0?this.changeType():l.data.error_code==1?alert("输入有误，请重新输入。"):l.data.error_code==2?alert("该邮箱已注册。"):l.data.error_code==3?alert("请输入正确验证码"):l.data.error_code==4&&alert("验证码错误，请重新输入!")}).catch(l=>{console.log(l)}):alert("填写不能为空！")}}},d=l=>(b("data-v-27540dd4"),l=l(),w(),l),v={class:"login-register"},k={class:"contain"},C={key:0,class:"big-contain"},x=d(()=>o("div",{class:"btitle"},"用户登录",-1)),T={class:"bform"},U={key:0,class:"errTips"},V={key:1,class:"errTips"},I={key:1,class:"big-contain"},S={key:0},R=d(()=>o("div",{class:"btitle"},"用户注册",-1)),E={class:"bform"},L=d(()=>o("br",null,null,-1)),N={key:0,class:"errTips"},M=d(()=>o("br",null,null,-1)),F=d(()=>o("br",null,null,-1)),P=d(()=>o("br",null,null,-1)),B={key:1},O={class:"btitle"},D={class:"bform"},z=d(()=>o("br",null,null,-1)),j=d(()=>o("br",null,null,-1)),q=d(()=>o("br",null,null,-1)),A=d(()=>o("br",null,null,-1));function G(l,e,H,J,s,r){return m(),a("div",v,[o("div",k,[o("div",{class:g(["big-box",{active:s.isLogin}])},[s.isLogin?(m(),a("div",C,[x,o("div",T,[i(o("input",{type:"email",placeholder:"请输入用户名","onUpdate:modelValue":e[0]||(e[0]=t=>s.form.email=t)},null,512),[[n,s.form.email]]),s.emailError?(m(),a("span",U,"* 邮箱填写错误 *")):h("",!0),i(o("input",{type:"password",placeholder:"密码","onUpdate:modelValue":e[1]||(e[1]=t=>s.form.password=t)},null,512),[[n,s.form.password]]),s.emailError?(m(),a("span",V,"* 密码填写错误 *")):h("",!0)]),o("button",{class:"bbutton",onClick:e[2]||(e[2]=(...t)=>r.login&&r.login(...t))},"登录"),u("   "),o("span",{onClick:e[3]||(e[3]=(...t)=>r.studentForgetPwd&&r.studentForgetPwd(...t))},"忘记密码")])):(m(),a("div",I,[s.stateReg?(m(),a("div",B,[o("div",O,"欢迎！"+c(this.form.name),1),o("div",D,[i(o("input",{type:"text",placeholder:"手机号码","onUpdate:modelValue":e[9]||(e[9]=t=>s.form.phone=t)},null,512),[[n,s.form.phone]]),z,o("button",{onClick:e[10]||(e[10]=(...t)=>r.sendCode&&r.sendCode(...t))},[u("获取验证码"),i(o("span",{class:"count"},c(s.count)+" s",513),[[_,!s.show]])]),j,i(o("input",{type:"code",placeholder:"验证码","onUpdate:modelValue":e[11]||(e[11]=t=>s.form.code=t)},null,512),[[n,s.form.code]]),q,i(o("input",{type:"password",placeholder:"密码","onUpdate:modelValue":e[12]||(e[12]=t=>s.form.password=t)},null,512),[[n,s.form.password]]),A,i(o("input",{type:"password",placeholder:"确认密码","onUpdate:modelValue":e[13]||(e[13]=t=>s.form.password2=t)},null,512),[[n,s.form.password2]])]),o("button",{class:"bbutton",onClick:e[14]||(e[14]=(...t)=>r.changeRegState&&r.changeRegState(...t))},"上一步"),u("  "),o("button",{class:"bbutton",onClick:e[15]||(e[15]=(...t)=>r.register&&r.register(...t))},"注册")])):(m(),a("div",S,[R,o("div",E,[i(o("input",{type:"text",placeholder:"学号","onUpdate:modelValue":e[4]||(e[4]=t=>s.form.sid=t)},null,512),[[n,s.form.sid]]),L,s.existed?(m(),a("span",N,"* 该学号已经注册！ *")):h("",!0),i(o("input",{type:"text",placeholder:"姓名","onUpdate:modelValue":e[5]||(e[5]=t=>s.form.name=t)},null,512),[[n,s.form.name]]),M,i(o("input",{type:"text",placeholder:"学院","onUpdate:modelValue":e[6]||(e[6]=t=>s.form.college=t)},null,512),[[n,s.form.college]]),F,i(o("input",{type:"email",placeholder:"邮箱","onUpdate:modelValue":e[7]||(e[7]=t=>s.form.email=t)},null,512),[[n,s.form.email]]),P,u(" 请确认您的个人信息无误。 ")]),o("button",{class:"bbutton",onClick:e[8]||(e[8]=(...t)=>r.changeRegState&&r.changeRegState(...t))},"下一步")]))]))],2)])])}const Q=f(y,[["render",G],["__scopeId","data-v-27540dd4"]]);export{Q as default};
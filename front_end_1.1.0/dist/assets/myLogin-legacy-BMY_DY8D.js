System.register(["./index-legacy-D4Q9cYOW.js"],(function(e,t){"use strict";var o,r,a,l,i,n,s,d,c,f,m,h,u,p;return{setters:[e=>{o=e._,r=e.a,a=e.c,l=e.b,i=e.n,n=e.w,s=e.v,d=e.d,c=e.e,f=e.t,m=e.f,h=e.o,u=e.p,p=e.g}],execute:function(){var t=document.createElement("style");t.textContent=".login-register[data-v-a8f50bd7]{width:100vw;height:100vh;box-sizing:border-box}.contain[data-v-a8f50bd7]{width:40%;height:60%;position:relative;top:47%;left:50%;transform:translate(-50%,-50%);background-color:#fff;border-radius:20px;box-shadow:0 0 3px #f0f0f0,0 0 6px #f0f0f0}.big-box[data-v-a8f50bd7]{width:100%;height:100%;position:absolute;top:0;left:30%;transform:translate(0);transition:all 1s;background-color:#f0f8ff}.big-contain[data-v-a8f50bd7]{margin-top:10%;width:100%;height:100%;flex-direction:column;justify-content:center;align-items:center}.btitle[data-v-a8f50bd7]{font-size:1.5em;font-weight:700;color:#2c68eb}.bform[data-v-a8f50bd7]{width:100%;height:40%;padding:2em 0;display:flex;flex-direction:column;justify-content:space-around;align-items:center}.bform button[data-v-a8f50bd7]{width:20%;height:32px;align-items:center;border-radius:9px;border:1px solid rgb(141,156,207);outline:none;background-color:transparent;color:#2d68d4;font-size:.9em;cursor:pointer}.bform .errTips[data-v-a8f50bd7]{display:block;width:50%;text-align:left;color:red;font-size:.7em;margin-left:1em}.bform input[data-v-a8f50bd7]{width:50%;height:30px;border:none;outline:none;border-radius:10px;padding-left:2em;background-color:#f0f0f0}.bbutton[data-v-a8f50bd7]{width:20%;height:40px;border-radius:24px;border:none;outline:none;background-color:#2e78e7;color:#fff;font-size:.9em;cursor:pointer}.small-box[data-v-a8f50bd7]{width:30%;height:100%;background:linear-gradient(135deg,#6da6f1,#2d56dd);position:absolute;top:0;left:0;transform:translate(0);transition:all 1s;border-top-left-radius:inherit;border-bottom-left-radius:inherit}.small-contain[data-v-a8f50bd7]{width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center}.stitle[data-v-a8f50bd7]{font-size:1.5em;font-weight:700;color:#fff}.scontent[data-v-a8f50bd7]{font-size:.8em;color:#fff;text-align:center;padding:2em 4em;line-height:1.7em}.sbutton[data-v-a8f50bd7]{width:60%;height:40px;border-radius:24px;border:1px solid #fff;outline:none;background-color:transparent;color:#fff;font-size:.9em;cursor:pointer}.big-box.active[data-v-a8f50bd7]{left:0;transition:all .5s}.small-box.active[data-v-a8f50bd7]{left:100%;border-top-left-radius:0;border-bottom-left-radius:0;border-top-right-radius:inherit;border-bottom-right-radius:inherit;transform:translate(-100%);transition:all 1s}\n",document.head.appendChild(t);const g={name:"login-register",data:()=>({isLogin:!0,stateReg:!1,emailError:!1,passwordError:!1,existed:!1,form:{name:"",sid:"",college:"",email:"",password:"",code:"",phone:""},show:!0,count:"",timer:null}),methods:{sendCode(){this.timer||(console.log("已发送"),r({method:"post",url:"http://10.212.87.185/user/forget/sendCode",data:{acc:this.form.phone}}).then((e=>{console.log(e.data.error_code),alert("验证码已发送，请在手机信息中查看。")})),this.count=60,this.show=!1,this.timer=setInterval((()=>{this.count>0&&this.count<=60?this.count--:(this.show=!0,clearInterval(this.timer),this.timer=null)}),1e3))},studentForgetPwd(){this.$router.push("/studentForgetPwd")},changeType(){this.isLogin=!this.isLogin,this.stateReg=!1,this.form.sid="",this.form.name="",this.form.college="",this.form.email="",this.form.password=""},teacherEntry(){this.$router.push("/teacherLogin")},changeRegState(){""!=this.form.sid&&""!=this.form.name&&""!=this.form.college?this.stateReg=!this.stateReg:alert("填写不能为空！")},login(){console.log(this.form.email+" : "+this.form.password),""!=this.form.email&&""!=this.form.password?r({method:"post",url:"http://10.212.87.185/user/login",data:{acc:this.form.email,pwd:this.form.password}}).then((e=>{0==e.data.error_code?(localStorage.setItem("uid",e.data.uid),localStorage.setItem("Mail",this.form.email),alert("登录成功！"),this.$router.push("/borrowRecord")):1==e.data.error_code?alert("输入有误！请重新登录。"):2==e.data.error_code?alert("请先进行注册！"):3==e.data.error_code&&alert("密码错误！请重新输入")})).catch((e=>{console.log(e)})):alert("填写不能为空！")},register(){console.log(this.form.email+" : "+this.form.password),""!=this.form.password&&""!=this.form.email?r({method:"post",url:"http://10.212.87.185/user/register",data:{studentId:this.form.sid,name:this.form.name,college:this.form.college,acc:this.form.email,pwd:this.form.password,key:this.form.code,phoneNumber:this.form.phone}}).then((e=>{console.log(e.data.error_code),0==e.data.error_code?this.changeType():1==e.data.error_code?alert("输入有误，请重新输入。"):2==e.data.error_code?alert("该邮箱已注册。"):3==e.data.error_code?alert("请输入正确验证码"):4==e.data.error_code&&alert("验证码错误，请重新输入!")})).catch((e=>{console.log(e)})):alert("填写不能为空！")}}},b=e=>(u("data-v-a8f50bd7"),e=e(),p(),e),w={class:"login-register"},v={class:"contain"},x={key:0,class:"big-contain"},y=b((()=>l("div",{class:"btitle"},"用户登录",-1))),k={class:"bform"},_={key:0,class:"errTips"},C={key:1,class:"errTips"},R={key:1,class:"big-contain"},U={key:0},V=b((()=>l("div",{class:"btitle"},"用户注册",-1))),z={class:"bform"},S=b((()=>l("br",null,null,-1))),E={key:0,class:"errTips"},I=b((()=>l("br",null,null,-1))),L=b((()=>l("br",null,null,-1))),T=b((()=>l("br",null,null,-1))),j={key:1},F={class:"btitle"},P={class:"bform"},$=b((()=>l("br",null,null,-1))),M=b((()=>l("br",null,null,-1))),N=b((()=>l("br",null,null,-1))),q=b((()=>l("br",null,null,-1)));e("default",o(g,[["render",function(e,t,o,r,u,p){return h(),a("div",w,[l("div",v,[l("div",{class:i(["big-box",{active:u.isLogin}])},[u.isLogin?(h(),a("div",x,[y,l("div",k,[n(l("input",{type:"email",placeholder:"请输入用户名","onUpdate:modelValue":t[0]||(t[0]=e=>u.form.email=e)},null,512),[[s,u.form.email]]),u.emailError?(h(),a("span",_,"* 邮箱填写错误 *")):d("",!0),n(l("input",{type:"password",placeholder:"密码","onUpdate:modelValue":t[1]||(t[1]=e=>u.form.password=e)},null,512),[[s,u.form.password]]),u.emailError?(h(),a("span",C,"* 密码填写错误 *")):d("",!0)]),l("button",{class:"bbutton",onClick:t[2]||(t[2]=(...e)=>p.login&&p.login(...e))},"登录"),c("   "),l("span",{onClick:t[3]||(t[3]=(...e)=>p.studentForgetPwd&&p.studentForgetPwd(...e))},"忘记密码")])):(h(),a("div",R,[u.stateReg?(h(),a("div",j,[l("div",F,"欢迎！"+f(this.form.name),1),l("div",P,[n(l("input",{type:"text",placeholder:"手机号码","onUpdate:modelValue":t[9]||(t[9]=e=>u.form.phone=e)},null,512),[[s,u.form.phone]]),$,l("button",{onClick:t[10]||(t[10]=(...e)=>p.sendCode&&p.sendCode(...e))},[c("获取验证码"),n(l("span",{class:"count"},f(u.count)+" s",513),[[m,!u.show]])]),M,n(l("input",{type:"code",placeholder:"验证码","onUpdate:modelValue":t[11]||(t[11]=e=>u.form.code=e)},null,512),[[s,u.form.code]]),N,n(l("input",{type:"password",placeholder:"密码","onUpdate:modelValue":t[12]||(t[12]=e=>u.form.password=e)},null,512),[[s,u.form.password]]),q,n(l("input",{type:"password",placeholder:"确认密码","onUpdate:modelValue":t[13]||(t[13]=e=>u.form.password2=e)},null,512),[[s,u.form.password2]])]),l("button",{class:"bbutton",onClick:t[14]||(t[14]=(...e)=>p.changeRegState&&p.changeRegState(...e))},"上一步"),c("  "),l("button",{class:"bbutton",onClick:t[15]||(t[15]=(...e)=>p.register&&p.register(...e))},"注册")])):(h(),a("div",U,[V,l("div",z,[n(l("input",{type:"text",placeholder:"学号","onUpdate:modelValue":t[4]||(t[4]=e=>u.form.sid=e)},null,512),[[s,u.form.sid]]),S,u.existed?(h(),a("span",E,"* 该学号已经注册！ *")):d("",!0),n(l("input",{type:"text",placeholder:"姓名","onUpdate:modelValue":t[5]||(t[5]=e=>u.form.name=e)},null,512),[[s,u.form.name]]),I,n(l("input",{type:"text",placeholder:"学院","onUpdate:modelValue":t[6]||(t[6]=e=>u.form.college=e)},null,512),[[s,u.form.college]]),L,n(l("input",{type:"email",placeholder:"邮箱","onUpdate:modelValue":t[7]||(t[7]=e=>u.form.email=e)},null,512),[[s,u.form.email]]),T,c(" 请确认您的个人信息无误。 ")]),l("button",{class:"bbutton",onClick:t[8]||(t[8]=(...e)=>p.changeRegState&&p.changeRegState(...e))},"下一步")]))]))],2)])])}],["__scopeId","data-v-a8f50bd7"]]))}}}));

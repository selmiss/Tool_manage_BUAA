System.register(["./index-legacy-D4Q9cYOW.js"],(function(e,t){"use strict";var o,a,r,n,s,l,i,d,c,m,h,u,p,f;return{setters:[e=>{o=e._,a=e.a,r=e.E,n=e.c,s=e.b,l=e.n,i=e.w,d=e.v,c=e.d,m=e.e,h=e.t,u=e.o,p=e.p,f=e.g}],execute:function(){var t=document.createElement("style");t.textContent=".login-register[data-v-975f6a26]{width:100vw;height:100vh;box-sizing:border-box;background-image:url(/MainMenu.jpeg);background-size:1920px 980px}.contain[data-v-975f6a26]{width:60%;height:60%;position:relative;top:47%;left:50%;transform:translate(-50%,-50%);background-color:#fff;border-radius:20px;box-shadow:0 0 3px #f0f0f0,0 0 6px #f0f0f0}.big-box[data-v-975f6a26]{width:70%;height:100%;position:absolute;top:0;left:30%;transform:translate(0);transition:all 1s}.big-contain[data-v-975f6a26]{margin-top:10%;width:100%;height:100%;flex-direction:column;justify-content:center;align-items:center}.btitle[data-v-975f6a26]{font-size:1.5em;font-weight:700;color:#2c68eb}.bform[data-v-975f6a26]{width:100%;height:40%;padding:2em 0;display:flex;flex-direction:column;justify-content:space-around;align-items:center}.bform button[data-v-975f6a26]{width:20%;height:32px;align-items:center;border-radius:9px;border:1px solid rgb(141,156,207);outline:none;background-color:transparent;color:#2d68d4;font-size:.9em;cursor:pointer}.bform .errTips[data-v-975f6a26]{display:block;width:50%;text-align:left;color:red;font-size:.7em;margin-left:1em}.bform input[data-v-975f6a26]{width:50%;height:30px;border:none;outline:none;border-radius:10px;padding-left:2em;background-color:#f0f0f0}.bbutton[data-v-975f6a26]{width:20%;height:40px;border-radius:24px;border:none;outline:none;background-color:#2e78e7;color:#fff;font-size:.9em;cursor:pointer}.small-box[data-v-975f6a26]{width:30%;height:100%;background:linear-gradient(135deg,#6da6f1,#2d56dd);position:absolute;top:0;left:0;transform:translate(0);transition:all 1s;border-top-left-radius:inherit;border-bottom-left-radius:inherit}.small-contain[data-v-975f6a26]{width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center}.stitle[data-v-975f6a26]{font-size:1.5em;font-weight:700;color:#fff}.scontent[data-v-975f6a26]{font-size:.8em;color:#fff;text-align:center;padding:2em 4em;line-height:1.7em}.sbutton[data-v-975f6a26]{width:60%;height:40px;border-radius:24px;border:1px solid #fff;outline:none;background-color:transparent;color:#fff;font-size:.9em;cursor:pointer}.big-box.active[data-v-975f6a26]{left:0;transition:all .5s}.small-box.active[data-v-975f6a26]{left:100%;border-top-left-radius:0;border-bottom-left-radius:0;border-top-right-radius:inherit;border-bottom-right-radius:inherit;transform:translate(-100%);transition:all 1s}\n",document.head.appendChild(t);const g={name:"login-register",data:()=>({isLogin:!0,stateReg:!1,emailError:!1,passwordError:!1,existed:!1,form:{name:"",sid:"",college:"",email:"",password:"",code:"",phone:""},show:!0,count:"",timer:null}),methods:{sendCode(){this.timer||(console.log("已发送"),a({method:"post",url:"user/forget/sendCode",data:{acc:this.form.phone}}).then((e=>{console.log(e.data.error_code),alert("验证码已发送，请在手机信息中查看。")})),this.count=60,this.show=!1,this.timer=setInterval((()=>{this.count>0&&this.count<=60?this.count--:(this.show=!0,clearInterval(this.timer),this.timer=null)}),1e3))},studentForgetPwd(){this.$router.push("/studentForgetPwd")},changeType(){this.isLogin=!this.isLogin,this.stateReg=!1,this.form.sid="",this.form.name="",this.form.college="",this.form.email="",this.form.password=""},teacherEntry(){this.$router.push("/teacherLogin")},changeRegState(){""!=this.form.sid&&""!=this.form.name&&""!=this.form.college?this.stateReg=!this.stateReg:alert("填写不能为空！")},login(){localStorage.setItem("token","wutoken");var e=localStorage.getItem("token");console.log(e),console.log(this.form.email+" : "+this.form.password),""!=this.form.email&&""!=this.form.password?a({method:"post",url:"user/login",data:{acc:this.form.email,pwd:this.form.password}}).then((e=>{0==e.data.error_code?(console.log(e.data.hash_code),print(e.data),localStorage.setItem("uid",e.data.uid),localStorage.setItem("Mail",this.form.email),localStorage.setItem("token",e.data.hash_code),this.$router.push("/borrowRecord")):1==e.data.error_code?alert("输入有误！请重新登录。"):2==e.data.error_code?alert("请先进行注册！"):3==e.data.error_code&&alert("密码错误！请重新输入")})).catch((e=>{console.log(e)})):alert("填写不能为空！")},register(){if(""!=this.form.password&&""!=this.form.email){let e=new FormData;e.append("studentId",this.form.sid),e.append("name",this.form.name),e.append("college",this.form.college),e.append("email",this.form.email),e.append("password",this.form.password),e.append("phone",this.form.phone),a({method:"post",url:"user/register",data:e}).then((e=>{r.success(e.data.msg),this.reload()})).catch((e=>{r.error(e.response.data.msg)}))}else alert("填写不能为空！")}}},b=e=>(p("data-v-975f6a26"),e=e(),f(),e),v={class:"login-register"},w={class:"contain"},x={key:0,class:"big-contain"},y=b((()=>s("div",{class:"btitle"},"学生登录",-1))),k={class:"bform"},C={key:0,class:"errTips"},E={key:1,class:"errTips"},R={key:1,class:"big-contain"},S={key:0},_=b((()=>s("div",{class:"btitle"},"学生注册",-1))),z={class:"bform"},I=b((()=>s("br",null,null,-1))),T={key:0,class:"errTips"},U=b((()=>s("br",null,null,-1))),V=b((()=>s("br",null,null,-1))),L=b((()=>s("br",null,null,-1))),j={key:1},F={class:"btitle"},P={class:"bform"},M=b((()=>s("br",null,null,-1))),$=b((()=>s("br",null,null,-1))),D={key:0,class:"small-contain"},q=b((()=>s("div",{class:"stitle"},[m("北航工程训练中心"),s("br"),m("工具信息平台")],-1))),A=b((()=>s("p",{class:"scontent"},"尚无账号？点击下方按钮进行注册。",-1))),B=b((()=>s("br",null,null,-1))),G={key:1,class:"small-contain"},H=b((()=>s("div",{class:"stitle"},"学生，您好！",-1))),J=b((()=>s("p",{class:"scontent"},[m("注册工训中心账号，"),s("br"),m("轻松进行设备借还。")],-1))),K=b((()=>s("br",null,null,-1)));e("default",o(g,[["render",function(e,t,o,a,r,p){return u(),n("div",v,[s("div",w,[s("div",{class:l(["big-box",{active:r.isLogin}])},[r.isLogin?(u(),n("div",x,[y,s("div",k,[i(s("input",{type:"email",placeholder:"邮箱","onUpdate:modelValue":t[0]||(t[0]=e=>r.form.email=e)},null,512),[[d,r.form.email]]),r.emailError?(u(),n("span",C,"* 邮箱填写错误 *")):c("",!0),i(s("input",{type:"password",placeholder:"密码","onUpdate:modelValue":t[1]||(t[1]=e=>r.form.password=e)},null,512),[[d,r.form.password]]),r.emailError?(u(),n("span",E,"* 密码填写错误 *")):c("",!0)]),s("button",{class:"bbutton",onClick:t[2]||(t[2]=(...e)=>p.login&&p.login(...e))},"登录"),m("   "),s("button",{onClick:t[3]||(t[3]=(...e)=>p.studentForgetPwd&&p.studentForgetPwd(...e))},"忘记密码")])):(u(),n("div",R,[r.stateReg?(u(),n("div",j,[s("div",F,"欢迎！"+h(this.form.name),1),s("div",P,[i(s("input",{type:"text",placeholder:"手机号码","onUpdate:modelValue":t[9]||(t[9]=e=>r.form.phone=e)},null,512),[[d,r.form.phone]]),M,i(s("input",{type:"password",placeholder:"密码","onUpdate:modelValue":t[10]||(t[10]=e=>r.form.password=e)},null,512),[[d,r.form.password]]),$,i(s("input",{type:"password",placeholder:"确认密码","onUpdate:modelValue":t[11]||(t[11]=e=>r.form.password2=e)},null,512),[[d,r.form.password2]])]),s("button",{class:"bbutton",onClick:t[12]||(t[12]=(...e)=>p.changeRegState&&p.changeRegState(...e))},"上一步"),m("  "),s("button",{class:"bbutton",onClick:t[13]||(t[13]=(...e)=>p.register&&p.register(...e))},"注册")])):(u(),n("div",S,[_,s("div",z,[i(s("input",{type:"text",placeholder:"学号","onUpdate:modelValue":t[4]||(t[4]=e=>r.form.sid=e)},null,512),[[d,r.form.sid]]),I,r.existed?(u(),n("span",T,"* 该学号已经注册！ *")):c("",!0),i(s("input",{type:"text",placeholder:"姓名","onUpdate:modelValue":t[5]||(t[5]=e=>r.form.name=e)},null,512),[[d,r.form.name]]),U,i(s("input",{type:"text",placeholder:"学院","onUpdate:modelValue":t[6]||(t[6]=e=>r.form.college=e)},null,512),[[d,r.form.college]]),V,i(s("input",{type:"email",placeholder:"邮箱","onUpdate:modelValue":t[7]||(t[7]=e=>r.form.email=e)},null,512),[[d,r.form.email]]),L,m(" 请确认您的个人信息无误。 ")]),s("button",{class:"bbutton",onClick:t[8]||(t[8]=(...e)=>p.changeRegState&&p.changeRegState(...e))},"下一步")]))]))],2),s("div",{class:l(["small-box",{active:r.isLogin}])},[r.isLogin?(u(),n("div",D,[q,A,s("button",{class:"sbutton",onClick:t[14]||(t[14]=(...e)=>p.changeType&&p.changeType(...e))},"前往注册"),B,s("button",{class:"sbutton",onClick:t[15]||(t[15]=(...e)=>p.teacherEntry&&p.teacherEntry(...e))},"教师入口")])):(u(),n("div",G,[H,J,s("button",{class:"sbutton",onClick:t[16]||(t[16]=(...e)=>p.changeType&&p.changeType(...e))},"前往登录"),K,s("button",{class:"sbutton",onClick:t[17]||(t[17]=(...e)=>p.teacherEntry&&p.teacherEntry(...e))},"教师入口")]))],2)])])}],["__scopeId","data-v-975f6a26"]]))}}}));

<template>
    <div>
    <head-bar></head-bar>
    <div class="title" style="margin-top: 80px"><h4>修改密码</h4></div>
    <el-container>
        <el-aside width="20%" style="min-height: 600px;" ></el-aside>
            <el-main width="75%">
                <div style="margin: 0 auto; align-items: center;">
                    <el-form label-width="80px">
                        <el-form-item label="现密码" style="width: 80%">
                            <el-input v-model="password"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" style="width: 80%">
                            <el-input v-model="newPassword"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" style="width: 80%">
                            <el-input v-model="confirmPassword"></el-input>
                        </el-form-item>
                        <el-form-item style="width: 80%">
                            <el-button @click="confirm">确认修改</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-main>
        <el-aside width="5%"></el-aside>
    </el-container>
  </div>
</template>

<script>
import HeadBar from "@/components/HeadBar";
import axios from "axios";

export default({
    components:{HeadBar},
    data(){
        return {
            password : '',
            newPassword : '',
            confirmPassword : ''
        }
    },
    methods:{
        confirm(){
            if(this.confirmPassword == this.newPassword){
                axios({
                method:'post',
                url: 'http://121.4.160.157/user/reSetPwd',
                data: {
                    uid: localStorage.getItem('uid'),
                    old_pwd: this.password,
                    new_pwd: this.newPassword
                    }
                })
                .then( res => {
                    console.log(res);
                    if(res.data.error_code == 0){
                        alert('修改成功！请重新登录');
                    this.$router.push('/');
                    }
                    if(res.data.error_code == 2){
                        alert('原密码错误！');
                    }
                    if(res.data.error_code == 3){
                        alert('新密码格式错误！');
                    }
                    if(res.data.error_code == 4){
                        alert('用户不存在！');
                    }
                })
            }
            else alert('两次新密码输入不一致，请重新输入！')
        },
    }
})
</script>

<style>
    .title {
    color: #06c;
    margin-bottom: 20px;
    font-family: 微软雅黑;
    word-wrap: break-word;
    /* text-align: left; */
    font-size: 25px;
    font-weight: bold;
  }
</style>
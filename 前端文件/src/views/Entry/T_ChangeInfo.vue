<template>
    <div>
    <TeacherHeadBar></TeacherHeadBar>
    <div class="title" style="margin-top: 80px"><h4>修改个人信息</h4></div>
    <el-container>
        <el-aside width="20%" style="min-height: 600px;" ></el-aside>
            <el-main width="75%">
                <div style="margin: 0 auto; align-items: center;">
                    <el-form label-width="80px">
                        <el-form-item label="工号" style="width: 80%">
                            <el-input v-model="teacherId" type="text" :placeholder=studentId></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" style="width: 80%">
                            <el-input v-model="name" type="text" :placeholder=name></el-input>
                        </el-form-item>
                        <el-form-item style="width: 80%">
                            <el-button @click="confirm">请联系管理员修改</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-main>
        <el-aside width="5%"></el-aside>
    </el-container>
  </div>
</template>

<script>
import TeacherHeadBar from "@/components/TeacherHeadBar";
import axios from "axios";

export default({
    components:{TeacherHeadBar},
    mounted(){
        this.loadTable();
    },
    data(){
        return {
            userId : '',
            teacherId: '',
            email :'',
            name : '',
        }
    },
    methods:{
        loadTable(){
            this.userId = this.$store.state.UID;
            // console.log(localStorage.getItem('Mail'));
            console.log(localStorage.getItem('uid'));
            axios({
                method:'post',
                url: 'user/getInfo',
                data: {
                    uid: localStorage.getItem('uid')
                }
            })
            .then( res => {
                console.log(res);
                if(res.data.error_code == 0) {
                    this.name = res.data.name,
                    this.teacherId = res.data.teacherId
                }
            })
        },
        confirm(){
            console.log(localStorage.getItem('uid'));
            axios({
                method:'post',
                url: 'manager/putInfo',
                data: {
                    uid: localStorage.getItem('uid'),
                    studentId: this.studentId,
                    name: this.name,
                }
            })
            .then( res => {
                console.log(res);
                if(res.data.error_code == 0) {
                    alert('修改成功！')
                }
            })
        },
    }
})
</script>

<style>
    .title {
    color: rgb(204, 122, 0);
    margin-bottom: 20px;
    font-family: 微软雅黑;
    word-wrap: break-word;
    /* text-align: left; */
    font-size: 25px;
    font-weight: bold;
  }
</style>
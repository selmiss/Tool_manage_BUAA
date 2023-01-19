<template>
	<view>
		<uni-title type="h1" align="center" title="填写个人信息"></uni-title>
		<view style="width: 80%;margin-left: 10%;">
			<uni-forms :modelValue="form" label-position="left">
					<uni-forms-item label="工号" name="name">
						<uni-easyinput v-model="form.tId" type="text"  placeholder="您的学号" />
					</uni-forms-item>
					<uni-forms-item label="姓名" name="name">
						<uni-easyinput v-model="form.name" type="text"  placeholder="您的姓名" />
					</uni-forms-item>
					<uni-forms-item label="邮箱" name="name">
						<uni-easyinput v-model="form.email" type="text"  placeholder="您的邮箱" />
					</uni-forms-item>
					<uni-forms-item label="电话" name="name">
						<uni-easyinput v-model="form.number" type="text"  placeholder="您的电话" />
					</uni-forms-item>
					<uni-forms-item label="密码" name="name">
						<uni-easyinput v-model="form.password" type="text"  placeholder="您的密码" />
					</uni-forms-item>
					<uni-forms-item label="确认密码" name="name">
						<uni-easyinput v-model="form.password1" type="text"  placeholder="重新输入您的密码" />
					</uni-forms-item>
					
				</uni-forms>
				<view style="width: 40%;margin-left: 30%;">
					<button @click="register()">提交</button>           //记得这里需要分配token
				</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				form:{},
			}
		},
		methods:{
			register(){
				if(form.password1==form.password){
					uni.requst({
						uni.request({
							header: {'Authorization':getApp().globalData.token,
										'content-type':'application/x-www-form-urlencoded'},
							url: getApp().globalData.urlRoot + "/",
							data:{'tId':this.toolInfo.tId,
									'name':this.toolInfo.name,
									'email':this.toolInfo.email,
									'number':this.toolInfo.number,
									'password':this.toolInfo.password,
									},
							method:"POST",
							success: (res) => {
								if (res.data.error_code === 0) {
									console.log('登陆成功')
									uni.reLaunch({
										url: ''  //跳转路由
									})
								}
							},
						})
					})
				}else{
					
				}
			},
		}
	}
</script>

<style>
	.input {
		height: 60rpx;
	}
</style>
<template>
	<view>
		<uni-title type="h1" align="center" title="填写个人信息"></uni-title>
		<view style="width: 80%;margin-left: 10%;">
			<uni-forms :modelValue="form" label-position="left">
					<uni-forms-item label="学号" name="name">
						<uni-easyinput v-model="userInfo.studentId" type="text"  placeholder="您的学号" />
					</uni-forms-item>
					<uni-forms-item label="姓名" name="name">
						<uni-easyinput v-model="userInfo.name" type="text"  placeholder="您的姓名" />
					</uni-forms-item>
					<uni-forms-item label="学院" name="name">
						<uni-easyinput v-model="userInfo.college" type="text"  placeholder="您的学院" />
					</uni-forms-item>
					<uni-forms-item label="邮箱" name="name">
						<uni-easyinput v-model="userInfo.email" type="text"  placeholder="您的邮箱" />
					</uni-forms-item>
					<uni-forms-item label="电话" name="name">
						<uni-easyinput v-model="userInfo.number" type="text"  placeholder="您的电话" />
					</uni-forms-item>
					<uni-forms-item label="密码" name="name">
						<uni-easyinput v-model="userInfo.password" type="text"  placeholder="您的密码" />
					</uni-forms-item>
					<uni-forms-item label="确认密码" name="name">
						<uni-easyinput v-model="userInfo.password1" type="text"  placeholder="重新输入您的密码" />
					</uni-forms-item>
				</uni-forms>
				<view style="width: 40%;margin-left: 30%;">
					<button @click="register()">注册</button>
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
				
			}
		}
	}
</script>

<style>
	.input {
		height: 60rpx;
	}
</style>
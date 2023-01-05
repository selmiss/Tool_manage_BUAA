<template>
	<view>
		<uni-title type="h1" align="center" title="修改个人信息"></uni-title>
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
				</uni-forms>
				<view style="width: 40%;margin-left: 30%;">
					<button @click="change">确认修改</button>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{}
			}
		},
		onShow() {
			if (getApp().globalData.uid === -1) {
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
			uni.request({
				url: getApp().globalData.urlRoot+"/user/getInfo",
				data: {uid: getApp().globalData.uid},
				method:"POST",
				success: (res) => {
					console.log(res)
					if (res.data.error_code === 0) {
						this.isLogin = 1;
						this.userInfo = res.data;
					}
				}
			})
		},
		methods: {
			change(){

				console.log(this.userInfo);
				uni.request({
					url: getApp().globalData.urlRoot+"/user/putInfo",
					data:{
						uid:getApp().globalData.uid,
						college: this.userInfo.college,
						name: this.userInfo.name,
						studentId: this.userInfo.studentId
					},
					method:"POST",
					success: (res) => {
						if (res.data.error_code === 0){
							uni.showToast({
								title:"修改成功",
								icon: 'none'
							})
							uni.reLaunch({
								url:"/pages/index/index"
							})
						} else {
							uni.showToast({
								title:"修改失败，请联系管理员",
								icon: 'none'
							})
						}
						
					}
				})
			}
		}
	}
</script>

<style>
.input {
	height: 60rpx;
}
</style>

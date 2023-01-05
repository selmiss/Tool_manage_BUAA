<template>
	<view>
		<uni-title type="h1" align="center" title="修改密码"></uni-title>
		<view style="width: 80%;margin-left: 10%;">
			<uni-forms :modelValue="form" label-position="left">
					<uni-forms-item labelWidth="150rpx" label="原密码" name="name">
						<uni-easyinput v-model="old_pwd" type="password"  placeholder="" />
					</uni-forms-item>
					<uni-forms-item labelWidth="150rpx" label="新密码" name="name">
						<uni-easyinput v-model="new_pwd1" type="password"  placeholder="" />
					</uni-forms-item>
					<uni-forms-item labelWidth="150rpx" label="确认密码" name="name">
						<uni-easyinput v-model="new_pwd2" type="password"  placeholder="" />
					</uni-forms-item>
						<text style="color: gray;font-size: 14px;">密码需要包含数字和字母，且长度在8位及以上</text>
				</uni-forms>
				<view style="width: 40%;margin-left: 30%;margin-top: 50rpx;">
					<button @click="change_pwd">确认修改</button>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				old_pwd:"",
				new_pwd1:"",
				new_pwd2:""
			}
		},
		onShow() {
			if (getApp().globalData.uid === -1) {
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
		},
		methods: {
			change_pwd() {
				if (this.new_pwd1 != this.new_pwd2) {
					uni.showToast({
						title:"两次新密码不一致!",
						icon:"none"
					})
					this.new_pwd1 = "";
					this.new_pwd2 = "";
				}
				uni.request({
					url: getApp().globalData.urlRoot+"/user/reSetPwd",
					data:{
						old_pwd: this.old_pwd,
						new_pwd: this.new_pwd1,
						uid: getApp().globalData.uid
					},
					method:"POST",
					success: (res) => {
						if (res.data.error_code === 2) {
							uni.showToast({
								title:"原密码不正确",
								icon:"none"
							})
						} else if (res.data.error_code === 0 ){
							uni.showToast({
								title:"修改成功",
								icon:"none"
							})
							uni.reLaunch({
								url:"/pages/index/index"
							})
						} else {
							uni.showToast({
								title:"请注意密码格式",
								icon:"none"
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

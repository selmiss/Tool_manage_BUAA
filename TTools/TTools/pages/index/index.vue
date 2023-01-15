<template>
	<view class="container">
			<img src="../../static/MainMenu.jpeg" alt="">
			<view v-if="isLogin === 0">
			<uni-title type="h1" v-if="!isManager" title="学生登录"></uni-title>
			<uni-title type="h1" v-if="isManager" color="orange" title="教师登录"></uni-title>
			<uni-forms :modelValue="form" label-position="top">
						<uni-forms-item label="邮箱" name="name">
							<uni-easyinput type="text" v-model="form.email" placeholder="请输入邮箱" />
						</uni-forms-item>
						<uni-forms-item label="密码" name="name">
							<uni-easyinput type="password" v-model="form.password" placeholder="请输入密码" />
							<view style="margin-top: 20rpx;margin-left: 10rpx; text-align: right;">
								<view @click="toweb" style="display: inline-block; width: 120rpx;">
									<navigator url="" hover-class="navigator-hover" style="color: skyblue;text-decoration: underline;">
										忘记密码
									</navigator>
								</view>
								<view @click="toweb" style="display: inline-block; width: 120rpx;">
									<navigator url="" hover-class="navigator-hover" style="color: skyblue;text-decoration: underline;">
										立即注册
									</navigator>
								</view>
							</view>
							<uni-fab ref="fab" :pattern="pattern" :content="content" horizontal="right" vertical="bottom"
										:direction="direction" @trigger="trigger" @fabClick="fabClick" />
						</uni-forms-item>

					</uni-forms>
					<button @click="submitLogin" size="default" type="default">登录</button>
				</view>
				<view v-if="isLogin === 1">
					<uni-section titleFontSize="18px" title="已登录" type="line">
						<uni-card :title="userInfo.name" :extra="'学工号:'+userInfo.studentId">
							<text class="uni-body">{{userInfo.college}}</text><p></p>
							<text class="uni-body">邮箱:{{userInfo.acc}}</text><p></p>
							<text class="uni-body">电话:{{userInfo.phoneNumber}}</text>
							<view slot="actions" class="card-actions no-border">
							 <view class="card-actions-item" @click="logout" style="text-align: right;">
							 	<text class="card-actions-item-text" style="color:skyblue">注销登录</text>
							 </view>
							</view>
						</uni-card>
						<uni-grid :column="3" :highlight="true" :square="true"   :show-border="false" >
							<uni-grid-item>
								<view @click="changePassword" class="grid-item-box" style="background-color: #fff;">
									<uni-icons type="eye-filled" size="30"></uni-icons>
									<text class="text">修改密码</text>
								</view>
							</uni-grid-item>
							<uni-grid-item>
								<view  @click="editInfo" class="grid-item-box" style="background-color: #fff;">
									<uni-icons type="person" size="30"></uni-icons>
									<text class="text">修改信息</text>
								</view>
							</uni-grid-item>
							<uni-grid-item>
								<view @click="goTools" class="grid-item-box" style="background-color: #fff;">
									<uni-icons type="settings-filled" size="30"></uni-icons>
									<text class="text">借用工具</text>
								</view>
							</uni-grid-item>
							
						</uni-grid>
					</uni-section>
					
				</view>
		<uni-popup ref="toWeb" type="top" background-color="#fff">
				<view class="popup-content" ><p class="text">请在浏览器中打开:</p><uni-link href="http://121.4.160.157:8080/" text="http://121.4.160.157:8080/"></uni-link></view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				target:"",
				isManager: false,
				isLogin:0,
				userInfo:{},
				pattern: {
							color: '#7A7E83',
							backgroundColor: '#fff',
							selectedColor: '#007AFF',
							buttonColor: '#007AFF',
							iconColor: '#fff'
						},

				
				content: [{
							iconPath: 'https://img2.baidu.com/it/u=546153345,3989268214&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
							selectedIconPath: 'https://img2.baidu.com/it/u=546153345,3989268214&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
							text: '学生',
							active: true
						},
						{
							iconPath: 'https://img1.baidu.com/it/u=3315202342,1207980959&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
							selectedIconPath: 'https://img1.baidu.com/it/u=3315202342,1207980959&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
							text: '教师',
							active: false
						}
					],
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				form: {
					email: '',
					password: ''
				}
			}
		},
		onShow() {
			console.log(getApp().globalData.uid)
			uni.request({
				 header: {'Authorization':getApp().globalData.token},
				url: getApp().globalData.urlRoot+"/user/getInfo",
				data: {uid: getApp().globalData.uid},
				method:"POST",
				success: (res) => {
					console.log(res)
					if (res.data.error_code === 0) {
						this.isLogin = 1;
						this.userInfo = res.data;
					} else {
						this.isLogin = 0;
					}
				}
			})
		},
		methods: {
			logout() {
				this.isLogin = 0;
				getApp().globalData.uid = -1;
				uni.request({
					 header: {'Authorization':getApp().globalData.token},
					url: getApp().globalData.urlRoot+"/user/unLogin",
					data: {uid: getApp().globalData.uid},
					method:"POST",
					success: (res) => {
						console.log(res)
						if (res.data.error_code === 0) {
							this.isLogin = 1;
							this.userInfo = res.data;
							getApp().globalData.token="wutoken"
						}
					}
				})
			},
			toweb() {
				this.$refs.toWeb.open();
			},
			goTools() {
				uni.navigateTo({
					url: '/pages/stu-Main/stu-Main'
				})
			},
			editInfo() {
				uni.navigateTo({
					url: '/pages/self/self'
				})
			},
			changePassword() {
				uni.navigateTo({
					url:"/pages/newPassword/newPassword"
				})
			},
			submitLogin() {
				getApp().globalData.token='wutoken';
				console.log(this.form);
				this.target = "/user/login"
				if (this.isManager) {
					this.target = "/manager/Login";
				}
				console.log(this.target)
				console.log(getApp().globalData.token)
				uni.request({
					 header: {'Authorization':getApp().globalData.token},
					url: getApp().globalData.urlRoot+this.target,
					data: {'acc':this.form.email,'pwd':this.form.password},
					 header: {'Authorization':getApp().globalData.token},
					method: 'POST',
					success : (res) => {
						console.log(res.data);
						if (res.data.error_code == 0) {
							getApp().globalData.uid = res.data.uid;
							getApp().globalData.token=res.data.hash_code;
							uni.showToast({
								title: "登录成功！",
								icon: 'none'
							})
							if (this.isManager) {
								uni.navigateTo({
									url:"/pages/Teacher/tea-main/tea-main"
								})
							} else {
								uni.request({
									 header: {'Authorization':getApp().globalData.token},
									url: getApp().globalData.urlRoot+"/user/getInfo",
									data: {uid: getApp().globalData.uid},
									method:"POST",
									success: (res) => {
										if (res.data.error_code === 0) {
											this.isLogin = 1;
											this.userInfo = res.data;
										
										}
									}
								})
							}
							
						} else if (res.data.error_code == 2 || res.data.error_code == 4) {
							uni.showToast({
								title: String("用户名或密码不正确！"),
								icon: 'none'
							})
						}
						//存储全局变量
						
					}
				})
			},
			fabClick() {
						uni.showToast({
							title: '切换登录方式',
							icon: 'none'
						})
					},
			trigger(e) {
					console.log(e)
					if(e.index	=== 1){
						this.content[e.index].active = !e.item.active
						this.content[0].active = !e.item.active
						this.isManager = true
					}
					else {
						this.content[e.index].active = !e.item.active
						this.content[1].active = !e.item.active
						this.isManager = false
					}
					// uni.showModal({
					// 	title: '提示',
					// 	content: `您${this.content[e.index].active ? '选中了' : '取消了'}${e.item.text}`,
					// 	success: function(res) {
					// 		if (res.confirm) {
					// 			console.log('用户点击确定')
					// 		} else if (res.cancel) {
					// 			console.log('用户点击取消')
					// 		}
					// 	}
					// })
				},
		}
	}
</script>

<style lang="scss">
		.image {
			width: 25px;
			height: 25px;
		}
	
		.text {
			font-size: 14px;
			margin-top: 5px;
		}
		.grid-dynamic-box {
				margin-bottom: 15px;
			}
		
			.grid-item-box {
				flex: 1;
				margin: 10rpx;
				margin-bottom: 10rpx;
				border-radius: 20rpx;
				border:  solid 10rpx;
				border-color: aqua;
				display: flex;
				
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 15px 0;
			}
		
			.grid-item-box-row {
				flex: 1;
				
				display: flex;

				flex-direction: row;
				align-items: center;
				justify-content: center;
				padding: 15px 0;
			}
		
			.grid-dot {
				position: absolute;
				top: 5px;
				right: 15px;
			}
.swiper {
		height: 420px;
	}

	
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
	.title {
		width: 100rpx;
	}
	.popup-content {

			align-items: center;
			justify-content: center;
			padding: 15px;
			height: 50px;
			background-color: #fff;
		}
</style>

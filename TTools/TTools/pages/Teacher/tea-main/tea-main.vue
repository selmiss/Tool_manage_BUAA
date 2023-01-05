<template>
	<view class="container">
		<image src="../../../static/flower.jpg"></image>
		<view style="margin-left: 45rpx;color: orange;margin-top: 30rpx;font-size: 20px;">
			<text>工具管理系统</text>
			<view @click="logout" style="font-size: 14px;color:orangered;text-align: right;margin-right: 30rpx;">注销登录</view>
		</view>
		<uni-card title="审批管理" extra="">
			<view class="functions">
				<uni-grid :column="3" :highlight="true" :square="true"   :show-border="false" >
					<uni-grid-item>
						<view @click="borrow1" class="grid-item-box" style="background-color: #fff;">
							<uni-icons type="settings" size="20"></uni-icons>
							<text class="text">借用审批</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view  @click="borrow2" class="grid-item-box" style="background-color: #fff;">
							<uni-icons type="calendar-filled" size="20"></uni-icons>
							<text class="text">延期审批</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view @click="borrow3" class="grid-item-box" style="background-color: #fff;">
							<uni-icons type="undo-filled" size="20"></uni-icons>
							<text class="text">归还审批 </text>
						</view>
					</uni-grid-item>
					
				</uni-grid>
			</view>
		</uni-card>
		<uni-card title="工具管理" extra="">
			<view class="functions">
				<uni-grid :column="3" :highlight="true" :square="true"   :show-border="false" >
					<uni-grid-item>
						<view @click="tool1" class="grid-item-box" style="background-color: #fff;">
							<uni-icons type="list" size="20"></uni-icons>
							<text class="text">工具列表</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view  @click="tool2" class="grid-item-box" style="background-color: #fff;">
							<uni-icons type="compose" size="20"></uni-icons>
							<text class="text">编辑工具</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view @click="tool3" class="grid-item-box" style="background-color: #fff;">
							<uni-icons type="plus" size="20"></uni-icons>
							<text class="text">新增工具</text>
						</view>
					</uni-grid-item>
					
				</uni-grid>
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
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
			borrow1() {
				uni.navigateTo({
					url:"/pages/Teacher/tea-main/check-borrow"
				})
			},
			borrow2() {
					uni.navigateTo({
						url:"/pages/Teacher/tea-main/delay-borrow"
					})
			},
			borrow3() {
					uni.navigateTo({
						url:"/pages/Teacher/tea-main/return-borrow"
					})
			},
			tool1() {
				uni.navigateTo({
					url:"/pages/Teacher/tool-main/tool-list"
				})
			},
			tool2() {
				uni.navigateTo({
					url:"/pages/Teacher/tool-main/choose-tool"
				})
			},
			tool3() {
				uni.navigateTo({
					url:"/pages/Teacher/tool-main/new-tool"
				})
			},
			logout(){
				getApp().globalData.uid = -1;
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style>
	.functions{
		

	}
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
				width: 175rpx;
				height: 50rpx;


				border-radius: 50rpx;
				border:  solid 10rpx;
				border-color: aqua;
				display: flex;
				
				flex-direction: column;
				align-items: center;
				justify-content: center;

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

.container{
  width: 100%;
  height: 1400rpx;
  margin: 0;
  padding: 0;
  position: relative;
}
image{
	z-index: -1;
	top: 800rpx;
	position: absolute;
	width: 100%;
	height: 700rpx;
}
</style>

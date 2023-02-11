<template>
	<view>
		<uni-fab ref="fab" :pattern="pattern"  horizontal="right" vertical="top"
					@fabClick="toBorrow" />
		<view class="mainlist">
		<uni-section  :title="title" subTitleFontSize="16px" :subTitle="username" titleFontSize="20px" type="line" >
				
					<uni-card v-for="(item, index) in toolList" :title="item.toolName" :sub-title="item.startTime+' 到 '+item.returnTime" :extra="'数量:'+item.borrowCount" :thumbnail="avatar" @click="onClick">
					
						<uni-row class="demo-uni-row" :width="nvueWidth">
								<uni-col :span="4">
									<view class="demo-uni-col light">
										状态:
									</view>
								</uni-col>
								<uni-col :span="6">
									<view class="demo-uni-col uni-dark">
										<button v-if="item.status==='F'" class="uni-button" size="mini" type="primary">已归还</button>
										<button v-if="item.status==='A'" style="background-color: beige;" class="uni-button" size="mini" type="default">借用中</button>
										<button v-if="item.status==='R'" class="uni-button" size="mini" type="warn">被拒绝</button>
										<button v-if="item.status==='W'" style="background-color:aqua" class="uni-button" size="mini" type="default">审核中</button>
									</view>
								</uni-col>
								<uni-col :span="6">
									<view class="demo-uni-col  light">
										操作:
									</view>
								</uni-col>
								<uni-col :span="8">
									<view class="demo-uni-col uni-dark">
										<button v-if="item.status === 'A'" style="background-color:blanchedalmond;" class="uni-button" size="mini" type="default" @click="showMore(index)">申请续借</button>
										<button v-else-if="item.status === 'W'" style="background-color:blanchedalmond;" class="uni-button" size="mini" type="default" @click="withDraw(index)">撤销申请</button>
										<button v-else disabled="true" style="background-color:blanchedalmond;" class="uni-button" size="mini" type="default">无操作</button>
									</view>
								</uni-col>
						</uni-row>
						<uni-row  class="demo-uni-row" :width="nvueWidth">
							<uni-col :span="8">
								<view class="demo-uni-col uni-dark">
									<button v-if="item.status === 'A'" style="background-color:blanchedalmond;" class="uni-button" size="mini" type="default" @click="seeMessage(item)">借用信息</button>
								</view>
							</uni-col>
						</uni-row>
					</uni-card>
					
				</uni-section>
				<!-- 普通弹窗 -->

				<uni-popup ref="message" type="dialog">
					<view class="info">
					<uni-section class="mb-10" type="line">
						<view style="margin-left: 50rpx;padding-bottom: 50rpx;">
						<p>地点    :{{this.nowInfo.address}}</p>
						<p>领取日期:{{this.nowInfo.getdate}}</p>
						<p>开始时间:{{this.nowInfo.sttime}}</p>
						<p>结束时间:{{this.nowInfo.endtime}}</p>
						</view>
					</uni-section>
					</view>
				</uni-popup>
	
	
				
				<uni-popup ref="popup1" background-color="#fff" >
					<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
						<uni-card  @click="onClick">
						
							<!-- <image slot='cover' style="width: 100%;" :src="cover"></image> -->
							<text style="font-weight: 800;">{{name}}</text>
							<view>
								<uni-section title="*撤销理由" type="line" padding>
											<uni-easyinput type="textarea" v-model="purpose"  placeholder="请输入内容"></uni-easyinput>
										</uni-section>
							</view>
							
							
							<view slot="actions" class="card-actions">
								<view class="card-actions-item2">
									<button style="width: 70%;" size="mini" @click="actionsClick('取消')">取消</button>
								</view>
								
								<view class="card-actions-item2">
									<button style="width: 70%;" type="primary" size="mini" @click="RepealRenew()">确定</button>
								</view>
							</view>
						</uni-card>
					</view>
				</uni-popup>
				
				
				<uni-popup ref="popup" background-color="#fff" >
					<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
						<uni-card  @click="onClick">
						
							<!-- <image slot='cover' style="width: 100%;" :src="cover"></image> -->
							<text style="font-weight: 800;">{{name}}</text>
							
						
							<view class="example-body">
								<uni-section title="*借用时间" type="line" padding>
										<uni-datetime-picker v-model="range" type="date" />
								</uni-section>
							</view>
							<view>
								<uni-section title="*续借理由" type="line" padding>
											<uni-easyinput type="textarea" v-model="purpose"  placeholder="请输入内容"></uni-easyinput>
										</uni-section>
							</view>
							
							
							<view slot="actions" class="card-actions">
								<view class="card-actions-item2">
									<button style="width: 70%;" size="mini" @click="actionsClick('取消')">取消</button>
								</view>
								
								<view class="card-actions-item2">
									<button style="width: 70%;" type="primary" size="mini" @click="submitBorrow()">确定</button>
								</view>
							</view>
						</uni-card>
					</view>
				</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				range:"",
				purpose:"",
				name:"",
				toolId:-1,
				username: 'JING',
				nowInfo :{},
				title : "工具借用列表",
				toolList:[
					{
						toolName: '\u70ed\u7194\u80f6\u68d2',
						borrowCount: 1,
						startTime: '2022-10-17',
						returnTime: '2022-10-19',
						status: "F",
						label: 6,
						requestId: 42
					},
					{
						toolName: '\u70ed\u7194\u80f6\u68d2',
						borrowCount: 1,
						startTime: '2022-10-17',
						returnTime: '2022-10-19',
						status: "F",
						label: 6,
						requestId: 42
					}
				],
				pattern: {
							color: '#488800',
							backgroundColor: '#fff',
							selectedColor: '#007AFF',
							buttonColor: '#00ff00',
							iconColor: '#fff'
						},
			}
		},
		methods: {
			seeMessage(item) {
				this.nowInfo = item
				this.$refs.message.open()
			},
			submitBorrow() {
				uni.request({
					 header: {'Authorization':getApp().globalData.token},
					url: getApp().globalData.urlRoot+ "/user/applyPostpone",
					data:{
						uid: getApp().globalData.uid,
						requestId: this.toolId,
						postponeTime: this.range,
						purpose: this.purpose
					},
					method:"POST",
					success: (res) => {
						if (res.data.error_code === 0){
							uni.showToast({
								title: "续借成功，请耐心等待审核！",
								icon: 'none'
							})
							this.$refs.popup.close();
							this.getToolList();
						}
					}
				})
			},
			RepealRenew() {
				uni.request({
					 header: {'Authorization':getApp().globalData.token},
					url: getApp().globalData.urlRoot+ "/user/repealRequest",
					data:{
						uid: getApp().globalData.uid,
						requestId: this.toolId,
						purpose: this.purpose
					},
					method:"POST",
					success: (res) => {
						if (res.data.error_code === 0){
							uni.showToast({
								title: "撤销成功",
								icon: 'none'
							})
							this.$refs.popup1.close();
							this.getToolList();
						}
					}
				})
			},
			withDraw(index){
				this.name = this.toolList[index].toolName
				this.toolId = this.toolList[index].requestId
				this.$refs.popup1.open('center')
			},
			showMore(index) {
				this.name = this.toolList[index].toolName
				this.toolId = this.toolList[index].requestId
				this.$refs.popup.open('center')
			},
			toBorrow() {
				uni.navigateTo({
					url: '/pages/ToolCats/ToolCats'
				})
			},
			getToolList() {
				uni.request({
					 header: {'Authorization':getApp().globalData.token},
					url: getApp().globalData.urlRoot+"/user/allBorrowList",
					data: {uid: getApp().globalData.uid},
					method: 'POST',
					success : (res) => {
						console.log(res.data);
						this.toolList = res.data.requestList;
					}
				})
			},
			actionsClick(text){
							this.$refs.popup.close()
								this.$refs.popupinfo.close()
						}
		},
		created() {
			if (getApp().globalData.uid === -1) {
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
			this.getToolList();
		},
		onPullDownRefresh() {
			if (getApp().globalData.uid === -1) {
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
			this.getToolList();
		}
	}
</script>

<style>
	.card-actions-item {
		display: inline-block;
		width: 45%;
		text-align: center;
		border: whitesmoke 1px solid;
		height: 80rpx;
		margin-bottom: 20rpx;
	}
	.card-actions-item2 {
		display: inline-block;
		width: 45%;
		text-align: center;
	
		height: 80rpx;
		margin-bottom: 20rpx;
	}
	.card-actions-item-text {
		font-size: 16px;
		line-height: 80rpx;
		font-weight: 200;
		vertical-align: middle;
	}
	.popup-content {
					align-items: center;
					justify-content: center;
					padding: 15px;
					height: auto;
					background:transparent;
	}
.light {
	text-align: right;
	margin-right: 20rpx;
}
.head {
	display: inline-block;
}
.mainlist {
	padding-top: 30rpx;
}
</style>

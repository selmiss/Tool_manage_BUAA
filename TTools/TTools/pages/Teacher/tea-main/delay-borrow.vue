<template>
	<view>
		<uni-section  title="待审批延期借用申请" subTitleFontSize="16px" :subTitle="'未审批数量:'+borrow_list.length" titleFontSize="20px" type="line" >
				
					<uni-card v-for="(item, index) in borrow_list" :title="item.toolName" :sub-title="item.startTime+' 到 '+item.returnTime+' 延期至'+item.postPoneTime" :extra="'数量:'+item.borrowCount" :thumbnail="avatar" @click="onClick">
						<uni-row class="demo-uni-row" :width="nvueWidth">
							<p>{{item.requestUserName}}:{{item.purpose}}</p>
						</uni-row>
						<p></p>
						<uni-row class="demo-uni-row" :width="nvueWidth">
								<uni-col :span="3">
									<view class="demo-uni-col  light">
										操作:
									</view>
								</uni-col>
								<uni-col :span="8">
									<view class="demo-uni-col uni-dark">
										<button  style="background-color:whitesmoke;" class="uni-button" size="mini" type="default" @click="seeMessage(index)">查看信息</button>
									</view>
								</uni-col>
								<uni-col :span="6">
									<view class="demo-uni-col uni-dark">
										<button  style="background-color:hotpink;" class="uni-button" size="mini" type="default" @click="approve(item.requestId,0)">拒绝</button>
									</view>
								</uni-col>
								<uni-col :span="5">
									<view class="demo-uni-col uni-dark">
										<button  style="background-color:palegreen;" class="uni-button" size="mini" type="default"  @click="approve(item.requestId,1)">同意</button>
									</view>
								</uni-col>
								
								
						</uni-row>
					</uni-card>
					
				</uni-section>
				<view class="pops">
					<uni-popup ref="seeInfo" type="dialog">
						<view class="info">
						<uni-section class="mb-10" :title="nowInfo.requestUserName" :sub-title="nowInfo.stuCollege" type="line">
							<view style="margin-left: 50rpx;padding-bottom: 50rpx;">
							<p>邮箱:{{nowInfo.stuEmail}}</p>
							<p>电话:{{nowInfo.phoneNumber}}</p>
							</view>
						</uni-section>
						</view>
					</uni-popup>
					<uni-popup ref="refuseDialog" type="dialog">
						<uni-popup-dialog ref="inputClose" mode="input" title="拒绝" value=""
							placeholder="请输入拒绝理由" @confirm="refuse"></uni-popup-dialog>
					</uni-popup>
				</view>
				<uni-popup ref="agree" type="dialog">

					<view class="agreeDialog" style="font-size: 20px;width: 600rpx;height: 800rpx; padding-left: 40rpx;padding-right: 40rpx;">
						<uni-section title="领取信息" titleFontSize="20px" type="line">
						<view class="uni-list">
							<view class="uni-list-cell" style="margin-top: 40rpx;">
								<view class="uni-list-cell-left" style="margin-left: 50rpx; display: inline-block;">
									领取日期:
								</view>
								<view class="uni-list-cell-db" style="margin-left: 50rpx;display: inline-block;border: skyblue 2rpx solid;">
									<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
										<view class="uni-input">{{date}}</view>
									</picker>
								</view>
							</view>
							<view class="uni-list-cell" style="margin-top: 60rpx;">
								<view class="uni-list-cell-left" style="margin-left: 50rpx; display: inline-block;">
									开始领取时间:
								</view>
								<view class="uni-list-cell-db" style="margin-left: 50rpx;display: inline-block;border: skyblue 2rpx solid;">
									<picker mode="time" :value="startTime" start="08:30" end="18:30" @change="bindTimeChange">
										<view class="uni-input">{{startTime}}</view>
									</picker>
								</view>
							</view>
							<view class="uni-list-cell" style="margin-top: 60rpx;">
								<view class="uni-list-cell-left" style="margin-left: 50rpx; display: inline-block;">
									结束领取时间:
								</view>
								<view class="uni-list-cell-db" style="margin-left: 50rpx;display: inline-block;border: skyblue 2rpx solid;">
									<picker mode="time" :value="endTime" start="08:30" end="22:30" @change="bindTimeChange2">
										<view class="uni-input">{{endTime}}</view>
									</picker>
								</view>
							</view>
							<view class="uni-list-cell" style="margin-top: 60rpx;">
								<view class="abc" style="margin-left: 50rpx; float: left; line-height: 50rpx;">领取地点:</view>
								<input class="uni-input" style="margin-left: 50rpx;display: inline-block;border: skyblue 2rpx solid; " v-model="position" />
							</view>
							<view class="uni-list-cell" style="margin-top: 60rpx;text-align: center;">
								<button type="default" style="display: inline-block;" @click="cancel">取消</button>
								<button type="default" style=" background-color: bisque;;margin-left: 50rpx;display: inline-block;" @click="lend">借出</button>
							</view>
						</view>
						</uni-section>
					</view>
				</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
			        format: true
			    })
			return {
				borrow_list:[{
					toolName:"",
					toolId:0,
					requestUserName:"",
					userId:"",
					borrowCount:0,
					phoneNumber:"",
					purpose:"",
					requestId:0,
					returnTime:"",
					startTime:"",
					stuCollege:"",
					stuEmail:""
				}],
				nowInfo:{
					toolName:"",
					toolId:0,
					requestUserName:"",
					userId:"",
					borrowCount:0,
					phoneNumber:"",
					purpose:"",
					requestId:0,
					returnTime:"",
					startTime:"",
					stuCollege:"",
					stuEmail:""
				},
				refuse_reason:"",
				refuse_id:0,
				date:currentDate,
				startTime:"08:30",
				endTime:"18:30",
				position:"工程训练中心南208",
				agree_id:0
			}
		},
		computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		    },
		onShow() {
			if (getApp().globalData.uid === -1) {
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
			this.getBorrowList();
		}
		,
		methods: {
			cancel() {
				this.$refs.agree.close();
			},
			lend() {
				uni.request({
					url: getApp().globalData.urlRoot+"/manager/approvePostponeRequest",
					data: {
						refuseReason:"",
						requestId:this.agree_id,
						status:"Accept"
					},
					method:"POST",
					success: (res) => {
						if (res.data.error_code === 0) {
							this.$refs.agree.close();
							uni.showToast({
								title:"成功借出",
								icon:"none"
							})
							this.getBorrowList();
						}
					}
				})
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			bindTimeChange: function(e) {
				this.startTime = e.detail.value
			},
			bindTimeChange2: function(e) {
				this.endTime = e.detail.value
			},
			getDate(type) {
					const date = new Date();
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();
		
					if (type === 'start') {
						year = year - 60;
					} else if (type === 'end') {
						year = year + 2;
					}
					month = month > 9 ? month : '0' + month;
					day = day > 9 ? day : '0' + day;
					return `${year}-${month}-${day}`;
			    },
			maskClick(e){
				console.log('maskClick事件:', e);
			},
			before_refuse() {
				this.$refs.refuseDialog.open();
			},
			approve(id, op) {
				if (op === 0) {
					this.before_refuse();
					this.refuse_id = id;
				} else if (op === 1) {
					this.agree_id = id;
					this.lend();
				}
			},
			refuse(val) {
				this.refuse_reason = val;
				this.$refs.inputClose.val = ""
				this.$refs.inputClose.close()
				console.log(this.refuse_id,this.refuse_reason)
				uni.request({
					url: getApp().globalData.urlRoot+"/manager/approvePostponeRequest",
					data:{
						refuseReason:this.refuse_reason,
						requestId:this.refuse_id,
						status:"Refuse"
					},
					method:"POST",
					success: (res) => {
						if (res.data.error_code === 0) {
							uni.showToast({
								title:"拒绝成功",
								icon:"none"
							})
							this.getBorrowList();
						}
					}
				})
			},
			seeMessage(index) {
				this.nowInfo = this.borrow_list[index]
				this.$refs.seeInfo.open()
			},
			getBorrowList() {
				uni.request({
					url: getApp().globalData.urlRoot+"/manager/getPostponeRequestList",
					data:{},
					method:"POST",
					success: (res) => {
						this.borrow_list = res.data.data_list;
					}
				})
			}
		}
	}
</script>

<style>
.info {

	width: 500rpx;

}
</style>

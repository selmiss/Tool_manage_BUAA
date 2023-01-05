<template>
	<view>
		<view class="listInfo">
			<uni-section title="工具借用" subTitle="" titleFontSize="20px" subTitleFontSize="18px" type="line">
						<uni-grid :column="2" :highlight="true" :square="false" >
										<uni-grid-item v-for="(item, index) in toolList" :index="index" :key="index">
											<view class="grid-item-box" style="background-color: #fff;">
												<!-- Card start -->
												<uni-card  @click="onClick">
													<template v-slot:cover>
															<view class="custom-cover">
																<image style="width: 120%; height: 300rpx;  margin-left: -20rpx;" class="cover-image" mode="heightFix" :src="item.url">
																</image>
															</view>
														</template>
													<!-- <image slot='cover' style="width: 100%;" :src="cover"></image> -->
													<text style="font-weight: 800;">{{item.name}}</text>
													<view>限借天数: {{item.limit_days}}</view>
													<view>数量:{{item.leftCount}}/{{item.totalCount}}</view>
													<view slot="actions" class="card-actions">
														<view class="card-actions-item" @click="showInfo(index)">
															<text class="card-actions-item-text">详情</text>
														</view>
														
														<view style="background-color: aliceblue;" class="card-actions-item" @click="toggle('center',index)">
															<text class="card-actions-item-text">编辑</text>
														</view>
													</view>
												</uni-card>
											</view>
										</uni-grid-item>
									</uni-grid>
						
					</uni-section>
		</view>
			<view>
						<!-- 普通弹窗 -->
						<uni-popup ref="popup" background-color="#fff" >
							<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
									<!-- Card start -->
									<uni-card  @click="onClick">
										<template v-slot:cover>
												<view class="custom-cover">
													<image style=" margin-left: -20rpx; max-height: 500rpx;" class="cover-image" mode="widthFix" :src="toolInfo.url">
													</image>
												</view>
											</template>
											<uni-section title="编辑工具信息" type="line">
													<view class="example">
														<!-- 基础用法，不包含校验规则 -->
														<uni-forms ref="baseForm" labelWidth="150rpx" label-position="left">
															<uni-forms-item label="工具名称" required>
																<uni-easyinput v-model="toolInfo.name" placeholder="请输入工具名称" />
															</uni-forms-item>
															<uni-forms-item label="工具数量" required>
																<uni-number-box :min="1" v-model="toolInfo.totalCount"  />
															</uni-forms-item>
															<uni-forms-item label="限借天数" required>
																<uni-number-box :min="1" v-model="toolInfo.limit_days"  />
																<view>
																	剩余数量: {{toolInfo.leftCount}}
																</view>
																<view v-if="toolInfo.shortReturnTime">归还时间: {{toolInfo.shortReturnTime}}</view>
															</uni-forms-item>
															<uni-forms-item label="工具简介">
																<uni-easyinput type="textarea" v-model="toolInfo.intro"/>
															</uni-forms-item>
														</uni-forms>
													</view>
												</uni-section>

										<view slot="actions" class="card-actions">
											<view class="card-actions-item2">
												<button style="width: 70%;" size="mini" @click="actionsClick('取消')">取消</button>
											</view>
											
											<view class="card-actions-item2">
												<button style="width: 70%;" type="primary" size="mini" @click="submitEdit">确定</button>
											</view>
										</view>
									</uni-card>
							</view>
						</uni-popup>
						<!-- 普通弹窗Info -->
						<uni-popup ref="popupinfo" background-color="#fff" >
							<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
									<!-- Card start -->
									<uni-card  @click="onClick">
										<template v-slot:cover>
												<view class="custom-cover">
													<image style=" margin-left: -20rpx; max-height: 800rpx;" class="cover-image" mode="widthFix" :src="toolInfo.url">
													</image>
												</view>
											</template>
										<!-- <image slot='cover' style="width: 100%;" :src="cover"></image> -->
										<text style="font-weight: 800;">{{toolInfo.name}}</text>
										<view>限借天数: {{toolInfo.limit_days}} 数量:{{toolInfo.leftCount}}/{{toolInfo.totalCount}} </view>
										<view v-if="toolInfo.shortReturnTime">归还时间: {{toolInfo.shortReturnTime}}</view>
										<view v-if="toolInfo.intro">简介:{{toolInfo.intro}}</view>
										<view slot="actions" class="card-actions">
											<view class="card-actions-item2" style="margin-left: 50%;">
												<button style="width: 70%;" size="mini" @click="actionsClick('取消')">确定</button>
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
				labelId : 0,
				
				cover: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg',
				extraIcon:{
							color: '#4cd964',
							size: '22',
							type: 'gear-filled'
						},
				toolList: [],
				toolInfo: {},
				range: {},
				borrowCount: 1,
				purpose: "",
				startTime:"",
				returnTime:"",
				uid: -1
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
				console.log(option.labelId); //打印出上个页面传递的参数。
				this.labelId = option.labelId;
				this.getList();
		},
		onShow() {
			if (getApp().globalData.uid === -1) {
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
		},
		methods: {
			
			submitEdit() {
				this.uid = getApp().globalData.uid
				
				
				this.$refs.popup.close()
				uni.reLaunch({
					url: '/pages/Teacher/tea-main/tea-main'
				})
					
			},
			getList() {
				uni.request({
					url: getApp().globalData.urlRoot + "/user/getLabelToolList",
					data:{labelId: this.labelId},
					method:"POST",
					success: (res) => {
						if (res.data.error_code === 0) {
							console.log(res.data.toolList);
							this.toolList = res.data.toolList;
						}
					},
				})
			},
			showInfo(index) {
				this.toolInfo = this.toolList[index];
				this.$refs.popupinfo.open('center')
			},
			toggle(type, index) {
							this.type = type
							this.toolInfo = this.toolList[index];
							// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
							this.$refs.popup.open(type)
						},
			onClick(e){
							console.log(e)
						},
			actionsClick(text){
							this.$refs.popup.close()
								this.$refs.popupinfo.close()
						},
						
		}
	}
</script>

<style>
.popup-content {
			align-items: center;
			justify-content: center;
			padding: 15px;
			height: auto;
			background:transparent;
}
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
</style>

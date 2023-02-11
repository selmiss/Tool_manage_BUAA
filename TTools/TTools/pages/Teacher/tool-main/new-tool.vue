<template>

		<uni-section title="工具管理" subTitle="" titleFontSize="20px" subTitleFontSize="18px" type="line">
		<uni-section title="新增工具" type="line">
				<view class="example">
					<!-- 基础用法，不包含校验规则 -->
					<uni-forms ref="baseForm" labelWidth="170rpx" label-position="left">
						<uni-forms-item label="工具名称" required>
							<uni-easyinput v-model="toolInfo.name" placeholder="请输入工具名称" />
						</uni-forms-item>
						<uni-forms-item label="工具分类" required="">
						<uni-data-select
						        v-model="toolInfo.LabelId"
						        :localdata="range"
						      ></uni-data-select>
						</uni-forms-item>
						<uni-forms-item label="工具图片" required="">
							<view style="" class="pic" @click="upFile">
								<image style="width: 400rpx;border: aqua solid 3rpx;" :src="toolInfo.img2 ? toolInfo.img2 : Img" mode="aspectFit"></image>
							</view>
						</uni-forms-item>
						<uni-forms-item label="工具数量" required>
							<uni-number-box :min="1" v-model="toolInfo.addCount"  />
						</uni-forms-item>
						<uni-forms-item label="限借天数" required>
							<uni-number-box :min="1" v-model="toolInfo.limit_days"  />
						</uni-forms-item>
						<uni-forms-item label="工具详情">
							<uni-easyinput type="textarea" v-model="toolInfo.intro"/>
						</uni-forms-item>
						<view class="button-group" style="margin-bottom: 100rpx;">
							<button type="default" size="mini" @click="cancel">取消</button>
							<button type="primary" size="mini" @click="upload">新建</button>
						</view>
						<view style="width: 500rpx;height: 300rpx;"></view>
					</uni-forms>
					
				</view>
			</uni-section>
			</uni-section>

</template>

<script>
	export default {
		data() {
			return {
				Img:"/static/add.webp",
				toolInfo:{
					name:"",
					LabelId:0,
					intro:"",
					addCount:1,
					managerId:0,
					limit_days:7,
					img:null
				},
				range: [
				  { value: 6, text: "机械工具" },
				  { value: 5, text: "电控工具" },
				  { value: 4, text: "机械电子设备" }
				],
				filesize:0,
				
			}
		},
		created() {
			if (getApp().globalData.uid === -1) {
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
			this.toolInfo.managerId = getApp().globalData.uid;
			console.log(this.toolInfo.managerId)
		},
		methods: {
			upFile(){
				let that = this;
				uni.chooseMedia({
						count: 1,
					  mediaType: ['image'],
					  sourceType: ['album', 'camera'],
					  maxDuration: 30,
					  camera: 'back',
					  success(res) {
					    console.log(res.tempFiles[0])
						that.toolInfo.img = res.tempFiles[0];
						that.toolInfo.img2 = res.tempFiles[0].tempFilePath;
					  }
				})
				// uni.chooseImage({
				// 	count: 1,
				// 	sizeType: 'original',  //指定原图
				// 	success: res=> {
				// 		that.filesize = res.tempFiles[0].size/1024/1024;  //转换MB
				// 		console.log(that.filesize)
				// 		if(that.filesize > 20){
				// 			uni.showToast({
				// 				title: "上传图片大小不能大于20M",
				// 				icon: 'none'
				// 			})
				// 			return;
				// 		}
				// 		console.log(res.tempFilePaths[0])
				// 		console.log(res.tempFiles[0])
				// 		this.toolInfo.img = res.tempFiles[0];
				// 		that.toolInfo.img2 = res.tempFilePaths[0];
				// 	},
				// 	error: err=>{
				// 		console.log(err)
				// 	}
				// })
			},
			upload() {
				console.log(this.toolInfo)
				this.submit();
			},
			submit() {
				console.log(this.toolInfo.LabelId)
				console.log(this.toolInfo.img2)
				uni.uploadFile({
							url: getApp().globalData.urlRoot +"/manager/createTool",
							filePath: this.toolInfo.img2,
							name: 'img',
							header: {'Authorization':getApp().globalData.token},
							formData: {
								'limit_days':this.toolInfo.limit_days,
								'name':this.toolInfo.name,
								'LabelId':this.toolInfo.LabelId,
								'intro':this.toolInfo.intro,
								'addCount':this.toolInfo.addCount,
								'uid':-2,
							},
							success: (res) => {
								console.log(res.data)
								if (true){
									uni.showToast({
										title:"工具添加成功",
										icon:'success'
									})
									uni.reLaunch({
										url:"/pages/Teacher/tea-main/tea-main"
									})
								} else {
									uni.showToast({
										title:"工具添加失败",
										icon:'error',
										error_code:res.error_code,
									})
								}
							}
						});
				// uni.request({
				// 	 header: {'Authorization':getApp().globalData.token,
				// 	 			'content-type':'application/x-www-form-urlencoded'},
				// 	url: getApp().globalData.urlRoot +"/manager/createTool",
				// 	data: {'limit_days':this.toolInfo.limit_days,
				// 			'name':this.toolInfo.name,
				// 			'LabelId':this.toolInfo.LabelId,
				// 			'intro':this.toolInfo.intro,
				// 			'addCount':this.toolInfo.addCount,
				// 			'img':this.toolInfo.img,
				// 			'uid':-2,
				// 			},
				// 	method:"POST",
				// 	success: (res) => {
				// 		console.log(res.data)
				// 		if (res.data.error_code === 0){
				// 			uni.showToast({
				// 				title:"工具添加成功",
				// 				icon:'success'
				// 			})
				// 		} else {
				// 			uni.showToast({
				// 				title:"工具添加失败",
				// 				icon:'error',
				// 				error_code:res.error_code,
				// 			})
				// 		}
				// 	}
				// })
			},
			submit2() {
				
			},
			cancel() {
				uni.navigateTo({
					url:"/pages/Teacher/tea-main/tea-main"
				})
			}
		}
	}
</script>

<style>
.example {
	width: 80%;
	margin-left: 10%;
	height: 100%;
}
.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}
</style>

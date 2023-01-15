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
				  { value: 0, text: "机械工具" },
				  { value: 1, text: "电控工具" },
				  { value: 2, text: "机械电子设备" }
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
				uni.chooseImage({
					count: 1,
					sizeType: 'original',  //指定原图
					success: res=> {
						that.filesize = res.tempFiles[0].size/1024/1024;  //转换MB
						if(that.filesize > 1){
							that.$util.msg('上传文件大小不能超过1MB');
							return;
						}
						console.log(res.tempFilePaths[0])
						that.toolInfo.img = res.tempFiles[0];
						that.toolInfo.img2 = res.tempFilePaths[0];
					},
					error: err=>{
						console.log(err)
					}
				})
			},
			upload() {
				console.log(this.toolInfo)
				this.submit();
			},
			submit() {
				console.log(this.toolInfo)
				uni.request({
					 header: {'Authorization':getApp().globalData.token},
					url: getApp().globalData.urlRoot +"/manager/createTool",
					data: this.toolInfo,
					method:"POST",
					dataType:"form-data",
					success: (res) => {
						console.log(res.data)
						if (res.data.error_code === 0){
							uni.showToast({
								title:"工具添加成功",
								icon:'success'
							})
						} else {
							uni.showToast({
								title:"工具添加失败",
								icon:'error'
							})
						}
					}
				})
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

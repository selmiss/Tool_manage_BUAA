<template>
	<view>
		
		<view class="mainlist">
		<uni-section  title="编辑工具" subTitleFontSize="16px" subTitle="请选择工具分类" titleFontSize="20px" type="line" >
				
					<uni-card v-for="item in labelList" :title="item.name"  :thumbnail="item.lowerLabel[0].url" @click="onClick(item.lowerLabel[0].id)">
					</uni-card>
					
				</uni-section>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: 'JING',
				title : "借用工具",
				labelList:[
					
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
			toBorrow() {
				uni.navigateTo({
					url: '/pages/ToolCats/ToolCats'
				})
			},
			onClick(id) {
				console.log(id);
				uni.navigateTo({
					url: "/pages/Teacher/tool-main/tool-edit-list?labelId="+id
				})
			},
			getLabelList() {
				uni.request({
					url: getApp().globalData.urlRoot+"/user/getFirstLabelList",
					data:{},
					method:"POST",
					success : (res) => {
						console.log(res.data)
						this.labelList = res.data.labelList
					}
				})
			}
		},
		created() {
			if (getApp().globalData.uid === -1) {
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
			this.getLabelList()
		}
	}
</script>

<style>

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

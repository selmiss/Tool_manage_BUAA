<template>
	<view>
		
		<view class="mainlist">
		<uni-section  :title="title" subTitleFontSize="16px" subTitle="请选择工具分类" titleFontSize="20px" type="line" >
				
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
					{
							name: '机械工具',
							id : 1,
							level: 1,
							lowerLabel :
							[{name: "机械工具", id: 4, level: 2, url: "http://121.4.160.157/media/image/2_c4GQaje.png"}]
					},
					{
							name: '电控工具',
							id : 2,
							level: 1,
							lowerLabel :
							[{name: "电控工具", id: 5, level: 2, url: "http://121.4.160.157/media/image/3_FhHGkv1.png"}]
					},
					{
						name: "机械电子设备",
						id: 3,
						level: 1,
						lowerLabel :
						[{name: "机械电子设备", id: 6, level: 2, url: "http://121.4.160.157/media/image/1_nUbPquK.png"}]
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
		onShow() {
			if (getApp().globalData.uid === -1) {
				uni.reLaunch({
					url:"/pages/index/index"
				})
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
					url: "/pages/ToolList/ToolList?labelId="+id
				})
			},
			getLabelList() {
				uni.request({
					 header: {'Authorization':getApp().globalData.token},
					url: getApp().globalData.urlRoot+"/user/getFirstLabelList",
					data:{},
					method:"POST",
					success : (res) => {
						this.labelList = res.data.labelList
					}
				})
			}
		},
		created() {
			
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

<template>
	<view>
		<uni-section  title="工具列表" subTitleFontSize="16px" subTitle="所有工具" titleFontSize="20px" type="line" >
				<uni-card v-for="(item, index) in tool_list" :title="index+1+'.'+item.name" :sub-title="'类别 : '+item.cat" :extra="'剩余数量:'+item.leftCount+'/'+item.totalCount" :thumbnail="avatar">
					<uni-row class="demo-uni-row" :width="nvueWidth">
						<p>限借天数:{{item.limit_days}}</p>
					</uni-row>
				</uni-card>
				
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tool_list: [],
				tool_list1: [],
				tool_list2: [],
				tool_list3: []
			}
		},
		created() {
			if (getApp().globalData.uid === -1) {
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
			this.getList();
		},
		methods: {
			getList() {
				uni.request({
					url: getApp().globalData.urlRoot+"/user/getLabelToolList",
					data: {
						labelId:4
					},
					method:"POST",
					success: (res) => {
						if (res.data.error_code === 0) {
							this.tool_list3 = res.data.toolList;
							for(var i=0;i<this.tool_list3.length;i++) {
								this.tool_list3[i]["cat"]="机械电子设备";
							}
							this.tool_list = this.tool_list.concat(this.tool_list3)
						}
					}
				})
				uni.request({
					url: getApp().globalData.urlRoot+"/user/getLabelToolList",
					data: {
						labelId:5
					},
					method:"POST",
					success: (res) => {
						if (res.data.error_code === 0) {
							this.tool_list1 = res.data.toolList;
							for(var i=0;i<this.tool_list1.length;i++) {
								this.tool_list1[i]["cat"]="电控工具";
							}
							this.tool_list = this.tool_list.concat(this.tool_list1)
						}
					}
				})
				uni.request({
					url: getApp().globalData.urlRoot+"/user/getLabelToolList",
					data: {
						labelId:6
					},
					method:"POST",
					success: (res) => {
						if (res.data.error_code === 0) {
							this.tool_list2 = res.data.toolList;
							for(var i=0;i<this.tool_list2.length;i++) {
								this.tool_list2[i]["cat"]="机械工具";
							}
							this.tool_list = this.tool_list.concat(this.tool_list2)
						}
					}
				})
				
				
			}
		}
	}
</script>

<style>

</style>

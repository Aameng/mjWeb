<template>
	<view class="flex flexcol flexac" style="padding-top: 30rpx;">
		<view class="messItem flex flexcol" v-for="(item,index) in dataList" :key="index">
			<view class="flex flexrow flexsb">
				<view class="f32 f5">{{item.messageTitle}}</view>
				<view class="jmgrey f22">{{item.createTime}}</view>
			</view>
			<view style="margin-top: 26rpx;font-size: 26rpx;line-height: 36rpx;">{{item.messageContent}}</view>
		</view>
		<qs v-if="dataList.length == 0"></qs>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				dataList:[]
			}
		},
		onLoad(option) {
			that = this;
			that.initData();
		},
		onShow() {},
		methods: {
			initData(item) {
				let par ={}
				this.$api.request(
					'post',
					'/app/message/list',par,
					function(res) {
						if(res.code===0){
						   // that.dataList = res.data;
						}
					},
					function(fail) {
						this.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605',
					true
				);
			},
		}
	}
</script>

<style>
	page{
		background-color: #F5F5F5;
	}
	.messItem{
		width: 686rpx;
		background: #EEEEEE;
		border-radius: 8rpx;
		opacity: 1;
		box-sizing: border-box;
		padding: 36rpx 34rpx 30rpx 36rpx;
		margin-bottom: 20rpx;
	}
</style>

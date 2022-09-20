<template>
	<view class="flex flexcol flexac" style="padding-top: 208rpx;">
		 <image src="../../static/icon/a20.png" style="width: 120rpx;height: 120rpx;"></image>
		 <view style="font-size: 44rpx;margin-top: 52rpx;margin-bottom: 84rpx;">已实名认证成功</view>
		 <view class="smItem flex flexac">真实姓名：某人</view>
		 <view class="smItem flex flexac">身份证号：83864818661230471X</view>
		 <view class="smItem flex flexac">银行卡号：83864818661230471X</view>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {}
		},
		onLoad(option) {},
		onShow() {},
		methods: {
			
		}
	}
</script>

<style>
	page{
		background-color: #F5F5F5;
	}
	.smItem{
		width: 686rpx;
		height: 120rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		box-sizing: border-box;
		padding-left:30rpx; 
		font-size: 30rpx;
		margin-bottom: 20rpx;
	}
</style>

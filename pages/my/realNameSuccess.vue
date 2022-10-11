<template>
	<view class="flex flexcol flexac" style="padding-top: 208rpx;">
		 <image src="../../static/icon/a20.png" style="width: 120rpx;height: 120rpx;"></image>
		 <view style="font-size: 44rpx;margin-top: 52rpx;margin-bottom: 84rpx;">已实名认证成功</view>
		 <view class="smItem flex flexac">真实姓名：{{userInfo.realName}}</view>
		 <view class="smItem flex flexac">身份证号：{{userInfo.cardNumber}}</view>
		<!-- <view class="smItem flex flexac">银行卡号：{{userInfo.bankNo}}</view> -->
		<view class="jmBtn" style="width: 686rpx;height: 92rpx;margin-top: 300rpx;" @tap="goBack()">返回设置</view>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				userInfo:{}
			}
		},
		onLoad(option) {},
		onShow() {
			this.userInfo  = uni.getStorageSync('userinfo');
		},
		methods: {
		   goBack(){
			   uni.navigateBack()
		   },	
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
	.backBtn{
		
	}
</style>

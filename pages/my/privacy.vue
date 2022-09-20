<template>
	<view class="flex flexcol flexac" style="padding-top: 40rpx;">
        <view class="pageWrap flex flexcol">
			<view class="kItem flex flexsb flexsb flexac">
				<text>隐私协议</text>
				<image src="../../static/icon/jmin.png" class="inIcon"></image>
			</view>
			<view class="kItem flex flexsb flexsb flexac">
				<text>使用条款</text>
				<image src="../../static/icon/jmin.png" class="inIcon"></image>
			</view>
			<view class="kItem flex flexsb flexsb flexac" @tap="goNavigateTo(1)">
				<text>账号信息</text>
				<image src="../../static/icon/jmin.png" class="inIcon"></image>
			</view>
		</view>
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
			goNavigateTo(index){
				let url = '';
				if(index==1){
					url='./accountInfo'
				}
				// if(index==2){
				// 	url='./realName'
				// }
				// if(index==3){
				// 	url='./userInfo'
				// }
				uni.navigateTo({
					url
				})
			},
			initData(item) {
				let par ={}
				this.$api.request(
					'post',
					'/user/commonlyUsedStu',par,
					function(res) {},
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
	.pageWrap{
		width: 686rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		box-sizing: border-box;
		padding: 0 20rpx 0 20rpx;
	}
	.inIcon{
		height: 24rpx;
		width: 14rpx;
	}
	.kItem{
		height: 108rpx;
		border-bottom: 2rpx solid rgba(112, 112, 112, 0.2);
		width: 100%;
	}
	
	.kItem:last-child{
		border-bottom: none;
	}
</style>

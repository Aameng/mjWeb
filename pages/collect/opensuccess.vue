<template>
	<view class="flex flexcol flexac" style="padding-top: 158rpx;">
		<image src="../../static/icon/a20.png" style="width: 120rpx;height: 120rpx;margin-bottom: 52rpx;"></image>
		<text style="font-size: 44rpx;line-height: 44rpx;">开启成功</text>
		<view style="margin:  38rpx auto 80rpx;">恭喜您获得{{collectObj.collectionName}}一份</view>
		<view style="position: relative;">
			<image :src="collectObj.collectionPic" style="width: 400rpx;height: 400rpx;filter: blur(15px);" mode="aspectFill"></image>
			<image :src="collectObj.collectionPic" style="width: 345rpx;height: 345rpx;position: absolute;z-index: 2;left:27rpx;top:27rpx" mode="aspectFill"></image>
		</view>
		<view class="confirmBtn flex flexjc flexac" @tap="goDetail()">去看看</view>

	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				collectObj:{}
			}
		},
		onLoad(option) {
			that = this;
			this.collectObj = getApp().globalData.openCollectDetail;
		},
		onShow() {},
		methods: {
			goDetail(){
				uni.redirectTo({
					url:'/pages/collect/collectDetail?id='+this.collectObj.collectionId+'&ucid='+this.collectObj.ucid
				})
			},
			initData(item) {
				let par ={}
				this.$api.request(
					'post',
					'/user/commonlyUsedStu',par,
					function(res) {
						if(res.code===0){
							
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
	.confirmBtn{
		width: 544rpx;
		height: 88rpx;
		background: #0256FF;
		border-radius: 4rpx;
		color: white;
		font-size: 32rpx;
		margin-top: 100rpx;
	}
</style>

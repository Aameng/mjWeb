<template>
	<view class="flex flexcol  flexac" style="padding-top: 40rpx;">
		<view class="noticeItem flex flexcol" v-for="(item,index) in 6" :key="index">
			<view class="f32 f5" style="margin-bottom: 18rpx;">【活动公告】《齐天大圣》系列盲盒现已更新上线</view>
			<view class="flex flexrow flexsb flex1" style="height: 22rpx;">
				<view class="flex" style="color:#767676;font-size: 24rpx;">10-05 12:40</view>
				<view class="flex flexrow flexjc">
					<image src="../../static/icon/jm38.png" style="width: 38rpx;height: 38rpx;"></image>
					<text style="color:#767676;font-size: 24rpx;">15203人</text>
				</view>
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
	.noticeItem{
		width: 686rpx;
		background: #FFFFFF;
		box-shadow: 0px 0rpx 10rpx 0px rgba(0,0,0,0.1);
		opacity: 1;
		box-sizing: border-box;
		padding: 36rpx 36rpx 32rpx 34rpx;
		margin-bottom: 30rpx;
	}
</style>

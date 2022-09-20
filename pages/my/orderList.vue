<template>
	<view class="orderListPage">
		<view class="flex flexrow" style="margin-bottom: 10rpx;">
			<view class="flex flexjc flexac cTab" :class="tabIndex ==1 ? 'acttopTab':''" @tap="changeTab(1)">普通市场</view>
			<view class="flex flexjc flexac cTab" :class="tabIndex ==2 ? 'acttopTab':''" @tap="changeTab(2)">二级市场</view>
		</view>
		<u-sticky zIndex="9999" offsetTop="0" index="0">
			<view class="flex flexrow flexsb flexac" style="background-color: #F5F5F5;">
				<view class="flex flexac flexjc orderTab" :class="order==1?'actTab':''" @tap="changeTabSeo(1)">
					全部
					<view class="actHc" v-show="order==1"><view class="mockDot"></view></view>
				</view>
				<view class="flex flexac flexjc orderTab" :class="order==2?'actTab':''" @tap="changeTabSeo(2)">
					待支付
					<view class="actHc" v-show="order==2"><view class="mockDot"></view></view>
				</view>
				<view class="flex flexac flexjc orderTab" :class="order==3?'actTab':''" @tap="changeTabSeo(3)">
					已完成
					<view class="actHc" v-show="order==3"><view class="mockDot"></view></view>
				</view>
				<view class="flex flexac flexjc orderTab" :class="order==4?'actTab':''" @tap="changeTabSeo(4)">
					已取消
					<view class="actHc" v-show="order==4"><view class="mockDot"></view></view>
				</view>
			</view>
		</u-sticky>
		<view class="flex flexcol">
			<view class="orderItem" v-for="(item,index) in 9" :key="index">
				<view class="flex flexrow flexsb flexac">
					<text class="f28">订单号：NDJBW8932BJ343</text>
					<text class="jmgrey f28">待支付</text>
				</view>
				<view class="flex flexrow" style="margin-top: 24rpx;">
					<image src="https://leyu-demo.xinhualeyu.com/oc3.png" mode="aspectFill" class="orderCover"></image>
					<view class="flex flexcol" style="padding-top: 16rpx;">
						<text class="f30">望笙仔｜ 摩托车手-系列</text>
						<text class="f24 jmgrey" style="margin-top: 24rpx;">单价 ￥10.00 数量 1</text>
						<text class="f24 jmgrey" style="margin-top: 14rpx;">需付款 ￥10.00</text>
					</view>
				</view>
				<view class="flex flexrow flexsb" style="margin-top: 32rpx;">
					<view class="orderBtn flex flexjc flexac">取消订单</view>
					<view class="orderBtn flex flexjc flexac sty2">立即支付</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				tabIndex:1,
				order:1
			}
		},
		onLoad(option) {},
		onShow() {},
		methods: {
			changeTabSeo(index){
				this.order = index;
			},
			changeTab(index){
				this.tabIndex =index;
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
	.orderCover{
		width: 140rpx;
		height: 140rpx;
		border-radius: 8rpx;
		opacity: 1;
		margin-right: 32rpx;
	}
	.orderBtn{
		width: 314rpx;
		height: 59rpx;
		border-radius: 4rpx;
		opacity: 1;
		border: 2rpx solid #0256FF;
		font-size: 28rpx;
		color:#0256FF;
	}
	page{
		background-color: #F5F5F5;
	}
	.orderListPage{
		padding: 24rpx 32rpx 60rpx;
	}
	.cTab{
		width: 686rpx;
		height: 64rpx;
		background: #EEEEEE;;
		border-radius: 8rpx;
		opacity: 1;
		font-size: 32rpx;
	}
	.acttopTab{
		background: #0256FF;
		color:white;
	}
	.orderTab {
		height: 104rpx;
		position: relative;
		font-size: 28rpx;
		width: 100rpx;
	}
	.actHc{
		position: absolute;
		width: 44rpx;
		height: 8rpx;
		background: #0256FF;
		border-radius: 2rpx;
		opacity: 1;
		bottom:20rpx;
		left: 20rpx;
	}
	.mockDot{
		position: absolute;
		width: 8rpx;
		height: 8rpx;
		background: #0256FF;
		opacity: 1;
		border-radius: 100%;
		right: -15rpx;
	}
	.actTab{
		font-size: 30rpx !important;
		color:#0256FF !important;
		font-weight: bold;
	}
	.orderItem{
		width: 686rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		opacity: 1;
		box-sizing: border-box;
		padding: 30rpx 20rpx 24rpx 24rpx;
		margin-bottom: 30rpx;
	}
	.sty2{
		background: #0256FF;
		color:white;
	}
</style>

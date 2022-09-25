<template>
	<view>
		<view class="orderTop flex flexac">
			<image src="../../static/icon/mj901.png" style="width: 28rpx;height: 31rpx;margin-right: 8rpx;"></image>
			<text>订单已经完成</text>
		</view>
		<view class="orderListPage">
			<view class="flex flexcol">
				<view class="orderItem">
					<view class="flex flexrow flexsb flexac">
						<text class="f28">订单号：{{orderInfo.orderId}}</text>
						<text
							class="jmgrey f28">{{orderInfo.orderStatus == 1?'待支付':orderInfo.orderStatus == 2?'已完成':orderInfo.orderStatus == 3?'已取消':'待购买'}}</text>
					</view>
					<view class="flex flexrow" style="margin-top: 24rpx;">
						<image :src="orderInfo.collectionPic" mode="aspectFill" class="orderCover"></image>
						<view class="flex flexcol" style="padding-top: 16rpx;">
							<text class="f30">{{orderInfo.collectionName}}</text>
							<text class="f24 jmgrey" style="margin-top: 24rpx;">单价 ￥{{orderInfo.orderPrice}} 数量 1</text>
							<text class="f24 jmgrey" style="margin-top: 14rpx;">需付款 ￥{{orderInfo.orderPrice}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- <qs v-if="dataList.length == 0"></qs> -->
		</view>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				tabIndex: 1,
				order: 1,
				dataList: [],
				orderId: '',
				orderInfo: {}
			}
		},
		onLoad(option) {
			that = this;
			this.orderId = option.id;
			this.initData();
		},
		onShow() {},
		methods: {
			initData() {
				let par = {
					orderId: this.orderId
				}
				this.$api.request(
					'get',
					'/app/order/info', par,
					function(res) {
						that.orderInfo = res.data;
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
	.orderTop {
		width: 750rpx;
		height: 80rpx;
		background: #E0EAFF;
		opacity: 1;
		box-sizing: border-box;
		padding-left: 42rpx;
		color: #0256FF;
		font-size: 28rpx;
	}

	.orderCover {
		width: 140rpx;
		height: 140rpx;
		border-radius: 8rpx;
		opacity: 1;
		margin-right: 32rpx;
	}

	.orderBtn {
		width: 314rpx;
		height: 59rpx;
		border-radius: 4rpx;
		opacity: 1;
		border: 2rpx solid #0256FF;
		font-size: 28rpx;
		color: #0256FF;
	}

	page {
		background-color: #F5F5F5;
	}

	.orderListPage {
		padding: 24rpx 32rpx 60rpx;
	}

	.cTab {
		width: 686rpx;
		height: 64rpx;
		background: #EEEEEE;
		;
		border-radius: 8rpx;
		opacity: 1;
		font-size: 32rpx;
	}

	.acttopTab {
		background: #0256FF;
		color: white;
	}

	.orderTab {
		height: 104rpx;
		position: relative;
		font-size: 28rpx;
		width: 100rpx;
	}

	.actHc {
		position: absolute;
		width: 44rpx;
		height: 8rpx;
		background: #0256FF;
		border-radius: 2rpx;
		opacity: 1;
		bottom: 20rpx;
		left: 20rpx;
	}

	.mockDot {
		position: absolute;
		width: 8rpx;
		height: 8rpx;
		background: #0256FF;
		opacity: 1;
		border-radius: 100%;
		right: -15rpx;
	}

	.actTab {
		font-size: 30rpx !important;
		color: #0256FF !important;
		font-weight: bold;
	}

	.orderItem {
		width: 686rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.1);
		opacity: 1;
		box-sizing: border-box;
		padding: 30rpx 20rpx 24rpx 24rpx;
		margin-bottom: 30rpx;
	}

	.sty2 {
		background: #0256FF;
		color: white;
	}
</style>

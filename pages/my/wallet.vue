<template>
	<view class="walletPage">
		<view class="walletTop">
			<text class="f32 f5">总资产（元）</text>
			<view style="margin-top: 44rpx;font-size: 50rpx; font-weight:bold;line-height: 50rpx;">106.95</view>
			<view class="wabtn flex flexjc flexac" style="position: absolute; bottom:34rpx;right: 164rpx;" @tap="goRecharge()">充值</view>
			<view class="wabtn flex flexjc flexac" style="position: absolute; bottom:34rpx;right: 20rpx;">提现</view>
		</view>
		<u-sticky zIndex="9999" offsetTop="0" index="0">
			<view class="flex flexrow flexsb flexac" style="background-color: #F5F5F5;">
				<view class="flex flexac flexjc walletTab" :class="order==1?'actTab':''" @tap="changeTab(1)">
					全部
					<view class="actHc" v-show="order==1"><view class="mockDot"></view></view>
				</view>
				<view class="flex flexac flexjc walletTab" :class="order==2?'actTab':''" @tap="changeTab(2)">
					支出
					<view class="actHc" v-show="order==2"><view class="mockDot"></view></view>
				</view>
				<view class="flex flexac flexjc walletTab" :class="order==3?'actTab':''" @tap="changeTab(3)">
					收入
					<view class="actHc" v-show="order==3"><view class="mockDot"></view></view>
				</view>
				<view class="flex flexac flexjc walletTab" :class="order==4?'actTab':''" @tap="changeTab(4)">
					充值
					<view class="actHc" v-show="order==4"><view class="mockDot"></view></view>
				</view>
				<view class="flex flexac flexjc walletTab" :class="order==5?'actTab':''" @tap="changeTab(5)">
					提现
					<view class="actHc" v-show="order==5"><view class="mockDot"></view></view>
				</view>
			</view>
		</u-sticky>
		<view class="flex flexcol">
			<view class="walletItem" v-for="(item,index) in dataList" :key="index">
				<view class="jmblue f32">支付通道费用</view>
				<view class="f24 jmgrey" style="margin-top: 16rpx;">2021-09-10 11:50:00</view>
				<view class="abPrice jmblue">-1.15</view>
			</view>
		</view>
		<qs v-if="dataList.length == 0"></qs>
	</view>
</template>
<script>
	let that;
	export default {
		data() {
			return {
				order:1,
				dataList:[]
			}
		},
		onLoad(option) {
			that = this;
		},
		onShow() {
			this.initData()
		},
		methods: {
			goRecharge(){
				uni.navigateTo({
					url:'./recharge'
				})
			},
			changeTab(index){
				this.order = index;
				this.initData();
			},
			initData(item) {
				// 0支出，1收入，2充值，3提现，不传查全部				
				let par = {}
				if(this.order>1){
					par.operateType = (this.order-2)
				}
				this.$api.request(
					'post',
					'/app/wallet/list', par,
					function(res) {
						if (res.code === 0) {
							that.dataList = res.data;
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
	page {
		background-color: #F5F5F5;
	}
	.abPrice{
		font-size: 36rpx;
		font-weight: 500;
		top:54rpx;
		right:18rpx;
		position: absolute;
	}
	.walletItem{
		width: 686rpx;
		height: 140rpx;
		background: #EEEEEE;
		border-radius: 4rpx;
		opacity: 1;
		box-sizing: border-box;
		padding: 36rpx 0 32rpx 26rpx;
		position: relative;
		margin-bottom: 20rpx;
	}
    .actHc{
		position: absolute;
		width: 44rpx;
		height: 8rpx;
		background: #0256FF;
		border-radius: 2rpx;
		opacity: 1;
		bottom:20rpx;
		left: 5rpx;
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

	.walletTab {
		height: 104rpx;
		position: relative;
		font-size: 28rpx;
		width: 70rpx;
	}

	.wabtn {
		width: 128rpx;
		height: 56rpx;
		background: #0256FF;
		border-radius: 4rpx;
		opacity: 1;
		color: white;
		font-size: 28rpx;
	}

	.walletPage {
		padding: 20rpx 32rpx;
	}

	.walletTop {
		width: 686rpx;
		height: 294rpx;
		background: #E0EAFF;
		border-radius: 16rpx;
		opacity: 1;
		box-sizing: border-box;
		padding: 64rpx 0 0 56rpx;
		position: relative;
		margin-bottom: 20rpx;
	}
</style>


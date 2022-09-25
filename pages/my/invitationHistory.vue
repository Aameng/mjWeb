<template>
	<view class="flex flexjc flexac" style="padding-bottom: 180rpx;">
		<view class="flex flexcol inItemWrap" style="margin-top: 20rpx;">
			<view class="inItemHis flex flexrow flexac flexsb" v-for="(item,index) in dataList" :key="index">
				<view class="flex flexrow flexac">
					<image src="https://leyu-demo.xinhualeyu.com/oc3.png" class="flexf"
						style="width:80rpx;height: 80rpx;border-radius: 100%;margin-right: 22rpx;"></image>
					<view class="f30">四季Rocky</view>
				</view>
				<view class="flex flexcol flexae">
					<view class="f30">181****0434</view>
					<view class="f24 jmgrey" style="margin-top: 14rpx;">2021-09-10 11:50:00</view>
				</view>

			</view>
			<qs v-if="dataList.length == 0"></qs>
		</view>
		

		<view class="fixBottom flex flexjc">
			<view class="kBtn3 flex flexjc flexac">邀请好友</view>
		</view>

	</view>
</template>

<script>
	let app = getApp().globalData;

	let that;
	export default {
		data() {
			return {
				hpx: getApp().globalData.mheight,
				dataList:[]
			}
		},
		onLoad(option) {
			that = this;
			this.initData()
		},
		onUnload() {

		},
		methods: {

			initData(item) {
				let par = {}
				if (this.order > 1) {
					par.operateType = (this.order - 2)
				}
				this.$api.request(
					'post',
					'/app/user/myInvitedList', par,
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

	.kBtn3 {
		width: 670rpx;
		height: 80rpx;
		background: #0256FF;
		border-radius: 4rpx;
		opacity: 1;
		margin-left: 20rpx;
		color: white;
		font-size: 32rpx;
	}

	.fixBottom {
		width: 750rpx;
		height: 172rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.1);
		opacity: 1;
		box-sizing: border-box;
		padding-top: 32rpx;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.inItemWrap {
		width: 686rpx;
		background: #FFFFFF;
		border-radius: 4rpx;
		opacity: 1;
		box-sizing: border-box;
		padding: 24rpx 24rpx 4rpx 24rpx;
	}

	.inItemHis {
		width: 638rpx;
		height: 114rpx;
		background: #EEEEEE;
		box-sizing: border-box;
		margin-bottom: 16rpx;
		padding: 0 20rpx;
	}

	.invaitationWrap {
		width: 750rpx;
		background: #F5F5F5;
		box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.1);
		border-radius: 24rpx 24rpx 0px 0px;
		opacity: 1;
		box-sizing: border-box;
		padding: 38rpx 32rpx 30rpx 34rpx;
		position: relative;
		top: -160rpx;
	}


	.content {
		background: #F8F8F8;
	}
</style>

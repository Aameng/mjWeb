<template>
	<view class="content" :style="{'min-height':hpx}">
		<view style="width: 750rpx;height: 668rpx; overflow:hidden;position: relative;">
			<image src="../../static/icon/yqImg.png" style="width: 750rpx;height: 750rpx;position: relative;top:-88rpx">
			</image>
		</view>
		<view class="invaitationWrap">
			<view class="flex flexrow f28 flexac flexsb" style="margin-bottom: 28rpx;">
				<view class="flex flexrow flexac">
					<text style="margin-right: 44rpx;">排名</text>
					<text>用户</text>
				</view>
				<view class="flex flexrow flexac">
					<text>邀请数</text>
					<text style="margin-left: 64rpx;">有效邀请</text>
				</view>
			</view>
			<view class="flex flexcol">
				<view class="inItem flex flexrow flexac" v-for="(item,index) in dataList" :key="index">
					<image :src="'../../static/icon/jm'+(12+index)+'.png'" class="flexf" v-if="index<3"
						style="width: 50rpx;height: 50rpx;"></image>
					<view style="width: 50rpx;height: 50rpx;" v-else class="f32 flex flexjc flexac flexf">{{index+1}}
					</view>

					<image src="https://qiniu-center.xinhualeyu.com/hc1.png" class="flexf"
						style="width: 60rpx;height: 60rpx;border-radius: 100%;margin-left: 44rpx;"></image>
					<view class="f28" style="margin-left: 22rpx; width:255rpx;margin-right: 48rpx;">{{item.userName || '未知'}}</view>
					<view class="flex jmblue f32 flexjc flexac" style="width: 84rpx;">{{item.invitedNumber}}</view>
					<view class="flex jmblue f32 flexfe flexac" style="width: 112rpx;margin-left: 60rpx">1</view>
				</view>

			</view>
			<qs v-if="dataList.length == 0"></qs>
		</view>

		<view class="fixBottom flex flexjc flexrow" @tap="goNavigateTo(1)">
			<view class="kBtn flex flexjc flexac">邀请明细</view>
			<view class="kBtn2 flex flexjc flexac">邀请好友</view>
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
			that =this;
           this.initData()
		},
		onUnload() {

		},
		methods: {
			initData(item) {		
				let par = {}
				if(this.order>1){
					par.operateType = (this.order-2)
				}
				this.$api.request(
					'post',
					'/app/user/rankList', par,
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
			goNavigateTo(index) {
				let url = '';
				if (index == 1) {
					url = '/pages/my/invitationHistory'
				}
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style>
	.kBtn {
		width: 332rpx;
		height: 80rpx;
		border-radius: 4rpx;
		opacity: 1;
		border: 2rpx solid #0256FF;
		color: #0256FF;
		font-size: 32rpx;
	}

	.kBtn2 {
		width: 334rpx;
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
		height: 160rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.1);
		opacity: 1;
		box-sizing: border-box;
		padding-top: 30rpx;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.inItem {
		width: 686rpx;
		height: 92rpx;
		background: #FFFFFF;
		border-radius: 4rpx;
		box-sizing: border-box;
		padding: 16rpx 18rpx 16rpx 6rpx;
		margin-bottom: 20rpx;
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

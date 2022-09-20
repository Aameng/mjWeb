<template>
	<view class="flex flexcol flexac" style="padding-top: 40rpx;">
        <view class="pageWrap flex flexcol">
			<view class="kItem flex flexsb flexsb flexac">
				<text>设置</text>
				<view class="flex flexrow flexac">
					<image src="https://leyu-demo.xinhualeyu.com/oc3.png" class="flexf" style="margin-right: 18rpx;width: 70rpx;height: 70rpx;border-radius: 8rpx;"></image>
					<image src="../../static/icon/jmin.png" class="inIcon"></image>
				</view>
			</view>
			<view class="kItem flex flexsb flexsb flexac" @tap="openBox()">
				<text>昵称</text>
				<view class="flex flexrow flexac">
					<view class="f26" style="margin-right: 18rpx;">{{userName}}</view>
					<image src="../../static/icon/jmin.png" class="inIcon"></image>
				</view>
				
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="showBoxModel flex flexcol flexac">
				<jm-stitle :jstr="'修改昵称'" style="margin-bottom: 46rpx;height: 42rpx;"></jm-stitle>
				<input type="text" class="kinput flexf" style="text-align: center;" v-model="userName">
				<view class="jmConfirmBtn2 flex flexjc flexac flexf" style="margin-top: 48rpx;" @tap="closeBox()">确定</view>
			</view> 
		</uni-popup>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				userName:'爱吃大白菜'
			}
		},
		onLoad(option) {},
		onShow() {},
		methods: {
			openBox(){
				this.$refs.popup.open();
			},
			closeBox(){
				this.$refs.popup.close();
			},
			goNavigateTo(index){
				let url = '';
				if(index==1){
					url='./accountInfo'
				}
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
	.jmConfirmBtn2{
		width: 576rpx;
		height: 72rpx;
		background: #0256FF;
		border-radius: 4rpx ;
		font-size: 32rpx;
		color: #FFFFFF;
	}
	.kinput{
		width: 576rpx;
		height: 92rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		font-size: 28rpx;
		font-weight: bold;
		display: block;
	}
	.showBoxModel{
		width: 684rpx;
		background: #EEEEEE;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		opacity: 1;
		box-sizing: border-box;
		padding: 43rpx 53rpx 36rpx;
	}
	page{
		background-color: #F5F5F5;
	}
	.inIcon{
		height: 24rpx;
		width: 14rpx;
	}
	.kItem{
		height: 108rpx;
		border-bottom: 2rpx solid rgba(112, 112, 112, 0.2);
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		width: 686rpx;
		box-sizing: border-box;
		padding:  0 30rpx;
		margin-bottom: 20rpx;
		
	}
	
	.kItem:last-child{
		border-bottom: none;
	}
</style>

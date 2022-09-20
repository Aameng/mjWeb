<template>
	<view class="flex flexcol flexac" style="padding-top: 40rpx;">
		<view class="setIem flex flexrow flexac" @tap="goNavigateTo(3)">
			<image src="../../static/icon/jm35.png" style="width: 30rpx;height: 36rpx;margin-right: 18rpx;"></image>
			<text class="f30">个人信息</text>
			<image src="../../static/icon/jm36.png" class="inIcon"></image>
		</view>
		<view class="setIem flex flexrow flexac" @tap="goNavigateTo(4)">
			<image src="../../static/icon/jm34.png" style="width: 30rpx;height: 36rpx;margin-right: 18rpx;"></image>
			<text class="f30">账号与隐私设置</text>
			<image src="../../static/icon/jm36.png" class="inIcon"></image>
		</view>
		<view class="setIem flex flexrow flexac" @tap="goNavigateTo(2)">
			<image src="../../static/icon/jm33.png" style="width: 30rpx;height: 36rpx;margin-right: 18rpx;"></image>
			<text class="f30">实名认证</text>
			<image src="../../static/icon/jm36.png" class="inIcon"></image>
		</view>
		<view class="setIem flex flexrow flexac"  @tap="goNavigateTo(1)">
			<image src="../../static/icon/jm32.png" style="width: 34rpx;height: 30rpx;margin-right: 18rpx;"></image>
			<text class="f30">操作密码</text>
			<image src="../../static/icon/jm36.png" class="inIcon"></image>
		</view>
		<view class="setIem flex flexrow flexac"  @tap="goNavigateTo(5)">
			<image src="../../static/icon/jm31.png" style="width: 33rpx;height: 33rpx;margin-right: 18rpx;"></image>
			<text class="f30">修改登录密码</text>
			<image src="../../static/icon/jm36.png" class="inIcon"></image>
		</view>
		<view class="loginOut flex flexjc flexac" @tap="goNavigateTo(6)">
			<image src="../../static/icon/jm37.png" style="width: 26rpx; height:30rpx;margin-right:10rpx"></image>
			退出登录
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
					url='./changePassword'
				}
				if(index==2){
					url='./realName'
				}
				if(index==3){
					url='./userInfo'
				}
				if(index==4){
					url='./privacy'
				}
				if(index==5){
					url='/pages/login/loginpassword'
				}
				if(index==6){
					url='/pages/login/index'
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
	page{
		background-color: #F5F5F5;
	}
	.setIem{
		width: 686rpx;
		height: 120rpx;
		background: #EEEEEE;
		opacity: 1;
		box-sizing: border-box;
		position: relative;
		padding-left: 42rpx;
		margin-bottom: 20rpx;
	}
	.inIcon{
		position: absolute;
		height: 24rpx;
		width: 14rpx;
		top:48rpx;
		right: 36rpx;
	}
	.loginOut{
		width: 670rpx;
		height: 88rpx;
		background: #0256FF;
		font-size: 30rpx;
		color:white;
		margin-top: 60rpx;
	}
</style>

<template>
	<view class="flex flexcol  flexac" style="padding: 82rpx 40rpx 30rpx;">
		<view style="padding:0 16rpx;" class="flex flexcol">
			<text style="font-size: 44rpx;">填写实名认证信息</text>
			<view class="f30" style="color:#767676;margin-top: 74rpx;">注册手机号码：{{userShowPhone}}</view>
			<view class="f30" style="color:#767676;margin-top: 26rpx;line-height: 40rpx;">请填写与注册手机号码一致的身份信息否则将无法通过认证</view>
			<view class="flex flexcol" style="margin-top: 22rpx;">
				<view class="fName f30">真实姓名</view>
				<input type="text" cursor-spacing="100" class="nameInput"
					placeholder="请输入真实姓名"
					placeholder-style="color:#767676;font-size:28rpx;font-weight:400 !important;" v-model="realName"></input>
			</view>
			<view class="flex flexcol">
				<view class="fName f30">身份证号</view>
				<input type="text" cursor-spacing="100" class="nameInput"
					placeholder="请输入18位身份证号"
					placeholder-style="color:#767676;font-size:28rpx;font-weight:400 !important;" v-model="code"></input>
					<text class="f24" style="color:#767676;margin-top: 26rpx;">认证授权将填写的信息用于沙藏账号的实名认证</text>
			</view>
			<view class="flex flexcol" style="margin-top: 4rpx;">
				<view class="fName f30">银行卡号码</view>
				<input type="text" cursor-spacing="100" class="nameInput"
					placeholder="请输入您的银行卡号码"
					placeholder-style="color:#767676;font-size:28rpx;font-weight:400 !important;" v-model="bankNum"></input>
			</view>
		</view>
		<view class="realConfirmBtn flex flexjc flexac" @tap='goSubmit()' :style="{opacity:realName&&code&&bankNum?'1':'.4'}">
			提交认证
		</view>
		<view class="flex flexrow flexac jmgrey f24" style="margin-top: 36rpx;">
			<image src="../../static/icon/jm39.png" style="width: 18rpx;height: 23rpx;margin-right: 12rpx;"></image>
			信息安全保障中，仅用于身份认证
		</view>
        
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				realName:'',
				code:'',
				bankNum:'',
				userPhone:'',
				userShowPhone:''
			}
		},
		onLoad(option) {
			that = this;
			let userPhone = uni.getStorageSync('userPhone');
			if(userPhone){
				this.userPhone = userPhone;
				this.userShowPhone = this.$api.takePhone(userPhone);
			}	
		},
		onShow() {},
		methods: {
			goSubmit(){
				if(!this.code && !this.realName && !this.bankNum)return;
				let par = {
					bankNum:this.bankNum,
					realName:this.realName,
					carNo:this.code
				}
				that.$api.request(
					'get',
					'/app/user/realName', par,
					function(res) {
						console.log("res", res);
						if (res.code === 0) {
							that.$api.toast('实名成功！');
							setTimeout(() => {
								uni.navigateBack()
							}, 1000)
						} else {
							that.$api.toast(res.message || '实名失败');
						}
					},
					function(fail) {
						that.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605'
				);
			}
		}
	}
</script>

<style>
	.realConfirmBtn{
		width: 670rpx;
		height: 80rpx;
		background: #0256FF;
		border-radius: 4rpx;
		opacity: 1;
		font-size: 28rpx;
		color:white;
		margin-top: 76rpx;
	}
	page{
		background-color: #F5F5F5;
	}
	.nameInput{
		background: #FFFFFF;
		box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
		font-size: 28rpx;
		padding: 26rpx 20rpx;
	}
	.fName{
		margin: 46rpx 4rpx 30rpx;
	}
</style>

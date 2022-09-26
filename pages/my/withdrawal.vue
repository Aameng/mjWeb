<template>
	<view class="flex flexcol thisPage">
		<view class="drawalWrap flex flexcol">
			<view class="f32" style="padding-left: 4rpx;">收款银行卡账号</view>
			<input type="text" v-model="bankCode" class="reInput" placeholder="请输入您的银行卡账号">
			<view class="flex flexrow flexsb flexac" style="margin-top: 46rpx;padding-left: 4rpx;">
				<view class="f32">输入提现金额</view>
				<view class="jmblue f26">余额：100000.00</view>
			</view>
			<input type="number" v-model="money" class="reInput" placeholder="提现金额需大于100元">
			<view class="f24" style="margin-top: 18rpx;padding-left: 4rpx;">第三方转账手续费1%，实际到账：99元</view>
		</view>
        <view class="realNameWrap flex flexac">
			真实姓名：某人
		</view>
		<view class="tipsWrap f26 jmgrey flex flexcol">
			<view class="jmgrey">提现须知：</view>
			<view style="margin-top: 22rpx;" class="flex flexcol jmgrey">
				<view class="jmgrey">1、提现金额最低100元； </view>
				<view class="jmgrey" style="margin-top: 15rpx;">2、T+2工作日到账，节假日顺延； </view>
				<view class="jmgrey" style="margin-top: 15rpx;">3、提现账户姓名必须和账号实名信息一致</view>
			</view>
		</view>
		<view class="fixPayBtn flex flexjc flexac" :style="{opacity:money>100 && bankCode?'1':'0.4'}" @tap="goSubmit()">确认提现</view>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				bankCode: "",
				payIndex: 1,
				payways: 1,
				money:''
			}
		},
		onLoad(option) {},
		onShow() {},
		methods: {
			goSubmit(){
				if(this.money<100 || !this.bankCode) return;
				let par = {
					bankNo:this.bankCode,
					money:this.money,
					name:'z?',
					bank:'bank'
				}
				this.$api.request(
					'get',
					'/app/wallet/withdraw', par,
					function(res) {
						if(res.code===0){
							that.$api.toast("提现成功");
							setTimeout(() => {
								uni.navigateBack()
							}, 1000)
						}
					},
					function(fail) {
						this.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605'
				);
			},
			changec(index) {
				this.payways = index;
			},
			goNavigateTo(index) {
				let url = '';
				if (index == 1) {
					url = './changePassword'
				}
				uni.navigateTo({
					url
				})
			},
			initData(item) {
				let par = {}
				this.$api.request(
					'post',
					'/user/commonlyUsedStu', par,
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
	.realNameWrap{
		width: 686rpx;
		height: 90rpx;
		background: #EEEEEE;
		box-sizing: border-box;
		font-size: 30rpx;
		padding-left: 30rpx;
		margin-top: 20rpx;
	}
	.drawalWrap{
		width: 686rpx;
		height: 434rpx;
		background: #EEEEEE;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		box-sizing: border-box;
		padding: 36rpx 24rpx 0 24rpx;
	}
	.fixPayBtn{
		width: 670rpx;
		height: 92rpx;
		background: #0256FF;
		border-radius: 4rpx;
		opacity: 1;
		font-size: 32rpx;
		color:white;
		margin-top: 200rpx;
	}
	.tclass-imgc {
		width: 40rpx;
		height: 40rpx;
	}

	.noselect {
		width: 40rpx;
		height: 40rpx;
		border: 2rpx solid #0256FF;
		border-radius: 50%;
		box-sizing: border-box;
	}

	.payWay {
		width: 686rpx;
		height: 140rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.1);
		padding: 0 40rpx 0 30rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
		position: relative;
	}

	.fixSelect {
		position: absolute;
		right: 40rpx;
	}

	.tipsWrap {
		width: 686rpx;
		background: #EEEEEE;
		border-radius: 4rpx;
		padding: 30rpx;
		margin-top: 20rpx;
	}

	page {
		background-color: #F5F5F5;
	}

	.thisPage {
		padding: 70rpx 32rpx 10rpx;
	}

	.reInput {
		width: 638rpx;
		height: 80rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		box-sizing: border-box;
		padding-left: 20rpx;
		font-size: 28rpx;
		margin-top: 26rpx;
	}
</style>

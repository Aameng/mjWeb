<template>
	<view class="flex flexcol thisPage">
		<view class="f36 f5" style="margin-bottom: 36rpx;">输入充值金额</view>
		<input type="number" v-model="money" class="reInput" placeholder="充值金额需大于100元">
		<view class="f32" style="margin-top: 76rpx;margin-bottom: 36rpx;">选择付款方式</view>
		<view class="flex flexcol">
			<view class="payWay">
				<view @tap="changec(1)" class="flex flexjc flexac" style="height: 32rpx;">
					<image class="tclass-imgc"
						src="https://qiniu-center.xinhualeyu.com/weixin-teacher%2Ficon%2Fcselect.png"
						v-show="payways==1"></image>
					<div v-show="payways!= 1" class="noselect"></div>
				</view>
				
			</view>
		</view>
		<view class="tipsWrap f26 jmgrey flex flexcol">
			<view class="jmgrey">提现须知：</view>
			<view style="margin-top: 22rpx;" class="flex flexcol jmgrey">
				<view class="jmgrey">1、提现金额最低100元； </view>
				<view class="jmgrey" style="margin-top: 15rpx;">2、T+2工作日到账，节假日顺延； </view>
				<view class="jmgrey" style="margin-top: 15rpx;">3、提现账户姓名必须和账号实名信息一致</view>
			</view>
		</view>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				money:"",
				payIndex:1,
				payways:1
			}
		},
		onLoad(option) {},
		onShow() {},
		methods: {
			changec(index){
				this.payIndex = index;
			},
			goNavigateTo(index){
				let url = '';
				if(index==1){
					url='./changePassword'
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
	.tclass-imgc{
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
	.payWay{
		width: 686rpx;
		height: 140rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		padding: 0 40rpx 0 30rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
	}
	.tipsWrap{
		width: 686rpx;
		background: #EEEEEE;
		border-radius: 4rpx;
		padding: 30rpx;
	}
	page{
		background-color: #F5F5F5;
	}
	.thisPage{
		padding: 70rpx 32rpx 10rpx;
	}
	.reInput{
		width: 686rpx;
		height: 100rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		box-sizing: border-box;
		padding-left: 20rpx;
	}

</style>

<template>
	<view>
		<view class="orderListPage">
			<view class="flex flexcol">
				<view class="orderItem">
					<view class="flex flexrow" style="margin-top: 24rpx;">
						<image :src="orderInfo.collectionPic" mode="aspectFill" class="orderCover"></image>
						<view class="flex flexcol" style="padding-top: 16rpx;">
							<text class="f30">{{orderInfo.collectionName}}</text>
							<view class="jmsbtnc flex flexjc flexac flexsb" style="margin-top: 18rpx;">
								<text>编号</text>
								<text>{{orderInfo.ucNo}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="searchWrap flex flexrow flexac flexsb">
					<input type="number" maxlength="8" class="cSearch" placeholder="请输入转售金额" v-model="money">
				</view>
				<view class="collectDetail flex flexjc flexac flexcol">
					<view class="collectItem flex1 flex flexrow flexsb">
						<view class="jmgrey f28">支付通道费用({{perObj.payChannelPer}}%)：</view>
						<view class="f26">￥{{money?((money*perObj.payChannelPer)/100).toFixed(2):0}}</view>
					</view>
					<view class="collectItem flex1 flex flexrow flexsb">
						<view class="jmgrey f28">创作者版权分红({{perObj.creatorPer}}%)：</view>
						<view class="f26">￥{{money?((money*perObj.creatorPer)/100).toFixed(2):0}}</view>
					</view>
					<view class="collectItem flex1 flex flexrow flexsb">
						<view class="jmgrey f28">平台服务费({{perObj.platformPer}}%)：</view>
						<view class="f26">￥{{money?((money*perObj.platformPer)/100).toFixed(2):0}}</view>
					</view>
					<view class="collectItem flex1 flex flexrow flexsb">
						<view class="jmgrey f28">经纪人返佣({{perObj.brokerPer}}%)：</view>
						<view class="f26 ">￥{{money?((money*perObj.brokerPer)/100).toFixed(2):0}}</view>
					</view>
					<view class="collectItem flex1 flex flexrow flexsb" style="border-bottom: none;">
						<view class="jmgrey f28">转售所得：</view>
						<view class="f26 jmblue">￥{{money?((money*(100-perObj.payChannelPer-perObj.platformPer-perObj.brokerPer-perObj.creatorPer))/100).toFixed(2):0}}</view>
					</view>
				</view>
			</view>
			<view class="confirmBtn flex flexjc flexac" style="margin-top: 70rpx;" :style="{opacity:money?'1':'.4'}" @tap="openDeletTips()">确定转售</view>
			<uni-popup ref="popup2" type="center">
				<view class="showBoxModel flex flexcol flexac" style="height: 400rpx;">
					<jm-stitle :jstr="'温馨提示'"></jm-stitle>
					<view class="flex flexcol flexac f32" style="margin-top: 56rpx;line-height: 44rpx;">
			            当前输入金额已低于藏品市场最低价格的{{pre}}%，请问是否继续转售？
					</view>
					<view style="margin-top: 75rpx;" class="flex flexrow">
						<view class="flex flexjc flexac f28"  style="width: 232rpx;height: 68rpx;border-radius: 4rpx;background-color: white;color: #0256FF;border: 2rpx solid #0256FF;margin-right: 20rpx;" @tap="closeDeletTips()">取消</view>
						<view class="flex flexjc flexac sty2 f28" style="width: 232rpx;height: 68rpx;border-radius: 4rpx;"  @tap="goOperate()">确定</view>
					</view>
				</view> 
			</uni-popup>
			<!-- <qs v-if="dataList.length == 0"></qs> -->
		</view>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				orderInfo:{},
				money:'',
				// 费率
				perObj:{},
				pre:0
			}
		},
		onLoad(option) {
			that = this;
			that.orderInfo = getApp().globalData.collectData || {};
			this.initData()
		},
		onShow() {},
		methods: {
			goOperate(){
				if(!this.money)return;
				let par ={
					price:this.money,
					ucId:this.orderInfo.ucId
				}
				this.$api.request(
					'get',
					'/app/order/sell',par,
					function(res) {
						if(res.code===0){
							that.$api.toast("转售成功");
							setTimeout(()=>{
								uni.reLaunch({
									url: '/pages/collect/index'
								})
							},1000)
						}
					},
					function(fail) {
						this.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605',
					true
				);
			},
			openDeletTips(){
				if(!this.money) return;
				//跟市场价对比
				let par ={
					collectionId:this.orderInfo.collectionId,
					money:this.money
				}
				this.$api.request(
					'get',
					'/app/order/compareMoney',par,
					function(res) {
						if(res.code===0){
							if(res.data.lowFlag == 1){
								that.pre = res.data.pre
								that.$refs.popup2.open();
							}
							else{
							    that.goOperate();	
							}
						}
					},
					function(fail) {
						that.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605',
					true
				);
				// this.$refs.popup2.open();
			},
			closeDeletTips(){
				this.$refs.popup2.close();
			},
			initData(item) {
				let par ={}
				this.$api.request(
					'get',
					'/app/order/getPer',par,
					function(res) {
						if(res.code===0){
							that.perObj = res.data;
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
	.showBoxModel{
		width: 654rpx;
		height: 400rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		opacity: 1;
		box-sizing: border-box;
		padding: 48rpx 34rpx;
		font-size: 26rpx;
		line-height: 36rpx;
	}
	.confirmBtn{
		width: 686rpx;
		height: 92rpx;
		background: #0256FF;
		border-radius: 4rpx 4px 4px 4px;
		font-size: 32rpx;
		color:white;
		position: fixed;
		bottom: 80rpx;
	}
	.collectItem{
		padding: 38rpx 0 42rpx;
		width: 646rpx;
		border-bottom: 2rpx solid rgba(118, 118, 118, 0.2);
	}
	.collectDetail{
		padding: 8rpx 20rpx 4rpx;
		width: 686rpx;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		background: white;
		margin-top: 28rpx;
	}
	.gHead{
		width: 72rpx;
		height: 72rpx;
		border-radius: 100%;
		margin-right: 18rpx;
	}
	.searchNone{
		width: 686rpx;
		height: 120rpx;
		background: #EEEEEE;
		opacity: 1;
		color:#767676;
		font-size: 26rpx;
		margin-top: 28rpx;
	}
	.selectUser{
		width: 686rpx;
		height: 120rpx;
		background: #EEEEEE;
		opacity: 1;
		box-sizing: border-box;
		padding: 0 30rpx;
		margin-top: 28rpx;
	}
	.searBtn{
		width: 226rpx;
		height: 96rpx;
		background: #0256FF;
		border-radius: 4rpx;
		color:white;
		font-size: 28rpx;
	}
	.cSearch{
		padding-left:28rpx;
		box-sizing: border-box;
		font-size: 28rpx;
	}
	.searchWrap{
		width: 686rpx;
		height: 96rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);		
	}
	page{
		background-color: #F5F5F5;
	}
	.jmsbtnc {
		height: 40rpx;
		background: #0256FF;
		border-radius: 0px 0px 0px 0px;
		opacity: 1;
		font-size: 22rpx;
		color: white;
		box-sizing: border-box;
		padding: 0 8rpx;
		width: max-content;
	}
	.orderListPage {
		padding: 24rpx 32rpx 60rpx;
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
	.orderCover {
		width: 140rpx;
		height: 140rpx;
		border-radius: 8rpx;
		opacity: 1;
		margin-right: 32rpx;
	}
</style>

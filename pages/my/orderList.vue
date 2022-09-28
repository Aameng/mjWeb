<template>
	<view class="orderListPage">
		<view class="flex flexrow" style="margin-bottom: 10rpx;">
			<view class="flex flexjc flexac cTab" :class="tabIndex ==1 ? 'acttopTab':''" @tap="changeTab(1)">普通市场</view>
			<view class="flex flexjc flexac cTab" :class="tabIndex ==2 ? 'acttopTab':''" @tap="changeTab(2)">二级市场</view>
		</view>
		<u-sticky zIndex="1" offsetTop="0" index="0">
			<view class="flex flexrow flexsb flexac" style="background-color: #F5F5F5;">
				<view class="flex flexac flexjc orderTab" :class="order==1?'actTab':''" @tap="changeTabSeo(1)">
					全部
					<view class="actHc" v-show="order==1"><view class="mockDot"></view></view>
				</view>
				<view class="flex flexac flexjc orderTab" :class="order==2?'actTab':''" @tap="changeTabSeo(2)">
					待支付
					<view class="actHc" v-show="order==2"><view class="mockDot"></view></view>
				</view>
				<view class="flex flexac flexjc orderTab" :class="order==3?'actTab':''" @tap="changeTabSeo(3)">
					已完成
					<view class="actHc" v-show="order==3"><view class="mockDot"></view></view>
				</view>
				<view class="flex flexac flexjc orderTab" :class="order==4?'actTab':''" @tap="changeTabSeo(4)">
					已取消
					<view class="actHc" v-show="order==4"><view class="mockDot"></view></view>
				</view>
			</view>
		</u-sticky>
		<view class="flex flexcol">
			<view class="orderItem" v-for="(item,index) in dataList" :key="index" @tap="goDetail(item.orderId)">
				<view class="flex flexrow flexsb flexac">
					<text class="f28">订单号：{{item.orderId}}</text>
					<text class="jmgrey f28">{{item.orderStatus == 1?'待支付':item.orderStatus == 2?'已完成':item.orderStatus == 3?'已取消':'待购买'}}</text>
				</view>
				<view class="flex flexrow" style="margin-top: 24rpx;">
					<image :src="item.collectionPic" mode="aspectFill" class="orderCover"></image>
					<view class="flex flexcol" style="padding-top: 16rpx;">
						<text class="f30">{{item.collectionName}}</text>
						<text class="f24 jmgrey" style="margin-top: 24rpx;">单价 ￥{{item.price}} 数量 1</text>
						<text class="f24 jmgrey" style="margin-top: 14rpx;">需付款 ￥{{item.orderPrice}}</text>
					</view>
				</view>
				<view class="flex flexrow flexsb" style="margin-top: 32rpx;" v-if="item.orderStatus == 1">
					<view class="orderBtn flex flexjc flexac" @tap.stop="openCancelTips(item.orderId)">取消订单</view>
					<view class="orderBtn flex flexjc flexac sty2">立即支付</view>
				</view>
			</view>
		</view>
		<qs v-if="dataList.length == 0"></qs>
		<uni-popup ref="popup2" type="center">
			<view class="showBoxModel flex flexcol flexac" style="height: 348rpx;">
				<jm-stitle :jstr="'温馨提示'"></jm-stitle>
				<view class="flex flexcol flexac f32" style="margin-top: 56rpx;">
		            您确定要取消此订单吗？
				</view>
				<view style="margin-top: 75rpx;" class="flex flexrow">
					<view class="flex flexjc flexac f28"  style="width: 232rpx;height: 68rpx;border-radius: 4rpx;background-color: white;color: #0256FF;border: 2rpx solid #0256FF;margin-right: 20rpx;" @tap="closeCancelTips()">取消</view>
					<view class="flex flexjc flexac sty2 f28" style="width: 232rpx;height: 68rpx;border-radius: 4rpx;"  @tap="goCancel()">确定</view>
				</view>
			</view> 
		</uni-popup>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				tabIndex:1,
				order:1,
				dataList:[],
				actId:'',
				showFixTop:true
			}
		},
		onLoad(option) {
			that = this;
			this.initData();
		},
		onShow() {},
		methods: {
			openCancelTips(id){
				this.actId = id;
				this.showFixTop = false;
				this.$refs.popup2.open();
			},
			closeCancelTips(){
				this.showFixTop = true;
				this.$refs.popup2.close();
			},
			goCancel(id){
				this.closeCancelTips();
				let par = {
					orderId: this.actId
				}
				this.$api.request(
					'get',
					'/app/order/cancel', par,
					function(res) {
						if(res.code ===0){
							that.$api.toast("取消成功");
							that.initData();					
						}
					},
					function(fail) {
						this.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605',
					true
				);
			},
			goDetail(id){
				uni.navigateTo({
					url:'/pages/my/orderDetail?id='+id
				})
			},
			changeTabSeo(index){
				this.order = index;
				this.initData()
			},
			changeTab(index){
				this.tabIndex =index;
				this.initData()
			},
			initData() {
				let par ={
					orderType:(this.tabIndex - 1)
				}
				if(this.order>1){
					par.orderStatus = this.order - 1
				}
				this.$api.request(
					'get',
					'/app/order/centerList',par,
					function(res) {
						if(res.code===0){
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
	.showBoxModel{
		width: 654rpx;
		height: 512rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		opacity: 1;
		box-sizing: border-box;
		padding: 48rpx 34rpx;
		font-size: 26rpx;
		line-height: 36rpx;
	}
	.orderCover{
		width: 140rpx;
		height: 140rpx;
		border-radius: 8rpx;
		opacity: 1;
		margin-right: 32rpx;
	}
	.orderBtn{
		width: 314rpx;
		height: 59rpx;
		border-radius: 4rpx;
		opacity: 1;
		border: 2rpx solid #0256FF;
		font-size: 28rpx;
		color:#0256FF;
	}
	page{
		background-color: #F5F5F5;
	}
	.orderListPage{
		padding: 24rpx 32rpx 60rpx;
	}
	.cTab{
		width: 686rpx;
		height: 64rpx;
		background: #EEEEEE;;
		border-radius: 8rpx;
		opacity: 1;
		font-size: 32rpx;
	}
	.acttopTab{
		background: #0256FF;
		color:white;
	}
	.orderTab {
		height: 104rpx;
		position: relative;
		font-size: 28rpx;
		width: 100rpx;
	}
	.actHc{
		position: absolute;
		width: 44rpx;
		height: 8rpx;
		background: #0256FF;
		border-radius: 2rpx;
		opacity: 1;
		bottom:20rpx;
		left: 20rpx;
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
	.orderItem{
		width: 686rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		opacity: 1;
		box-sizing: border-box;
		padding: 30rpx 20rpx 24rpx 24rpx;
		margin-bottom: 30rpx;
	}
	.sty2{
		background: #0256FF;
		color:white;
	}
</style>

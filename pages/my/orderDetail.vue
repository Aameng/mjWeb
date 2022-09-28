<template>
	<view>
		<view class="orderTop flex flexac">
			<image v-if="orderInfo.orderStatus == 1" :src="'../../static/icon/mj903.png'" style="width: 28rpx;height: 28rpx;margin-right: 8rpx;" ></image>
			<image v-else :src="orderInfo.orderStatus == 2?'../../static/icon/mj901.png':orderInfo.orderStatus == 1?'../../static/icon/mj903.png':'../../static/icon/mj902.png'" style="width: 28rpx;height: 31rpx;margin-right: 8rpx;" ></image>
			<text>订单{{orderInfo.orderStatus == 1?'待支付':orderInfo.orderStatus == 2?'已完成':orderInfo.orderStatus == 3?'已取消':'待购买'}}</text>
		</view>
		<view class="orderListPage">
			<view class="flex flexcol">
				<view class="orderItem">
					<view class="flex flexrow flexsb flexac">
						<text class="f28">订单号：{{orderInfo.orderId}}</text>
						<text
							class="jmgrey f28">{{orderInfo.orderStatus == 1?'待支付':orderInfo.orderStatus == 2?'已完成':orderInfo.orderStatus == 3?'已取消':'待购买'}}</text>
					</view>
					<view class="flex flexrow" style="margin-top: 24rpx;">
						<image :src="orderInfo.collectionPic" mode="aspectFill" class="orderCover"></image>
						<view class="flex flexcol" style="padding-top: 16rpx;">
							<text class="f30">{{orderInfo.collectionName}}</text>
							<text class="f24 jmgrey" style="margin-top: 24rpx;">单价 ￥{{orderInfo.orderPrice}} 数量 1</text>
							<text class="f24 jmgrey" style="margin-top: 14rpx;">需付款 ￥{{orderInfo.orderPrice}}</text>
						</view>
					</view>
				</view>
				<view v-if="orderInfo.orderStatus == 2">
					<view class="f32" style="margin-top: 32rpx;margin-bottom: 36rpx;">付款方式</view>
					<view class="successWrap flex flexcol">
						<view class="flex flexrow flexsb flexac" style="padding: 0 20rpx;height: 84rpx;border-bottom: 2rpx solid rgba(112, 112, 112, 0.2);">
							<text class="f28">付款方式：</text>
							<text class="f26 jmgrey">银行卡支付</text>
						</view>
						<view class="flex flexrow flexsb flexac" style="padding: 0 20rpx;height: 84rpx;">
							<text class="f28">支付时间：</text>
							<text class="f26 jmgrey">{{orderInfo.payTime}}</text>
						</view>
					</view>
				</view>	
				<view v-if="orderInfo.orderStatus == 1">
					<view class="f32" style="margin-top: 32rpx;margin-bottom: 36rpx;">选择付款方式</view>
					<view class="flex flexcol">
						<view class="payWay flex flexac" @tap="changec(1)">
							<image src="../../static/icon/weixin.png" style="width: 80rpx;height: 80rpx;"></image>
							<view class="f28" style="margin-left: 24rpx;">微信</view>
							<view class="fixSelect">
								<view  class="flex flexjc flexac" style="height: 32rpx;">
									<image class="tclass-imgc"
										src="https://qiniu-center.xinhualeyu.com/weixin-teacher%2Ficon%2Fcselect.png"
										v-show="payways==1"></image>
									<div v-show="payways!= 1" class="noselect"></div>
								</view>
							</view>
						</view>
						<view class="payWay flex flexac"  @tap="changec(2)" >
							<image src="../../static/icon/zhifubao.png" style="width: 80rpx;height: 80rpx;"></image>
							<view class="f28" style="margin-left: 24rpx;">支付宝</view>
							<view class="fixSelect">
								<view class="flex flexjc flexac" style="height: 32rpx;">
									<image class="tclass-imgc"
										src="https://qiniu-center.xinhualeyu.com/weixin-teacher%2Ficon%2Fcselect.png"
										v-show="payways==2"></image>
									<div v-show="payways!= 2" class="noselect"></div>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 操作按钮 -->	
			<view class="flex flexrow flexsb orderFix" v-if="orderInfo.orderStatus == 1">
				<view class="orderBtn flex flexjc flexac" style="margin-right: 20rpx;" @tap="openCancelTips()">取消订单</view>
				<view class="orderBtn flex flexjc flexac sty2" @tap='openBox()'>立即支付</view>
			</view>
			<view class="flex flexjc orderFix" v-if="orderInfo.orderStatus == 3">
				<view class="orderBtn flex flexjc flexac" style="width: 686rpx;" @tap='openDeletTips()'>删除</view>
			</view>
		</view>
		
		
		
		<!-- 弹框提示 -->
		<uni-popup ref="popup" type="center">
			<view class="showBoxModel flex flexcol flexac">
				<jm-stitle :jstr="'购买须知'"></jm-stitle>
				<view class="flex flexcol flexac" style="margin-top: 42rpx;">
					本数字藏品为用户寄售藏品，仅限实名认证且年满十八周岁的用户购买。该数字藏品版权归发行方或创作者所有，未经授权不得用于任何商业用途。该商品一经出售，不支持退换。数字藏品不支持任何形式的恶意炒作及非法使用，请谨慎购买！
				</view>
				<view class="jmConfirmBtn flex flexjc flexac" style="margin-top: 70rpx;" @tap="goPay()">继续支付</view>
			</view> 
		</uni-popup>
		<uni-popup ref="popup2" type="center">
			<view class="showBoxModel flex flexcol flexac" style="height: 348rpx;">
				<jm-stitle :jstr="'温馨提示'"></jm-stitle>
				<view class="flex flexcol flexac f32" style="margin-top: 56rpx;">
		            您确定要删除此订单吗？
				</view>
				<view style="margin-top: 75rpx;" class="flex flexrow">
					<view class="flex flexjc flexac f28"  style="width: 232rpx;height: 68rpx;border-radius: 4rpx;background-color: white;color: #0256FF;border: 2rpx solid #0256FF;margin-right: 20rpx;" @tap="closeDeletTips()">取消</view>
					<view class="flex flexjc flexac sty2 f28" style="width: 232rpx;height: 68rpx;border-radius: 4rpx;"  @tap="goDelete()">确定</view>
				</view>
			</view> 
		</uni-popup>
		<uni-popup ref="popup3" type="center">
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
				tabIndex: 1,
				order: 1,
				dataList: [],
				orderId: '',
				orderInfo: {},
				payIndex: 1,
				payways: 1
			}
		},
		onLoad(option) {
			that = this;
			this.orderId = option.id;
			this.initData();
		},
		onShow() {},
		methods: {
			goCancel(id){
				this.closeCancelTips();
				let par = {
					orderId: this.orderId
				}
				this.$api.request(
					'get',
					'/app/order/cancel', par,
					function(res) {
						if(res.code ===0){
							that.$api.toast("取消成功");
							setTimeout(()=>{
								uni.redirectTo({
									url: '/pages/my/orderList'
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
			openCancelTips(){
				this.$refs.popup3.open();
			},
			closeCancelTips(){
				this.showFixTop = true;
				this.$refs.popup3.close();
			},
			openDeletTips(){
				this.$refs.popup2.open();
			},
			closeDeletTips(){
				this.$refs.popup2.close();
			},
			goPay(){
				this.closeBox();
				let par = {
					orderId: this.orderId
				}
				this.$api.request(
					'get',
					'/app/order/pay', par,
					function(res) {
						if(res.code ===0){
							that.$api.toast("支付成功");
							setTimeout(()=>{
								uni.redirectTo({
									url: '/pages/my/orderList'
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
			goDelete(){
				this.closeDeletTips();
				let par = {
					orderId: this.orderId
				}
				this.$api.request(
					'get',
					'/app/order/delete', par,
					function(res) {
						if(res.code ===0){
							that.$api.toast("删除成功");
							setTimeout(()=>{
								uni.redirectTo({
									url: '/pages/my/orderList'
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
			openBox(){
				this.$refs.popup.open();
			},
			closeBox(){
				this.$refs.popup.close();
			},
			changec(index) {
				this.payways = index;
			},
			initData() {
				let par = {
					orderId: this.orderId
				}
				this.$api.request(
					'get',
					'/app/order/info', par,
					function(res) {
						that.orderInfo = res.data;
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
	.successWrap{
		width: 686rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		opacity: 1;
	}
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
	.orderFix{
		position: fixed;
		bottom: 92rpx;
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
	.orderTop {
		width: 750rpx;
		height: 80rpx;
		background: #E0EAFF;
		opacity: 1;
		box-sizing: border-box;
		padding-left: 42rpx;
		color: #0256FF;
		font-size: 28rpx;
	}

	.orderCover {
		width: 140rpx;
		height: 140rpx;
		border-radius: 8rpx;
		opacity: 1;
		margin-right: 32rpx;
	}

	.orderBtn {
		border-radius: 4rpx;
		opacity: 1;
		border: 2rpx solid #0256FF;
		font-size: 32rpx;
		color: #0256FF;
		width: 332rpx;
		height: 80rpx;
		border-radius: 4px 4px 4px 4px;
		opacity: 1;
		
	}
	.deleteBtn{
		
	}
	.sty2{
		background: #0256FF;
		color:white;
	}

	page {
		background-color: #F5F5F5;
	}

	.orderListPage {
		padding: 24rpx 32rpx 60rpx;
	}

	.cTab {
		width: 686rpx;
		height: 64rpx;
		background: #EEEEEE;
		;
		border-radius: 8rpx;
		opacity: 1;
		font-size: 32rpx;
	}

	.acttopTab {
		background: #0256FF;
		color: white;
	}

	.orderTab {
		height: 104rpx;
		position: relative;
		font-size: 28rpx;
		width: 100rpx;
	}

	.actHc {
		position: absolute;
		width: 44rpx;
		height: 8rpx;
		background: #0256FF;
		border-radius: 2rpx;
		opacity: 1;
		bottom: 20rpx;
		left: 20rpx;
	}

	.mockDot {
		position: absolute;
		width: 8rpx;
		height: 8rpx;
		background: #0256FF;
		opacity: 1;
		border-radius: 100%;
		right: -15rpx;
	}

	.actTab {
		font-size: 30rpx !important;
		color: #0256FF !important;
		font-weight: bold;
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

	.sty2 {
		background: #0256FF;
		color: white;
	}
</style>

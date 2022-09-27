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
								<text>000001/#100000</text>
							</view>
						</view>
					</view>
				</view>
				<view class="searchWrap flex flexrow flexac flexsb">
					<input type="text" class="cSearch" placeholder="请输入用户手机号码" v-model="userPhone">
					<view class="searBtn flex flexjc flexac">
						<image src="../../static/icon/mjsearch.png" style="width: 28rpx;height: 28rpx;margin-right: 10rpx;"></image>
						查询用户
					</view>
				</view>
				<view class="searchNone flex flexjc flexac">未找到用户~/请输入手机号码~</view>
				<view class="selectUser flex flexac flexsb flexrow">
					<view class="flex flexrow flexac">
						<image src="https://qiniu-center.xinhualeyu.com/hc1.png" class="gHead"></image>
						<text class="f26 jmgrey">四季Rocky</text>
					</view>
					<view class="26 jmgrey">18100360434</view>
				</view>
			</view>
			<!-- <qs v-if="dataList.length == 0"></qs> -->
		</view>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				orderInfo:{}
			}
		},
		onLoad(option) {
			that = this;
		},
		onShow() {},
		methods: {
			initData(item) {
				let par ={}
				this.$api.request(
					'post',
					'/user/commonlyUsedStu',par,
					function(res) {
						if(res.code===0){
							
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

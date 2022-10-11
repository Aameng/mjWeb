<template>
	<view class="orderListPage">
		<view class="flex flexrow" style="margin-bottom: 10rpx;">
			<view class="flex flexjc flexac cTab" :class="tabIndex ==1 ? 'acttopTab':''" @tap="changeTab(1)">我转赠的</view>
			<view class="flex flexjc flexac cTab" :class="tabIndex ==2 ? 'acttopTab':''" @tap="changeTab(2)">我收到的</view>
		</view>
		<view class="flex flexcol">
			<view class="orderItem" v-for="(item,index) in dataList" :key="index">
				<view class="flex flexrow" style="padding: 36rpx 36rpx 24rpx 36rpx;border-bottom: 2rpx solid rgba(26, 26, 26, .1);">
					<image :src="item.collectionPic" mode="aspectFill" class="orderCover" style="margin-right: 32rpx;"></image>
					<view class="flex flexcol flexsb" style="padding: 14rpx 0 8rpx;">
						<!-- <text class="f30">望笙仔｜ 摩托车手-系列</text> -->	
						<text class="f30">{{item.collectionName}}｜{{item.typeName}}</text>
						<text class="f24 jmblue" style="margin-top: 24rpx;">转售成功</text>
					</view>
				</view>
				<view style="padding: 0 34rpx 34rpx 36rpx;" class="flex flexcol">
					<view class="flex flexrow flexsb flexac" style="margin-top: 30rpx;height:26rpx">
						<text class="f26">转赠时间：</text>
						<text class="jmgrey f26">{{item.giveTime}}</text>
					</view>
					<view class="flex flexrow flexsb flexac" style="margin-top: 34rpx;height:34rpx">
						<text class="f26">接受用户：</text>
						<view class="flex flexrow flexac">
							<image :src="item.headPic||'https://leyu-demo.xinhualeyu.com/oc3.png'" class="minHead"></image>
							<text class="jmgrey f26">{{item.userName}}</text>
						</view>
					</view>
				</view>

			</view>
			<qs v-if="dataList.length == 0"></qs>
		</view>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				tabIndex:1,
				order:1,
				dataList:[]
			}
		},
		onLoad(option) {
			that = this;
			that.initData()
		},
		onShow() {},
		methods: {
			changeTabSeo(index){
				this.order = index;
			},
			changeTab(index){
				this.tabIndex =index;
				this.initData();
			},
			initData(item) {
				let par ={
					type:this.tabIndex - 1
				}
				this.$api.request(
					'get',
					'/app/giveRecord/list',par,
					function(res) {
						if(res.code === 0){
							that.dataList  = res.data;
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
	.minHead{
		width: 44rpx;
		height: 44rpx;
		border-radius: 26rpx;
		opacity: 1;
		margin-right: 12rpx;
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
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		opacity: 1;
		margin-bottom: 20rpx;
	}
	.sty2{
		background: #0256FF;
		color:white;
	}
</style>

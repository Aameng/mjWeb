<template>
	<view class=" flex flexjc flexcol" style="padding-top: 190rpx;position: relative;">
		<view class="collectTop flex flexcol">
			<view class="flex flexrow flexsb flexac">
				<view class="logoFont f5">我的藏品</view>
				<view class="flex flexrow">
					<view class="collectTab flex flexjc flexac f5" :class="collectIndex ===0?'actCollectTab':''"
						@tap="changeTab(0)">藏品</view>
					<view class="collectTab flex flexjc flexac f5" :class="collectIndex ===1?'actCollectTab':''"
						@tap="changeTab(1)">盲盒</view>
				</view>
			</view>
			<view class="flex flexrow" style="width: 686rpx;">
				<view class="secondTab flex flexjc flexac flex1" :class="actSecondTab==0?'actFont':''"
					@tap="toggleSecondTab(0)">收藏中({{totalSat.collectionNum}})</view>
				<view class="secondTab flex flexjc flexac flex1" :class="actSecondTab==1?'actFont':''"
					@tap="toggleSecondTab(1)">转售中({{totalSat.sellingNum}})</view>
				<view class="secondTab flex flexjc flexac flex1" :class="actSecondTab==2?'actFont':''"
					@tap="toggleSecondTab(2)">已转售({{totalSat.selledNum}})</view>
			</view>
		</view>
		<view class="collectPage">
			<view class="flex flexrow flexwrap" style="margin-top: 26rpx;">
				<view class="liItem flex flexcol" v-for="(item,index) in datalist" :key="index" @tap="goDetail(item.collectionId,item.orderId)">
					<view class="relative flex">
						<view class="sq flex flexjc flexac" v-if="index==3 || index ==4">
							<image src="../../static/icon/sq.png" mode="aspectFill"
								style="width: 70%;height: 70%;z-index: 3;"></image>
						</view>
						<image :src="item.collectionPic" mode="aspectFill"
							style="width: 332rpx;height: 320rpx;"></image>
					</view>
					<view class="collectContent">
						<text style="color:#1A1A1A ;font-size: 24rpx;line-height: 24rpx;">{{item.collectionName}}</text>
						<!-- 收藏 -->
						<view v-if="actSecondTab==0" class="flex flexrow goodsNumber">
							<view class="nuClass f5">数量</view>
							<view class="lNum">{{item.num}}份</view>
						</view>
						<!-- 转售 -->
						<view class="flex flexcol" v-if="actSecondTab==1 || actSecondTab ==2">
							<view class="jmsbtnc flex flexjc flexac flexsb" style="margin-top: 18rpx;">
								<text>编号</text>
								<text>{{item.ucNo}}</text>
							</view>
							<view class="flex flexrow flexsb flexac" style="margin-top: 18rpx;">
								<text style="color:#767676;font-size: 22rpx;">{{actSecondTab==1?'转售价':'成交价'}}</text>
								<view class="collectPrice f5"><text style="font-size: 24rpx;">￥</text>{{item.orderPrice}}</view>
							</view>
						</view>

					</view>
				</view>		
			</view>
			<qs v-if="datalist.length == 0" style="margin-bottom: 100rpx;"></qs>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="collectDetail flex flexjc flexac flexcol">
				<view style="margin-bottom: 62rpx;" class="f32 f5">转售详情</view>
				<view class="collectItem flex1 flex flexrow flexsb">
					<view class="jmgrey f28">出售价格：</view>
					<view class="f26 jmblue">￥{{sellDetail.orderPrice}}</view>
				</view>
				<view class="collectItem flex1 flex flexrow flexsb">
					<view class="jmgrey f28">支付通道费用(1%)：</view>
					<view class="f26">￥{{sellDetail.payChannelMoney}}</view>
				</view>
				<view class="collectItem flex1 flex flexrow flexsb">
					<view class="jmgrey f28">创作者版权分红(1%)：</view>
					<view class="f26">￥{{sellDetail.creatorMoney}}</view>
				</view>
				<view class="collectItem flex1 flex flexrow flexsb">
					<view class="jmgrey f28">平台服务费(5%)：</view>
					<view class="f26">￥{{sellDetail.platformMoney}}</view>
				</view>
				<view class="collectItem flex1 flex flexrow flexsb">
					<view class="jmgrey f28">经纪人返佣(1%)：</view>
					<view class="f26 ">￥{{sellDetail.brokerMoney}}</view>
				</view>
				<view class="collectItem flex1 flex flexrow flexsb">
					<view class="jmgrey f28">转售所得：</view>
					<view class="f26 jmblue">￥{{sellDetail.realPrice}}</view>
				</view>
				<view class="collectItem flex1 flex flexrow flexsb">
					<view class="jmgrey f28">上架时间：</view>
					<view class="f26">{{sellDetail.createTime}}</view>
				</view>
				
				<view class="collectItem flex flexrow flexsb flexac" style="height: 76rpx;box-sizing: border-box;">
					<view class="jmgrey f28">成交用户：</view>
					<view class="f26 flex flexrow flexac">
					 <image :src="sellDetail.headPic||'https://leyu-demo.xinhualeyu.com/oc3.png'" class="minHead"></image>
					 {{sellDetail.userName}}
					</view>
				</view>
				<view class="collectItem flex1 flex flexrow flexsb">
					<view class="jmgrey f28">成交时间：</view>
					<view class="f26">{{sellDetail.payTime}}</view>
				</view>
				<view class="collectItem flex1 flex flexrow flexsb">
					<view class="jmgrey f28">订单编号：</view>
					<view class="f26">{{sellDetail.orderNo}}</view>
				</view>
				
				<view class="upshlef flex flexjc flexac" @tap="goDown()" v-if="sellDetail.orderStatus===0">下架</view>
				<view class="upshlef flex flexjc flexac" v-if="sellDetail.orderStatus===1">等待用户支付</view>
			</view>
		</uni-popup >
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				collectIndex: 0,
				actSecondTab:0,
				datalist:[],
				totalSat:{},
				//转售详情
				sellDetail:{}
			}
		},
		onLoad(option) {
			// this.$nextTick(()=>{
			// 	this.openBox();
			// })
			this.initNumber();
			this.initData();
		},
		onShow() {},
		methods: {
			goDown(){
				let par = {
					orderId:this.sellDetail.orderId
					
				}
				let that =this;
				this.$api.request(
					'get',
					'/app/order/takeDown', par,
					function(res) {
						if(res.code===0){
							that.closeBox();
							that.$api.toast("下架成功");
							that.initData();
							that.initNumber();
						}
					},
					function(fail) {
						that.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605'
				);
			},
			initNumber() {
				let par = {
					collectionType:this.collectIndex
				}
				let that =this;
				this.$api.request(
					'get',
					'/app/userCollection/getNum', par,
					function(res) {
						if(res.code===0){
							that.totalSat = res.data;
						}
					},
					function(fail) {
						this.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605'
				);
			},
			
			goDetail(id,orderId){
				if(this.actSecondTab === 0){
					uni.navigateTo({
						url:'/pages/collect/collectList?id='+id
					})
				}
				if(this.actSecondTab === 1 || this.actSecondTab === 2){	
					let par = {
						orderId:orderId
					}
					let that =this;
					this.$api.request(
						'get',
						'/app/order/info', par,
						function(res) {
							if(res.code===0){
								that.sellDetail = res.data;
							}
						},
						function(fail) {
							this.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
						},
						'8605'
					);
					this.openBox();
				}
				
			},
			goUrl(){
				this.closeBox();
				uni.navigateTo({
					url:'/pages/collect/composeOperate'
				})
			},
			openBox(){
				this.$refs.popup.open();
			},
			closeBox(){
				this.$refs.popup.close();
			},
			toggleSecondTab(index){
				this.actSecondTab = index;
				this.initData()
			},
			changeTab(index) {
				this.collectIndex = index;
				this.initNumber();
				this.initData()
			},
			initData(item) {
				let par = {
					collectionType:this.collectIndex,
					type:this.actSecondTab
				}
				let that =this;
				this.$api.request(
					'get',
					'/app/userCollection/myCollectionList', par,
					function(res) {
						if(res.code===0){
							that.datalist = res.data;
						}
					},
					function(fail) {
						this.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605'
				);
			},
		}
	}
</script>

<style>
	page{
		background-color: #F5F5F5;
	}
	.minHead{
		width: 52rpx;
		height: 52rpx;
		border-radius: 26rpx;
		opacity: 1;
		margin-right: 12rpx;
	}
	.upshlef{
		width: 322rpx;
		height: 76rpx;
		background: #0256FF;
		border-radius: 4rpx;
		opacity: 1;
		font-size: 28rpx;
		color:white;
		margin-top: 70rpx;
	}
	.collectItem{
		padding: 28rpx 0;
		width: 580rpx;
		border-bottom: 2rpx solid rgba(118, 118, 118, 0.2);
	}
	.collectDetail{
		padding: 36rpx 24rpx 70rpx;
		width: 630rpx;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		background: white;
	}
	.lNum{
		color:#0256FF;
		font-size: 22rpx;
		padding: 8rpx 20rpx;
	}
	.nuClass{
		background-color: #0256FF;
		padding: 8rpx 16rpx;
		font-size: 22rpx;
		color: white;
	}
	.goodsNumber{
		border: 2rpx solid #0256FF;
		margin-top: 18rpx;
		flex:auto;
		width: max-content;
	}
	.collectPrice {
		color: #0256FF;
		font-size: 34rpx;
		font-weight: bold;
		line-height: 22rpx;
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
	.collectContent{
		padding: 22rpx 16rpx 22rpx;
		position: relative;
	}
	.liItem {
		width: 332rpx;
		background: #FFFFFF;
		margin-bottom: 20rpx;
	}
	
	.liItem:nth-child(odd) {
		margin-right: 20rpx;
	}
	.secondTab{
		padding: 26rpx 0;
		margin-top: 20rpx;
	}
	.collectTop {
		padding: 24rpx 32rpx 0;
		position: fixed;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		background-color: white;
		z-index: 99;
	}

	.collectPage {
		padding: 0rpx 32rpx 40rpx;
		background-color: #F5F5F5;
		position: relative;
	}

	.logoFont {
		font-size: 38rpx;
	}

	.collectTab {
		width: 232rpx;
		height: 60rpx;
		background: #D8D8D8;
		border-radius: 4rpx 0px 0px 4rpx;
	}

	.actCollectTab {
		background-color: #0256FF;
		color: white;
	}

	.actFont {
		color: #0256FF !important;
	}
</style>

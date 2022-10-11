<template>
	<view class="pageGoods">
		<view class="coverWrap">
			<image :src="composeData.collectionPic" alt="" mode="aspectFill"
				style="width: 750rpx;height: 788rpx;" />
				<view class="buyLockc flex flexjc flexac">
					恭喜您已集齐福寿财禄盲盒内所有藏品
				</view>
		</view>
		<view class="gocompose flex flexjc flexac" @tap="openBox()">立即合成</view>
		<view class="flex flexac" style="padding: 0 30rpx;">
			<image src="../../static/icon/jm901.png" style="width: 690rpx;height: 26rpx;margin-top: 36rpx;"></image>
		</view>
		
		<view class="composeWrap flex flexrow flexwrap">
			<view class="composeItem flex flexcol flexac"  v-for="(item,index) in dataList" :key="index">
				<image :src="item.collectionPic" class="itemCover"></image>
				<text class="f28" style="margin-top: 32rpx;">{{item.collectionName}}</text>
				<!-- <text class="f22 jmgrey" style="margin-top: 14rpx;margin-bottom: 22rpx;">概率 35%</text> -->
				<view class="getBtn flex flexjc flexac" style="margin-top: 22rpx;" v-if="index<4">已拥有({{item.haveCollectionNumber}})</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="collectDetail flex flexjc flexac flexcol">
				<view class="f28 jmgrey">合成提示</view>
				<view class="f34" style="padding:62rpx 0 66rpx">您确定要进行合成吗？</view>
				<jm-stitle :jstr="'本次合成消耗'" style="margin-bottom: 44rpx;"></jm-stitle>
				<view class="collectItem2 flex1 flex flexrow flexsb" v-for="(item,index) in dataList" :key="index">
					<view class="f28">{{item.collectionName}}</view>
					<view class="f28">X{{item.needCollectionNumber}}</view>
				</view>
				<view class="upshlef flex flexjc flexac" @tap="goSubmit()">立即合成</view>
			</view>
		</uni-popup >
		
	</view>
</template>
<script>
	let that;
	export default {
		data() {
			return {
				//是否获得资格
				getQual:false,
				collectionId:'',
				dataList:[],
				composeData:{}
			}
		},
		onLoad(option) {
			this.composeData = getApp().globalData.composeData || {}
			this.collectionId = option.id;
			that = this;
			this.initData();
			// this.$nextTick(()=>{
			// 	this.openBox();
			// })
		},
		onShow() {},
		methods: {
			goSubmit(){
				let par = {
					collectionId:this.collectionId
				}
				this.$api.request(
					'get',
					'/app/collection/compose', par,
					function(res) {
						that.closeBox();
						if(res.code===0){	
							that.$api.toast("合成成功")
						}
						else{
							that.$api.toast(res.msg || "合成失败")
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
			initData(item) {
				let par = {
					collectionId:this.collectionId
				}
				this.$api.request(
					'get',
					'/app/collection/myComposeNeedList', par,
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
	.getBtn{
		width: 210rpx;
		height: 71rpx;
		background: #0256FF;
		border-radius: 4rpx;
		color:white;
		font-size: 28rpx;
	}
	.itemCover{
		width: 108rpx;
		height: 108rpx;
		border-radius: 4rpx;
	}
	.composeItem{
		width: 210rpx;
		background: #FFFFFF;
		border-radius: 4rpx;
		margin-right: 28rpx;
		box-sizing: border-box;
		padding-top: 16rpx;
		margin-bottom: 18rpx;
	}
	.composeItem:nth-child(3n){
		margin-right: 0rpx;
	}
	.composeWrap{
		padding: 40rpx 30rpx 40rpx;
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
	.showBoxModel{
		width: 600rpx;
		height: 720rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		opacity: 1;
		box-sizing: border-box;
		padding: 48rpx 50rpx;
	}
	.collectItem2{
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
	.xBtn{
		width: 686rpx;
		height: 80rpx;
		background: #0256FF;
		border-radius: 4rpx;
		opacity: 1;
		font-size: 30rpx;
		font-weight: bold;
		color:white;
		/* ??? */
		opacity: 0.6;
	}
	.fixBuyBtn{
		width: 750rpx;
		height: 160rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		border-radius: 0px 0px 0px 0px;
		opacity: 1;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		position: fixed;
	}
	.xzWrap{
		padding: 32rpx 30rpx 20rpx;
		color:#767676;
		font-size: 28rpx;
		background-color: white;
		margin-top: 26rpx;
	}
	.company{
		padding: 20rpx 20rpx 18rpx;
		margin-top: 26rpx;
		background-color: white;
	}
	.mockBot{
		width: 100%;
		background-color: #1A1A1A;
		height: 2rpx;
		opacity: .2;
		margin: 40rpx 0;
	}
	page{
		background-color: #F5F5F5;
	}
	.pageGoods {
		padding-bottom: 30rpx;
	}

	.cSty {
		background: #E0EAFF;
		border-radius: 4rpx;
		opacity: 1;
		border: 2rpx solid #0256FF;
		font-size: 24rpx;
		color: #0256FF;
		padding: 6rpx 20rpx;
	}

	.coverWrap {
		height: 788rpx;
		width: 750rpx;
		position: relative;
	}

	.buyLockc {
		width: 750rpx;
		height: 60rpx;
		background: #E0EAFF;
		color: #767676;
		font-size: 26rpx;
		opacity: 0.5;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 2;
	}

	.detailContent {
		padding: 34rpx 32rpx 0;
	}
	.gocompose{
		width: 626rpx;
		height: 80rpx;
		background: #0256FF;
		border-radius: 4rpx;
		opacity: 1;
		font-size: 32rpx;
		font-weight: bold;
		color:white;
		margin: 0 auto;
	}
</style>




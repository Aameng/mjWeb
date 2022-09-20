<template>
	<view class="flex flexjc flexcol" style="padding-top: 190rpx;position: relative;">
		<view class="marketHeader">
			<view class="marTop flex flexrow">
				<text class="scFontm f5">数藏艺术</text>
				<image src="../../static/icon/a3.png" class="searchIcon"  @tap="gosearch()"></image>
			</view>
			<view class="flex flexrow" style="padding-bottom: 40rpx;">
				<view class="flex flexrow flexac flexjc" style="width: 170rpx;" @tap="change(1)">
					<view style="font-size: 28rpx;" class="f5" :class="tabIndex==1?'actMarFont':''">藏品</view>
					<image :src="tabIndex==1?'../../static/icon/arrow1.png':'../../static/icon/arrow.png'" style="width: 24rpx;height: 16rpx;margin-left: 8rpx;" mode="aspectFill"></image>
				</view>
				<view class="flex flexrow flexac flexjc" style="width: 320rpx;" @tap="change(2)">
					<view style="font-size: 28rpx;" class="f5" :class="tabIndex==2?'actMarFont':''">全部品牌</view>
					<image :src="tabIndex==2?'../../static/icon/arrow1.png':'../../static/icon/arrow.png'" style="width: 24rpx;height: 16rpx;margin-left: 8rpx;" mode="aspectFill"></image>
				</view>
				<view class="flex flexrow flexac flexjc" style="width: 200rpx;" @tap="change(3)">
					<view style="font-size: 28rpx;" class="f5" :class="tabIndex==3?'actMarFont':''">最新上架</view>
					<image :src="tabIndex==3?'../../static/icon/arrow1.png':'../../static/icon/arrow.png'" style="width: 24rpx;height: 16rpx;margin-left: 8rpx;" mode="aspectFill"></image>
				</view>
			</view>
		</view>

		<!-- 小个 -->
		<view class="mjpage">
			<view class="flex flexrow flexwrap" style="margin-top: 30rpx;">
				<view class="liItem flex flexcol" v-for="(item,index) in 7" :key="index">
					<view class="relative flex">
						<view class="sq flex flexjc flexac" v-if="index==3 || index ==4">
							<image src="../../static/icon/sq.png" mode="aspectFill"
								style="width: 70%;height: 70%;z-index: 3;"></image>
						</view>
						<image src="https://leyu-demo.xinhualeyu.com/oc2.png" mode="aspectFill"
							style="width: 332rpx;height: 320rpx;"></image>
					</view>
					<view class="marketContent">
						<view style="color:#1A1A1A ;font-size: 24rpx;line-height: 24rpx;" class="flex">NDC+果冻人系列-潜水员</view>
						<view class="jmsbtnc flex flexac">
							<text style="margin-right: 12rpx;">编号</text>
							<text>0001/#100000</text>
						</view>
						<view class="fixPriceMar f5"><text style="font-size: 24rpx;">￥</text>10.00</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :animation="false">
			<view>
				<view class="marketHeader">
					<view class="marTop flex flexrow">
						<text class="scFontm f5">数藏艺术</text>
						<image src="../../static/icon/a3.png" class="searchIcon"></image>
					</view>
					<view class="flex flexrow" style="padding-bottom: 40rpx;">
						<view class="flex flexrow flexac flexjc" style="width: 170rpx;" @tap="change(1)">
							<view style="font-size: 28rpx;" class="f5"  :class="tabIndex==1?'actMarFont':''">藏品</view>
							<image :src="tabIndex==1?'../../static/icon/arrow1.png':'../../static/icon/arrow.png'" style="width: 24rpx;height: 16rpx;margin-left: 8rpx;" mode="aspectFill"></image>
						</view>
						<view class="flex flexrow flexac flexjc" style="width: 320rpx;" @tap="change(2)">
							<view style="font-size: 28rpx;" class="f5" :class="tabIndex==2?'actMarFont':''">全部品牌</view>
							<image :src="tabIndex==2?'../../static/icon/arrow1.png':'../../static/icon/arrow.png'" style="width: 24rpx;height: 16rpx;margin-left: 8rpx;" mode="aspectFill"></image>
						</view>
						<view class="flex flexrow flexac flexjc" style="width: 200rpx;" @tap="change(3)">
							<view style="font-size: 28rpx;" class="f5" :class="tabIndex==3?'actMarFont':''">最新上架</view>
							<image :src="tabIndex==3?'../../static/icon/arrow1.png':'../../static/icon/arrow.png'" style="width: 24rpx;height: 16rpx;margin-left: 8rpx;" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="selectContent flex flexwrap flexrow">
					<view class="selectItem flex flexjc flexac" @tap="toggleItem(index)" v-for="(item,index) in 4" :key="index" :class="index==selectIndex?'actSelect':''">全部品牌</view>				
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 大的tab分类
				tabIndex:0,
				// 分类下的小类
				selectIndex:0
			}
		},
		methods:{
			gosearch(){
				uni.navigateTo({
					url:'/pages/index/search'
				})
			},
			change(index){
				this.tabIndex = index;
				this.$refs.popup.open();
			},
			toggleItem(index){
				this.selectIndex = index;
			}
		}
	}
</script>

<style>
	.actSelect{
		background: #0256FF !important;
		color:white !important;
	}
	.marketHeader {
		background-color: white;
		padding: 0 36rpx 0 32rpx;
		padding-top: 40rpx;
		position: fixed;
		top:0;
		left: 50%;
		transform: translateX(-50%);
		z-index: 99;
	}
	.selectContent{
		position: fixed;
		top:181rpx;
		left: 50%;
		 transform:  translateX(-50%);
		padding: 14rpx 0 32rpx 34rpx;
		background-color: white;
		width: 750rpx;
		
	}
	.selectItem{
		width: 332rpx;
		height: 60rpx;
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		font-size: 30rpx;
		background: #D8D8D8;
		margin-bottom: 20rpx;
	}
    .selectItem:nth-child(odd){
		margin-right: 20rpx;
	}
	.scFontm {
		color: #1A1A1A;
		font-size: 32rpx;
		margin-left: 4rpx;
		line-height: 32rpx;
		position: relative;
		top: 10rpx;
	}

	.marTop {	
		position: relative;
		height: 38rpx;
		margin-bottom: 32rpx;
	}

	.liItem {
		width: 332rpx;
		background: #FFFFFF;
		margin-bottom: 20rpx;
	}

	.liItem:nth-child(odd) {
		margin-right: 20rpx;
	}

	.mjpage {
		padding: 0 32rpx 40rpx;
		background-color: #F5F5F5;
	}

	.lfc {
		padding: 26rpx 20rpx;
		color: #1A1A1A;
		font-size: 28rpx;
	}

	.marketContent {
		padding: 16rpx 16rpx 72rpx;
		position: relative;
	}

	.jmsbtnc {
		/* width: 252rpx; */
		margin-top: 18rpx;
		width: max-content;
		height: 40rpx;
		background: #0256FF;
		border-radius: 0px 0px 0px 0px;
		opacity: 1;
		font-size: 22rpx;
		color: white;
		box-sizing: border-box;
		padding: 0 8rpx;
	}

	.fixPriceMar {
		position: absolute;
		left: 18rpx;
		bottom: 20rpx;
		color: #0256FF;
		font-size: 38rpx;
		font-weight: bold;
		line-height: 22rpx;
	}
	.actMarFont{
		color:#0256FF !important;
	}
</style>

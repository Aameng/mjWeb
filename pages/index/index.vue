<template>
	<view class="flex flexjc flexcol mjpage">
		<view class="mjTop flex flexrow">
			<image src="../../static/icon/a5.png" style="height: 46rpx;width: 40rpx;"></image>
			<text class="scFont">数藏艺术</text>
			<image src="../../static/icon/a3.png" class="searchIcon" @tap="gosearch()"></image>
		</view>
		<view class="swiper-box flex" v-if='bannerList.length>0' style="margin-top: 50rpx;">
			<swiper :indicator-dots="true" :autoplay="false" style="width: 686rpx;height: 328rpx;"
				v-if='bannerList.length>1'>
				<block>
					<swiper-item class="flex flexfe" v-for="(item,index) in bannerList" :key='index'>
						<image :src="item.swiperPic" @click="handleUrl(item.swiperUrl)"
							style="width:100%;height:100%;border-radius: 14rpx;" mode="aspectFill">
						</image>
					</swiper-item>
				</block>
			</swiper>
			<image :src="bannerList[0].swiperPic" @click="handleUrl(bannerList[0].swiperUrl)"
				style="width: 690rpx;height: 280rpx;border-radius: 14rpx;" mode="aspectFill" v-else></image>
		</view>
		<view class="newNotice flex flexrow flexac" @tap="goNotice()">
			<image src="../../static/icon/a19.png" style="width: 94rpx;height: 72rpx;"></image>
			<view style="margin-left: 30rpx;">{{noticeObj.noticeName}}</view>
		</view>
		<view class="flex flexrow" style="padding:50rpx 0 30rpx;">
			<view class="tabFont" :class="tabIndex == 1?'actTab':''" @tap="changeTap(1)" style="margin-left: 20rpx;">精选推荐</view>
			<view class="tabFont" :class="tabIndex == 2?'actTab':''" @tap="changeTap(2)" style="margin-left: 48rpx;">发售日历</view>
		</view>
		<view v-show="tabIndex == 1">
			<!-- 精选指定推荐物品 -->
			<view class="firstItem fledx flexcol" @tap="goDetail()">
				<image :src="topCollect.collectionPic" mode="aspectFill" style="width: 686rpx;height: 708rpx;"></image>
				<view class="firstContent flex flexcol">
					<text style="color:#1A1A1A;font-size: 32rpx;" class="f5">{{topCollect.collectionName}}</text>
					<view class="flex flexrow flexsb flexac" style="margin-top: 16rpx;">
						<view class="flex flexrow flexac">
							<image src="../../static/icon/a5.png" class="userIcon"></image>
							<text style="color:#1A1A1A;font-size: 26rpx;margin-left: 10rpx;">望笙仔</text>
						</view>
						<view class="jmsbtn flex flexjc flexac flexsb">
							<text>限量</text>
							<text>{{topCollect.publishNumber}}份</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 小个 -->
			<view class="flex flexrow flexwrap" style="margin-top: 30rpx;"> 
				<view class="liItem flex flexcol" v-for="(item,index) in collectList" :key="index">
					<view class="relative flex">
						<view class="sq flex flexjc flexac" v-if="index==3 || index ==4">
							<image src="../../static/icon/sq.png" mode="aspectFill" style="width: 70%;height: 70%;z-index: 3;"></image>
						</view>
						<image src="https://leyu-demo.xinhualeyu.com/oc2.png" mode="aspectFill" style="width: 332rpx;height: 320rpx;"></image>
					</view>
					
					<view class="lfc">{{item.collectionName}}</view>
				</view>
			</view>
		</view>
		
		<!-- 发售日历 -->
		<view v-show="tabIndex == 2">
			<view class="flex flexcol">
				<view class="secondItem flex flexrow" v-for="(item,index) in collectDate" :key='index'>
					<image :src="item.collectionPic" style="width: 246rpx;height: 246rpx;"></image>
					<view class="kcoview">
						<text style="font-size: 32rpx;color:#1A1A1A;line-height: 32rpx;">{{item.collectionName}}</text>
						<view class="jmsbtn flex flexjc flexac flexsb" style="margin-top: 22rpx;">
							<text>限量</text>
							<text>{{item.publishNumber}}份</text>
						</view>
						<view style="font-size: 24rpx;margin-top: 18rpx;">{{item.sellTime}}</view>
						<view class="fixPrice"><text style="font-size: 24rpx;">￥</text>{{item.price}}</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				bannerList: [],
				tabIndex:1,
				topCollect:{},
				collectList:[],
				collectDate:[],
				noticeList:[],
				noticeObj:{}
			}
		},
		onLoad(option) {
            that= this;
			this.initBannerData();
			this.initList();
			this.getNotice();
		},
		onShow() {
			
		},
		methods: {
			goNotice(){
				uni.navigateTo({
					url:'/pages/my/notice'
				})
			},
			getNotice(){
				let par = {}
				this.$api.request(
					'get',
					'/app/notice/indexList', par,
					function(res) {
						console.log("res",res);
						if(res.code===0){
							if(res.data.length>0){
								that.noticeObj = res.data[0];
							}
						}
					},
					function(fail) {
						this.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605',
					true
				);
			},
			gosearch(){
				uni.navigateTo({
					url:'/pages/index/search'
				})
			},
			goDetail(){
				uni.navigateTo({
					url:'/pages/market/goodsDetail'
				})
			},
			changeTap(index){
				this.tabIndex = index;
			},
			initBannerData() {
				let par = {}
				this.$api.request(
					'get',
					'/app/swiper/list', par,
					function(res) {
						console.log("res",res);
						if(res.code===0){
							that.bannerList = res.data;
						}
					},
					function(fail) {
						this.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605',
					true
				);
			},
			initList(){
				let par = {}
				this.$api.request(
					'get',
					'/app/collection/groundingList', par,
					function(res) {
						console.log("res",res);
						if(res.code===0){
							if(res.data.length>0){
								that.topCollect = res.data[0];
								that.collectDate = JSON.parse(JSON.stringify(res.data));
								res.data.splice(0,1)
								that.collectList = res.data;
							}
						}
					},
					function(fail) {
						this.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605',
					true
				);
			},
			handleUrl() {

			}
		}
	}
</script>

<style>
	.fixPrice{
		position: absolute;
		right: 26rpx;
		bottom:22rpx;
		color:#0256FF;
		font-size: 38rpx;
		font-weight: bold;
	}
	.kcoview{
		padding: 30rpx 0 22rpx 36rpx;
	}
	.secondItem{
		width: 686rpx;
		height: 246rpx;
		background: white;
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		opacity: 1;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;
		margin-bottom: 20rpx;
	}
	.liItem{
		width: 332rpx;
		background: #FFFFFF;
		margin-bottom: 20rpx;
	}
	.liItem:nth-child(odd){
		margin-right: 20rpx;
	}
	.userIcon{
		width: 40rpx;
		height: 40rpx;
		border-radius: 20px 20px 20px 20px;
		overflow: hidden;
	}
	.jmsbtn{
		width: 192rpx;
		height: 52rpx;
		background: #0256FF;
		border-radius: 0px 0px 0px 0px;
		opacity: 1;
		font-size: 26rpx;
		color:white;
		box-sizing: border-box;
		padding: 0 22rpx;
	}
	.firstContent{
		padding: 16rpx 24rpx 28rpx;
	}
	.firstItem{
		width: 686rpx;
		background: #FFFFFF;
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		opacity: 1;
		overflow: hidden;
	}
	.mjpage {
		padding: 0 32rpx 40rpx;
		background-color: #F5F5F5;
	}
	.newNotice{
		width: 686rpx;
		height: 74rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
		margin-top: 32rpx;
	}

	.mjTop {
		margin-top: 40rpx;
		position: relative;
	}
	.lfc{
		padding: 26rpx 20rpx;
		color:#1A1A1A;
		font-size: 28rpx;
	}



	.scFont {
		color: #0256FF;
		font-size: 32rpx;
		margin-left: 4rpx;
		line-height: 32rpx;
		height: 30rpx;
		position: relative;
		top:10rpx;
		font-weight: bold;
	}
	.tabFont{
		font-size: 32rpx;
		color:#707070;
	}
	.actTab{
		color: #1A1A1A;
		font-weight: bold;
	}
</style>

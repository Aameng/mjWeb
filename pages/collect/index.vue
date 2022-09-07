<template>
	<view class="collectPage flex flexjc flexcol">
		<view class="collectTop flex flexcol">
			<view class="flex flexrow flexsb flexac">
				<view class="logoFont">我的藏品</view>
				<view class="flex flexrow">
					<view class="collectTab flex flexjc flexac" :class="collectIndex ==1?'actCollectTab':''"
						@tap="changeTab(1)">藏品</view>
					<view class="collectTab flex flexjc flexac" :class="collectIndex ==2?'actCollectTab':''"
						@tap="changeTab(2)">盲盒</view>
				</view>
			</view>
			<view class="flex flexrow">
				<view class="secondTab flex flexjc flexac flex1" :class="actSecondTab==1?'actFont':''"
					@tap="toggleSecondTab(1)">收藏中(3）</view>
				<view class="secondTab flex flexjc flexac flex1" :class="actSecondTab==2?'actFont':''"
					@tap="toggleSecondTab(2)">转售中(1）</view>
				<view class="secondTab flex flexjc flexac flex1" :class="actSecondTab==3?'actFont':''"
					@tap="toggleSecondTab(3)">已转售(1）</view>
			</view>
		</view>
		<view>
			<view class="flex flexrow flexwrap" style="margin-top: 30rpx;">
				<view class="liItem flex flexcol" v-for="(item,index) in 7" :key="index">
					<view class="relative flex">
						<view class="sq flex flexjc flexac" v-if="index==3 || index ==4">
							<image src="../../static/icon/sq.png" mode="aspectFill"
								style="width: 70%;height: 70%;z-index: 3;"></image>
						</view>
						<image src="https://leyu-demo.xinhualeyu.com/oc2.png" mode="aspectFill"
							style="width: 334rpx;height: 320rpx;"></image>
					</view>
					<view class="collectContent">
						<text style="color:#1A1A1A ;font-size: 24rpx;line-height: 24rpx;">NDC+果冻人系列-潜水员</text>
						<!-- 收藏 -->
						<view v-if="actSecondTab==1" class="flex flexrow goodsNumber">
							<view class="nuClass">数量</view>
							<view class="lNum">200份</view>
						</view>
						<!-- 转售 -->
						<view class="flex flexcol" v-if="actSecondTab==2 || actSecondTab ==3">
							<view class="jmsbtnc flex flexjc flexac flexsb" style="margin-top: 18rpx;">
								<text>编号</text>
								<text>000001/#100000</text>
							</view>
							<view class="flex flexrow flexsb flexac" style="margin-top: 18rpx;">
								<text style="color:#767676;font-size: 22rpx;">{{actSecondTab==2?'转售价':'成交价'}}</text>
								<view class="collectPrice"><text style="font-size: 24rpx;">￥</text>10.00</view>
							</view>
						</view>

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
				collectIndex: 1,
				actSecondTab:1
			}
		},
		onLoad(option) {},
		onShow() {},
		methods: {
			toggleSecondTab(index){
				this.actSecondTab = index;
			},
			changeTab(index) {
				this.collectIndex = index;
			},
			initData(item) {
				let par = {}
				this.$api.request(
					'post',
					'/user/commonlyUsedStu', par,
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
		width: 186rpx;
	}
	.collectPrice {
		color: #0256FF;
		font-size: 38rpx;
		font-weight: bold;
		line-height: 22rpx;
	}
	.jmsbtnc {
		width: 252rpx;
		height: 40rpx;
		background: #0256FF;
		border-radius: 0px 0px 0px 0px;
		opacity: 1;
		font-size: 22rpx;
		color: white;
		box-sizing: border-box;
		padding: 0 8rpx;
	}
	.collectContent{
		padding: 22rpx 16rpx 30rpx;
		position: relative;
	}
	.liItem {
		width: 334rpx;
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
		left: 0;
		width: 100%;
		background-color: white;
		z-index: 99;
	}

	.collectPage {
		padding: 186rpx 32rpx 40rpx;
		background-color: #F5F5F5;
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

<template>
	<view class="searchPage">
		<view class="flex flexrow flexac">
			<view class="btnWrap flex flexac flexrow">
				<image src="../../static/icon/sea.png" style="width: 32rpx;height: 32rpx;"></image>
				<input type="text" confirm-type="search" @confirm="confirm(2,searchContent)" class="searchInput">
			</view>
			<view class="f30" style="margin-left: 24rpx;" @tap="goback()">取消</view>
		</view>
		<!-- <qs style="margin-top: 300rpx;" v-if="dataList.length==0"></qs> -->
		<view class="history" v-if="historySta">
			<view class="flex flexrow flexac flexsb" style="padding-right: 20rpx;">
				<text class="f30">搜索历史</text>
				<image src="../../static/icon/a1.png" style="width: 30rpx;height: 30rpx;"></image>
			</view>
			<view class="flex flexcol" style="padding-top: 24rpx;">
				<view class="historyItem flex flexrow flexac flexsb" style="padding-right: 10rpx;"
					v-for='(item,index) in 5' :key="index">
					<text class="jmgrey f28" @tap='confirm(1,item)'>NDC+果冻人系列</text>
					<view style="padding: 15rpx;">
						<image src="../../static/icon/a2.png" style="width: 22rpx; height:22rpx;"></image>
					</view>
				</view>
			</view>
		</view>
<!-- 		<view class="mjpage" v-if="!historySta">
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
						<view style="color:#1A1A1A ;font-size: 24rpx;line-height: 24rpx;" class="flex">NDC+果冻人系列-潜水员
						</view>
						<view class="jmsbtnc flex flexac">
							<text style="margin-right: 12rpx;">编号</text>
							<text>0001/#100000</text>
						</view>
						<view class="fixPriceMar f5"><text style="font-size: 24rpx;">￥</text>10.00</view>
					</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				historySta: true,
				dataList:[],
				history:[],
				// 1 收藏  2市场
				searchType:1
				
			}
		},
		onLoad(option) {
			if(option.type){
				this.searchType = option.type
			}
		},
		onShow() {
			let history = uni.getStorageSync('historymes');
			if (history) {
				this.history = history;
			}
		},
		methods: {
			deleteHistory() {
				this.history = [];
				uni.setStorageSync('historymes', []);
			},
			confirm(index, txt) {
				let that = this;
				let serStr = ''
				if (index) {
					if (index == 2) {
						this.history.push(txt);
					}
					serStr = txt;
				} else {
					serStr = that.searchContent;
					if(serStr){
						this.history.push(that.searchContent);
					}				
				}
				uni.setStorageSync('historymes', this.history);
				//console.log("that.searchContent",that.searchContent);
				uni.setStorageSync('searchTextMes', serStr);
				this.goBack();
			},
			
			goback() {
				uni.navigateBack();
			},
			// getSearch() {
			// 	this.historySta = false;
			// },
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

	.actMarFont {
		color: #0256FF !important;
	}

	.liItem {
		width: 332rpx;
		background: #FFFFFF;
		margin-bottom: 20rpx;
	}

	.liItem:nth-child(odd) {
		margin-right: 20rpx;
	}

	.history {
		padding: 62rpx 0 0;
	}

	page {
		background-color: #F5F5F5;
	}

	.searchPage {
		padding: 28rpx 32rpx;
	}

	.searchInput {
		font-size: 30rpx;
		border: none;
		width: 300rpx;
		padding-left: 30rpx;
	}

	.btnWrap {
		width: 590rpx;
		height: 64rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
		padding: 16rpx 18rpx;
		box-sizing: border-box;
	}

	.historyItem {
		width: 100%;
		margin-top: 70rpx;
		height: 24rpx;
	}
</style>

<template>
			<view class="mjpage">
				<view class="flex flexrow flexwrap" style="margin-top: 30rpx;">
					<view class="liItem flex flexcol" v-for="(item,index) in dataList" :key="index" @tap='goDetail(item.collectionId,item.ucId)'>
						<view class="relative flex">
					<!-- 		<view class="sq flex flexjc flexac" v-if="index==3 || index ==4">
								<image src="../../static/icon/sq.png" mode="aspectFill"
									style="width: 70%;height: 70%;z-index: 3;"></image>
							</view> -->
							<image :src="item.collectionPic" mode="aspectFill"
								style="width: 332rpx;height: 320rpx;"></image>
						</view>
						<view class="marketContent">
							<view style="color:#1A1A1A ;font-size: 24rpx;line-height: 24rpx;" class="flex">{{item.collectionName}}
							</view>
							<view class="jmsbtnc flex flexac">
								<text style="margin-right: 12rpx;">编号</text>
								<text>{{item.ucNo||'--'}}</text>
							</view>
							<!-- <view class="fixPriceMar f5"><text style="font-size: 24rpx;">￥</text>10.00</view> -->
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
				historySta: true,
				dataList:[],
				history:[],
				// 1 收藏  2市场
				searchType:1,
				collectId:''
				
			}
		},
		onLoad(option) {
			that = this;
			this.collectId = option.id
			this.initData();
		},
		methods: {
			goDetail(id,ucid){
				uni.navigateTo({
					url:'/pages/collect/collectDetail?id='+id+'&ucid='+ucid
				})
			},
			initData() {
				let par = {
					collectionId:this.collectId
				}
				this.$api.request(
					'get',
					'/app/userCollection/collectionDetailList', par,
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
	.mjpage {
		padding: 0 32rpx 40rpx;
		background-color: #F5F5F5;
	}
	.marketContent {
		padding: 16rpx 16rpx 30rpx;
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
	
</style>
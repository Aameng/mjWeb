<template>
	<view class="flex flexcol flexac" style="padding-top: 24rpx;">
		<view class="operateIem flex flexrow flexac" v-for="(item,index) in dataList" :key="index">
			<image :src="item.collectionPic" class="opImg"></image>
			<view class="flex flexrow flexsb flexac flex1">
				<view class="flex flexcol">
					<text class="f32" style="margin-bottom: 16rpx;">{{item.collectionName}}</text>
					<text class="jmgrey f24">已集齐（{{item.fenZi}}/{{item.fenMu}}）</text>
				</view>
				<view class="opBtn flex flexjc flexac" @tap="goNavigateTo(item)">去合成</view>
			</view>
		</view>

	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				dataList:[]
			}
		},
		onLoad(option) {
			that =this;
			that.initData();
		},
		onShow() {},
		methods: {
			goNavigateTo(item){
				getApp().globalData.composeData = item; 
				let url ='./composeOperate?id='+item.collectionId;
				uni.navigateTo({
					url
				})
			},
			initData(item) {
				let par = {}
				this.$api.request(
					'get',
					'/app/collection/composeList', par,
					function(res) {
						if(res.code ===0){
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
	page {
		background-color: #F5F5F5;
	}

	.opImg {
		width: 128rpx;
		height: 128rpx;
		border-radius: 4rpx;
		margin-right: 24rpx;
	}

	.operateIem {
		width: 670rpx;
		background: #FFFFFF;
		opacity: 1;
		box-sizing: border-box;
		padding: 16rpx 32rpx 16rpx 16rpx;
		margin-bottom: 20rpx;
	}

	.opBtn {
		width: 140rpx;
		height: 60rpx;
		background: #0256FF;
		border-radius: 4rpx;
		opacity: 1;
		font-size: 26rpx;
		color: white;
	}
</style>

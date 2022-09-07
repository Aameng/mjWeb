<template>
	<view class="loading-box" :style="{top: marTop}"  v-if="SHOW">
		<image class="loading-img" style="" src="../../static/icon/loding.gif"></image>
		<view class="loading-tips">加载中...</view>
	</view>
</template>

<script>
	export default {
		props: {
			marTop: {
				type: String,
				default: '5%'
			}
		},
		data() {
			return {
				SHOW: true
			};
		},
		mounted() {
		},
		methods: {		
			//显示
			show(){
				this.SHOW = true;
			},
			//隐藏
			hide(){
				this.SHOW = false;
			},
		}
	}
</script>

<style>
	.loading-box{
		z-index: 9999;
		position: fixed;
		top: 40%;
		left: 0;
		right: 0;
		width: 100%;
	}
	.loading-img{
		width: 88rpx;
		height: 88rpx;
		display: block;
		margin: 0 auto;
	}
	.loading-tips{
		margin-top: 10rpx;
		font-size: 24rpx;
		color: #666666;
		text-align: center;
	}
</style>

<template>
	<view class="flex flexrow flexjc flexac">
		<image src="../../static/icon/a12.png" style="width: 100rpx;height: 12rpx;"></image>
		<view style="color:#0256FF;font-size: 32rpx; margin: 0 22rpx">{{jstr}}</view>
		<image src="../../static/icon/a11.png" style="width: 100rpx;height: 12rpx;"></image>
	</view>
</template>

<script>
	export default {
	  name: 'jmtitle',
	  props: {
		  jstr: {
		    type: String,
		    default: '温馨提示'
		  }
	  }
	  }
</script>

<style>
</style>

<template>
	<view class="flex flexrow flexjc flexac">
		<image src="../../static/icon/jmbac.png" style="width: 700rpx;height: 12rpx;"></image>
		<view style="color:#0256FF;font-size: 32rpx;position: absolute; left:50%;transform: translateX(-50%);">{{jstr}}</view>
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

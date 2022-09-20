<template>
	<view class="flex flexcol flexjc flexac" style="margin-top: 100rpx;">
		<image src="../../static/icon/a7.png" style="width: 389rpx;height: 217rpx;"></image>
		<text class="f28 jmgrey">{{jstr}}</text>
	</view>
</template>

<script>
	export default {
	  name: 'qs',
	  props: {
		  jstr: {
		    type: String,
		    default: '什么也没有找到~'
		  },
		  imgc:{
			  type: Number,
			  default: 1
		  },
		  src: {
			type: String,
			default: ''
		  }
	  }
	  }
</script>

<style>
</style>

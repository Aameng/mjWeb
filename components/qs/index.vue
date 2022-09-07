<template>
	<view class="flex flexcol flexjc flexac" style="margin-top: 100rpx;">
		<image :src="imgc==1?'../../static/icon/qs1.png':imgc==2?src:'../../static/icon/nochild.png'" style="width: 270rpx;height: 270rpx;"></image>
		<text style="margin-top: 10rpx;font-weight: bold;color:#666666">{{jstr}}</text>
	</view>
</template>

<script>
	export default {
	  name: 'qs',
	  props: {
		  jstr: {
		    type: String,
		    default: '暂无数据'
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

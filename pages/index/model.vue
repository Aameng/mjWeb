<template>
	<view>
		
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {}
		},
		onLoad(option) {},
		onShow() {},
		methods: {
			initData(item) {
				let par ={}
				this.$api.request(
					'post',
					'/user/commonlyUsedStu',par,
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
</style>

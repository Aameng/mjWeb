<template>
	<view>
		<view class="orderListPage">
			<view class="flex flexcol">
				<view class="orderItem">
					<view class="flex flexrow">
						<image :src="orderInfo.collectionPic" mode="aspectFill" class="orderCover"></image>
						<view class="flex flexcol" style="padding-top: 16rpx;">
							<text class="f30">{{orderInfo.collectionName}}</text>
							<view class="jmsbtnc flex flexjc flexac flexsb" style="margin-top: 18rpx;">
								<text>编号</text>
								<text>{{orderInfo.ucNo}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="searchWrap flex flexrow flexac flexsb">
					<input type="text" class="cSearch" placeholder="请输入用户手机号码" v-model="userPhone">
					<view class="searBtn flex flexjc flexac" @tap='searchUser'>
						<image src="../../static/icon/mjsearch.png" style="width: 28rpx;height: 28rpx;margin-right: 10rpx;"></image>
						查询用户
					</view>
				</view>
				<view class="searchNone flex flexjc flexac" v-if="!userInfo.phoneNumber && finded">未找到用户~/请输入手机号码~</view>
				<view class="selectUser flex flexac flexsb flexrow" v-if="userInfo.phoneNumber">
					<view class="flex flexrow flexac">
						<image :src="userInfo.headPic || 'https://qiniu-center.xinhualeyu.com/hc1.png'" class="gHead"></image>
						<text class="f26 jmgrey">{{userInfo.userName || '暂无昵称'}}</text>
					</view>
					<view class="26 jmgrey">{{userInfo.phoneNumber}}</view>
				</view>
			</view>
			<view class="confirmBtn flex flexjc flexac" style="margin-top: 70rpx;" :style="{opacity:userInfo.phoneNumber?'1':'.4'}" @tap="goOperate()">确定赠送</view>
			<!-- <qs v-if="dataList.length == 0"></qs> -->
		</view>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				orderInfo:{},
				userPhone:'',
				userInfo:{},
				finded:false
			}
		},
		onLoad(option) {
			that = this;
			that.orderInfo = getApp().globalData.collectData || {};
			 console.log("that.orderInfo",that.orderInfo);
			 console.log("that.orderInfo",that.orderInfo);
		},
		onShow() {},
		methods: {
			
			goOperate(){
				if(!this.userInfo.phoneNumber)return;
				let par ={
					phone:this.userPhone,
					ucId:this.orderInfo.ucId
				}
				this.$api.request(
					'get',
					'/app/order/give',par,
					function(res) {
						if(res.code===0){
							that.$api.toast("转赠成功");
							setTimeout(()=>{
								uni.reLaunch({
									url: '/pages/collect/index'
								})
							},1000)
						}
					},
					function(fail) {
						this.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605',
					true
				);
			},
			searchUser(){
				if (!that.$api.regular(that.userPhone, 'tel')) {
					that.$api.toast('请输入正确的手机号码')
					return
				}
				let par ={
					phone:this.userPhone
				}
				this.$api.request(
					'get',
					'/app/user/findByPhone',par,
					function(res) {
						if(res.code===0){
							that.finded =true;
							that.userInfo = res.data;
						}
					},
					function(fail) {
						this.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605',
					true
				);
				
			},
			initData(item) {
				let par ={}
				this.$api.request(
					'post',
					'/user/commonlyUsedStu',par,
					function(res) {
						if(res.code===0){
							
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
	.confirmBtn{
		width: 686rpx;
		height: 92rpx;
		background: #0256FF;
		border-radius: 4rpx 4px 4px 4px;
		font-size: 32rpx;
		color:white;
		position: fixed;
		bottom: 80rpx;
	}
	.gHead{
		width: 72rpx;
		height: 72rpx;
		border-radius: 100%;
		margin-right: 18rpx;
	}
	.searchNone{
		width: 686rpx;
		height: 120rpx;
		background: #EEEEEE;
		opacity: 1;
		color:#767676;
		font-size: 26rpx;
		margin-top: 28rpx;
	}
	.selectUser{
		width: 686rpx;
		height: 120rpx;
		background: #EEEEEE;
		opacity: 1;
		box-sizing: border-box;
		padding: 0 30rpx;
		margin-top: 28rpx;
	}
	.searBtn{
		width: 226rpx;
		height: 96rpx;
		background: #0256FF;
		border-radius: 4rpx;
		color:white;
		font-size: 28rpx;
	}
	.cSearch{
		padding-left:28rpx;
		box-sizing: border-box;
		font-size: 28rpx;
	}
	.searchWrap{
		width: 686rpx;
		height: 96rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);		
	}
	page{
		background-color: #F5F5F5;
	}
	.jmsbtnc {
		height: 40rpx;
		background: #0256FF;
		border-radius: 0px 0px 0px 0px;
		opacity: 1;
		font-size: 22rpx;
		color: white;
		box-sizing: border-box;
		padding: 0 8rpx;
		width: max-content;
	}
	.orderListPage {
		padding: 24rpx 32rpx 60rpx;
	}
	.orderItem {
		width: 686rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.1);
		opacity: 1;
		box-sizing: border-box;
		padding: 30rpx 20rpx 24rpx 24rpx;
		margin-bottom: 30rpx;
	}
	.orderCover {
		width: 140rpx;
		height: 140rpx;
		border-radius: 8rpx;
		opacity: 1;
		margin-right: 32rpx;
	}
</style>

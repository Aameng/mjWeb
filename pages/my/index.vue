<template>
	<view class="mypage flex flexcol">
		<view class="topWrap flex flexrow flexac">
			<yq-avatar :selWidth="'136rpx'" :selHeight="'136rpx'" @upload="myUpload" :avatarSrc="userInfo.headPic || fPhoto" class="flex userIcon"></yq-avatar>
			<view class="flex flexcol" style="margin-left: 28rpx;">
				<view class="f32" style="margin-bottom: 16rpx;">{{userInfo.userName || "未知"}}</view>
				<view style="color: #767676;font-size: 24rpx; margin-bottom:12rpx">{{userShowPhone}}</view>
				<view class="smSty flex flexjc flexac" v-if="!userInfo.realName">
					<view style="transform: scale(0.85);line-height:18rpx;color:white" @tap="goNavigateTo(1)">未实名</view>
					<image src="../../static/icon/jm15.png" style="width: 8rpx;height: 18rpx;margin-left: 6rpx;"></image>
				</view>
				<view class="smSty flex flexjc flexac" v-if="userInfo.realName">
					<view style="transform: scale(0.85);line-height:18rpx;color:white">已实名</view>
				</view>
			</view>
			<image src="../../static/icon/jm7.png" class="message" @tap="goNavigateTo(13)"></image>
		</view>
		<view class="secondTab flex flexrow flexsb" @tap="goNavigateTo(3)">
			<view class="flex flexcol flexac flexjc">
				<img src="../../static/icon/jm8.png" class="mySicon" alt="">
				<text class="f26">订单中心</text>
			</view>
			<view class="flex flexcol flexac flexjc">
				<img src="../../static/icon/jm9.png" class="mySicon" alt="">
				<text class="f26">待支付</text>
			</view>
			<view class="flex flexcol flexac flexjc">
				<img src="../../static/icon/jm10.png" class="mySicon" alt="">
				<text class="f26">已支付</text>
			</view>
			<view class="flex flexcol flexac flexjc">
				<img src="../../static/icon/jm11.png" class="mySicon" alt="">
				<text class="f26">已取消</text>
			</view>
		</view>
		<view class="myBag flex flexrow flexsb flexac" @tap="goNavigateTo(2)">
			<view class="flex flexac f28">
				账户余额(元)
				<text class="f36" style="margin-left: 10rpx;">{{userInfo.walletMoney || 0.00}}</text>
			</view>
			<view class="myBagBtn flex flexjc flexac">我的钱包</view>
		</view>
		<view class="morEntry flex flexrow flexwrap" >
			<view class="flex flexcol flexac flexjc entryItem" @tap="goNavigateTo(6)">
				<img src="../../static/icon/jm6.png" class="mySicon" alt="">
				<text class="f26">藏品合成</text>
			</view>
			<view class="flex flexcol flexac flexjc entryItem" @tap="goNavigateTo(4)">
				<img src="../../static/icon/jm5.png" class="mySicon" alt="">
				<text class="f26">转赠记录</text>
			</view>
			<view class="flex flexcol flexac flexjc entryItem">
				<img src="../../static/icon/jm4.png" class="mySicon" alt="">
				<text class="f26">联系客服</text>
			</view>
			<view class="flex flexcol flexac flexjc entryItem">
				<img src="../../static/icon/jm3.png" class="mySicon" alt="">
				<text class="f26">社群入口</text>
			</view>
			<view class="flex flexcol flexac flexjc entryItem" @tap="goNavigateTo(7)">
				<img src="../../static/icon/jm2.png" class="mySicon" alt="">
				<text class="f26">邀请好友</text>
			</view>
			<view class="flex flexcol flexac flexjc entryItem" @tap="goNavigateTo(5)">
				<img src="../../static/icon/jm1.png" class="mySicon" alt="">
				<text class="f26">设置</text>
			</view>
		</view>
	</view>
</template>
<script>
	let that;
	export default {
		data() {
			return {
				userInfo:{},
				userShowPhone:'',
				fPhoto:'https://qiniu-center.xinhualeyu.com/hc1.png'
			}
		},
		onLoad(option) {
			that = this;
			let userPhone = uni.getStorageSync('userPhone');
			if(userPhone){
				this.userPhone = userPhone;
				this.userShowPhone = this.$api.takePhone(userPhone);
			}
			
		},
		onShow() {
			this.initData();
		},
		methods: {
			myUpload(rsp) {
				// 获取七牛token
				 /**
				   * @Description:上传用户头像
				   * @author:Jack Kong
				   * @param: directory 上传的目录 目录必须对应好端及模块 例如下面的：家长端/头像
				   * @param: rsp.path 上传的文件path
				   * @createTime: 2022-06-02 16:12:58
				   */
				let directory='/avatar';
				that.$upload.uploadFile(this,rsp.path,directory).then(res=>{
					console.log("res",res);
					that.fPhoto=res;
					that.userInfo.headPic = res;
                    that.gosubmit();
				})
			},
			gosubmit(){
				let par ={
					headPic:this.fPhoto,
				}
				this.$api.request(
					'get',
					'/app/user/updateInfo',par,
					function(res) {
						if (res.code === 0) {
							that.$api.toast('更新头像成功！');
						}
					},
					function(fail) {
						this.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605',
					true
				);
			},
			initData() {
				let par ={}
				this.$api.request(
					'get',
					'/app/user/info',par,
					function(res) {
						if (res.code === 0) {
							that.userInfo = res.data;
							uni.setStorage({
								key: 'userinfo',
								data: res.data,
								success: function() {
									// that.getUserData()
								}
							})
						}
					},
					function(fail) {
						this.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605',
					true
				);
			},
			goNavigateTo(index){
				let url = '';
				if(index==1){
					url='/pages/my/realName'
				}
				if(index==2){
					url='/pages/my/wallet'
				}
				if(index==3){
					url='/pages/my/orderList'
				}
				if(index==4){
					url='/pages/my/subgift'
				}
				if(index==5){
					url='/pages/my/setting'
				}
				if(index==6){
					url='/pages/collect/composeList'
				}
				if(index==7){
					url='/pages/my/invitation'
				}
				if(index==13){
					url='/pages/my/message'
				}
				// if(index==8){
				// 	url='/pages/my/realNameSuccess'
				// }
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.mypage {
		padding: 72rpx 32rpx 40rpx;
		background-color: #F5F5F5;
		.morEntry{
			padding: 44rpx 38rpx 4rpx 40rpx;
			width: 686rpx;
			background: #FFFFFF;
			margin-top: 26rpx;
			box-sizing: border-box;
			.entryItem{
				width: 104rpx;
				margin-right: 64rpx;
				margin-bottom: 40rpx;
			}
			.entryItem:nth-child(4n){
				margin-right: 0rpx;
			}
		}
		.myBag{
			width: 686rpx;
			height: 170rpx;
			background: #E0EAFF;
			box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
			opacity: 1;
			margin-top: 24rpx;
			padding: 0 50rpx 0 40rpx;
			box-sizing: border-box;
		}
		.myBagBtn{
			width: 180rpx;
			height: 68rpx;
			background: #0256FF;
			border-radius: 4rpx;
			font-size: 28rpx;
			color: #FFFFFF;
		}
		.mySicon{
			width: 48rpx;
			height: 48rpx;
		    margin-bottom: 14rpx;
		}
		.secondTab{
			width: 686rpx;
			height: 170rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
			opacity: 1;
			box-sizing: border-box;
			margin-top: 78rpx;
			padding: 0 40rpx;
		}
		.topWrap{
			position: relative;
		}
		.userIcon{
			width: 136rpx;
			height: 136rpx;
			opacity: 1;
			border: 2rpx solid #707070;
			overflow: hidden;
			border-radius: 100%;
			margin-left: 10rpx;
		}
		.smSty{
			width: 112rpx;
			height: 36rpx;
			background: #0256FF;
			border-radius: 4rpx;
			opacity: 1;
			color:white;
			font-size: 20rpx;
		}
		.message{
			width: 48rpx;
			height: 48rpx;
			position: absolute;
			top:14rpx;
			right: 0;
		}
	}
</style>




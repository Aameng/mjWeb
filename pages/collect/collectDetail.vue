<template>
	<view class="pageGoods">
		<view class="coverWrap">
			<image :src="goodsInfo.collectionPic" alt="" mode="aspectFill" style="width: 750rpx;height: 788rpx;" />
		</view>
<!-- 		<view class="buyLock flex flexjc flexac">
			<image src="../../static/icon/jm16.png" style="width: 22rpx; height:22rpx;margin-right: 8rpx;"></image>
			购买后即可体验内容
		</view> -->
		<view class="detailContent">
			<view class="f40" style="margin-bottom: 30rpx;line-height: 40rpx;font-weight: bold;">
				{{goodsInfo.collectionName}}</view>
			<view class="flex flexrow flexac flexsb">
				<text style="font-size: 36rpx; color:#0256FF">￥<text
						style="font-size: 40rpx;font-weight: bold;">{{goodsInfo.price}}</text></text>
				<view class="flex flexrow">
					<view class="cSty maxc">
						<text style="margin-right: 12rpx;">编号</text>
						<text>{{usergGoodsInfo.ucNo}}</text>
					</view>
				</view>
			</view>
			<view class="flex flexcol" style="margin-top: 54rpx;">
				<view class="infoItem flex flexrow flexac flexsb">
					<text>当前拥有人</text>
					<view class="flex flexrow flexac">
						<image :src="usergGoodsInfo.headPic ||'https://qiniu-center.xinhualeyu.com/hc1.png'"
							class="flexf" style="width: 52rpx;height: 52rpx;border-radius: 100%;margin-right: 18rpx;">
						</image>
						<text class="f26">{{usergGoodsInfo.userName}}</text>
					</view>
				</view>
				<view class="infoItem flex flexrow flexac flexsb">
					<text>上链ID</text>
					<view class="flex flexrow flexac">
						<text>{{usergGoodsInfo.chainId}}</text>
						<image src="../../static/icon/mjcopy.png" style="width: 24rpx;height: 27rpx;margin-left: 14rpx;"
							@tap="setCopy(usergGoodsInfo.chainId)"></image>
					</view>

				</view>
				<view class="infoItem flex flexrow flexac flexsb" style="margin-bottom: 0;">
					<text>交易hash</text>
					<view class="flex flexrow flexac">
						<text>{{usergGoodsInfo.hashValue}}</text>
						<image src="../../static/icon/mjcopy.png" style="width: 24rpx;height: 27rpx;margin-left: 14rpx;"
							@tap="setCopy(usergGoodsInfo.hashValue)"></image>
					</view>
				</view>
			</view>
			<view style="padding: 50rpx 0 28rpx;" class="f36" v-if="goodsInfo.introduce_pic">{{goodsInfo.collectionType===3?'盲盒':'藏品'}}描述</view>
			<image :src="goodsInfo.introduce_pic" v-if="goodsInfo.introduce_pic" style="width: 100%;height: auto;display: block;" mode="widthFix"></image>

			<view class="company">
				<view class="flex flexrow flexsb f28" style="padding: 0 4rpx;">
					<text>发行方</text>
					<text style="color:#767676">{{goodsInfo.publisherName}}</text>
				</view>
				<view class="mockBot"></view>
				<view class="flex flexrow flexsb f28" style="padding: 0 4rpx;">
					<text>发行日期</text>
					<text
						style="color:#767676">{{goodsInfo.sellTime?goodsInfo.sellTime.split(" ")[0]:'2022-09-23'}}</text>
				</view>
			</view>
			<view class="xzWrap flex flexcol">
				<text>购买须知：</text>
				<text
					style="line-height: 36rpx;margin-top: 16rpx;">平台发行的数字藏品为虚拟产品，仅限实名认证且满十八周岁的用户购买。平台发行的数字藏品版权归平台方或发行方所有，未经授权不得用于任何商业用途。该商品一经出售，不支持退换。数字藏品不支持任何形式的恶意炒作及非法使用。</text>
			</view>
		</view>
		<view class="fixBuyBtn flex flexjc flexac flexrow" v-if='entryType == 1'>
			<view class="orderBtn flex flexjc flexac" @tap="goSell(2)">赠送</view>
			<view class="orderBtn flex flexjc flexac sty2" @tap="goSell(1)">转售</view>
		</view>
		<view class="fixBuyBtn flex flexjc flexac"  v-if='entryType == 2'>
			<!-- :class="goodsInfo.leftNumber==0?'xBtn':''" -->
			<view class="cBtn flex flexjc flexac "  @tap="goSubmit()">立即购买</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="showBoxModel flex flexcol flexac">
				<jm-stitle :jstr="true?'抽签结果':'温馨提示'"></jm-stitle>
				<image src="../../static/icon/jm20.png" style="margin-top: 34rpx;width: 300rpx;height: 325rpx;"></image>
				<view class="flex flexcol flexac f28">
					<text>您获得了购买资格</text>
					<text>快去购买吧</text>
				</view>
				<view class="jmConfirmBtn flex flexjc flexac" style="margin-top: 70rpx;" @tap="closeBox()">确定</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="popup2" type="center">
			<view class="showBoxModel flex flexcol flexac" style="height: 348rpx;">
				<jm-stitle jstr="温馨提示"></jm-stitle>
				<view class="flex flexcol flexac f32" style="margin-top: 56rpx;">
					<text>您确定要开启盲盒吗？</text>
				</view>
				<view style="margin-top: 70rpx;" class="flex flexrow">
					<view class="flex flexjc flexac f28"  style="width: 232rpx;height: 68rpx;border-radius: 4rpx;background-color: white;color: #0256FF;border: 2rpx solid #0256FF;margin-right: 20rpx;" @tap="closeTips()">取消</view>
					<view class="flex flexjc flexac sty2 f28" style="width: 232rpx;height: 68rpx;border-radius: 4rpx;"  @tap="goOpen()">确定</view>
				</view>
			</view>
		</uni-popup>

	</view>
</template>
<script>
	let that;
	export default {
		data() {
			return {
				//是否获得资格
				getQual: false,
				collectId: '',
				goodsInfo: {},
				ucId: '',
				//个人
				usergGoodsInfo: {},
				// 入口类型 1藏品 2市场
				entryType:1,
				orderId:''

			}
		},
		onLoad(option) {
			that = this;
			this.ucId = option.ucid;
			this.collectId = option.id;
			if(option.eType){
				this.entryType = option.eType;
			}
			// 市场购买orderId
			if(option.orderId){
				this.orderId = option.orderId;
			}
			this.initData();
			
			// if(option.id){
			// 	this.collectId = option.id;
			// 	this.initData();
			// }
		},
		onShow() {},
		methods: {
			goSubmit(){
				let par = {
					orderId:this.orderId,
					orderType:1,
					orderNumber:1
				}
				this.$api.request(
					'get',
					'/app/order/buy', par,
					function(res) {
						if(res.code===0){
							if(res.data.orderId){
								uni.navigateTo({
									url:'/pages/my/orderDetail?id='+res.data.orderId
								})
							}
							// that.goodsInfo = res.data;
						}
						else{
							that.$api.toast(res.msg||'下单失败')
						}
					},
					function(fail) {
						this.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605',
					true
				);
			},
			goOpen(){
				let par = {
					ucId: this.ucId
				}
				this.$api.request(
					'get',
					'/app/order/openBlind', par,
					function(res) {
						if (res.code === 0) {
							that.closeTips();
							getApp().globalData.openCollectDetail = res.data;
							uni.redirectTo({
								url: '/pages/collect/opensuccess'
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
			setCopy(txt) {
				uni.setClipboardData({
					data: txt,
					success: function() {
						that.$api.toast("已复制到粘贴板")
					}
				});
			},
			closeTips(){
				this.$refs.popup2.close();
			},
			openBox() {
				this.$refs.popup.open();
			},
			closeBox() {
				this.$refs.popup.close();
			},
			initData() {
				let par = {
					collectionId: this.collectId
				}
				this.$api.request(
					'get',
					'/app/collection/info', par,
					function(res) {
						if (res.code === 0) {
							that.goodsInfo = res.data;
							
							let par2 = {
								ucId: that.ucId
							}
							that.$api.request(
								'get',
								'/app/userCollection/info', par2,
								function(res) {
									if (res.code === 0) {
										that.usergGoodsInfo = res.data;
										// 是否开启盲盒
										if(that.goodsInfo.collectionType == 3 && that.usergGoodsInfo.ucStatus ==0){
											that.$nextTick(()=>{
												that.$refs.popup2.open();
											})
										}
									}
								},
								function(fail) {
									that.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
								},
								'8605',
								true
							);
							
						}
					},
					function(fail) {
						this.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605',
					true
				);

			},
			goSell(index) {
				let obj = Object.assign({}, that.goodsInfo, that.usergGoodsInfo);
				getApp().globalData.collectData = obj;
				if (index == 1) {
					uni.navigateTo({
						url: '/pages/collect/sell'
					})
				} else {
					uni.navigateTo({
						url: '/pages/collect/give'
					})
				}
			}
		}
	}
</script>

<style>
	.infoItem {
		width: 686rpx;
		height: 88rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.1);
		opacity: 1;
		margin-bottom: 16rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
	}

	.orderBtn {
		font-size: 28rpx;
		color: #0256FF;
		width: 332rpx;
		height: 80rpx;
		border-radius: 4rpx;
		opacity: 1;
		border: 2rpx solid #0256FF;
	}

	.sty2 {
		background: #0256FF;
		color: white;
		margin-left: 20rpx;
	}

	.showBoxModel {
		width: 600rpx;
		height: 720rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.1);
		opacity: 1;
		box-sizing: border-box;
		padding: 48rpx 50rpx;
	}

	.xBtn {
		width: 686rpx;
		height: 80rpx;
		background: #0256FF;
		border-radius: 4rpx;
		opacity: 1;
		font-size: 30rpx;
		font-weight: bold;
		color: white;
		/* ??? */
		opacity: 0.6;
	}

	.fixBuyBtn {
		width: 750rpx;
		height: 160rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.1);
		border-radius: 0px 0px 0px 0px;
		opacity: 1;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		position: fixed;
	}

	.xzWrap {
		padding: 32rpx 30rpx 20rpx;
		color: #767676;
		font-size: 28rpx;
		background-color: white;
		margin-top: 26rpx;
	}

	.company {
		padding: 20rpx 20rpx 18rpx;
		margin-top: 26rpx;
		background-color: white;
	}

	.mockBot {
		width: 100%;
		background-color: #1A1A1A;
		height: 2rpx;
		opacity: .2;
		margin: 40rpx 0;
	}

	page {
		background-color: #F5F5F5;
	}

	.pageGoods {
		padding-bottom: 180rpx;
	}

	.cSty {
		background: #E0EAFF;
		border-radius: 4rpx;
		opacity: 1;
		border: 2rpx solid #0256FF;
		font-size: 24rpx;
		color: #0256FF;
		padding: 6rpx 20rpx;
	}

	.coverWrap {
		height: 788rpx;
		width: 750rpx;
	}

	.buyLock {
		width: 750rpx;
		height: 60rpx;
		background: #E0EAFF;
		color: #0256FF;
		font-size: 24rpx;
		opacity: 0.5;
	}

	.detailContent {
		padding: 34rpx 32rpx 0;
	}
	
	.cBtn{
		width: 686rpx;
		height: 80rpx;
		background: #0256FF;
		border-radius: 4rpx;
		opacity: 1;
		font-size: 30rpx;
		font-weight: bold;
		color:white;
	}
</style>

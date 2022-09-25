<template>
	<view class="pageGoods">
		<view class="coverWrap">
			<image :src="goodsInfo.collectionPic" alt="" mode="aspectFill"
				style="width: 750rpx;height: 788rpx;" />
		</view>
		<view class="buyLock flex flexjc flexac">
			<image src="../../static/icon/jm16.png" style="width: 22rpx; height:22rpx;margin-right: 8rpx;"></image>
			购买后即可体验内容
		</view>
		<view class="detailContent">
			<view class="f40" style="margin-bottom: 30rpx;line-height: 40rpx;font-weight: bold;">{{goodsInfo.collectionName}}</view>
			<view class="flex flexrow flexac flexsb">
				<text style="font-size: 36rpx; color:#0256FF">￥<text style="font-size: 40rpx;font-weight: bold;">{{goodsInfo.price}}</text></text>
				<view class="flex flexrow">
					<view class="cSty maxc">
						<text style="margin-right: 12rpx;">限量</text>
						<text>{{goodsInfo.publishNumber}}份</text>
					</view>
					<view class="cSty maxc" style="margin-left: 12rpx;">
						<text style="margin-right: 12rpx;">剩余</text>
						<text>10000份</text>
					</view>
				</view>
			</view>
			<view style="padding: 50rpx 0 28rpx;" class="f36">藏品描述</view>
			<image src="../../static/icon/detail.png" style="width: 100%;height: 1646rpx;"></image>
			
			<view class="company">
				<view class="flex flexrow flexsb f28" style="padding: 0 4rpx;">
					<text>发行方</text>
					<text style="color:#767676">成都博物馆</text>
				</view>
				<view class="mockBot"></view>
				<view class="flex flexrow flexsb f28" style="padding: 0 4rpx;">
					<text>发行日期</text>
					<text style="color:#767676">{{goodsInfo.sellTime?goodsInfo.sellTime.split(" ")[0]:'2022-09-23'}}</text>
				</view>
			</view>
			<view class="xzWrap flex flexcol">
				<text>购买须知：</text>
				<text style="line-height: 36rpx;margin-top: 16rpx;">平台发行的数字藏品为虚拟产品，仅限实名认证且满十八周岁的用户购买。平台发行的数字藏品版权归平台方或发行方所有，未经授权不得用于任何商业用途。该商品一经出售，不支持退换。数字藏品不支持任何形式的恶意炒作及非法使用。</text>
			</view>
		</view>
		<view class="fixBuyBtn flex flexjc flexac">
			<view class="xBtn flex flexjc flexac ">未抽中</view>
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
		
	</view>
</template>
<script>
	let that;
	export default {
		data() {
			return {
				//是否获得资格
				getQual:false,
				collectId:'',
				goodsInfo:{}
				
			}
		},
		onLoad(option) {
			that = this;
			if(option.id){
				this.collectId = option.id;
				this.initData();
			}
			this.$nextTick(()=>{
				this.openBox();
			})
		},
		onShow() {},
		methods: {
			openBox(){
				this.$refs.popup.open();
			},
			closeBox(){
				this.$refs.popup.close();
			},
			initData() {
				let par = {
					collectionId:this.collectId
				}
				this.$api.request(
					'get',
					'/app/collection/info', par,
					function(res) {
						if(res.code===0){
							that.goodsInfo = res.data;
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
	.showBoxModel{
		width: 600rpx;
		height: 720rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		opacity: 1;
		box-sizing: border-box;
		padding: 48rpx 50rpx;
	}
	.xBtn{
		width: 686rpx;
		height: 80rpx;
		background: #0256FF;
		border-radius: 4rpx;
		opacity: 1;
		font-size: 30rpx;
		font-weight: bold;
		color:white;
		/* ??? */
		opacity: 0.6;
	}
	.fixBuyBtn{
		width: 750rpx;
		height: 160rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0px rgba(0,0,0,0.1);
		border-radius: 0px 0px 0px 0px;
		opacity: 1;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		position: fixed;
	}
	.xzWrap{
		padding: 32rpx 30rpx 20rpx;
		color:#767676;
		font-size: 28rpx;
		background-color: white;
		margin-top: 26rpx;
	}
	.company{
		padding: 20rpx 20rpx 18rpx;
		margin-top: 26rpx;
		background-color: white;
	}
	.mockBot{
		width: 100%;
		background-color: #1A1A1A;
		height: 2rpx;
		opacity: .2;
		margin: 40rpx 0;
	}
	page{
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
</style>



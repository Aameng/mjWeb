<template>
	<view class="flex flexjc flexcol" style="padding-top: 190rpx;position: relative;">
		<view class="marketHeader">
			<view class="marTop flex flexrow">
				<text class="scFontm f5">数藏艺术</text>
				<view class="flex flexrow flexac searchFont" v-if='searchContent'>
					{{searchContent}}
					<image src="../../static/icon/a2.png" style="width: 22rpx; height:22rpx;margin-left: 15rpx;" @tap="closeStr()"></image>
				</view>
				<image src="../../static/icon/a3.png" class="searchIcon"  @tap="gosearch()"></image>
			</view>
			<view class="flex flexrow" style="padding-bottom: 40rpx;">
				<view class="flex flexrow flexac flexjc" style="width: 170rpx;" @tap="change(1)">
					<view style="font-size: 28rpx;" class="f5" :class="tabIndex==1?'actMarFont':''">{{tabText}}</view>
					<image :src="tabIndex==1?'../../static/icon/arrow1.png':'../../static/icon/arrow.png'" style="width: 24rpx;height: 16rpx;margin-left: 8rpx;" mode="aspectFill"></image>
				</view>
				<view class="flex flexrow flexac flexjc" style="width: 320rpx;" @tap="change(2)">
					<view style="font-size: 28rpx;" class="f5" :class="tabIndex==2?'actMarFont':''">{{tabText2}}</view>
					<image :src="tabIndex==2?'../../static/icon/arrow1.png':'../../static/icon/arrow.png'" style="width: 24rpx;height: 16rpx;margin-left: 8rpx;" mode="aspectFill"></image>
				</view>
				<view class="flex flexrow flexac flexjc" style="width: 200rpx;" @tap="change(3)">
					<view style="font-size: 28rpx;" class="f5" :class="tabIndex==3?'actMarFont':''">{{tabText3}}</view>
					<image :src="tabIndex==3?'../../static/icon/arrow1.png':'../../static/icon/arrow.png'" style="width: 24rpx;height: 16rpx;margin-left: 8rpx;" mode="aspectFill"></image>
				</view>
			</view>
		</view>

		<!-- 小个 -->
		<view class="mjpage">
			<view class="flex flexrow flexwrap" style="margin-top: 30rpx;">
				<view class="liItem flex flexcol" v-for="(item,index) in listData" :key="index" @tap="goDetail(item.collectionId,item.ucId,item.orderId)">
					<view class="relative flex">
						<view class="sq flex flexjc flexac" v-if="index==3 || index ==4">
							<image src="../../static/icon/sq.png" mode="aspectFill"
								style="width: 70%;height: 70%;z-index: 3;"></image>
						</view>
						<image :src="item.collectionPic" mode="aspectFill"
							style="width: 332rpx;height: 320rpx;"></image>
					</view>
					<view class="marketContent">
						<view style="color:#1A1A1A ;font-size: 24rpx;line-height: 24rpx;" class="flex">{{item.collectionName}}</view>
						<view class="jmsbtnc flex flexac">
							<text style="margin-right: 12rpx;">编号</text>
							<text class="lines-list" style="max-width: 220rpx;">{{item.orderNo?item.orderNo:'0001/#100000'}}</text>
						</view>
						<view class="fixPriceMar f5"><text style="font-size: 24rpx;">￥</text>{{item.orderPrice}}</view>
					</view>
				</view>
			</view>
			<qs v-if="listData.length==0"></qs>
		</view>
		<uni-popup ref="popup" type="center" :animation="false">
			<view>
				<view class="marketHeader">
					<view class="marTop flex flexrow">
						<text class="scFontm f5">数藏艺术</text>
						<view class="flex flexrow flexac searchFont" v-if='searchContent'>
							{{searchContent}}
							<image src="../../static/icon/a2.png" style="width: 22rpx; height:22rpx;margin-left: 15rpx;" @tap="closeStr()"></image>
						</view>
						<image src="../../static/icon/a3.png" class="searchIcon"></image>
					</view>
					<view class="flex flexrow" style="padding-bottom: 40rpx;">
						<view class="flex flexrow flexac flexjc" style="width: 170rpx;" @tap="change(1)">
							<view style="font-size: 28rpx;" class="f5"  :class="tabIndex==1?'actMarFont':''">{{tabText}}</view>
							<image :src="tabIndex==1?'../../static/icon/arrow1.png':'../../static/icon/arrow.png'" style="width: 24rpx;height: 16rpx;margin-left: 8rpx;" mode="aspectFill"></image>
						</view>
						<view class="flex flexrow flexac flexjc" style="width: 320rpx;" @tap="change(2)">
							<view style="font-size: 28rpx;" class="f5" :class="tabIndex==2?'actMarFont':''">{{tabText2}}</view>
							<image :src="tabIndex==2?'../../static/icon/arrow1.png':'../../static/icon/arrow.png'" style="width: 24rpx;height: 16rpx;margin-left: 8rpx;" mode="aspectFill"></image>
						</view>
						<view class="flex flexrow flexac flexjc" style="width: 200rpx;" @tap="change(3)">
							<view style="font-size: 28rpx;" class="f5" :class="tabIndex==3?'actMarFont':''">{{tabText3}}</view>
							<image :src="tabIndex==3?'../../static/icon/arrow1.png':'../../static/icon/arrow.png'" style="width: 24rpx;height: 16rpx;margin-left: 8rpx;" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="selectContent flex flexwrap flexrow">
					<view class="selectItem flex flexjc flexac" v-if="tabIndex==1" @tap="toggleItem(1,item)" v-for="(item,index) in firstType" :key="index" :class="item.typeId==selectIndex?'actSelect':''">{{item.typeName}}</view>				
					<view class="selectItem flex flexjc flexac" v-if="tabIndex==2" @tap="toggleItem(2,item)" v-for="(item,index) in collectTypeList" :key="index" :class="item.typeId==selectIndex2?'actSelect':''">{{item.typeName}}</view>
					<view class="selectItem flex flexjc flexac" v-if="tabIndex==3" @tap="toggleItem(3,item)" v-for="(item,index) in thirdType" :key="index" :class="item.typeId==selectIndex3?'actSelect':''">{{item.typeName}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 大的tab分类
				tabIndex:0,
				// 分类下的小类
				selectIndex:'0',
				selectIndex2:0,
				selectIndex3:'0',
				//选中名称
				tabText:'藏品',
				tabText2:'全部品牌',
				tabText3:'最新上架',
				//分类
				firstType:[{typeName:'藏品',typeId:'0'},{typeName:'盲盒',typeId:'1'}],
				//系列初始化数据
				collectTypeList:[],
				//排序
				thirdType:[{typeName:'最新上架',typeId:'0'},{typeName:'价格升序',typeId:'1'},{typeName:'价格降序',typeId:'2'}],
				//列表数据
				listData:[],
				searchContent:''
			}
		},
		onLoad(option) {
			
			this.selectType = this.firstType;
			this.initCollectTypeList();
			this.initDataList();
		},
		onShow() {
			let search = uni.getStorageSync('searchTextMes');
			if(search){
				this.searchContent = search;
				uni.setStorageSync('searchTextMes', null);
			}
			this.initDataList();
		},
		methods:{
			closeStr(){
				this.searchContent = '';
				this.initDataList();
			},
			goDetail(id,ucid,orderId){
				uni.navigateTo({
					url:'/pages/collect/collectDetail?id='+id+'&ucid='+ucid+'&eType=2'+'&orderId='+orderId
				})
			},
			initDataList(){
				let that =this;
				let par = {}
				if(this.selectIndex){par.collectionType = this.selectIndex}
				if(this.selectIndex2){par.collectionTypeId = this.selectIndex2}
				if(this.selectIndex3){par.sort = this.selectIndex3}
				if(this.searchContent){par.searchStr = this.searchContent}
				this.$api.request(
					'get',
					'/app/order/secondList', par,
					function(res) {
						console.log("res",res);
						if(res.code===0){
							that.listData = res.data;
							// console.log("collectTypeList",that.collectTypeList)
						}
					},
					function(fail) {
						this.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605',
					true
				);
			},
			initCollectTypeList(){
				let that =this;
				let par = {}
				this.$api.request(
					'get',
					'/app/collection/typeList', par,
					function(res) {
						console.log("res",res);
						if(res.code===0){
							that.collectTypeList = res.data;
						}
					},
					function(fail) {
						this.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605',
					true
				);
			},
			gosearch(){
				uni.navigateTo({
					url:'/pages/index/search'
				})
			},
			change(index){
				this.tabIndex = index;
				this.$refs.popup.open();
			},
			toggleItem(index,item){
				console.log(index,item)
				console.log("ininininininin")
				console.log(item.typeId == this.selectIndex2?true:false)
			    if(index==1){
					if(item.typeId == this.selectIndex){
						// this.selectIndex =0
						// 必选条件 选中无效
						return false
					}else{
						this.selectIndex =item.typeId
						this.tabText = item.typeName
						console.log("this.tabText",this.tabText)
					}
				}
				if(index==2){
					if(item.typeId == this.selectIndex2){
						this.selectIndex2 =0
						this.tabText2 = '全部品牌';
					}else{
						this.selectIndex2 =item.typeId
						this.tabText2 = item.typeName
					}
				}
				if(index==3){
					if(item.typeId == this.selectIndex3){
						// this.selectIndex3 =0
						return false
					}else{
						this.selectIndex3 =item.typeId
						this.tabText3 = item.typeName
					}
				}
				this.tabIndex = 0;
				this.$refs.popup.close();
				this.initDataList();
			}
		}
	}
</script>

<style>
	.searchFont{
		position: absolute;
		right: 80rpx;
		background-color:#ededed;
		padding: 5rpx 10rpx;
		border-radius: 15rpx;
	}
	page{
		background-color: #F5F5F5;
	}
	.actSelect{
		background: #0256FF !important;
		color:white !important;
	}
	.marketHeader {
		background-color: white;
		padding: 0 36rpx 0 32rpx;
		padding-top: 40rpx;
		position: fixed;
		top:0;
		left: 50%;
		transform: translateX(-50%);
		z-index: 99;
	}
	.selectContent{
		position: fixed;
		top:181rpx;
		left: 50%;
		 transform:  translateX(-50%);
		padding: 14rpx 0 32rpx 34rpx;
		background-color: white;
		width: 750rpx;
		
	}
	.selectItem{
		width: 332rpx;
		height: 60rpx;
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		font-size: 30rpx;
		background: #D8D8D8;
		margin-bottom: 20rpx;
	}
    .selectItem:nth-child(odd){
		margin-right: 20rpx;
	}
	.scFontm {
		color: #1A1A1A;
		font-size: 32rpx;
		margin-left: 4rpx;
		line-height: 32rpx;
		position: relative;
		top: 10rpx;
	}

	.marTop {	
		position: relative;
		height: 38rpx;
		margin-bottom: 32rpx;
	}

	.liItem {
		width: 332rpx;
		background: #FFFFFF;
		margin-bottom: 20rpx;
	}

	.liItem:nth-child(odd) {
		margin-right: 20rpx;
	}

	.mjpage {
		padding: 0 32rpx 40rpx;
		background-color: #F5F5F5;
	}

	.lfc {
		padding: 26rpx 20rpx;
		color: #1A1A1A;
		font-size: 28rpx;
	}

	.marketContent {
		padding: 16rpx 16rpx 72rpx;
		position: relative;
	}

	.jmsbtnc {
		/* width: 252rpx; */
		margin-top: 18rpx;
		width: max-content;
		height: 40rpx;
		background: #0256FF;
		border-radius: 0px 0px 0px 0px;
		opacity: 1;
		font-size: 22rpx;
		color: white;
		box-sizing: border-box;
		padding: 0 8rpx;
	}

	.fixPriceMar {
		position: absolute;
		left: 18rpx;
		bottom: 20rpx;
		color: #0256FF;
		font-size: 38rpx;
		font-weight: bold;
		line-height: 22rpx;
	}
	.actMarFont{
		color:#0256FF !important;
	}
</style>

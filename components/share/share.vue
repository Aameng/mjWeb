<template>
	<view class="zqui-item">
		<view class="zqui-item share-main" :style="{height:pageHeight}" :class="isbg?'share-bg':''"
			catchtouchmove="true">
			<view class="imgbox zqui-item flex-row box-center" :style="{height:pageHeight2}" v-if="isNoimg">
				<view class="imgbox-box">
					<image :src="imgurl" class="canvas-img" mode="widthFix"></image>
				</view>
			</view>
			<view class="zqui-item share-box">
				<view class="zqui-item share-title">
					<text class="top-css">分享到</text>
					<!-- <view class="share-close" @tap.stop="closeAct">
						<image src="https://qiniu.tdreading.com/static/icon/det.png" class="iocn-css"></image>
					</view> -->
				</view>
				<view class="zqui-item zqui-row share-list">
					<!-- #ifdef APP-PLUS -->
					<view class="zqui-item share-btn" @tap.stop="shareAction">
						<image src="https://qiniu.tdreading.com/static/icon/weChat.png" class="share-img"
							mode="widthFix"></image>
						<text class="top-css">微信好友</text>
					</view>
					<view class="zqui-item share-btn" v-if="isNoimg" @tap.stop="shareFriends">
						<image src="https://qiniu.tdreading.com/static/icon/wefriends.png" class="share-img"
							mode="widthFix"></image>
						<text class="top-css">朋友圈</text>
					</view>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<button class='details_button' open-type='share' @touchstart="sharebgAction"
						@touchend="sharebgAction">
						<view class="zqui-item share-btn">
							<image src="https://qiniu.tdreading.com/static/icon/weChat.png" class="share-img"
								mode="widthFix"></image>
							<text class="top-css">微信好友</text>
						</view>
					</button>
					<!-- #endif -->
					<view class="zqui-item share-btn" v-if="isNoimg" @tap.stop="downPosters">
						<image src="https://qiniu.tdreading.com/static/icon/wxdown.png" class="share-img"
							mode="widthFix"></image>
						<text class="top-css">保存海报</text>
					</view>
					<view class="zqui-item share-btn" v-if="!isNoimg&&info.pic" @tap.stop="toGetWxCode">
						<image src="https://qiniu.tdreading.com/static/icon/weposters.png" class="share-img"
							mode="widthFix"></image>
						<text class="top-css">生成海报</text>
					</view>
				</view>
				<view class="zqui-item box-center" v-if="info.stxt" style="padding-bottom:20rpx;">
					<text class="top-css" style="font-size:26rpx;font-weight:bold;">{{info.stxt}}</text>
				</view>
				
				<view class="share-box-close zqui-item box-center" @tap.stop="closeAct">
					<text class="share-close-txt">取消</text>
				</view>
				
				<view class="canvas-box"><canvas style="width:600px;height:3067.2px;position: fixed;top:-99999px;" canvas-id="myCanvas"></canvas></view>
			</view>
		</view>
	</view>
</template>

<script>
	let that;
	import $api from '../../common/js/app.js';

	export default {
		data() {
			return {
				info: {},
				proData: {},
				path: {},
				wxCode: {},
				lineHeight: 0,
				imgurl: 'https://qiniu.tdreading.com/noimg.png',
				isNoimg: false,
				isbg: true,
				pageHeight: '750px',
				pageHeight2: '100%'
			};
		},
		props: {
			isshare: {
				type: Boolean,
				default: false
			},
			goods: {
				type:Object,
				default:{}
			},
			promotion:{
				type:[Object,Array],
				default:null
			},
			spelltrue: {
				type: [Number, String],
				default: 0
			},
		},
		computed: {
			isShow() {
				that.setShare();
				return that.isshare;
			}
		},
		created() {
			that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.pageHeight = res.windowHeight + 'px';
					that.pageHeight2 = (res.windowHeight - 172) + 'px';
				}
			});
		},
		mounted() {
			that.proData = that.promotion;
			that.info = that.goods;
		},
		methods: {
			setShare(){
				setTimeout(function(){
					if(that.info.userId){
						that.getShare()
					}
				},500)
			},
			getShare() {
				//POST /tkActivity/createShareRecord
				//创建分享记录
			},
			sharebgAction() {
				if (that.isbg) {
					that.isbg = false
				} else {
					setTimeout(function() {
						that.isbg = true
					}, 500)
				}
			},
			closeAct() {
				//关闭
				uni.hideLoading();
				that.$emit('isback', 0);
			},
			shareAction() {
				let url = 'pages/goodsDetails/goodsDetails';
				let text = '';
				if (that.spelltrue == 1) {
					url = 'pagesB/spellBuyGoods/spellBuyGoods';
					if (that.info.activityType == 3) {
						//拼团
						text = '&pid=' + that.info.activityId;
					}

				}
				if (that.spelltrue == 2) {
					url = 'pagesB/spellBuyDetails/spellBuyDetails';
				}
				
				let path=url + '?gid=' + that.info.pid + text + '&isback=1';
				
				if(that.info.fxMemberId){
					path=url + '?scene=' + that.info.pid +'_'+that.info.fxMemberId+ text + '&isback=1';
				}
				
				if(that.info.surl&&that.info.spath){
					path=that.info.surl+ '?'+that.info.spath;
				}
				//console.log(that.info.pic,that.info.name,path)
				uni.share({
					provider: 'weixin',
					scene: 'WXSceneSession',
					type: 5,
					imageUrl: that.info.pic,
					title: that.info.name,
					miniProgram: {
						id: 'gh_1012c96201a4',
						path: path,
						type: 0,
						webUrl: 'http://tdreading.com'
					},
					success: ret => {
						//console.log(JSON.stringify(ret));
						
					}
				});
			},
			shareFriends() {
				//分享到朋友圈
				let img = that.info.pic;
				if (that.isNoimg) {
					img = that.imgurl;
				}
				uni.share({
					provider: 'weixin',
					scene: 'WXSenceTimeline',
					type: 2,
					summary: that.info.name,
					imageUrl: img,
					success: function(res) {
						//console.log('success:' + JSON.stringify(res));
					},
					fail: function(err) {
						//console.log('fail:' + JSON.stringify(err));
					}
				});
			},
			downPosters() {
				//海报保存到相册
				console.log(that.imgurl)
				uni.saveImageToPhotosAlbum({
					filePath: that.imgurl,
					success: function() {
						$api.toast('海报已保存到您的相册');
					},
					fail(err) {
						console.log(err)
					}
				});
			},
			isGetqiniuImg(url) {
				$api.request(
					'POST',
					'/activity/fetchImage/fetch', {
						sapCode: that.info.sapCode,
						remoteSrcUrl: url
					},
					function(res) {
						console.log(res);
						if (res.code == '200') {
							let str = res.result;
							uni.downloadFile({
								url: str,
								success: res => {
									console.log(res);
									if (res.statusCode === 200) {
										let url = res.tempFilePath;
										uni.getImageInfo({
											src: url,
											success: function(item) {
												let image = item;
												image.path = url;
												that.path = image;
												console.log(image);
												console.log(image.height);
												setTimeout(function() {
													that.createNewImg();
												}, 0);
											}
										});
									}
								},
								fail: res => {
									that.path = {};
									setTimeout(function() {
										that.createNewImg();
									}, 0);
								}
							});
						}
					},
					function(fail) {
						//console.log('swipter:', fail);
					},
					'9999'
				);
			},
			postersAction() {
				//生成海报
				let str = that.info.pic;
				if (str == undefined || !str) {
					let img1 = that.info.imglist[0];
					if (!img1) {
						that.path = {};
						setTimeout(function() {
							that.createNewImg();
						}, 0);
						return false;
					}
					str = img1;
				}
				console.log(str)
				uni.downloadFile({
					url: str,
					success: res => {
						console.log(res);
						if (res.statusCode === 200) {
							let url = res.tempFilePath;
							uni.getImageInfo({
								src: url,
								success: function(item) {
									let image = item;
									image.path = url;
									that.path = image;
									console.log(image);
									console.log(image.height);
									setTimeout(function() {
										that.createNewImg();
									}, 0);

								}
							});
						}
					},
					fail: res => {
						that.path = {};
						setTimeout(function() {
							that.createNewImg();
						}, 0);
					}
				});
				/* 			uni.getImageInfo({
					src: that.info.pic,
					success: function(image) {
						//path
						that.path = image;
						console.log(image);
						console.log(image.height);
						setTimeout(function() {
							that.createNewImg();
						}, 0);
					}
				}); */
			},
			toGetWxCode() {
				//生成微信二维码
				uni.showLoading({
					title: '海报生成中'
				});
				let url = 'pages/goodsDetails/goodsDetails';
				let text = that.info.pid
				if (that.spelltrue == 1) {
					url = 'pagesB/spellBuyGoods/spellBuyGoods';
					if (that.info.activityType == 3) {
						//拼团
						//text=that.info.pid+'pid'+that.info.activityId;
						text = that.info.pid + '&' + that.info.activityId + '&3';
					}
					if (that.info.activityType == 2) {
						//预售
						////gid=4&activtyGid=56&sid=activityId
						text = that.info.pid + '&' + that.info.activityId + '&' + that.info.activtyGid + '&2';
					}
					if (that.info.activityType == 1) {
						//秒杀
						////gid=4&activtyGid=56&sid=activityId
						text = that.info.pid + '&' + that.info.activityId + '&' + that.info.activtyGid + '&1';
					}
				}
				if (that.spelltrue == 2) {
					url = 'pagesB/spellBuyDetails/spellBuyDetails';
				}
				if(that.info.surl){
					url = that.info.surl;
				}
				$api.request(
					'POST',
					'/activity/mini/getMiniCode', {
						page: url,
						scene: text
					},
					function(res) {
						console.log(res);
						//console.log(res.result)
						if (res.code==200&&res.data) {
							//that.wxCode = res.result;
							var imgSrc = res.data; //base64编码
							var number = that.info.pid;
							// #ifdef APP-PLUS
							//that.wxCode['target']=imgSrc;
							that.baseImgFile(number, imgSrc, 100, function(item) {
								that.wxCode = item;
								//console.log(item);
								//$api.toast(item)
								that.postersAction();
							});
							// #endif
							// #ifdef MP-WEIXIN
							var save = wx.getFileSystemManager();
							var url = wx.env.USER_DATA_PATH;
							save.writeFile({
								filePath: url + '/pic' + number + '.png',
								data: imgSrc.slice(22),
								encoding: 'base64',
								success: res => {
									console.log(res);
									that.wxCode['target'] = url + '/pic' + number + '.png';
									that.postersAction();
								},
								fail: err => {
									console.log(err);
								}
							});
							// #endif
						}
					},
					function(fail) {},
					'9999','1'
				);
			},
			baseImgFile(uid, base64, quality, callback) {
				quality = quality || 10;
				callback = callback || $.noop;
				var bitmap = new plus.nativeObj.Bitmap();
				// 从本地加载Bitmap图片
				bitmap.loadBase64Data(
					base64,
					function() {
						console.log('加载图片成功');
						bitmap.save(
							'_doc/' + uid + '.jpg', {
								overwrite: true,
								quality: quality
							},
							function(i) {
								//$api.toast('保存图片成功')
								callback(i);
								console.log('保存图片成功：' + JSON.stringify(i));
							},
							function(e) {
								//$api.toast('加载图片失败');
								console.log('保存图片失败：' + JSON.stringify(e));
							}
						);
					},
					function(e) {
						$api.toast('加载图片失败');
						console.log('加载图片失败：' + JSON.stringify(e));
					}
				);
			},
			createNewImg() {
				var context = uni.createCanvasContext('myCanvas', this);
				//console.log(context);
				context.setFillStyle('#FFFFFF');
				let boxheright=3067.2;
				if(that.path.height*3<3067.2){
					boxheright=that.path.height*3
				}
				context.fillRect(0, 0, 600, 3067.2);
				let titleH = 0;
				console.log(that.path.path)
				if (that.path.path) {
					titleH = 600;
					var path = that.path.path;
					//console.log(path);
					let x = 0,
						y = 0,
						iw = 600,
						ih = (600 * that.path.height) / that.path.width;
					/* if (iw < 600) {
						x = ((600 - iw) / 2).toFixed(2);
					} */
					titleH=ih;
					context.drawImage(path, x, y, iw, ih);
				}
				
				


				var text2 = that.info.price;
				if (text2) {
					var text1 = '￥';
					//绘制钱符合
					titleH = titleH + 60;
					context.setFontSize(24);
					context.setFillStyle('#E42D29');
					context.fillText(text1, 40, titleH);


					//当前价格
					context.setFontSize(38);
					context.setFillStyle('#E42D29');
					context.fillText(text2, 58, titleH);
				}



				//原价
				var text2_1 = that.info.originalPrice;
				if (text2_1 != text2 && text2_1) {
					var text2_w = that.measureText(text2, 38) + 90;
					context.setFontSize(24);
					context.setFillStyle('#999999');
					context.fillText('￥' + text2_1, text2_w, titleH);
					context.setFillStyle('#999999');
					var text2_xt = that.measureText(text2_1, 24) + 28;
					context.fillRect(text2_w, titleH - 10, text2_xt, 2);
				}
				if (text2) {
					var text3 = '价格具有时效性';
					//绘制标识
					titleH = titleH + 30;
					context.setFontSize(24);
					context.setFillStyle('#999999');
					context.fillText(text3, 40, titleH);
				}
				//var text3 =that.info.name;
				//绘制标题
				context.setFontSize(32);
				context.setFillStyle('#333333');

				let txtName = '';
				if (that.spelltrue == 1 || that.spelltrue == 2) {
					if (that.spelltrue == 2 && that.info.losNum) {
						txtName = '【仅剩下' + that.info.losNum + '人】';
					}
					if(that.info.ptName){
						txtName = txtName + '【' + that.info.ptName + '】'
					}
					
				}

				let name = txtName + that.info.name,
					temp = '',
					row = [],
					maxwidth = 540;
				for (var a = 0; a < name.length; a++) {
					if (that.measureText(temp, 32) > 510) {
						row.push(temp);
						temp = '';
					}
					temp += name[a];
				}
				row.push(temp);
				titleH = titleH + 8;
				for (var b = 0; b < row.length; b++) {
					//#按行写入文本
					titleH = titleH + 42;
					context.fillText(row[b], 40, titleH);
					//#40是行高
				}
				
				if(that.info.stitle){
					let stitle=that.info.stitle;
					//绘制标识
					titleH = titleH + 40;
					context.setFontSize(24);
					context.setFillStyle('#333333');
					context.fillText(stitle, 40, titleH);
				}
				
				if(that.info.stitle1){
					let stitle1=that.info.stitle1;
					//绘制标识
					titleH = titleH + 40;
					context.setFontSize(24);
					context.setFillStyle('#333333');
					context.fillText(stitle1, 40, titleH);
				}

				//促销信息

				if (that.promotion&&that.promotion.promotionId || that.info&&that.info.activityId) {
					context.setFontSize(28);
					context.setFillStyle('#777777');
					let str = '',
						list = [],
						strText = '',
						titleH1 = titleH + 40;
					if (that.info.activityId&&that.info.ptName) {
						str = '【' + that.info.ptName + '】' + that.info.subName
					} else {
						if(that.promotion.name){
							str = '【' + that.promotion.name + '】' + that.promotion.describe
						}
					}
					for (var t = 0; t < str.length; t++) {
						if (that.measureText(strText, 28) > 510) {
							list.push(strText);
							strText = '';
						}
						strText += str[t];
					}
					list.push(strText);
					for (var c = 0; c < list.length; c++) {
						//#按行写入文本
						titleH1 = titleH1 + c * 40;
						context.fillText(list[c], 40, titleH1);
						//#40是行高
					}
					titleH = titleH1;
				}

				titleH = titleH + 30;
				//console.log(titleH, 'titleHtitleH');
				//context.save();
				context.setFillStyle('#F1F1F1');
				context.fillRect(0, titleH, 600, 20);

				//绘制二维码
				context.drawImage(that.wxCode.target, 75, titleH + 50, 150, 150);

				titleH = titleH + 20 + 100;
				var text4 = '长按查看详情';
				//绘制文字
				context.setFontSize(28);
				context.setFillStyle('#333333');
				context.fillText(text4, 250, titleH);

				titleH = titleH + 40;
				var text5 = '乐育家长端小程序';
				//绘制文字
				context.setFontSize(28);
				context.setFillStyle('#999999');
				context.fillText(text5, 250, titleH);

				//context.save();

				titleH = titleH + 50;
				console.log(titleH)
				//绘制图片
				context.draw(false, () => {
					uni.canvasToTempFilePath({
							x: 0,
							y: 0,
							width: 600,
							height: titleH,
							destWidth: 600,
							destHeight: titleH,
							canvasId: 'myCanvas',
							success: function(res) {
								console.log(res.tempFilePath);
								uni.hideLoading();
								that.imgurl = res.tempFilePath;
								that.isNoimg = true;
								that.$forceUpdate();
								$api.toast('海报已生成去分享吧');
								//var tempFilePath = res.tempFilePath;
							},
							fail: function(res) {
								uni.hideLoading();
								$api.toast('海报生成失败');
								console.log(res);
							}
						},
						this
					);
				});
			},
			measureText(text, fontSize) {
				text = String(text);
				var text = text.split('');
				var width = 0;
				text.forEach(function(item) {
					if (/[a-zA-Z]/.test(item)) {
						width += 7;
					} else if (/[0-9]/.test(item)) {
						width += 5.5;
					} else if (/\./.test(item)) {
						width += 2.7;
					} else if (/-/.test(item)) {
						width += 3.25;
					} else if (/[\u4e00-\u9fa5]/.test(item)) {
						//中文匹配
						width += 10;
					} else if (/\(|\)/.test(item)) {
						width += 3.73;
					} else if (/\s/.test(item)) {
						width += 2.5;
					} else if (/%/.test(item)) {
						width += 8;
					} else {
						width += 10;
					}
				});
				return (width * fontSize) / 10;
			}
		}
	};
</script>

<style lang="scss">
	.zqui-item {
		/*#ifndef APP-PLUS-NVUE*/
		display: flex;
		/*#endif*/
		flex-direction: column;
	}

	.zqui-row {
		flex-direction: row;
	}

	.share-main {
		width: 750rpx;
		height: 100%;
		background-color: rgba(0, 0, 0, 0);
		position: fixed;
		z-index: 999999999;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		justify-content: flex-end;
		align-items: flex-end;
	}

	.share-bg {
		background-color: rgba(0, 0, 0, 0.68);
	}

	.share-box {
		width: 750rpx;
		/* height: 340rpx; */
		background-color: #F8F8F8;
	}
	.share-box-close{
		width: 750rpx;
		height:97rpx;
		background-color:#FFFFFF;
	}
	.share-close-txt{
		font-size: 30rpx;
		font-weight: bold;
		color: #666666;
	}
	.share-title {
		width: 750rpx;
		justify-content: center;
		align-items: center;
		padding-top: 22rpx;
		padding-bottom: 22rpx;
		position: relative;
	}

	.share-close {
		position: absolute;
		z-index: 22;
		right: 10rpx;
		top: 10rpx;
	}

	.top-css {
		font-size: 24rpx;
		color: #333333;
	}

	.share-list {
		width: 750rpx;
		padding-top: 22rpx;
		justify-content: center;
		align-items: center;
		padding-bottom: 20rpx;
	}

	.share-btn {
		width: 187.5rpx;
		justify-content: center;
		align-items: center;
		padding-bottom: 22rpx;
	}

	.share-img {
		width: 88rpx;
		height: 88rpx;
	}

	.canvas-box {
		/* position:fixed;
	top:9999px */
		width: 750rpx;
	}

	.canvas-img {
		width: 400rpx;
		height: 600rpx;
	}

	.imgbox {
		width: 750rpx;
		height: 100%;
		position: fixed;
		z-index: -1;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		align-items: center;
	}

	.imgbox-box {
		width: 400rpx;
		padding-top: 30rpx;
		border-radius: 4rpx;
		overflow: hidden;
	}

	.iocn-css {
		width: 45rpx;
		height: 45rpx;
	}

	/* #ifdef MP-WEIXIN */
	.details_button {
		width: 187.5rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		height: auto;
		background-color:#F8F8F8;
		padding: 0;
		margin: 0;
		line-height: normal;
	}

	.details_button:after {
		width: auto;
		height: auto;
		background-color: #F8F8F8;
		padding: 0;
		margin: 0;
	}

	/* #endif */
</style>

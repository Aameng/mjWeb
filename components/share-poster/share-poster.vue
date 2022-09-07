<template>
	<view>
		<view style='width:0px;height:0px;overflow:hidden;'>
			<canvas @click.stop="" :style="{ width: canvasW + 'px', height: canvasH + 'px'}"  canvas-id="my-canvas"></canvas>
		</view>
		<view class="sharecontent" v-if="isShow">
			<view class="share-cont">
				<image class="share-cont-img" src="https://qiniu.childrenonline.cn/FjVJKFCCGt55Q8YWRYfbtvwaXZxa" mode=""></image>
				<view class="share-big">读最多最好合适孩子的书</view>
				<view class="share-info">· 名人名师推荐&nbsp;&nbsp;&nbsp;&nbsp;· 学生家长共选</view>
				<view class="share-info">· 平台配送到校&nbsp;&nbsp;&nbsp;&nbsp;· 班级图书漂流</view>
				<image class="share-code" src="https://qiniu.childrenonline.cn/FrUOmnWl5iywUPf4lN-Bj4TWIeYY" mode=""></image>
			</view>
			
			<view class="share-dom">
				<view class="share-top">
					<!-- #ifdef APP-PLUS -->
					<view>
						<button class="share-item" @tap="fenxiang('WXSceneTimeline')">
							<image src="../../static/icon/friend.png" mode="widthFix"></image>
							<view class="share-title">朋友圈</view>
						</button>
					</view>
					<view>
						<button class='share-item' @tap="fenxiang('WXSceneSession')">
							<image src="../../static/icon/weixin.png" mode="widthFix"></image>
							<view class="share-title">微信</view>
						</button>
					</view>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<view>
						<button class='share-item' open-type='share'>
							<image src="../../static/icon/weixin.png" mode="widthFix"></image>
							<view class="share-title">微信</view>
						</button>
					</view>
					<!-- #endif -->
					<view class="share-item" @click.stop="saveImage">
						<image src="../../static/icon/down.png" mode="widthFix"></image>
						<view class="share-title">保存到本地</view>
					</view>
				</view>
				<view class="share-cancel" @click.stop="sendMsgParent">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				canvasW: 0,
				canvasH: 0,
				ctx: null,
				isShow: false,
				title: '读最多最好合适孩子的书',
				headerImg: 'https://qiniu.childrenonline.cn/FjVJKFCCGt55Q8YWRYfbtvwaXZxa',
				qrcode: 'https://qiniu.childrenonline.cn/FrUOmnWl5iywUPf4lN-Bj4TWIeYY',
				filePath: '',
				isCx:getApp().globalData.isCx
			}
		},
		onLoad(){
			wx.showShareMenu({
				withShareTicket:true,
				//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
				menus:["shareAppMessage","shareTimeline"]
			})
		},
		methods:{
			sendMsgParent(){
				this.isShow = false
				this.$emit('listenToPoster', false)
			},
			fenxiang (scene) {
				uni.share({
					provider: "weixin",
					scene: scene,
					type: 2,
					imageUrl: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			showCanvas(){ //显示
				this.isShow = true
				this.__init()
			},
			//初始化画布
			async __init(){
				this.ctx = uni.createCanvasContext('my-canvas',this)
				this.canvasW = 300;
				this.canvasH = 340;
				//设置画布背景透明
				this.ctx.setFillStyle('rgba(255, 255, 255, 0)')
				//设置画布大小
				this.ctx.fillRect(0,0,this.canvasW,this.canvasH)
				//绘制圆角背景
				this.drawRoundRect(this.ctx, 0, 0, this.canvasW, this.canvasH,uni.upx2px(18),'#FFFFFF')
				//获取标题图片
				let headerImg = await this.getImageInfo(this.headerImg)
				let hW = 300;
				let hH = 230;
				//绘制标题图
				this.drawRoundImg(this.ctx,headerImg.path,0 ,0,this.canvasW, hH,8)
				//绘制标题
				this.ctx.setFontSize(16); //设置标题字体大小
				this.ctx.setFillStyle('#333'); //设置标题文本颜色
				this.ctx.fillText(this.title, 14, 260)
				
				//提示文案
				this.ctx.setFontSize(12);
				this.ctx.setFillStyle('#666666');
				this.ctx.fillText('· 名人名师推荐    · 学生家长共选',14, 290)
				this.ctx.fillText('· 平台配送到校    · 班级图书漂流',14, 310)
				
				//小程序码
				let qrcodeImg = await this.getImageInfo(this.qrcode)
				this.ctx.drawImage(qrcodeImg.path, 210, 240,  75, 75)
				//延迟渲染
				let that = this
				setTimeout(()=>{
					this.ctx.draw(true,()=>{
						uni.hideLoading()
						uni.canvasToTempFilePath({ // 生成图片
							canvasId: 'my-canvas',
							quality: 1,
							complete: (res) => {
								console.log('保存到相册',res);
								that.filePath = res.tempFilePath
							}
						},this);
					})
				},500)
			},
			//绘制实心圆
			drawEmptyRound(ctx,x,y,radius){
				ctx.save()
				ctx.beginPath();
				ctx.arc(x, y, radius, 0, 2 * Math.PI,true);
				ctx.setFillStyle('rgba(0, 0, 0, .4)')
				ctx.fill();
				ctx.restore()
				ctx.closePath()
			},
			//带圆角图片
			drawRoundImg(ctx, img, x, y, width, height, radius){
				ctx.beginPath()
				ctx.drawImage(img, x, y, width, height);
				ctx.restore()
				ctx.closePath()
			},
			//圆角矩形
			drawRoundRect(ctx, x, y, width, height, radius, color){
				ctx.save();
				ctx.beginPath();
				ctx.setFillStyle(color); 
				ctx.setStrokeStyle(color)
				ctx.setLineJoin('round');  //交点设置成圆角
				ctx.setLineWidth(radius);
				ctx.strokeRect(x + radius/2, y + radius/2, width - radius , height - radius );
				ctx.fillRect(x + radius, y + radius, width - radius * 2, height - radius * 2);
				ctx.stroke();
				ctx.closePath();
			},
			//获取图片
			getImageInfo(imgSrc){
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: imgSrc,
						success: (image) => {
							resolve(image);
							console.log('获取图片成功',image)
						},
						fail: (err) => {
							reject(err);
							console.log('获取图片失败',err)
						}
					});
				});
			},
			//保存图片到相册
			saveImage(){
				//判断用户授权
				// #ifdef MP-WEIXIN
					uni.getSetting({
					   success(res) {
					      console.log('获取用户权限',res.authSetting)
						  if(Object.keys(res.authSetting).length>0){
							  //判断是否有相册权限
							  if(res.authSetting['scope.writePhotosAlbum']==undefined){
								  //打开设置权限
								  uni.openSetting({
								    success(res) {
								      console.log('设置权限',res.authSetting)
								    }
								  })
							  }else{
								  if(!res.authSetting['scope.writePhotosAlbum']){
									  //打开设置权限
									  uni.openSetting({
									    success(res) {
									      console.log('设置权限',res.authSetting)
									    }
									  })
								  }
							  }
						  }else{
							  return
						  }
					   }
					})
				// #endif
				var that = this
				uni.saveImageToPhotosAlbum({ // 保存到相册
					filePath: that.filePath,
					success(res) {
						uni.showToast({
							title: '已保存到相册',
							icon: 'success',
							duration: 2000
						})
						setTimeout(()=>{
							that.isShow = false
						},2000)
					}
				})
			}
		},
		onShareAppMessage () { // 分享给朋友
		    let that = this
		    return {
		      title: this.isCx?'中宏家长端':'乐育家长端',
		      path: '/pages/shareRead/index',
		      success (res) {
		        // 转发成功
		        uni.showToast({
		        	title: '分享成功',
		        	icon: 'success',
		        	duration: 2000
		        })
		      }
		    }
		},
		onShareTimeline(){ // 分享到朋友圈
			let that = this
			return {
			  title: this.isCx?'中宏家长端':'乐育家长端',
			  path: '/pages/shareRead/index',
			  success (res) {
			    // 转发成功
			    uni.showToast({
			    	title: '分享成功',
			    	icon: 'success',
			    	duration: 2000
			    })
			  }
			}
		},
	}
</script>

<style scoped lang="scss">
.sharecontent{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0,0,0,.4);
	display: flex;
	justify-content: center;
	align-items: center;
	padding-bottom: 240rpx;
	z-index: 9999;
}
.canvas-sty{
	margin-left: 999px;
}
.share-cont{
	width: 620rpx;
	background-color: #FFFFFF;
	height: 700rpx;
	position: relative;
	.share-cont-img{
		width: 620rpx;
		height: 465rpx;
	}
	.share-big{
		font-size: 38rpx;
		font-weight: bold;
		color: #333333;
		margin: 20rpx;
	}
	.share-info{
		margin-left: 20rpx;
		font-size: 26rpx;
		line-height: 50rpx;
		color: #666666;
	}
	.share-code{
		width: 150rpx;
		height: 150rpx;
		position: absolute;
		bottom: 40rpx;
		right: 20rpx;
	}
}

.share-dom{
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	background: #FFFFFF;
	border-top-right-radius: 40rpx;
	border-top-left-radius: 40rpx;
}
.share-top{
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin: 30rpx;
}
.share-item{
	text-align: center;
	image{
		width: 68rpx;
		height: 68rpx;
	}
	.share-title{
		margin-top: 10rpx;
		color: #666666;
		font-size: 24rpx;
	}
}
.share-cancel{
	height: 110rpx;
	line-height: 110rpx;
	font-size: 30rpx;
	font-weight: bold;
	color: #333333;
	text-align: center;
	border-top: 1px solid #F1F1F1;
}
button{
	line-height: 40rpx;
	background: none;
}
button::after{
	border: none;
}
</style>

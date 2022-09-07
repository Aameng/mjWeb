<template>
	<view class="htz-image-upload-list">
		<view class="htz-image-upload-Item" :style="{ width: width,  height: height }" v-for="(item,index) in uploadLists" :key="index">
			<view class="zezhao" @click="imgPreview(index)"></view>
			<image :src="item"></image>
			<view class="htz-image-upload-Item-del" v-if="remove" @click="imgDel(index)">×</view>
		</view>
		<view class="htz-image-upload-Item htz-image-upload-Item-add" :style="{ width: width,  height: height }" v-if="uploadLists.length<max" @click="imgAdd">
			<image class="add-img" src="../../static/icon/imgadd.png"></image>
			<view style="font-size: 20rpx;color: #999999;text-align: center;">上传图片</view>
			<view style="font-size: 20rpx;color: #999999;text-align: center;">（最多1张）</view>
		</view>
	</view>
</template>

<style>
	
	
	.ceshi{
		width: 100%;
		height: 100%;
		position: relative;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: #FFFFFF;
		color: #2C405A;
		opacity: 0.5;
		z-index: 100;
	}
</style>

<script>
	export default {
		name: 'htz-image-upload',
		props: {
			width: {
			  type: String,
			  default: '144rpx'
			},
			height: {
			  type: String,
			  default: '144rpx'
			},
			max: { //展示图片最大值
				type: Number,
				default: 1,
			},
			chooseNum: { //选择图片数
				type: Number,
				default: 9,
			}, 
			name: { //发到后台的文件参数名
				type: String,
				default: 'file',
			},
			remove: { //是否展示删除按钮
				type: Boolean,
				default: true,
			},
			sourceType: { //选择照片来源 【ps：H5就别费劲了，设置了也没用。不是我说的，官方文档就这样！！！】
				type: Array,
				default: () => ['album', 'camera'],
			},
			action: { //上传地址
				type: String,
				default: '',
			},
			headers: { //上传的请求头部
				type: Object,
				default: () => {},
			},
			formData: { //HTTP 请求中其他额外的 form data
				type: Object,
				default: () => {},
			},
			compress: { //是否需要压缩
				type: Boolean,
				default: true,
			},
			quality: { //压缩质量，范围0～100
				type: Number,
				default: 80,
			},
			value: { //受控图片列表
				type: Array,
				default: () => [],
			},
			uploadSuccess: {
				default: (res) => {
					return {
						success: false,
						url: ''
					}
				},
			}

		},
		data() {
			return {
				uploadLists: [],
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.uploadLists = this.value;
			});
		},
		watch: {
			value(val, oldVal) {
				//console.log('value',val, oldVal)
				this.uploadLists = val;
			},
		},
		methods: {
			imgDel(index) {
				uni.showModal({
					title: '提示',
					content: '您确定要删除么?',
					success: (res) => {
						if (res.confirm) {
							// this.uploadLists.splice(index, 1)
							// this.$emit("input", this.uploadLists);
							// this.$emit("imgDelete", this.uploadLists);
							let delUrl=this.uploadLists[index]
							this.uploadLists.splice(index, 1)
							this.$emit("input", this.uploadLists);
							this.$emit("imgDelete", {del:delUrl,tempFilePaths:this.uploadLists});
						} else if (res.cancel) {}
					}
				});
			},
			imgPreview(index) {
				console.log('imgPreview================', index)
				uni.previewImage({
					urls: this.uploadLists,
					current: index,
					loop: true,
				});
			},
			imgAdd() {
				let nowNum = Math.abs(this.uploadLists.length - this.max);
				let thisNum = (this.chooseNum > nowNum ? nowNum : this.chooseNum) //可选数量
				// #ifdef APP-PLUS
				if (this.sourceType.length > 1) {
					uni.showActionSheet({
						itemList: ['拍摄', '从手机相册选择'],
						success: (res) => {
							if (res.tapIndex == 1) {
								this.appGallery(thisNum);
							} else if (res.tapIndex == 0) {
								this.appCamera();
							}
						},
						fail: (res) => {
							console.log(res.errMsg);
						}
					});
				}
				if (this.sourceType.length == 1 && this.sourceType.indexOf('album') > -1) {
					this.appGallery(thisNum);
				}

				if (this.sourceType.length == 1 && this.sourceType.indexOf('camera') > -1) {
					this.appCamera();
				}
				// #endif
				//#ifndef APP-PLUS
				uni.chooseImage({
					count: thisNum,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: this.sourceType,
					success: (res) => {
						this.chooseSuccessMethod(res.tempFilePaths)
					}
				});
				// #endif
			},
			appCamera() {
				var cmr = plus.camera.getCamera();
				var res = cmr.supportedImageResolutions[0];
				var fmt = cmr.supportedImageFormats[0];
				//console.log("Resolution: " + res + ", Format: " + fmt);
				cmr.captureImage((path)=> {
						//alert("Capture image success: " + path);
						this.chooseSuccessMethod([path])
					},
					(error) =>{
						//alert("Capture image failed: " + error.message);
						console.log("Capture image failed: " + error.message)
					}, {
						resolution: res,
						format: fmt
					}
				);
			},
			appGallery(maxNum) {
				plus.gallery.pick((res) => {
					this.chooseSuccessMethod(res.files)
				}, function(e) {
					//console.log("取消选择图片");
				}, {
					filter: "image",
					multiple: true,
					maximum: maxNum
				});
			},
			chooseSuccessMethod(filePaths) {
				if (this.action == '') { //未配置上传路径
					this.$emit("chooseSuccess", filePaths);
				} else {
					if (this.compress) { //设置了需要压缩 
						this.imgCompress(filePaths);
					} else {
						this.imgUpload(filePaths);
					}
				}
			},
			imgCompress(tempFilePaths) {
				uni.showLoading({
					title: '压缩中...'
				});

				let compressImgs = [];
				let results = [];
				tempFilePaths.forEach((item, index) => {
					compressImgs.push(new Promise((resolve, reject) => {
						// #ifndef H5
						uni.compressImage({
							src: item,
							quality: this.quality,
							success: res => {
								//console.log('compressImage', res.tempFilePath)
								results.push(res.tempFilePath);
								resolve(res.tempFilePath);
							},
							fail: (err) => {
								//console.log(err.errMsg);
								reject(err);
							},
							complete: () => {
								//uni.hideLoading();
							}
						})
						// #endif
						// #ifdef H5
						this.canvasDataURL(item, {
							quality: this.quality / 100
						}, (base64Codes) => {
							//this.imgUpload(base64Codes);
							results.push(base64Codes);
							resolve(base64Codes);
						})
						// #endif
					}))
				})
				Promise.all(compressImgs) //执行所有需请求的接口
					.then((results) => {
						uni.hideLoading();
						console.log('imgUpload',results)
						this.imgUpload(results);
					})
					.catch((res, object) => {
						uni.hideLoading();
					});
			},
			imgUpload(tempFilePaths) {
				uni.showLoading({
					title: '上传中'
				});
				//console.log('imgUpload',tempFilePaths)
				let uploadImgs = [];
				tempFilePaths.forEach((item, index) => {
					uploadImgs.push(new Promise((resolve, reject) => {
						const uploadTask = uni.uploadFile({
							url: this.action, //仅为示例，非真实的接口地址
							filePath: item,
							name: this.name,
							fileType: 'image',
							formData: this.formData,
							header: this.headers,
							success: (uploadFileRes) => {
								//uni.hideLoading();
								//console.log(typeof this.uploadSuccess)
								//console.log('')
								if (typeof this.uploadSuccess == 'function') {
									if (this.uploadSuccess(uploadFileRes).success) {
										this.value.push(this.uploadSuccess(uploadFileRes).url)
										this.$emit("input", this.uploadLists);
									}
								}
								resolve(uploadFileRes);
								this.$emit("uploadSuccess", uploadFileRes);
							},
							fail: (err) => {
								console.log(err);
								//uni.hideLoading();
								reject(err);
								this.$emit("uploadFail", err);
							},
							complete: () => {
								//uni.hideLoading();
							}
						});
					}))
				})
				Promise.all(uploadImgs) //执行所有需请求的接口
					.then((results) => {
						uni.hideLoading();
					})
					.catch((res, object) => {
						uni.hideLoading();
						this.$emit("uploadFail", res);
					});
				// uploadTask.onProgressUpdate((res) => {
				// 	//console.log('',)
				// 	uni.showLoading({
				// 		title: '上传中' + res.progress + '%'
				// 	});
				// 	if (res.progress == 100) {
				// 		uni.hideLoading();
				// 	}
				// });
			},
			canvasDataURL(path, obj, callback) {
				var img = new Image();
				img.src = path;
				img.onload = function() {
					var that = this;
					// 默认按比例压缩
					var w = that.width,
						h = that.height,
						scale = w / h;
					w = obj.width || w;
					h = obj.height || (w / scale);
					var quality = 0.8; // 默认图片质量为0.8
					//生成canvas
					var canvas = document.createElement('canvas');
					var ctx = canvas.getContext('2d');
					// 创建属性节点
					var anw = document.createAttribute("width");
					anw.nodeValue = w;
					var anh = document.createAttribute("height");
					anh.nodeValue = h;
					canvas.setAttributeNode(anw);
					canvas.setAttributeNode(anh);
					ctx.drawImage(that, 0, 0, w, h);
					// 图像质量
					if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
						quality = obj.quality;
					}
					// quality值越小，所绘制出的图像越模糊
					var base64 = canvas.toDataURL('image/jpeg', quality);
					// 回调函数返回base64的值
					callback(base64);
				}
			},
		}
	}
</script>

<style>
	.htz-image-upload-list {
		display: flex;
		flex-wrap: wrap;
	}

	.htz-image-upload-Item {
		width: 144rpx;
		height: 144rpx;
		border-radius: 6rpx;
		position: relative;
		margin-bottom: 20rpx;
		margin-right: 12rpx;
	}

	.htz-image-upload-Item image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}
	.htz-image-upload-Item .add-img{
		width: 44rpx;
		height: 44rpx;
		margin: 16rpx auto 2rpx auto;
	}

	.htz-image-upload-Item-add {
		/* display: flex;
		justify-content: center;
		align-items: center; */
		text-align: center;
		border: 1px dashed #d9d9d9;
	}

	.htz-image-upload-Item-del {
		background: rgba(0, 0, 0, 0.14);
		border-radius: 0px 10rpx 0px 0px;
		font-size: 28rpx;
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		top: 0;
		right: 0;
		z-index: 100;
		color: #fff;
	}
	.zezhao{
		background: #000000;
		opacity: 0.4;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border-radius: 10rpx;
		z-index: 9;
	}
</style>

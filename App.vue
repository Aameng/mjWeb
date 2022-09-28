<script>
	let that;
	export default {
		globalData: {
			qiNiuImgHost:'',
			mheight: '500',
			userid: '',
			isIphoneX: false,
			isCx: true,
			isOpenMsg: 0, //是否获取消息公告
			isOpenCache: 0, //是否开启缓存
			sysAppId: 'leyu00001', //配置项目id
			appSecret: '0BAFD5CA02868A57', //项目key
			cKey: '3730793232313770763636366d7a6779',
			cIv: '35323238343434393536303836333335',
			nonceToken: '',
			unionId: '',
			mistiming: 0,

			specialTab: [], //课程页面-tab
			specialData: {}, //课程列表
			specialDataPage: {}, //课程列表-Page
			specialDetails: {}, //课程详情

			depositData: {}, //托管列表
			depositPage: {}, //托管列表-分页
			depositDetails: {}, ////托管详情
			depositTab: [], //托管列表-tab

			healthyData: {}, //健康餐列表
			healthyPage: {}, //健康餐列表-分页
			healthyDetails: {}, ////健康餐详情
			healthyTab: [], //健康餐列表-tab

			orderPage: 1, //订单列表-页数
			orderData: [], //订单列表-时间戳
			orderDataTimes: 0, //订单列表-时间戳
			orderDetails: [], //订单详情

			versionInfo: {}, //app升级信息存放
			// #ifdef H5
			isWeixin: false,
			// #endif
			userInfo: {}, //用户信息
			editorWork: null,
			videoUrl: null,
			imageUrl: null,
			voiceUrl: null,
			networkSubmit: null,
			organization: null,
			schoolItem: null,
			pickerData: null,
			aiUser: null, //ai作业的用户
			scales: [1, 1], //ai 图片放大倍数
			newList: {
				isTrue: false,
				schoolId: '',
				list: []
			}, //首页消息列表
			bannerList: {
				isTrue: false,
				schoolId: '',
				list: []
			}, //首页banner图
			findNewClassInfo: {
				isTrue: false,
				classNumber: '',
				list: []
			},
			businessMenu: {
				isTrue: false,
				userNumber: '',
				menuList: [],
				isMenuAfter: false
			}, //首页栏目
			isChildTrue: true, //首页是否请求孩子数据
			childData: [], //孩子列表
			gradeArray: [], //年级
			classArray: [], //班级
			provincesData: [], //行政省列表数据
			qiniuToken:''
		},
		onLaunch: function() {
			console.log('App Launch')
			that = this;
			// const updated = uni.getStorageSync('updated')
			// uni.removeSavedFile({
			// 	filePath: updated.packgePath,
			// 	success: (res) => {
			// 		uni.removeStorageSync('updated')
			// 	}
			// })
		},
		onShow: async function() {
			console.log('App Show')
			let uid = uni.getStorageSync('userid')
			if (uid) {
				that.$options.globalData.userid = uid;
			}
			uni.getSystemInfo({
				success: function(res) {
					that.$options.globalData.mheight = (res.windowHeight) + 'px';
					if (res.safeArea.top > 40) {
						that.$options.globalData.isIphoneX = true;
					}
				}
			});


			let userinfo = uni.getStorageSync('userinfo');
			if (userinfo.uniqueId) {
				that.$options.globalData.userInfo = userinfo;
				uni.setStorageSync('token', 1);
			} else {
				uni.removeStorageSync('token')
			}

			// #ifdef H5
			var ua = window.navigator.userAgent.toLowerCase();
			if ((ua.match(/MicroMessenger/i) == 'micromessenger') && (ua.match(/wxwork/i) == 'wxwork')) {
				//alert("企业微信客户端");
				that.$options.globalData.isWeixin = true;
			} else if (ua.match(/micromessenger/i) == 'micromessenger') {
				//alert("微信客户端");
				that.$options.globalData.isWeixin = true;
			}
			// #endif

			// #ifdef MP-WEIXIN
			//版本更新提醒
			if (wx.canIUse('getUpdateManager')) {
				const updateManager = wx.getUpdateManager()
				updateManager.onCheckForUpdate(function(res) {
					console.log('onCheckForUpdate====', res)
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
						console.log('res.hasUpdate====')
						updateManager.onUpdateReady(function() {
							wx.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								success: function(res) {
									console.log('success====', res)
									// res: {errMsg: "showModal: ok", cancel: false, confirm: true}
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate()
								}
							})
						})
						updateManager.onUpdateFailed(function() {
							// 新的版本下载失败
							wx.showModal({
								title: '已经有新版本了哟~',
								content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
							})
						})
					}
				})
			}
			// #endif

		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";

	view {
		color: #1A1A1A;
		font-size: 26rpx;
		box-sizing: border-box;
	}
	.sty2{
		background: #0256FF;
		color:white;
	}
	.jmgrey{
		color:#767676;
	}
	.jmblue{
		color:#0256FF;
	}
	.jmConfirmBtn{
		width: 500rpx;
		height: 80rpx;
		background: #0256FF;
		border-radius: 20rpx ;
		font-size: 28rpx;
		color: #FFFFFF;
	}
    .f22{
		font-size: 24rpx;
		transform: scale(0.9);
	}
	.f36 {
		font-size: 36rpx;
		line-height: 36rpx;
	}
	.f40 {
		font-size: 40rpx;
		line-height: 40rpx;
	}

	.f32 {
		font-size: 32rpx;
		line-height: 32rpx;
	}

	.f30 {
		font-size: 30rpx;
		line-height: 30rpx;
	}
.f34 {
		font-size: 34rpx;
		line-height: 34rpx;
	}
	.f28 {
		font-size: 28rpx;
		line-height: 28rpx;
	}

	.f26 {
		font-size: 26rpx;
		line-height: 26rpx;
	}
	.f24 {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.searchIcon {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 3rpx;
	}

	.sq {
		width: 100%;
		height: 100%;
		background-color: #b4b4b4;
		opacity: 0.5;
		z-index: 2;
		position: absolute;
		left: 0;
		top: 0;
	}

	.jmColor {
		color: #0256FF;
	}

	.sccEllipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		width: 442rpx;
		white-space: nowrap;
	}

	.f5 {
		font-weight: bold;
	}

	.w100 {
		width: 100%;
	}



	/*每个页面公共css */
	.flex {
		display: flex;
	}

	.flexac {
		align-items: center;
	}

	.flexas {
		align-items: flex-start
	}

	.flexae {
		align-items: flex-end
	}

	.flexjc {
		justify-content: center;
	}

	.flexfs {
		justify-content: flex-start;
	}

	.flexfe {
		justify-content: flex-end;
	}

	.flexsb {
		justify-content: space-between
	}

	.flexrow {
		flex-direction: row;
	}

	.flexcolumn,
	.flexcol {
		flex-direction: column;
	}

	.flexwrap {
		flex-wrap: wrap;
	}

	.flex1 {
		flex: 1;
	}

	.flexf {
		flex-shrink: 0;
	}

	.maxc {
		width: max-content;
	}


	.relative {
		position: relative
	}

	.absolute {
		position: absolute
	}


	.lines-list {
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.lines-tow {
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;

	}
	


</style>

<template>
	<view class="content" :style="{'min-height':hpx}">
		<!-- <leyu-loading :marTop="'40%'" ref="auiLoading" /> -->
		<view style="width: 750rpx;height: 668rpx; overflow:hidden;position: relative;">
			<image src="../../static/icon/yqImg.png" style="width: 750rpx;height: 750rpx;position: relative;top:-88rpx">
			</image>
		</view>

		<view class="flex1" style="z-index: 3;position: relative;padding: 0 30rpx;top:-230rpx">
			<view style="font-size: 48rpx;font-weight: bold;margin-bottom: 22rpx;">{{isRegister?'注册':'登录'}}</view>
			<view class="flex flexjc flexac flexcol" style="z-index: 3;position: relative;">
				<view class="loginWrap flex1 flex">
					<input maxlength="11" pattern="\d*" type="number" cursor-spacing="100" class="input"
						placeholder="请输入手机号"
						placeholder-style="color:#999999;font-size:30rpx;font-weight:400 !important;" v-model="phone"
						@blur='checkPhone' @focus='fphone' @input='inputphone'></input>
				</view>
				<view class="loginWrap flex flexac" style="margin-top: 20rpx;" v-if="isRegister || loginType ==2">
					<input maxlength="6" pattern="\d*" class="input" cursor-spacing="100" type="number"
						placeholder="请输入验证码"
						placeholder-style="color:#999999;font-size:30rpx;font-weight:400 !important;"
						v-model="code"></input>
					<view class="getCodeLogin flex flexjc flexac" :style="{opacity:rightPhone&&!codeDisabled?'1':'.4'}"
						@tap='getCode'>{{codeText}}</view>
				</view>
				<view class="loginWrap flex1 flex" style="margin-top: 20rpx;" v-if="isRegister || loginType ==1">
					<input type="password" cursor-spacing="100" class="input" placeholder="请输入登录密码"
						placeholder-style="color:#999999;font-size:30rpx;font-weight:400 !important;"
						v-model="password"></input>
				</view>
				<view class="loginWrap flex1 flex" style="margin-top: 20rpx;" v-if="isRegister">
					<input maxlength="11" type="password" cursor-spacing="100" class="input"
						placeholder="请再次确认登录密码" :disabled="!password"
						placeholder-style="color:#999999;font-size:30rpx;font-weight:400 !important;"
						v-model="confirmPassword"></input>
				</view>
			</view>
			<view class="flex flexjc flexac flexcol" style="margin-top:68rpx;">
				<view class="loginbtn flex flexac flexjc" @tap='loginFun' v-show="!isRegister"
					:style="{opacity:(loginType==1&&rightPhone&&password && isAgree)||(loginType==2&&rightPhone&&code&& isAgree)?'1':'.4'}">
					登录
				</view>
				<view class="loginbtn flex flexac flexjc" @tap='registerFun' v-show="isRegister"
					:style="{opacity:rightPhone&&code&&password&&confirmPassword?'1':'.4'}">
					注册</view>
				<view style="margin-top: 34rpx;" class="flex flexrow flexac">
					<view @tap="isAgree = !isAgree" class="flex flexjc flexac" style="height: 32rpx;">
						<image class="tclass-img"
							src="https://qiniu-center.xinhualeyu.com/weixin-teacher%2Ficon%2Fcselect.png"
							v-show="isAgree"></image>
						<div v-show="!isAgree" class="noselect"></div>
					</view>
					<view class="f22" style="position: relative;left:-20rpx">我已阅读并同意中数空间<text
							style="color:#0256FF">《隐私协议》</text><text style="color:#0256FF">《使用条款》</text></view>
				</view>
				<view style="color:#0256FF;font-size: 28rpx;margin-top: 52rpx;"
					@tap="loginType==1?loginType=2:loginType=1" v-if="!isRegister">{{loginType==1?'手机验证码登录':'账号密码登录'}}
				</view>
			</view>
		</view>
		<view class="fixFont" @tap="isRegister = !isRegister">{{!isRegister?'没有':'已有'}}账号，<text
				style="color:#0256FF">点击{{!isRegister?'注册':'登录'}}</text></view>
		<view class="showTips flex flexjc flexac" :style="{opacity:showTips?'1':'0'}">请先阅读并同意相关协议条款</view>
	</view>
</template>

<script>
	let app = getApp().globalData;

	let that;
	export default {
		data() {
			return {
				showTips: false,
				// 1账号密码 2账号验证码
				loginType: 1,
				isAgree: true,
				isRegister: false,


				hpx: getApp().globalData.mheight,
				openId: '',
				phone: '',
				code: '',
				password: '',
				confirmPassword: '',
				fkphone: false,
				isShowEye: false,
				codeText: '发送验证码',
				codeDisabled: false,
				remainingSeconds: 60,
				interval: '',
				rightPhone: false,
				istrue: true,
				com: 0
			}
		},
		onLoad(option) {
			that = this
			that.$nextTick(() => {
				// that.$refs.auiLoading.hide();
			})
			if (that.interval) {
				clearInterval(that.interval);
			}
			that.com = 0;
			if (option.com == 1) {
				that.com = 1;
			}
			// that.initdata();
		},
		onUnload() {
			if (that.interval) {
				clearInterval(that.interval);
			}
		},
		methods: {
			initdata(){
				let par = {
					appType: 1,
					pageNum: 1,
					pageSize: 3,
					articleType:1
				}
				that.$api.request(
					'get',
					'cms/app/article/list', par,
					function(res) {
						if (res.code == 200) {
							console.log("ccc")
						}
					},
					function(fail) {
						that.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'1001'
				);
			},
			countDown() {
				that.remainingSeconds = 60
				that.interval = setInterval(() => {
					if (that.remainingSeconds <= 0) {
						that.codeText = '重新获取',
							that.codeDisabled = false
						that.interval && clearInterval(that.interval);
						return;
					}
					let seconds = that.remainingSeconds - 1;
					that.remainingSeconds = seconds;
					that.codeText = seconds + 's后重发';
					that.codeDisabled = true
				}, 1000);
			},
			fphone() {
				that.fkphone = true;
			},
			checkPhone() {
				that.fkphone = false;
				if (!that.$api.regular(that.phone, 'tel')) {
					that.$api.toast('请输入正确的手机号码');
					return false;
				}
			},
			inputphone() {

				if (!that.$api.regular(that.phone, 'tel')) {
					that.rightPhone = false;
				} else {
					that.rightPhone = true;
				}
			},
			getCode(e) {
				if (that.codeDisabled) {
					return
				}
				if (!that.$api.regular(that.phone, 'tel')) {
					that.$api.toast('请输入正确的手机号码')
					return
				}
				that.codeDisabled = true
				that.$api.request(
					'get',
					'/app/phoneCode/sendCode?phone=' + that.phone, null,
					function(res) {
						console.log("res", res);
						if (res.code === 0) {
							that.$api.toast('验证码已发送，请注意查收！');
							that.countDown();
						} else {
							let str = res.message || '发送失败';
							that.$api.toast(str);
							setTimeout(() => {
								that.codeDisabled = false
							}, 1500)
						}
					},
					function(fail) {
						that.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605'
				);
			},
			registerFun() {
				if (!that.isAgree) {
					this.showTips = true;
					setTimeout(() => {
						this.showTips = false;
					}, 1000);
					return false
				}
				if (!that.$api.regular(that.phone, 'tel')) {
					that.$api.toast('请输入正确的手机号码')
					return
				}
				if (!that.code) {
					that.$api.toast('请输入验证码')
					return
				}
				if (!that.password) {
					that.$api.toast('请输入密码')
					return
				}
				if (!that.confirmPassword) {
					that.$api.toast('请输入确认密码')
					return
				}
				if (that.password != that.confirmPassword) {
					that.$api.toast('两次密码不一致')
					return
				}
				let par = {
					phone: that.phone,
					phoneCode: that.code,
					password: that.password,
					rePassword: that.confirmPassword
				};
				// that.$refs.auiLoading.show();
				that.$api.request(
					'get',
					'/app/user/register', par,
					function(res) {
						// that.istrue = true;
						// that.$refs.auiLoading.hide();
						if (res.code === 0) {
							that.$api.toast('注册成功,请登录');
							that.isRegister = false;
							that.loginType  =1;
						} else {
							let str = res.msg || '网络开小差';
							that.$api.toast(str);
						}
					},
					function(fail) {
						// that.istrue = true;
						// that.$refs.auiLoading.hide();
						that.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605',
					true
				);
			},
			loginFun() {
				if (!that.isAgree) {
					this.showTips = true;
					setTimeout(() => {
						this.showTips = false;
					}, 1000);
					return false
				}
				if (!that.$api.regular(that.phone, 'tel')) {
					that.$api.toast('请输入正确的手机号码')
					return
				}
				if (this.loginType == 2 && !that.code) {
					that.$api.toast('请输入验证码')
					return
				}
				if (this.loginType == 1 && !that.password) {
					that.$api.toast('请输入密码')
					return
				}
				let par = {
					phone: that.phone
				};
				if (this.loginType == 2) {
					par.code = that.code
				}
				if (this.loginType == 1) {
					par.password = that.password
				}

				// that.$refs.auiLoading.show();
				that.$api.request(
					'get',
					'/app/user/login', par,
					function(res) {
						// that.istrue = true;
						// that.$refs.auiLoading.hide();
						if (res.code === 0) {
							uni.setStorageSync('userPhone',that.phone);
							that.$api.toast('登录成功');
							uni.switchTab({
								url: '../index/index'
							})
						} else {
							let str = res.msg || '网络开小差';
							that.$api.toast(str);
						}
					},
					function(fail) {
						// that.istrue = true;
						// that.$refs.auiLoading.hide();
						that.$api.toast(fail && fail.message || fail && fail.msg || '网络开小差')
					},
					'8605',
					true
				);
			}
		}
	}
</script>

<style>
	.showTips {
		width: 560rpx;
		height: 90rpx;
		background: #E0EAFF;
		border-radius: 8rpx;
		font-size: 32rpx;
		color: #0256FF;
		transition: 1s;
		position: absolute;
		bottom: 260rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.fixFont {
		position: fixed;
		bottom: 100rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.noselect {
		width: 22rpx;
		height: 22rpx;
		border: 2rpx solid #0256FF;
		border-radius: 50%;
		box-sizing: border-box;
	}

	input {
		font-size: 30rpx !important;
		font-weight: 500 !important;
		color: #333333;
	}

	.fBot {
		width: 1rpx;
		height: 32rpx;
		background-color: #EEEEEE;
		opacity: 1;
		margin: 0 20rpx;
	}

	.content {
		background: #F8F8F8;
	}

	.loginWrap {
		/* background-color: white; */
		/* 		width: 650rpx;
		padding: 30rpx;
		box-sizing: border-box;
		position: relative;
		font-size: 30rpx;
		border-bottom: 1rpx solid #eceaea; */
		width: 686rpx;
		position: relative;
	}

	.loginWrap input {
		padding: 36rpx 20rpx;
		background-color: white;
		font-size: 30rpx;
		width: 686rpx;
		line-height: 30rpx;
	}

	.tclass-img {
		width: 22rpx;
		height: 22rpx;
	}

	.getCodeLogin {
		position: absolute;
		color: #FFFFFF;
		font-size: 30rpx;
		right: 00rpx;
		font-weight: bold;
		z-index: 2;
		width: 228rpx;
		height: 112rpx;
		background: #0256FF;
		border-radius: 0px 4rpx 4rpx 0px;
		opacity: 1;
	}

	.loginbtn {
		width: 686rpx;
		height: 92rpx;
		background: #0256FF;
		opacity: 1;
		border-radius: 4rpx;
		color: white;
		font-size: 32rpx;
		font-weight: bold;

	}

	.canLogin {
		background: linear-gradient(132deg, #FE7162 0%, #FC5D52 100%);
		color: white;
	}

	.fBot {
		width: 1rpx;
		height: 32rpx;
		background-color: #EEEEEE;
		opacity: 1;
		margin: 0 20rpx;
	}
</style>

<template>
	<view class="changePage">
		<view style="font-size: 56rpx;margin-top: 80rpx;">设置操作密码</view>
		<view class="jmgrey f30" style="margin-top: 30rpx;">注册手机号：181****0434</view>
		<view class="loginWrap flex flexac" style="margin-top: 76rpx;" v-if="step==1">
			<input maxlength="4" pattern="\d*" class="input" cursor-spacing="100" type="number"
				placeholder="请输入验证码"
				placeholder-style="color:#999999;font-size:30rpx;font-weight:400 !important;"
				v-model="code"></input>
			<view class="getCodeLogin flex flexjc flexac" :style="{opacity:!codeDisabled?'1':'.4'}"
				@tap='getCode'>{{codeText}}</view>
		</view>
		<view style="margin-top: 76rpx;position: relative;">
			<view class="flex flexrow flexsb" v-if="step==2" >
				<view class="passItem flex flexjc flexac" v-for="(item,index) in 6" :key="index">
					<block v-if="inputValues[index]">
						<view class="point"></view>
					</block>
					<view class="bicon" v-if="(index==inputValues.length) && showC"></view>
				</view>
			</view>
			<input type="text" focus v-if="step==2" :maxlength="6" class="input_info" @input="inputVal" @blur="blur"
				@focus="focus" />
		</view>

		<view class="nextStep flex flexjc flexac" @tap='goNext()' :style="{opacity:code?'1':'.4'}" v-if='step == 1'>下一步</view>
		<view class="nextStep flex flexjc flexac" style="margin-top: 80rpx;" @tap='goNext()' v-if='step == 2' :style="{opacity:inputValues.length==6?'1':'.4'}">确认修改</view>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				codeText: '获取验证码',
				code: '',
				codeDisabled: false,
				remainingSeconds: 60,
				interval: '',
				step:1,
				inputValues: [], //输入的值
				//获取密码是否在焦点内
				showC:false
			}
		},
		onLoad(option) {},
		onShow() {},
		onUnload() {
			if (that.interval) {
				clearInterval(that.interval);
			}
		},
		methods: {
			inputVal(e) {
				console.log("eeeeeeee",e)
				this.inputValues = e.detail.value;
			},
			blur() {
				!this.blurShow ? (this.blurShowLocal = false) : '';
				this.showC =false;
			},
			focus() {
				!this.blurShow ? (this.blurShowLocal = true) : '';
				this.showC =true;
			},
			goNext(){
				this.step = 2;
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
					'user/sendSms?loginType=2&operaType=1&mobile=' + that.phone, null,
					function(res) {
						console.log("res", res);
						if (res.code == 1) {
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
		}
	}
</script>

<style lang="scss">
	.point {
		width: 30rpx;
		height: 30rpx;
		background-color: black;
		border-radius: 200px;
	}
	.input_info {
		width: 1200rpx;
		height: 110rpx;
		position: absolute;
		opacity: 0;
		top: 0;
		left: -350rpx;
	}
	.nextStep{
		width: 686rpx;
		height: 92rpx;
		background: #0256FF;
		border-radius: 4rpx;
		opacity: 1;
		color:white;
		margin-top: 68rpx;
		font-size: 32rpx;
	}
	.passItem{
		width: 100rpx;
		height: 100rpx;
		background: #FFFFFF;
		box-shadow: 0px 0rpx 10rpx 0px rgba(0,0,0,0.1);
		border-radius: 0px 0px 0px 0px;
		opacity: 1;
	}
	
	page{
		background-color: #F5F5F5;
	}
	.changePage{
		padding: 80rpx 32rpx 0;
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
		
		.loginWrap input {
			padding: 36rpx 20rpx;
			background-color: white;
			font-size: 30rpx;
			width: 686rpx;
			line-height: 30rpx;
		}
	}
	.bicon{
		width: 3rpx;
		height: 50rpx;
		position: absolute;
		background-color: #0256FF;
		animation: move 1s linear infinite;	
	}
	@keyframes move {
	           0%{
	               background-color: #0256FF;
	           }
	           100%{
	               background-color: white;
	           }
	       }
</style>

<template>
  <view class="recorder">
    <view class="re-top" v-if="showTop">
      <view class="re-cancel"></view>
      <view class="re-confirm" :style="{color: theme}" @click="cancel" >
		  <image class="re-image" src="../../static/icon/close.png"></image>
	  </view>
    </view>
	<text class="now-date">{{ reDate }}s</text>
    <view class="recorder-box"
      v-if="!finish"
      @longpress="onStartRecoder" 
      @touchend="onEndRecoder">
<!--        <view class="u-progress-content">
          <image v-if="!isRecording" src="/static/icon/play01.png" mode="aspectFit" :style="{
            width: '80rpx',
            height: '80rpx',
          }"></image>
		  <image src="/static/icon/luyin.gif" mode="aspectFit" :style="{
		    width: '80rpx',
		    height: '80rpx',
		  }" v-else></image>
        </view> -->
    </view>
    <view class="recorder-box"
      v-else >
		<view class="finish-box">
<!-- 			<view class="finish-item" @click="playVoice">
				<image src="/static/icon/luyin01.png" mode="aspectFit"></image>
				<view class="finish-title">播放</view>
			</view>
			<view class="finish-center" @click="confirm" > 
				<image src="/static/icon/luyin02.png" mode="aspectFit"></image>
				<view class="finish-title">提交</view>
			</view>
			<view class="finish-item" @click="reset">
				<image src="/static/icon/luyin03.png" mode="aspectFit"></image>
				<view class="finish-title">重录</view>
			</view> -->
		</view>

    </view>
	<text class="title">{{ finish ? '' : '长按录制语音' }}</text>
	<text class="title-tips">{{ finish ? '' : '可以录制2分钟录音' }}</text>
	
  </view>
</template>

<script>
  // import uCircleProgress from '../u-circle-progress/u-circle-progress.vue'
  const recorderManager = uni.getRecorderManager();
  const innerAudioContext = uni.createInnerAudioContext();
	export default {
    // components: {
    //   uCircleProgress
    // },
    props: {
      width: {
        type: String,
        default: '60rpx'
      },
      height: {
        type: String,
        default: '60rpx'
      },
      showTop: {
        type: Boolean,
        default: true
      },
      maximum: {
        type: [Number, String],
        default: 15
      },
      duration: {
        type: Number,
        default: 20
      },
      theme: {
        type: String,
        default: '#32b99d'
      },
      confirmText: {
        type: String,
        default: '完成'
      }
    },
		data() {
			return {
				reDate: 0,
				bofangTime: 0,
				sec: 0,
				min: 0,
				finish: false,
				voicePath: '',
				playProgress: 100,
				playTimer: null,
				timer: null,
				playStatus: false,
				isRecording: false
			};
		},
    created () {
      // 监听
      this.onMonitorEvents()
    },
    computed: {
      // 录制时间计算
      calcProgress () {
        return (this.sec + (this.min * 60)) / this.maximum * 100
      }
    },
    methods: {
      // 完成事件
      confirm () {
        if (!innerAudioContext.paused) {
          innerAudioContext.stop()
        }
        this.$emit('confirm', {path: this.voicePath, time: this.reDate})
      },
      // 取消事件
      cancel () {
        if (!innerAudioContext.paused) {
          innerAudioContext.stop()
        }
		uni.hideLoading()
		this.reset()
        this.$emit('cancel')
      },
      // 点击事件
      handle () {
        this.$emit('click')
      },
      // 重新录制
      reset () {
        this.voicePath = ''
        this.min = 0
        this.sec = 0
        this.reDate = 0
        this.playProgress = 100
        this.finish = false
        this.$emit('reset')
      },
      // 播放暂停录音
      playVoice() {
		  // #ifdef MP-WEIXIN
		  	uni.setInnerAudioOption({
		  		obeyMuteSwitch: false
		  	})
		  // #endif
        innerAudioContext.src = this.voicePath;
        
        if (innerAudioContext.paused) {
          innerAudioContext.play()
          this.playStatus = true
        } else {
          innerAudioContext.stop();
        }
        this.$emit('playVoice', innerAudioContext.paused)
      },
      // 录制结束
      onEndRecoder () {
			this.isRecording = false
			recorderManager.stop()
      },
      // 开始录制
      onStartRecoder () {
		this.isRecording = true
        recorderManager.start({
          duration: this.maximum * 1000
        })
      },
      // 监听
      onMonitorEvents () {
        // 录制开始
        recorderManager.onStart(() => {
          uni.showLoading({
            title: '录制中...'
          })
          this.startDate()
          this.$emit('start')
        })
        // 录制结束
        recorderManager.onStop(({ tempFilePath }) => {
          this.voicePath = tempFilePath
          clearInterval(this.timer)
          uni.hideLoading()
          this.finish = true
          this.$emit('end')
        })
        // 播放进度
        innerAudioContext.onTimeUpdate(() => {
          let totalDate = innerAudioContext.duration
          let nowTime = innerAudioContext.currentTime
          let surplus = totalDate - nowTime
          this.playProgress = surplus / totalDate * 100
          
          let _min = Math.floor(surplus / 60)
          if (_min < 10) _min = '0' + _min;
          let _sec = Math.floor(surplus%60)
          if (_sec < 10) _sec = '0' + _sec;
          this.bofangTime = _min + ':' + _sec
        })
        // 播放暂停
        innerAudioContext.onPause(() => {
          this.resetDate()
          this.playProgress = 100
          this.playStatus = false
          console.log('播放暂停')
          this.$emit('stop')
        })
        // 播放停止
        innerAudioContext.onStop(() => {
          this.resetDate()
          this.playProgress = 100
          this.playStatus = false
          console.log('播放停止')
          this.$emit('stop')
        })
      },
      // 录音计时
      startDate () {
        clearInterval(this.timer)
        this.sec = 0
        this.min = 0
        this.timer = setInterval(() => {
          this.sec += this.duration / 1000
          // if (this.sec >= 60) {
          //   this.min ++
          //   this.sec = 0
          // }
          this.resetDate()
        }, this.duration)
      },
      // 播放时间
      resetDate () {
        // let _s = this.sec < 10 ? '0' + parseInt(this.sec) : parseInt(this.sec)
        // let _m = this.min < 10 ? '0' + this.min : this.min
        // this.reDate = _m + ':' + _s
		this.bofangTime = parseInt(this.sec)
		this.reDate = parseInt(this.sec)
      }
    }
	}
</script>

<style lang="scss">
	.u-progress-content{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 156rpx;
		height: 156rpx;
		background: linear-gradient(132deg, #FE7162 0%, #FC5D52 100%);
		border-radius: 50%;
	}
	.finish-box{
		display: flex;
		align-items: flex-end;
	}
	.finish-item{
		text-align: center;
		image{
			width: 64rpx;
			height: 64rpx;
			margin-bottom: 26rpx;
		}
	}
	.finish-center{
		text-align: center;
		margin: 0 90rpx;
		image{
			width: 116rpx;
			height: 116rpx;
		}
	}
	.finish-title{
		font-size: 26rpx;
		font-weight: bold;
		color: #333333;
	}

.recorder {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  font-size: 24rpx;
  width: 100%;
  .re-top {
    display: flex;
    justify-content: space-between;
    padding: 10rpx 20rpx;
    width: 100%;
    font-size: 28rpx;
    box-sizing: border-box;
  }
  .title {
    padding: 20rpx 0 6rpx 0;
	font-size: 28rpx;
	font-weight: bold;
	color: #333333;
  }
  .title-tips{
	  font-size: 24rpx;
	  color: #666666;
  }
  .recorder-box {
    position: relative;
  }
  .now-date {
    font-size: 28rpx;
    color: #999999;
    padding: 20rpx 0;
  }
  .re-image{
	  width: 32rpx !important;
	  height: 32rpx !important;
	  margin: 20rpx 10rpx 0 0;
  }
}
</style>

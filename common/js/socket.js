import $api from './app.js';
let hasLogin=false;
// let wssurl='ws://47.106.115.52:22345/ws'
let wssurl='wss://api.im.zhenzanyoucai.com/ws'
let msgEventTypeEnum = {
	initEvent: 1, //socket初始化事件
	loginEvent: 2, //登录事件
	logoutEvent: 3, //正常退出事件
	sendMsgEvent: 4, //发送聊天消息事件
	msgReceiveEvent: 5, //接收聊天消息事件
	getChatSessionEvent: 6, //拉取会话列表消息事件
	getCustomerChatRecordEvent: 7, //拉取会话列表消息事件
	setChatRecordReadEvent: 8, //设置聊天组对应的聊天记录内容阅读状态消息事件
	chatMsgReadEvent: 9, //自己发送的聊天消息被已读的事件通知事件
	transferCustomerSessionEvent: 10, //客服会话转接事件通知事件
	closeCustomerSessionEvent: 11 //结束客服会话事件通知事件
}
//心跳定时对象
let _timeoutObj = '';
let channelId='';
const websocketob = {
	scConnent() {
		console.log('开始连接');
		uni.connectSocket({
			url: wssurl,
			complete: (res) => {
				console.log("res", res);
				websocketob.watchMes();
				websocketob.initFirstConnent();
				//setTimeout(function(){websocketob.initFirstConnent();},1000)
				
			}
		});
	},
	watchMes() {
		uni.onSocketMessage(function(res) {
			console.log('收到服务器内容：' + res.data);
			websocketob.dispatchMsgEvent(res.data);
		});
	},
	isOpen() {
		console.log("inISopen");
		return new Promise((resolve, reject) => {
			uni.onSocketOpen(function(res) {
				console.log('isOpenres', res);
				//开启心跳 开心监听
				websocketob._reset();
				//websocketob._start();
				websocketob.onSocketClosed();
				resolve('success');
			});
		});
	},
	initFirstConnent() {
		var timestamp = (new Date()).getTime();
		//初始化及鉴权
		var initData = {
			"appkey": "zz-im", //IM应用 appkey
			"deviceType": 4, //1、网页，2、安卓的APP，3、iOS的APP，4、微信小程序，5、支付宝小程序，6、字节跳动小程序，7、QQ小程序，8、百度小程序（默认值：1）
			"timestamp": timestamp, //当前时间戳，用于防止重放攻击，精确到毫秒
			"msgEventType": 1
		};
		websocketob.sendMes(initData);
	},
	sendMes(data) {
		console.log('senddata', data);
		websocketob.isOpen().then(() => {
			uni.sendSocketMessage({
				data: JSON.stringify(data),
				success: (res) => {
					console.log("sendMesres", res);
				},
				fail(err) {
					console.log("err", err);
				}
			});

		}).catch(err => {
			console.log("err", err);
		});
	},
    sendMesSend(data,netLogin) {	
		if(!hasLogin&&!netLogin){
			setTimeout(function(){websocketob.sendMesSend(data);},500);
			return;
		}
		console.log('senddata2', data);
		uni.sendSocketMessage({
			data: JSON.stringify(data),
			success: (res) => {
				console.log("sendMesres", res);
			},
			fail(err) {
				console.log("err", err);
				websocketob._reset()
			}
		});
	},
	//处理服务端事件
	dispatchMsgEvent(event) {
		let response = JSON.parse(event);
		return new Promise((resolve, reject) => {
			if (response.data == "undefined" || response.data == null || response.data.msgEventType == "undefined") {
				console.error("找不到消息分发对象,event.data:", event.data);
				reject('error');
				return;
			}
			if (response.data.msgEventType == msgEventTypeEnum.initEvent) { // 初始化回调触发
				//initObj.initOnSuccess(response);
				channelId=response.data.channelId;
				uni.setStorageSync('channelId', response.data.channelId);
				websocketob.imLogin();
			}
			if (response.data.msgEventType == msgEventTypeEnum.getCustomerChatRecordEvent) { // 初始化回调触发
				//initObj.initOnSuccess(response);
				uni.$emit('imresMes',JSON.stringify(response.data))
				//uni.$emit('refresh',{});
				
			}
			if (response.data.msgEventType == msgEventTypeEnum.msgReceiveEvent) { // 接收信息
				//initObj.initOnSuccess(response);
				uni.$emit('imresMes',JSON.stringify(response.data))
				uni.$emit('refresh',{});
				
			}
			if (response.data.msgEventType == msgEventTypeEnum.loginEvent) { // 登录回调触发模拟
                hasLogin=true
			}
			// setTimeout(function(){
			// 	hasLogin=true
			// },500);
			 
			resolve(response.data);
			// if (response.data.msgEventType == msgEventTypeEnum.loginEvent) { // 登录回调触发模拟
			// 	if (response.status == 200) {
			// 		loginObj.loginOnSuccess(response);
			// 		startHeartbeatCheckTimer(); //开始心跳检测
			// 		return;
			// 	}
			// 	loginObj.loginOnFail(response);
			// 	return;
			// }
			console.log("dispatchMsgEvent", response.data);
		});
	},
	//未读条数
	nReadMes(){
		$api.request(
			'post',
			'/imCommons/imUnReadCount', {},
			function(res) {
				if (res.status == '200') {
					if(res.data!=0){
						let textStr=res.data.toString();
						uni.setTabBarBadge({
							index: 1,
							text: textStr
						})
					}
                    else{
						console.log('hideTabBarRedDot');
						uni.hideTabBarRedDot({
							index: 1
						});
					}
					// uni.setStorageSync('setDot', 5);
				} else {
					$api.toast('用户信息获取失败')
				}
				// console.log("res", res);
			},
			function(fail) {
				$api.toast('网络开小差')
			},
			'33002'
		);
	},
	//登录
	imLogin(){
		let that=this;
		$api.request(
			'post',
			'imCommons/imAccount', {},
			function(res) {
				if (res.status == '200') {
					 console.log("res", res);							 
					 let loginData={
						 userAccount:res.data.imAccount,
						 password:res.data.imPassword,
						 accessToken:uni.getStorageSync('token'),
						 channelId:channelId,
						 msgEventType:2
					 }
					 uni.setStorageSync('userAccount', res.data.imAccount);
					 websocketob.sendMesSend(loginData,true)
				}			
			},
			function(fail) {
				$api.toast('网络开小差')
			},
			'33002'
		);
	},
	// 心跳重置
	_reset() {
		_timeoutObj && clearTimeout(_timeoutObj);
		return this;
	},
	// 心跳开始
	_start() {
		let _this = this;
		_timeoutObj = setInterval(() => {
			let data = {};
			data["msgEventType"] = 12; //事件类型：心跳检测
			websocketob.sendMesSend(data);
		}, 3 * 1000);
	},
	onSocketClosed(options) {
		uni.onSocketClose(err => {
			console.log('当前websocket连接已关闭,错误信息为:' + JSON.stringify(err));
			// 停止心跳连接
			this._reset();
			// 关闭已登录开关
			//this._isLogin = false;
			// 检测是否是用户自己退出小程序
			if (!this._isClosed) {
				// 进行重连
				if (this._isReconnection) {
					this._reConnect(options)
				}
			}
		})
	},
	//关闭
	closeSocket() {
		uni.onSocketOpen(function() {
			uni.closeSocket();
		});
	},
	_reConnect(options) {
		let timer, _this = this;
		timer = setTimeout(() => {
			this.initWebSocket(options)
		}, 3000)
		// if (this._connectNum < 20) {
		// 	timer = setTimeout(() => {
		// 		this.initWebSocket(options)
		// 	}, 3000)
		// 	this._connectNum += 1;
		// } else if (this._connectNum < 50) {
		// 	timer = setTimeout(() => {
		// 		this.initWebSocket(options)
		// 	}, 10000)
		// 	this._connectNum += 1;
		// } else {
		// 	timer = setTimeout(() => {
		// 		this.initWebSocket(options)
		// 	}, 450000)
		// 	this._connectNum += 1;
		// }
	}
}
export default websocketob;

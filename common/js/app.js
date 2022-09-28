//请求域名
// export const env = 'prod'; // 正式
// export const env = 'prod2'; // 正式2
export const env = 'pre'; // 测试
// export const env = 'advance'; // 预发布

export let netWork = 1;
uni.$on('netWork', function(index) {
	console.log("chufanetworkcccv", index);
	netWork = index;
});
let HOST, HOST2, HOST3, HOST4, HOST5, HOST6,HOSTAi='https://aihomework.xinhualeyu.com/';
if (env === 'pre') {
	// HOST =  'http://10.100.30.122:7602/'; // 超融合测试
	// HOST2 = 'http://10.100.30.122:7601/';
	// HOST3 = 'http://10.100.30.122:7603/';
	// HOST4 = 'http://10.100.30.122:7604/';
	// HOST5 = 'http://10.100.30.122:8809/';
	// HOST6 = 'http://10.100.30.122:7605/';

	HOST = '/mjapi/'; // 测试
	HOST2 = '/leyuapi/';
	HOST3 = 'http://120.25.27.207:7603/';
	HOST4 = 'http://120.25.27.207:7604/';
	HOST5 = 'http://120.25.27.207:8809/';
	HOST6 = 'http://120.25.27.207:7605/';


	// HOST = 'http://192.168.94.88:7602/'; // 延坡电脑
	// HOST2 = 'http://192.168.94.88:7601/';
	// HOST3 = 'http://192.168.94.88:7603/';
	// HOST4 = 'http://192.168.94.88:7604/';
	// HOST5 = 'http://192.168.94.88:8809/';
	// HOST6 = 'http://192.168.94.88:7605/';

	// HOST = 'http://192.168.94.58:7602/'; // 小浩电脑
	// HOST2 = 'http://192.168.94.58:7601/';
	// HOST3 = 'http://192.168.94.58:7603/';
	// HOST4 = 'http://192.168.94.58:7604/';
	// HOST5 = 'http://192.168.94.58:8809/';
	// HOST6 = 'http://192.168.94.58:7605/';

} else if (env === 'advance') {
	HOST = 'https://cx-user-api.xinhualeyu.com/';
	HOST2 = 'https://cx-basis-api.xinhualeyu.com/';
	HOST3 = 'https://cx-course-api.xinhualeyu.com/';
	HOST4 = 'https://cx-order-api.xinhualeyu.com/';
	HOST5 = 'http://8.129.120.168:8809/';
	HOST6 = 'https://cx-read-api.xinhualeyu.com/';
} else if (env === 'prod') {
	// HOST = 'https://jx-transition.xinhualeyu.com/';
	// HOST2 = 'https://jx-course.xinhualeyu.com/';
	// HOST3 = 'https://jx-book.xinhualeyu.com/';
	// HOST4 = 'https://jx-member.xinhualeyu.com/';
	// HOST5 = 'https://jx-pay.xinhualeyu.com/';
	HOST = 'https://ly-user-api.xinhualeyu.com/';
	HOST2 = 'https://ly-basis-api.xinhualeyu.com/';
	HOST3 = 'https://ly-course-api.xinhualeyu.com/';
	HOST4 = 'https://ly-order-api.xinhualeyu.com/';
	HOST5 = 'http://39.108.92.192:8809/';
	HOST6 = 'https://ly-read-api.xinhualeyu.com/';
} else if (env === 'prod2') {
	HOST = 'https://v2-user-api.xinhualeyu.com/';
	HOST2 = 'https://v2-basis-api.xinhualeyu.com/';
	HOST3 = 'https://v2-course-api.xinhualeyu.com/';
	HOST4 = 'https://v2-order-api.xinhualeyu.com/';
	HOST5 = 'http://39.108.92.192:8809/';
	HOST6 = 'https://v2-read-api.xinhualeyu.com/';
}
let websiteUrl = '';

let HOST7 = 'https://center.xinhualeyu.com/prod-api' //正式环境
//let HOST7='https://test-center.xinhualeyu.com/prod-api'//测试环境
//let HOST7='http://192.168.94.58:8080'
const postUrl = {
	'8605': HOST,
	'1000': HOST2,
	'8604': HOST3,
	'8603': HOST4,
	'8809': HOST5,
	'8607': HOST6,
	'9999': HOST7,
	'8085': HOST,
	'ai':HOSTAi
}

//请求版本号
const webversion = '1.0.0'

//设备类型 1001：IOS 1002：Android
var webem = 1002;

/**
 * 说明：获取页面相关信息
 * */
var pageInfo = {},
	pageHeight = '',
	maxHeight = ''
uni.getSystemInfo({
	success: function(res) {
		pageInfo = res;
		maxHeight = (res.screenHeight * 750 / res.screenWidth);
		pageHeight = (res.windowHeight * 750 / res.screenWidth);
		if (res.platform == 'ios') {
			webem = 1001
		}
	}
});

//随机字符串
function randomString(len) {
	len = len || 32;
	/****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	var maxPos = $chars.length;
	var pwd = '';
	for (let i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

let appNonce;

/**
 * 说明：全局ajax请求封装
 * 参数-method 请求类型
 * 参数-url 请求域名
 * 参数-data  请求data信息
 * 参数-callback 请求成功回调
 * 参数-failback 请求失败回调
 * 参数-webtype 端口
 * */

import aesApi from './aes_util.js';
const request = async function(method, url, info, callback, failback, webtype, isjson, showLoadingstr) {
	
	//
	//获取token信息
	let token = uni.getStorageSync('token') || '';
	let showLoading = true;
	if (showLoadingstr == 'N') {
		showLoading = false
	}
	if (webtype) {
		websiteUrl = postUrl[webtype]
	} else {
		websiteUrl = postUrl['8605']
	}
	//console.log(webtype,websiteUrl,'请求' + url + '/parmas', info);
	// if (webtype == 'gdreading') {
	// 	token = uni.getStorageSync('readToken') || '';
	// }
	let contenttype = 'application/x-www-form-urlencoded';
	if (isjson) {
		contenttype = 'application/json';
	}
	/* 	if(isjson=='html'){
			contenttype = 'text/html;charset=UTF-8';
		} */
	//发起请求
	// if (showLoading) {
	// 	wx.showLoading({
	// 		title: '数据加载中',
	// 	});
	// }

	let headers = {
		'content-type': contenttype,
		'jboltappid':'jbfdck3953y8olt',
		'JBOLTAPI':true
	}
	let userToken = uni.getStorageSync('userToken');
	if(userToken){
		headers['mjToken'] = userToken;
	}
	let ajaxAction = function() {
		if(!userToken){
			uni.reLaunch({
				url:'/pages/login/index'
			})
		}
		uni.showLoading({
			title:'加载中'
		})
		uni.request({
			url: websiteUrl + url,
			data: info,
			sslVerify: false,
			timeout: 10000,
			header: headers,
			method: method,
			getResponse:true,
			success: (res) => {
				uni.hideLoading()
				if(res.header.mjtoken){
					getApp().globalData.userToken = res.header.mjtoken;
					uni.setStorageSync('userToken',res.header.mjtoken);
				}
				if (res.data.code == 4005) {
					uni.removeStorageSync('userToken');
					uni.removeStorageSync('userPhone');
					uni.removeStorageSync('userinfo')
					uni.showToast({
						title: '登录过期，请重新登录',
						icon: 'none',
						position: 'bottom',
						duration: 2000
					});
					setTimeout(()=>{
						uni.reLaunch({
							url:'/pages/login/index'
						})
					},1000)
					
					// callback(res.data)
				} else {
					callback(res.data)
				}

			},
			fail: (err) => {
				uni.hideLoading()
				if (err.errMsg == 'request:fail timeout') {
					uni.showToast({
						title: '系统繁忙，请您稍后再试。',
						icon: 'none',
						position: 'bottom',
						duration: 2000
					});
				} else {
					if (netWork == 2) {
						uni.showToast({
							title: '网络出错，请检查网络连接',
							icon: 'none',
							position: 'bottom',
							duration: 2000
						});
					}
				}
				failback(err)
			}
		});
	}
	
	ajaxAction()
	
	//nonce Token 传值 鉴权
	// if (url !== 'api/token/getToken'&&webtype!='ai') {
	// 	if (getApp().globalData.nonceToken) {
	// 		let times = new Date().getTime() + Number(getApp().globalData.mistiming);
	// 		let text = getApp().globalData.nonceToken + '-' + times + randomString(8) + '' + getApp().globalData
	// 			.unionId;
	// 		headers['nonceToken'] = aesApi.AesEncrypt(text, getApp().globalData.cKey, getApp().globalData.cIv);
	// 		ajaxAction()
	// 	} else {
	// 		await appNonce(method, url, info, websiteUrl, headers).then((res) => {
	// 			//console.log(res)
	// 			method=res.method;
	// 			url=res.url; 
	// 			info=res.info;  
	// 			websiteUrl=res.websiteUrl;  
	// 			headers=res.headers; 
	// 			let times = new Date().getTime() + Number(getApp().globalData.mistiming);
	// 			let text = getApp().globalData.nonceToken + '-' + times + randomString(8) + '' + getApp().globalData.unionId;
	// 			headers['nonceToken'] = aesApi.AesEncrypt(text, getApp().globalData.cKey, getApp().globalData.cIv);
	// 			ajaxAction()
	// 		})
	// 	}
	// }else{
	// 	if(webtype=='ai'&&getApp().globalData.aiUser){
	// 		headers['userId']=getApp().globalData.aiUser.userId;
	// 		headers['token']=getApp().globalData.aiUser.token;
	// 	}
	// 	ajaxAction()
	// }
}


//弹窗显示
const toast = function(text) {
	uni.showToast({
		title: text,
		icon: 'none',
		position: 'bottom',
		duration: 2000
	});

}
const time = function(shijianchuo) {
	if (shijianchuo == null || shijianchuo == "") {
		return 0;
	}
	var time = new Date(shijianchuo);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	// if()
	m < 10 ? '0' + m : m;
	return y + '-' + m;

}
const time2 = function(obj) {
	if (obj == null || obj == "") {
		return 0;
	}
	var obj = new Date(obj);
	var year = 1900 + obj.getYear();
	var month = "0" + (obj.getMonth() + 1);
	var date = "0" + obj.getDate();
	var hour = "0" + obj.getHours();
	var minute = "0" + obj.getMinutes();
	var second = "0" + obj.getSeconds();
	return year + "-" + month.substring(month.length - 2, month.length) + "-" + date.substring(date.length - 2, date
			.length) +
		" " + hour.substring(hour.length - 2, hour.length) + ":" +
		minute.substring(minute.length - 2, minute.length) + ":" + second.substring(second.length - 2, second
			.length);
}

function add0(m) {
	return m < 10 ? '0' + m : m
}
const regular = function(val, type) {
	let str = '';
	switch (type) {
		case 'tel': //手机号码
			str = /^1\d{10}$/;
			break;
		case 'email': //邮箱
			str = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			break;
		case 'stuNo': //学籍号
			str = /^(G|g|J|j|L|l)(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
			break;
		case 'cp': //身份证
			str = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
			break;
		case 'int': //正整数
			str = /^[-+]?\d*$/;
			break;
		case 'password': //密码
			str = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
			break;
		case 'cn': //中文
			str = /^[\u4e00-\u9fa5]{2,17}$/;
			break;
		case 'number': //整数或者小数
			str = /^[0-9]+\.{0,1}[0-9]{0,2}$/;
			break;
		case 'numbereng': //英文和数字
			str = /^[0-9a-zA-Z]+$/;
			break;
		case 'cnen': //英文和中文
			str = /^[a-zA-Z\u4e00-\u9fa5]+$/;
			break;
		case 'cnennum': //英文和中文数字
			str = /^[0-9a-zA-Z\u4e00-\u9fa5]+$/;
			break;
		case 'excode': //特殊字符
			str =
				/^[\u4E00-\u9FA5A-Za-z0-9\·\~\！\@\#\￥\%\……\&\*\（\）\——\-\+\=\【\】\{\}\、\|\；\‘\’\：\“\”\《\》\？\，\。\、]+$/;
			break;

		default:
			break;
	}
	let regExp = new RegExp(str);
	return regExp.test(val)
}
const getTerm = function(index) {
	let arr = [{
			id: '1',
			name: '第一学期'
		},
		{
			id: '2',
			name: '第二学期'
		},
		{
			id: '3',
			name: '暑假班'
		},
		{
			id: '4',
			name: '寒假班'
		},
		{
			id: '5',
			name: '短期班'
		}
	]

	if (index == 'all') {
		return arr
	} else if (parseInt(index) > 0) {
		return arr[index - 1].name
	}

}

const formatTime = function formatTime(shijianchuo, type) {
	var time = new Date(shijianchuo);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	let time11 = ''

	if (new Date(shijianchuo).toDateString() === new Date().toDateString()) { //今天
		time11 = '今天' + '（' + getWeek(time) + '）' + ' ' + add0(h) + ':' + add0(mm)
		if (type) {
			time11 = '今天' + '（' + getWeek(time) + '）'
		}
	} else {
		time11 = y + '-' + add0(m) + '-' + add0(d) + '（' + getWeek(time) + '）' + ' ' + add0(h) + ':' + add0(mm)
		if (type) {
			time11 = add0(m) + '-' + add0(d) + '（' + getWeek(time) + '）'
		}
	}
	return time11

}

function getWeek(date) {
	var week;
	if (date.getDay() == 0) week = "星期日"
	if (date.getDay() == 1) week = "星期一"
	if (date.getDay() == 2) week = "星期二"
	if (date.getDay() == 3) week = "星期三"
	if (date.getDay() == 4) week = "星期四"
	if (date.getDay() == 5) week = "星期五"
	if (date.getDay() == 6) week = "星期六"
	return week;
}



//获取应用Nonce
/*
 * unionId 唯一值
 * timeStamp 时间戳
 * appId 项目id
 * nonStr 随机字符
 * appSecret  特定的key 
 */
let isappNonce=0;
appNonce = function(method, url, info, websiteUrl, headers) {
	if(isappNonce){
		return new Promise(resolve => {
		let times=setInterval(function(){
			if(getApp().globalData.nonceToken){
				clearInterval(times)
				resolve({method, url, info, websiteUrl, headers});
			}
		},30)
		});
	}else{
	isappNonce=1;
	return new Promise(resolve => {
		uni.getSystemInfo({
			success: function(res) {
				let deviceId = res.deviceId;
				deviceId = deviceId.replace(/-/g, "");
				getApp().globalData.unionId = deviceId;
				var timestamp = new Date().getTime();
				let k1 = Math.round(Math.random() * 10 + 1);
				let k2 = Math.round(Math.random() * 18 + 1);
				let txt = randomString(k1) + '-' + deviceId + '-' + getApp().globalData
					.appSecret + '-' + randomString(k2) + '-' + getApp().globalData.sysAppId +
					'-' + timestamp;
				let sInfo = aesApi.AesEncrypt(txt, getApp().globalData.cKey, getApp().globalData
					.cIv);
				// let s2=aesApi.AesDecrypt(sInfo,that.globalData.cKey,that.globalData.cIv);
				request(
					'get',
					'api/token/getToken', {
						sInfo: sInfo
					},
					function(res) {
						if (res.code == 200) {
							let data = res.data;
							if (timestamp == data.timeStamp) {
								// 服务器时间比系统时间差距
								let selectDate = Number(res.selectDate) * 1000;
								let mistiming = selectDate - new Date().getTime()
								getApp().globalData.mistiming = mistiming;
								getApp().globalData.nonceToken = data.token;
								resolve({method, url, info, websiteUrl, headers});
								return;
							}
						}
						resolve({method, url, info, websiteUrl, headers});
					},
					function(fail) {
						resolve({method, url, info, websiteUrl, headers});
					},
					'8605'
				);
			}
		});
	});
	
	}
}

const getQueryVariable = function(variable, query) {
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return false;
}
const takePhone = function(phone) {
	let result = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
	return result;
}



export default {
	takePhone,
	postUrl,
	pageInfo,
	request,
	toast,
	pageHeight,
	maxHeight,
	regular,
	time,
	time2,
	getTerm,
	formatTime,
	randomString,
	aesApi,
	appNonce,
	getQueryVariable
}

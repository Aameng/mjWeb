//生成上传的文件名称含后缀
function getNewFileName(that, path, directory) {
	let k = Math.round(Math.random() * 10);
	return directory + '/' + new Date().valueOf() + that.$api.randomString(k) + '.' + path.substring(path.lastIndexOf(
		'.') + 1)
}

//获取七牛的token
function getQiniuToken(that) {
	return new Promise((resolve, reject) => {
		let token = getApp().globalData.qiniuToken
		if (token && token != null) {
			resolve(token)
		} else {
			// 获取七牛token
			that.$api.request(
				'get',
				'/app/index/getQnToken', {},
				function(res) {
					if (res.code === 0) {
						getApp().globalData.qiniuToken = res.data.token
						resolve(res.data.token)
					} else {
						reject(1)
					}
				},
				function() {
					reject(1)
				},
				'8605'
			);
		}
	})
}

//获取七牛资源域名
function getTokenUrl(that) {
	return new Promise((resolve, reject) => {
		let host = 'http://riuumxld0.hn-bkt.clouddn.com/'
		resolve(host)
	})
}
/**
 * @author: jack kong
 * @time: 2022-05-24 11:50:42
 * @param that - this 指针
 * @param file 上传的文件
 * @param directory 上传的目录
 * @param mime 上传的类型
 **/
function uploadFile(that, file, directory) {
	return new Promise((resolve, reject) => {
		//获取tonken
		const key = getNewFileName(that, file, directory);
		console.log("keykeykeykey",key);
		getQiniuToken(that).then((token) => {
			// 上传后文件资源名以设置的 key 为主，如果 key 为 null 或者 undefined，则文件资源名会以 hash 值作为资源名。
			if (file && token && directory) {
				uni.uploadFile({
					url: 'https://up-z2.qiniup.com',
					filePath: file,
					name: 'file',
					formData: {
						token: token
					},
					success: function(res) {
						if (res.statusCode == 200) {
							let obj = JSON.parse(res.data);
							getTokenUrl(that).then((url)=>{
								resolve(url + obj.key)
							})
						}

					},
					fail: function(res) {
						that.$api.toast(res && res.message || res && res.msg || '网络开小差')
					}
				})
			} else {
				if (!directory) {
					that.$api.toast("七牛上传得设置上传目录，目录规则：模块名称/用弹名称，如：课程/封面=>course/cover");
				}
			}

		}).catch(() => {
			that.$api.toast("七牛上传token获取失败");
			reject("err");
		})
	})
}
export default {
	uploadFile
}

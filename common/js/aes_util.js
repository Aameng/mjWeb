const CryptoJS = require('./crypto-js.min.js'); //引用AES源码js
/**
 * aes 解密方法
 */
function AesDecrypt(word,key,iv) {
	key = CryptoJS.enc.Hex.parse(key)
	iv = CryptoJS.enc.Hex.parse(iv)
	var dec = CryptoJS.AES.decrypt(CryptoJS.format.Hex.parse(word), key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	})
	return CryptoJS.enc.Utf8.stringify(dec)
}
/**
 * aes 加密方法
 */
function AesEncrypt(word,key,iv) {
	key = CryptoJS.enc.Hex.parse(key)
	iv = CryptoJS.enc.Hex.parse(iv)
	var enc = CryptoJS.AES.encrypt(word, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	})
	return enc.ciphertext.toString()
}

/**
 * base64 加密方法
 */
function Base64Encode(val) {
	let str = CryptoJS.enc.Utf8.parse(val);
	let base64 = CryptoJS.enc.Base64.stringify(str);
	return base64;
}

/**
 * base64 解密方法
 */
function Base64Decode(val) {
	let words = CryptoJS.enc.Base64.parse(val);
	return words.toString(CryptoJS.enc.Utf8);
}



//暴露接口
module.exports = {
	AesEncrypt,
	AesDecrypt,
	Base64Encode,
	Base64Decode
}

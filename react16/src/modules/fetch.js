import fetch from 'isomorphic-fetch'
import * as AppConst from '../constants/AppConst'
import merge from 'lodash/merge'
import client from './pub/client.js'
import isSDK from './pub/isSDK.js'
import redirect from './pub/redirect.js'
import {
	readEndMars
}
	from './pub/endMars'

var ajaxCnt = 0
window._bfUserId = window._bfUserId || 'none'

export function fetchGet(url, data = {}, isShowError = true, isShowLoading = true) {
	if (ajaxCnt === 0 && isShowLoading) {
		vera.showLoading()
	}
	isShowLoading&&ajaxCnt++
	data.client = 'H5'
	let clientInfo = client()
	data.env = data.env || encodeURIComponent(JSON.stringify(clientInfo))
	data.fetchts = data.ts || (+(new Date()).getTime() + '')
	let endMars = readEndMars()
	//_client_front_end_request
	data.client_dev = JSON.stringify({
		flag: window._bfUserId,
		ac: endMars && endMars.ext
	})
	var URL = paramObj2paramStr(url, data)
	var options = {
		credentials: 'include',
		mode: 'cors',
		headers:{}
	}
	options.headers["X-Vpal-Ver"] = clientInfo.XVpalVer	
	if (!!endMars && Math.abs((new Date()).getTime() - endMars.timestamp) <= 1000 * 60 * 15) {
		options.headers["X-Vpal-Stat-Scene"] = endMars.sc
		options.headers["X-Vpal-Stat-Ext"] = endMars.ext
		//base.getAppBaseInfo	获取app基础参数接口
		//当前用户的imei（android）或者idfa（ios）：
		//BASEINFO_TYPE_VENDOR_UUID(需要做aes加密)
	}
	return fetch(URL, options)
		.then((response) => {
			isShowLoading&&ajaxCnt--
			if (ajaxCnt === 0 && isShowLoading) {
				vera.hideLoading()
			}
			return response.json()
		})
		.then((json) => {
			if (json === undefined) {
				throw { code: 500, sub_msg: '系统繁忙，请稍后尝试' }
			}
			if (json.code === 400 || json.code === 405) {
				let currentUrl = location.href
				if ((paramStr2paramObj(currentUrl)).moveToken) {
					return json
				}
				redirect()
				//throw {code:400,sub_msg:'登录失效'}
			} else if (json.code != 0) {
				isShowError && showErrorDialog({
					content: json.sub_msg
				})
			}
			return json
		})
		.catch(e => {
			
			vera.hideLoading()
			isShowError && showErrorDialog({
				content: '系统繁忙，请稍后尝试'
			})
		})
		.then((json) => {
			return json || {
				code: 500,
				sub_msg: '系统繁忙，请稍后尝试'
			}
		})
}

export function fetchPost(url, data = {}, isShowError = true, isShowLoading = true) {
	if (ajaxCnt === 0 && isShowLoading) {
		vera.showLoading()
	}
	isShowLoading&&ajaxCnt++
	data.client = 'H5'
	let clientInfo = client()
	data.env = data.env || JSON.stringify(clientInfo)
	data.fetchts = data.ts || (+(new Date()).getTime() + '')
	let endMars = readEndMars()
	//_client_front_end_request
	let client_dev = JSON.stringify({
		flag: window._bfUserId,
		ac: endMars && endMars.ext
	})
	var URL = url + `?client_dev=${client_dev}`
	var options = {
		credentials: 'include',
		method: 'POST',
		mode: 'cors', //: 'no-cors',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: toQueryString(data)
	}
	options.headers["X-Vpal-Ver"] = clientInfo.XVpalVer	
	if (!!endMars && Math.abs((new Date()).getTime() - endMars.timestamp) <= 1000 * 60 * 15) {
		options.headers["X-Vpal-Stat-Scene"] = endMars.sc
		options.headers["X-Vpal-Stat-Ext"] = endMars.ext
	}
	return fetch(URL, options)
		.then((response) => {
			isShowLoading&&ajaxCnt--
			if (ajaxCnt === 0 && isShowLoading) {
				vera.hideLoading()
			}
			return response.json()
		})
		.then((json) => {
			if (json === undefined) {
				throw { code: 500, sub_msg: '系统繁忙，请稍后尝试' }
			}
			if (json.code === 400 || json.code === 405) {
				redirect()
				//throw {code:400,sub_msg:'登录失效'}
			} else if (json.code != 0) {
				isShowError && showErrorDialog({
					content: json.sub_msg
				})
			}
			return json || {}
		})
		.catch(e => {
			vera.hideLoading()
			isShowError && showErrorDialog({
				content: '系统繁忙，请稍后尝试'
			})
		})
		.then((json) => {
			return json || {
				code: 500,
				sub_msg: '系统繁忙，请稍后尝试'
			}
		})
}

function toQueryString(obj) {
	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];
		if (Array.isArray(val)) {
			return val.sort().map(function (val2) {
				return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
			}).join('&');
		}
		return encodeURIComponent(key) + '=' + encodeURIComponent(val);
	}).join('&') : '';
}

export function checkNetwork(success, failed) {
	var img = new Image();
	if (!!success) {
		img.onload = success;
	}
	if (!!failed) {
		img.onerror = failed;
	}
	img.src = AppConst.IMGSRC['logo'] + '?timestamp=' + (+new Date());
}

export function getQueryStringByName(name) {
	var result = decodeURIComponent(location.search).match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
	if (result == null || result.length < 1) {
		return "";
	}
	return result[1];
}

//{name:'jack',age:18} => name=jack&age=18
export function paramObj2paramStr(url, obj = {}) {
	var newUrl = ''
	var paramStr = ''
	for (var i in obj) {
		paramStr += '&' + i + '=' + obj[i]
	}
	if (url.indexOf('&') > -1) {
		newUrl = url + paramStr
	} else if (url.indexOf('?') > -1) {
		if (url.indexOf('=') > -1) {
			newUrl = url + paramStr
		} else {
			newUrl = url + paramStr.substring(1)
		}

	} else {
		newUrl = url + '?' + paramStr.substring(1)
	}
	return newUrl
}

//{name:'jack',age:18} => name=jack&age=18
export function paramObj2paramStrEncode(url, obj = {}) {
	var newUrl = ''
	var paramStr = ''
	for (var i in obj) {
		paramStr += '&' + i + '=' + encodeURIComponent(obj[i])
	}
	if (url.indexOf('&') > -1) {
		newUrl = url + paramStr
	} else if (url.indexOf('?') > -1) {
		if (url.indexOf('=') > -1) {
			newUrl = url + paramStr
		} else {
			newUrl = url + paramStr.substring(1)
		}

	} else {
		newUrl = url + '?' + paramStr.substring(1)
	}
	return newUrl
}

// name=jack&age=18 => {name:'jack',age:18}
export function paramStr2paramObj(url) {
	var search = decodeURIComponent(url).replace(/^\s+/, '').replace(/\s+$/, '').match(/([^?#]*)(#.*)?$/); //提取location.search中'?'后面的部分 
	if (!search) {
		return {};
	}
	var searchStr = search[1];
	var searchHash = searchStr.split('&');

	var ret = {};
	for (var i = 0, len = searchHash.length; i < len; i++) { //这里可以调用each方法 
		var pair = searchHash[i];
		if ((pair = pair.split('='))[0]) {
			var key = pair.shift();
			var value = pair.length > 1 ? pair.join('=') : pair[0];
			if (value != undefined) {
				value = value;
			}
			if (key in ret) {
				if (ret[key].constructor != Array) {
					ret[key] = [ret[key]];
				}
				ret[key].push(value);
			} else {
				ret[key] = value;
			}
		}
	}
	return ret;
}

export function urlVersion(url) {
	var version = 'v=' + new Date().getTime()
	if (url.indexOf('?') > -1) {
		return url + '&' + version
	} else {
		return url + '?' + version
	}
}

export function getMergeUrl(url, obj = {}) {
	//var locationUrl = location.href
	//var current = paramStr2paramObj(locationUrl)
	//var newObject = merge({}, current, obj)
	var newUrl = paramObj2paramStr(url, obj)
	return newUrl
}

export function timeoutPromise(ms, promise) {
	return new Promise((resolve, reject) => {
		const timeoutId = setTimeout(() => {
			reject(new Error("promise timeout"))
		}, ms);
		promise.then(
			(res) => {
				clearTimeout(timeoutId);
				resolve(res);
			}, (err) => {
				clearTimeout(timeoutId);
				reject(err);
			}
		);
	})
}

export function showErrorDialog(param = {}) {
	let paramError = {
		content: "网络请求错误，请重新尝试",
		buttonType: "BUTTON_TYPE_CENTER", //BUTTON_TYPE_CENTER BUTTON_TYPE_LEFTRIGHT
		buttonCenterText: "确定",
		buttonCenterEventMethod: function () {
			// location.reload()
		}
	}
	param.content = param.content || "网络请求错误，请重新尝试"
	vera.showDialog(Object.assign({}, paramError, param))
}
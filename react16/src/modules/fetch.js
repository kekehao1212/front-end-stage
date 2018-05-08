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
import { message } from 'antd'

var ajaxCnt = 0

export async function fetchAsyncGet(url){
	var r = await fetch(url)
	var s = r.json()
	return s
}

// 2s 之后返回双倍的值
function doubleAfter2seconds(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2 * num)
        }, 1000);
    } )
}

export async function testResult() {
    let result = await doubleAfter2seconds(30);
    console.log(result);
}

function fetchCommon(URL, options){
	return fetch(URL, options)
		.then((response) => {
			return response.json()
		})
		.then((json) => {
			if (json === undefined) {
				throw { code: 500, msg: '系统繁忙，请稍后尝试' }
			}else if(json&&json.code==500){
				throw { code: 500, msg: '系统繁忙，请稍后尝试'||json.msg }
			}
			return json
		})
		.catch(e => {
			message.destroy()
			message.error('系统繁忙，请稍后尝试'||e.msg,2);
		})
		.then((json) => {
			return json || {
				code: 500,
				msg: '系统繁忙，请稍后尝试'
			}
		})
}
export function fetchGet(url, data = {}, isShowError = true, isShowLoading = true) {
	//message.loading('Action in progress..', 0.5);
	var URL = paramObj2paramStr(url, data)
	var options = {
		credentials: 'include',
		mode: 'cors',
		headers:{}
	}
	return fetchCommon(URL, options)
}

export function fetchPost(url, data = {}, isShowError = true, isShowLoading = true) {
	//message.loading('Action in progress..', 1);
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
	
	return fetchCommon(URL, options)
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
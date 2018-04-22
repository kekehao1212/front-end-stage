var Cookies = require('js-cookie/src/js.cookie.js')

export default function isSDK() {
	var isSDK = Cookies.get('isSDK') || 'false'
	let domain = document.domain;
	let i = domain.indexOf(".");
	domain = domain.substr(i);
	var key = 'sor=sdk'
	let expires = new Date();
	let now = expires.getTime();
	now += 30 * 60 * 1000;
	expires.setTime(now);
	if (location.href.indexOf(key) > -1 || isSDK == 'true') {
		//Cookies.set('isSDK', 'true')
		Cookies.set("isSDK", 'true', {
			expires: expires,
			path: "",
			domain: domain,
			secure: true
		});
		return true
	} else {
		//Cookies.set('isSDK', 'false')
		Cookies.set("isSDK", 'false', {
			expires: expires,
			path: "",
			domain: domain,
			secure: true
		});
	}
	return false
}
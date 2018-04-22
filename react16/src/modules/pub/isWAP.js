var Cookies = require('js-cookie/src/js.cookie.js')

export function isWAP() {
	var isWAP = Cookies.get('isWAP') || 'false'
	let domain = document.domain;
	let i = domain.indexOf(".");
	domain = domain.substr(i);
	var key = 'sor=wap'
	let expires = new Date();
	let now = expires.getTime();
	now += 30 * 60 * 1000;
	expires.setTime(now);
	if (location.href.indexOf(key) > -1 || isWAP == 'true') {
		//Cookies.set('isSDK', 'true')
		Cookies.set("isWAP", 'true', {
			expires: expires,
			path: "",
			domain: domain,
			secure: true
        });
		return true
	} else {
		//Cookies.set('isSDK', 'false')
		Cookies.set("isWAP", 'false', {
			expires: expires,
			path: "",
			domain: domain,
			secure: true
		});
    }
    return false
    
}

export function clearIsWAP() {
	let domain = document.domain;
	let i = domain.indexOf(".");
	domain = domain.substr(i);
	var key = 'sor=wap'
	let expires = new Date();
	let now = expires.getTime();
	now += 30 * 60 * 1000;
	expires.setTime(now);
    Cookies.set("isWAP", 'false', {
		expires: expires,
		path: "",
		domain: domain,
		secure: true
	});
}
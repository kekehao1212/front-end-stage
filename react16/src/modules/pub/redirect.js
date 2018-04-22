export default function() {
	let currentUrl = location.href
	currentUrl = encodeURIComponent(currentUrl)
	let _stat_sc = '_stat_sc=cashier_h5'
	let acquiringId = (paramStr2paramObj(location.href)).acquiringId||(paramStr2paramObj(location.href)).acquiring_id
	let _stat_ext = acquiringId?`&_stat_ext=${acquiringId}`:''
	let sc_ext = `${_stat_sc}${_stat_ext}&`
	let loginUrl = window.getLocationHref(`https://mlogin.vpal.com/login?${sc_ext}callbackUrl=${currentUrl}`)
	if (window.VP && (window.VP.appName === 'vippay' || window.VP.appName === 'vipfinance')) {
		window.VP.user.login()
	} else if (window.VP && window.VP.appName === 'vipshop') {
		let loginUrl = `https://myvpal.vip.com/h5/vpalLogin?source=app&mustTransfer=1&callbackUrl=${currentUrl}`
		location.replace(loginUrl)
	} else {
		location.replace(loginUrl)
	}
}
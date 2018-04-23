export const ENV= window.ENV || 'PROD' //'RELEASE' //DEV PROD TEST RELEASE
export const DEBUG = ENV === 'PROD'? false:true // true false
export const SERVER_URL='/api'
export const BASE = ''
const STATIC_DOMAIN = ''
const STATIC_PUB_DOMAIN = ''
const ASSETS_ROOT_MAP = {
	'DEV':'src/assets',
	'PROD': STATIC_DOMAIN + '/assets',
	'TEST': STATIC_DOMAIN + '/assets',
	'RELEASE': STATIC_DOMAIN + '/assets',
}
export const ASSETS_ROOT = ASSETS_ROOT_MAP[ENV]

const IMG_ROOT = {
	'DEV': 'src/assets/img',
	'PROD': STATIC_DOMAIN +'/assets/img',
	'TEST': STATIC_DOMAIN + '/assets/img',
	'RELEASE': STATIC_DOMAIN + '/assets/img'
}
export const IMG_SRC_ROOT = IMG_ROOT[ENV]
export const IMGSRC = {
	'LOGO':IMG_ROOT[ENV]+'/logo.png?v=0727',
}
const LOGO_BASE_MAP = {
	'DEV': '/appImg/bankLogo/',
	'PROD': STATIC_PUB_DOMAIN + '/public/appImg/bankLogo/',
	'RELEASE': STATIC_PUB_DOMAIN + '/public/appImg/bankLogo/',
	'TEST': STATIC_PUB_DOMAIN + '/public/appImg/bankLogo/',
}
export const LOGO_BASE = LOGO_BASE_MAP[ENV]
export const TEST ='TEST' 


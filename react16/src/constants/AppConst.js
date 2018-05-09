//export const ENV = window.ENV || 'PROD'//'RELEASE' //DEV PROD TEST RELEASE
//export const DEBUG = ENV === 'PROD'?false:true // true false 
import NODE_ENV from './ENV'
export const DEBUG = NODE_ENV === 'development'
// MOCK：本地mock服务, PROXY代理到项目服务器：
export var PROXY_ENV = "MOCK"
PROXY_ENV = DEBUG?PROXY_ENV:'PROD'
export const SERVER_DOMAIN =  {
	WORKFLOW:DEBUG?'':'http://plat-gw.jd.com',
	MAC:DEBUG?'':'https://mac.jd.com'
}
export const PROXY_API =  {
	MOCK:'/mock-api', 
	PROXY:'/proxy-api', 
	PROD:'', 
}
export const PROXY_URL =  {
	workflow: SERVER_DOMAIN.WORKFLOW + PROXY_API[PROXY_ENV] + '/workflow/workflowHome'
}
export const SERVER_URL = '/api'
export const BASE = '/'
const STATIC_DOMAIN = ''
const STATIC_PUB_DOMAIN = ''
const ASSETS_ROOT_MAP =  {
	'development':'src/assets', 
	'production':STATIC_DOMAIN + '/assets', 
}
export const ASSETS_ROOT = ASSETS_ROOT_MAP[NODE_ENV]

const IMG_ROOT =  {
	'development':'src/assets/img', 
	'production':STATIC_DOMAIN + '/assets/img', 
}
export const IMG_SRC_ROOT = IMG_ROOT[NODE_ENV]
export const IMGSRC =  {
	'LOGO':IMG_ROOT[NODE_ENV] + '/logo.png?v=0727', 
}
const LOGO_BASE_MAP =  {
	'development':'/appImg/bankLogo/', 
	'production':STATIC_PUB_DOMAIN + '/public/appImg/bankLogo/', 
}
export const LOGO_BASE = LOGO_BASE_MAP[NODE_ENV]
export const TEST = 'TEST'




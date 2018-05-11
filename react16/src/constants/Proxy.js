import NODE_ENV from './ENV'

// MOCK：本地mock服务, PROXY代理到项目服务器
const PROXY = "MOCK"
const DEBUG = NODE_ENV === 'development'
const PROXY_ENV = DEBUG?PROXY:'PROD'
const SERVER_DOMAIN =  {
	WORKFLOW:DEBUG?'':'http://plat-gw.jd.com',
	MAC:DEBUG?'':'https://mac.jd.com'
}

const PROXY_API =  {
	MOCK:'/mock-api', 
	PROXY:'/proxy-api', 
	PROD:'', 
}

export  const PROXY_URL =  {
	workflow:SERVER_DOMAIN.WORKFLOW + PROXY_API[PROXY_ENV] + '/workflow/workflowHome', 
	menu:SERVER_DOMAIN.WORKFLOW + PROXY_API[PROXY_ENV] + '/workflow/menu'
}

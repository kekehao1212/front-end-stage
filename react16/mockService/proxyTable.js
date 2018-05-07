// 这里只提供基本用法 , 更多配置请参考 http-proxy-middleware readme:http://www.voidcn.com/article/p-etuniecs-bqr.html
module.exports = {
    '/testapi': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        pathRewrite: {'^/old/testapi' : '/new/api'}
    },
    '/iapi': { 
        target: 'http://localhost:9000', 
        changeOrigin: false ,
        pathRewrite: function (path, req) { 
            return path.replace('/iapi', '/api') 
        }
    },
    '/otherapi': {
        target: 'http://localhost:1000/',
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
    },
    '/auth': {
        target: 'http://localhost:1001/',
        changeOrigin: true,
        pathRewrite: {
            '^/auth': '/auth'
        },
        onProxyReq: function (proxyReq, req, res) {
            proxyReq.setHeader('add', 'xx')
        }
    }
}

// // rewrite path 
// pathRewrite: {'^/old/api' : '/new/api'}

// // remove path 
// pathRewrite: {'^/remove/api' : ''}

// // add base path 
// pathRewrite: {'^/' : '/basepath/'}

// // custom rewriting 
// pathRewrite: function (path, req) { return path.replace('/api', '/base/api') }
/*
* check get current user auth
*/
var treedata = {data:{value:{parent:[{
            "id": 1,
            "name": "系统管理",
            "sub": [{
                "id": 2,
                "name": "用户管理",
                "sub": [{
                    "id": 3,
                    "name": "rylai",
                    "url": "rylai"
                }, {
                    "id": 3,
                    "name": "deny",
                    "url": "deny"
                },{
                    "id": 3,
                    "name": "error",
                    "url": "error"
                }]
            }, {
                "id": 4,
                "name": "权限管理",
                "sub": [{
                    "id": 6,
                    "name": "权限管理",
                    "url": "home"
                }, {
                    "id": 5,
                    "name": "角色管理",
                    "url": "home"
                }]
            }]
        }, {
            "id": 2,
            "name": "消息管理",
            "sub": [{
                "id": 2,
                "name": "用户管理",
                "sub": [{
                    "id": 3,
                    "name": "用户管理",
                    "url": "home"
                }, {
                    "id": 3,
                    "name": "用户管理",
                    "url": "home"
                }]
            }, {
                "id": 4,
                "name": "权限管理",
                "sub": [{
                    "id": 6,
                    "name": "权限管理",
                    "url": "home"
                }, {
                    "id": 5,
                    "name": "角色管理",
                    "url": "home"
                }]
            }]
        }]}}}
appServices.factory('auth', ['http',function(http) {
    var url = '/proxy/vpal-oss/api/auth/perm'
    var authJson = {data:{respCode:0,value:{role:'admin',name:'admin'}}}
    return {
    	get: function(fn){
            if(typeof authJson!=='undefined'){
                if(typeof fn==='function'){
                    fn(authJson)
                    return
                }
            }
    		http.get(url,{},function(json){
    			if(typeof json.error!=='undefined'){
    				$.confirm('json.error.message', function() {},function() {},false)
    				return
    			}
		    	if(typeof fn==='function'){
		    		authJson = json
		    		fn(authJson)
		    	}
		    })
    	}
    }
}]);

appServices.factory('nav', ['http',function(http) {
    var url = '/proxy/vpal-oss/api/menu/tree'
    var treeJson = treedata
    return {
    	get: function(fn){
            if(typeof treeJson!=='undefined'){
               if(typeof fn==='function'){
                    fn(treeJson)
                    return
                }
            }
    		http.get(url,{},function(json){
    			if(typeof json.error!=='undefined'){
    				$.confirm('json.error.message', function() {},function() {},false)
    				return
    			}
		    	if(typeof fn==='function'){
		    		treeJson = json
		    		fn(treeJson)
		    	}
		    })
    	}
    }
}]);









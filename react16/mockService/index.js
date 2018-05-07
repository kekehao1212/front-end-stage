var demo2 = require('./demo2.js')
var demo1 =  require('./demo1.js')
var testapi =  require('./testapi.js')
var workflowHome =  {
    api:'/workflow/workflowHome',
    response:{
        code:0,
        data:{
            name:'workflowHome'
        },
    }
}
var data = [demo2,demo1,testapi,workflowHome]

function getApiData(api){
    console.log('current request api:' + api)
    var r = data.filter((item)=>{
       if(api.indexOf(item.api)>-1){
            console.log('request PROXY api:' + item.api)
           return true
       }
    })
    if(r&&r.length){
        return r[0].response
    }else{
        return {
            code: 500,
            data:{},
            msg:'无匹配api'
        }
    }
   }

module.exports = getApiData
//module.exports = data
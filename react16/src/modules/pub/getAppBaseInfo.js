function getClientId(callback, failed) {
    window.VH && window.VH.base && window.VH.base.getAppBaseInfo({ type: ['BASEINFO_TYPE_VENDOR_UUID'] }, (json) => {
        //window.test = json.data
        //window.result = { "skey": "2d30297ff20ec9b7442dc4f3c335abdc", "eversion": "0", "edata": "YjA0YzZhYjI4MzE3MTNiOSYEKY+9f9Jo8fBZauGbNiWJztVVEdwANFqvk+J0R+gJYHm7MMIPbt3YWkEAXX2Kvk==" }
        callback && callback(json)
    }, () => {
        failed && failed('获取银联设备码失败,请重试！')
    })
    if (window.VP && !window.VP.isApp) {
        let h5Data = { "skey": "2d30297ff20ec9b7442dc4f3c335abdc", "eversion": "0", "edata": "YjA0YzZhYjI4MzE3MTNiOSYEKY+9f9Jo8fBZauGbNiWJztVVEdwANFqvk+J0R+gJYHm7MMIPbt3YWkEAXX2Kvk==" }
        callback && callback({ data: h5Data })
    } else {
        failed && failed('获取银联设备码失败,请重试！')
    }
}

function getClientIdPromise(callback, failed) {
    return new Promise((resolve, reject) => {
        if (window.VH && window.VH.base) {
            window.VH.base.getAppBaseInfo({ type: ['BASEINFO_TYPE_VENDOR_UUID'] }, (json) => {
                //window.test = json.data
                //window.result = { "skey": "2d30297ff20ec9b7442dc4f3c335abdc", "eversion": "0", "edata": "YjA0YzZhYjI4MzE3MTNiOSYEKY+9f9Jo8fBZauGbNiWJztVVEdwANFqvk+J0R+gJYHm7MMIPbt3YWkEAXX2Kvk==" }
                resolve(json)
            }, () => {
                reject('获取银联设备码失败,请重试！')
            })
        } else {
            let h5Data = { "skey": "2d30297ff20ec9b7442dc4f3c335abdc", "eversion": "0", "edata": "YjA0YzZhYjI4MzE3MTNiOSYEKY+9f9Jo8fBZauGbNiWJztVVEdwANFqvk+J0R+gJYHm7MMIPbt3YWkEAXX2Kvk==" }
            resolve({ data: h5Data })
        }
    })
}

export function getAppBaseInfoPromise(callback, failed) {
    return window.localforage.getItem('df_union')
        .then((value) => {
            //存在
            if (value && value.edata) {
                window.test = value.edata
                return value
            } else {
                return getClientIdPromise((json) => {
                    if (json && json.data) {
                        window.localforage.setItem('df_union', json.data)
                        return json.data
                    } else {
                        throw '获取银联设备码失败,请重试！'
                    }
                }, failed)
            }
        }).catch((json)=>{
            return json
        })
}

export function getAppBaseInfo(callback, failed) {
    window.localforage.getItem('df_union')
        .then((value) => {
            //存在
            if (value && value.edata) {
                window.test = value.edata
                callback(value)
            } else {
                getClientId((json) => {
                    //window.test = json.data
                    //window.result = { "skey": "2d30297ff20ec9b7442dc4f3c335abdc", "eversion": "0", "edata": "YjA0YzZhYjI4MzE3MTNiOSYEKY+9f9Jo8fBZauGbNiWJztVVEdwANFqvk+J0R+gJYHm7MMIPbt3YWkEAXX2Kvk==" }
                    if (json && json.data) {
                        callback(json.data)
                        window.localforage.setItem('df_union', json.data)
                    } else {
                        failed('获取银联设备码失败,请重试！')
                    }
                }, failed)
            }
        }, failed);
}
//window.localforage.setItem('df_union',{ "skey": "2d30297ff20ec9b7442dc4f3c335abdc", "eversion": "0", "edata": "YjA0YzZhYjI4MzE3MTNiOSYEKY+9f9Jo8fBZauGbNiWJztVVEdwANFqvk+J0R+gJYHm7MMIPbt3YWkEAXX2Kvk==" })//
// getAppBaseInfo((data)=>{
    //   this.checkUserInfo()
    // },(e)=>{
    //   vera.showDialog({
    //     content: e,
    //     //buttonCenterText: "取消",
    //     buttonCenterEventMethod: function () { }
    //   })
    // })
/**
 * auth: wikies.wan
 * date:   17/2/6 | 下午6:56
 * todo: resp 数字字典
 */
export const respDictionary = {
    0: '业务处理成功',
    1: '业务处理中',
    400: '参数错误',
    401: '参数无效',
    402: '业务无效',
    405: '拒绝访问',
    500: '业务处理失败'
}

export function handleResp(resp){
    return {
        rst: resp===0,
        msg: respDictionary[resp]
    }
}

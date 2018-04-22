/**
 * auth: wikies.wan
 * date:   17/1/20 | 下午3:11
 * todo:
 */
export default function (msg,fn) {
    //todos

    vera.showDialog({
        content: msg,
        buttonType: "BUTTON_TYPE_CENTER",
        buttonCenterText: "确定",
        buttonCenterEventMethod: ()=>{
            if(typeof fn === 'function'){
                fn()
            }
        }
    })
}

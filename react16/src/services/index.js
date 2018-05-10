import {fetchGet, fetchPost} from 'MODULES/fetch.js'
import * as AppConst from 'CONSTANTS/AppConst'

/**
 * 首页所用到的 API
 */

  export function getWorkflow(option={}){
    return fetchGet (AppConst.PROXY_URL.workflow, option)
  }

  export function getMenuList(option={}) {
    return fetchGet (AppConst.PROXY_URL.menu, option).then((json)=>{
      if(json&&json.code == 0){
        this.actions.GET_MENU_LIST(json)
      }
    })
  }

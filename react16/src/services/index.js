import {fetchGet, fetchPost} from 'MODULES/fetch.js'
import * as AppConst from 'CONSTANTS/AppConst'

/**
 * 首页所用到的 API
 */
class IndexService {

  /**
   * 获取首页数据
   * @resolve {Object} / null
   */
  getWorkflow (option={}) {
    return fetchGet (AppConst.PROXY_URL.workflow, option)
  }
}

// 实例化后导出，全局单例
export default new IndexService()
import merge from 'lodash/merge'
import * as AppConst from '../constants/AppConst'

const initialState = {
  userInfo:{
    pin:''
  },
  menuList:[],
  currentMenu:{
    id:'10',
    subId:'0'
  },
  trace: {
    text: '',
    isShow: false
  },
  toast: {
    text: '',
    isShow: false
  },
};

export default function appReducers(state = initialState, action) {
  switch (action.type) {
    case AppConst.GET_MENU_LIST:
      var s = {
        userInfo:{
          pin:action.data.pin
        },
        menuList:action.data.menuList,
      }
      return merge({}, state, s)

    case AppConst.SET_CURRENT_MENU:
      var s = {
        currentMenu:{
          id:action.data
        }
      }
      return merge({}, state, s)
    case AppConst.TEST:
      var s = {
        failure: {
          isShow: true
        }
      }
      return merge({}, state, s)
    default:
      return state
  }
}




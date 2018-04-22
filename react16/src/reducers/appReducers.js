import merge from 'lodash/merge'
import * as AppConst from '../constants/AppConst'

const initialState = {
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
    //failure

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




/**
	vera 全局函数 api ，方便使用，以 DOM 的形式使用，不是 react 组件
**/
import {showLoading,hideLoading} from './Loading'
import {showToast} from './Toast'
import {showDialog, hideDialog} from './Dialog/dom.js'
import {showMsgBanner, hideMsgBanner} from './MsgBanner/dom.js'
import {showPayLoading, hidePayLoading, stopPayLoading} from './Loading/payLoading.js'
window.vera = {
	showLoading: showLoading,
	hideLoading: hideLoading,
	showToast: showToast,
	showDialog:showDialog,
	hideDialog:hideDialog,
	showMsgBanner:showMsgBanner,
	hideMsgBanner:hideMsgBanner,
	showPayLoading:showPayLoading,
	hidePayLoading: hidePayLoading,
	stopPayLoading: stopPayLoading
}

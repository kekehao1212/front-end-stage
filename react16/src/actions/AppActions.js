import * as AppConst from '../constants/AppConst'
import {
	fetchPost, fetchGet, timeoutPromise, showErrorDialog
}
from '../modules/fetch'
/**
	app	pub
		namespace
			PUB_
*/
export function TEST() {
	return {
		type: AppConst.TEST
	}
}


export function GET_MENU_LIST(data){
	return {
		type: AppConst.GET_MENU_LIST,
		data:data
	}
}

export function SET_CURRENT_MENU(data){
	return {
		type: AppConst.SET_CURRENT_MENU,
		data:data
	}
}
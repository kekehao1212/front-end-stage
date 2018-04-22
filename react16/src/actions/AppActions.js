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
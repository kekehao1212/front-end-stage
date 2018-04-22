import merge from 'lodash/merge'
import {paramObj2paramStr} from '../fetch'

const pub_query_key = ['app','appversion']
/**
	context, string 上下文 获取路由信息
	throughKey, array 需要透传到下个页面的key
	param object 需要传递到下个页面的key
	pubKey array 公用的key 需要透传
*/
export default function(context,param,throughKey=[],pubKey=[]){
	let query = context.props.location.query
	let _pubkey = merge([],pub_query_key,pubKey)
	let key = merge([],_pubkey,throughKey)

	let _query = {}

	key.forEach((e,i)=>{
		_query[e] = query[e]
	})

	return merge({},_query,param)
}
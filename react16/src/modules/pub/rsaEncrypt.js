import {PUB_KEY} from '../../constants/AppConst'
/***
<加密类型>|<版本号>|<密文数据>
*/
// export default function(val){
// 	var encrypt = new JSEncrypt();
// 	encrypt.setPublicKey(PUB_KEY);
// 	var encrypted = encrypt.encrypt(val + '');
// 	return '0|1.0.0|'+ encrypted 
// }

export default function(val, isEncode=false){
	if(!val){
		return ''
	}
	var encrypt = new JSEncrypt();
	encrypt.setPublicKey(PUB_KEY);
	var encrypted = encrypt.encrypt(val + '')
	if(isEncode){
		 encrypted = encodeURIComponent(encrypted)
	}
	return '0|1.0.0|'+ encrypted 
}
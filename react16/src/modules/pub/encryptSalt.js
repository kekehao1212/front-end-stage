import * as AppConst from '../../constants/AppConst'
// export default function(value, salt =  AppConst.PUB_SALT_VALUE,PUB_SALT_KEY =  AppConst.PUB_SALT_KEY , hasVersion = true){
// 	var result = do_rsa(value + '', salt + '',PUB_SALT_KEY,hasVersion)
// 	return result
// }

export default function(value, salt =  AppConst.PUB_SALT_VALUE, PUB_SALT_KEY = AppConst.PUB_SALT_KEY, hasVersion = true){
	//PUB_SALT_KEY = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA52XliBwwEkRbnjx8J/VaeXDXIvORw4jDr6Lqb8jEsYMJaKF3mf5korPvHFq/m0m5/dJ51BfN3xopF0Gr9m7dD37CwonnAIJk2qSB+pIfdpMPde8jexk+Uf32F1/6ZpE8BvbeIOeMh3d00x7icE0CLJmtup2NdtCjMbKtX9JPv2yXHw69BTIlCMREbjYOa6yNyeFvglhhQAjq2NvR8egJGN8uHkaxj4WLMzoejXwbLTtV4LsSKn5/u45FMeo0ZXr7vMmixTHVn+nKTQeH/YyYntE4UX+bprUnlSFRToKdmfNJjlBgwOmfGiV+mPliUA3Xmn6QSRR2LZKuAQ8Woz3KQQIDAQAB`;
    //"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8uukD6uwSzPZ0otfSsOB92naEmWqnW2BBzBkgQSmwTQFIq6mUiGr/X6FRkCPYdv9YcVffZIcOyQMT3ITXs0mDso4LhzfCOBb0Qg6hYL7T8ESOAQYREb343HiGvJYuaF43wsl2zBrsODMVWPPFvsdnAGezqnxkX4q54CaStK9E9wIDAQAB"
	let result = do_rsa(value + '', salt + '', PUB_SALT_KEY ,hasVersion)//window.vipRSA.	
	let count = 0
	while(result&&result.indexOf('==')>-1&&count<100){
		count++ 
		result = do_rsa(value + '', salt + '', PUB_SALT_KEY ,hasVersion)//window.vipRSA.	
	}
	return result
}
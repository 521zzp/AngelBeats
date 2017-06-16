/*
 * 验证金额只能为整数
 */
export const checkPositiveInteger = ( valeue ) => {
	let regx = /^[1-9][0-9]*$/
	return regx.test(value)
}

/*
 * 验证身份证号
 */
export const checkIdcard = ( value ) => {
	let regx = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
	return regx.test(value)
}

/*
 * 验证银行卡号
 */
export const checkBankcard = ( value ) => {
	let regx = /^(\d{16}|\d{19})$/
	return regx.test(value)
}
/*
 * 不为空检测
 */
export const checkNotNull = ( value ) => {
	return value === '' ? false : true
}
/*
 * 验证手机号，返回布尔
 */
export const checkPhone = ( phone ) => {
	let regx = /^1[34578]\d{9}$/;
	if (!phone || !regx.test(phone)) {
		return false;
	} else{
		return true;
	}
};
/*
 * 验证密码格式，返回布尔
 */
export const checkPwd = ( value ) => {
	let regx = /^(?![^a-zA-Z]+$)(?!\D+$).{6,18}$/;
	if (!regx.test(value)) {
		return false;
	} else{
		return true;
	}
}
/*
 * 验证支付密码格式，返回布尔
 */
export const checkPayPwd = ( value )=> {
	let regx = /^\d{6}$/;
	if (!regx.test(value)) {
		return false;
	} else{
		return true;
	}
}

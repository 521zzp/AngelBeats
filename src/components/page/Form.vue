<template>
	<form >
		<div class="form-item">
			<mu-text-field hintText="银行卡号" errorText="" :errorText="form.bankCard.errorText" v-model="form.bankCard.value" @input="vali(form, rules, 'bankCard')"/>
		</div>		
		<div class="form-item">
			<mu-text-field hintText="身份证号" :errorText="form.idCard.errorText" v-model="form.idCard.value" @input="vali(form, rules, 'idCard')"/>
		</div>		
		<div class="form-item">
			<mu-text-field hintText="手机号码"  :errorText="form.phone.errorText" v-model="form.phone.value" @input="vali(form, rules, 'phone')"/>
		</div>	
		<div class="form-item">
			 <mu-raised-button label="Default" class="demo-raised-button" @click="formSubmit(form, rules)"/>
		</div>
	</form>
</template>

<script>
import {checkNotNull, checkPhone, checkIdcard} from '@/tool/regx'
import {validate, resultMerge} from '@/tool/form'
import {notice} from '@/tool/talk'

const test = async function (value) {
	let result = await new Promise((resolve) => {
	    setTimeout(function () {
	    	if (value === '15773270836') {
	    		resolve(true)
	    	} else{
	    		resolve(false)
	    	}
	    }, 2000);
	});
	return result
}
export default {
	data () {
		
		return {
			form: {
				idCard: {
					value: '42080119931121425X',
					bool: false,
					errorText: ''
				},
				phone: {
					value: '',
					bool: false,
					errorText: ''
				},
				bankCard: {
					value: '6217002930103030268',
					bool: false,
					errorText: ''
				},
				
			},
			rules: {
				phone: [
					{ check: checkNotNull, message: '电话号码不能为空' },
					{ check: checkPhone, message: '电话号码格式不正确' },
					{ check: test, message: '异步结果不匹配' },
				],
				idCard: [
					{ check: checkNotNull, message: '身份证号不能为空' },
					{ check: checkIdcard, message: '身份证号格式不正确' }
				],
				bankCard: [
					{ check: checkNotNull, message: '银行卡号不能为空' },
				]
			}
		}
	},
	methods: {
		phoneChange () {
			for (let item of this.rules.phone) {
				if (!item.check(this.form.phone.value)) {
					this.form.phone.errorText = item.message
					return false
				}else {
					this.form.phone.errorText = ''
				}
			}
			return true
		},
		vali (form, rules, field) {
			  validate(form, rules, field) 
		},
		async formSubmit (form, rules) {
			console.log(rules)
			if (await resultMerge(form, rules)) {
				notice('表单验证通过')
			}else {
				notice('表单验证失败')
			}
		}
	},
	mounted () {
	}
}
</script>
<style scoped="scoped" lang="less">

</style>
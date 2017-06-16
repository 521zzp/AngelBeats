<template>
	<form >
		<div class="form-item">
			<mu-text-field hintText="银行卡号" errorText="" />
		</div>		
		<div class="form-item">
			<mu-text-field hintText="身份证号" :errorText="form.idCard.errorText" v-model="form.idCard.value" @input="validate(form, rules, 'idCard')"/>
		</div>		
		<div class="form-item">
			<mu-text-field hintText="手机号码"  :errorText="form.phone.errorText" v-model="form.phone.value" @input="validate(form, rules, 'phone')"/>
		</div>	
		<div class="form-item">
			 <mu-raised-button label="Default" class="demo-raised-button" @click="formSubmit"/>
		</div>
	</form>
</template>

<script>
import {checkNotNull, checkPhone, checkIdcard} from '@/tool/regx'

export default {
	data () {
		return {
			form: {
				phone: {
					value: '',
					bool: false,
					errorText: ''
				},
				bankCard: {
					value: '',
					bool: false,
					errorText: ''
				},
				idCard: {
					value: '',
					bool: false,
					errorText: ''
				},
				
			},
			rules: {
				phone: [
					{ check: checkNotNull, message: '电话号码不能为空' },
					{ check: checkPhone, message: '电话号码格式不正确' }
				],
				idCard: [
					{ check: checkNotNull, message: '身份证号不能为空' },
					{ check: checkIdcard, message: '身份证号格式不正确' }
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
		validate (form, rules, field) {
			for (let item of rules[field]) {
				if (!item.check(form[field].value)) {
					console.log(item.message)
					form[field].errorText = item.message
					return false
				}else {
					form[field].errorText = ''
				}
			}
			return true
		},
		formSubmit () {
			let form = this.form
			let rules = this.rules
			let result = this.validate(form, rules, 'phone') && this.validate(form, rules, 'idCard')
			console.log(result)
		}
	}
}
</script>
<style scoped="scoped" lang="less">

</style>
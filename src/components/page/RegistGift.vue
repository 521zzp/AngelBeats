<template>
	<div class="regist-gift" :style="fullHeightStyle">
		<mu-dialog :open="dialog" title="新手礼包" @close="close" dialogClass="regist-gift-dialog">
			<div class="dialog-form">
				<mu-text-field hintText="手机号码" v-model="form.phone.value" type="number" :maxLength="11" @input="vali(form, rules, 'phone')" class="regist-item"
				 inputClass="regist-item-input" hintTextClass="regist-item-tips" :errorText="form.phone.errorText"  />
			</div>
			<button class="next" @click="next">点击领取</button>
		</mu-dialog>
		<div class="receive" @click="dialog = true">马上领取</div>
		
	</div>
</template>

<script>
import {checkNotNull, checkPhone, validate, resultMerge} from '@/tool/regx'
import {fullHeightStyle} from '@/config/style'
export default {
	data () {
		return {
			fullHeightStyle: fullHeightStyle,
			dialog: false,
			form: {
				phone: {
					value: '',
					errorText: '',
					bool: false
				}
			},
			rules: {
				phone: [
					{ check: checkNotNull, message: '电话号码不能为空' },
					{ check: checkPhone, message: '电话号码格式不正确' },
				],
			}
		}
	},
	methods: {
		close () {
	      this.dialog = false
	   },
	   vali (form, rules, field) {
			  validate(form, rules, field) 
		},
		async next () {
			if (this.form.phone.bool || await validate(this.form, this.rules, 'phone') ) {
				this.$store.dispatch('registSendCode',{phone: this.form.phone.value})
				this.$store.dispatch('registOrigin', 1)
			}
		},
	}
}
	
</script>

<style type="text/css">
	.regist-gift-dialog{
		width: 80%;
	}
	.regist-item-input{
		text-align: center;
	}
	.regist-item-tips{
		text-align: center;
		width: 100%;
	}
</style>
<style scoped="scoped" lang="less">
@import url('../../config/base.less');
.regist-gift{
	background-image: url(../../../static/img/regist-gift-bg.png);
	background-size: cover;
	height: 18.8rem;
	overflow: hidden;
}
.dialog-form{
	margin: 0.133333rem auto;
	overflow: hidden;
}
.regist-item{
	width: 100%;
}
.next{
	width: 80%;
	height: 1.2rem;
	display: block;
	margin-left: auto;
	margin-right: auto;
	color: #ffffff;
	background-color: #f25159;
	border: 1px solid #f25159;
	border-radius: 6px;
	font-size: 16px;
	margin-top: 20px;
}
.receive{
	width: 6rem;
	height: 1.2rem;
	line-height: 1.2rem;
	text-align: center;
	color: #FFFFFF;
	background-color: #f25159;
	border-radius: 0.08rem;
	font-size: 0.48rem;
	margin: 0 auto;
	margin-top: 15rem;
}



</style>
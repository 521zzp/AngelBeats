<template>
	<div class="clearfix regist-page" :style="fullHeightStyle">
		<img :class="{hidden: logoHidden}" class="logo" src="../../assets/icon/spa-logo.png"/>
		<span class="gift">注册即送<span class="value">8888</span>元体验金</span>
		<div v-if="step === 1" class="regist-form form-one">
			<mu-text-field hintText="手机号码" v-model="form.phone.value" :maxLength="11" @input="phoneChange" class="regist-item" :errorText="form.phone.errorText"  />
		</div>
		<div v-if="step === 2" class="regist-form form-two">
				<div class="rigist-item-wrap">
					<mu-text-field hintText="验证码" v-model="form.valiCode.value" class="regist-item" :errorText="form.valiCode.errorText"  />
					<span class="send-valid">52s后重新发送</span>
				</div>
				<div class="rigist-item-wrap">
					<mu-text-field hintText="密码" :type="pwpType" v-model="form.password.value" class="regist-item" :errorText="form.password.errorText"  />
					<div class="eye" :class="{'eye-open': pwdOpen}" @click="pwdOpenChange"></div>
				</div>
				<div class="rigist-item-wrap" :class="{hidden: invitorHide}">
					<mu-text-field v-if="invitorOpen" hintText="推荐人" v-model="form.invitor.value" class="regist-item" :errorText="form.invitor.errorText"  />
					<svg class="iconfont invitor-arrow" :class="{open: invitorOpen}" aria-hidden="true" @click="invitorOpen = !invitorOpen">
					    <use xlink:href="#icon-back"></use>
					</svg>
				</div>
		</div>
		<div class="waring" v-if="step === 2">
			 <mu-checkbox label="" v-model:value="agreeAgreement" class="demo-checkbox agree-check"/> <span class="waring-msg">同意<router-link class="waring-link" to="/">《用户协议》</router-link></span>
		</div>
		<button v-if="step === 1" class="next" @click="next">下一步</button>
		<button v-if="step === 2" class="next" @click="regist">立即注册</button>
		<router-link class="to-login"  to="/app">已有账号，立即登录</router-link>
		<span class="market-waring">
			<svg class="iconfont download-icon"  aria-hidden="true">
			    <use xlink:href="#icon-sm-ok"></use>
			</svg>
			市场有风险，投资需谨慎</span>
	</div>
</template>

<script>
import {checkPhone, checkPwd} from '@/tool/regx'
export default {
	data () {
		return {
			fullHeightStyle: {
		  		'min-height': document.documentElement.clientHeight + 'px'
		    },
			logoHidden: false,
			step: 1,
			pwpType: 'password',
			pwdOpen: false,
			invitorOpen: false,
			invitorHide: false,
			agreeAgreement: false,
			form: {
				phone: {
					value: '',
					errorText: '',
					valid: false
				},
				valiCode: {
					value: '',
					errorText: '',
					valid: false
				},
				password: {
					value: '',
					errorText: '',
					valid: false
				},
				invitor: {
					value: '',
					errorText: '',
					valid: true
				}
			},
			rules: {
				phone (obj) {
					if (obj.value === '') {
						obj.valid = false
						obj.errorText = '手机号码不能为空'
						return false
					} else if (!checkPhone(obj.value)) {
						obj.valid = false
						obj.errorText = '手机号码格式不正确'
						return false
					} else {
						obj.valid = true
						obj.errorText = ''
						return true
					}
				},
				valiCode (obj) {
					if (obj.value === '') {
						obj.valid = false
						obj.errorText = '验证码不能为空'
						return false
					} else {
						obj.valid = true
						obj.errorText = ''
						return true
					}
				},
				password (obj) {
					if (obj.value === '') {
						obj.valid = false
						obj.errorText = '密码不能为空'
						return false
					} else if (!checkPwd(obj.value)) {
						obj.valid = false
						obj.errorText = '密码为6~18位数字字母组合'
						return false
					} else {
						obj.valid = true
						obj.errorText = ''
						return true
					}
				},
				invitor (obj) {
					if (obj.value === '') {
						obj.valid = true
						obj.errorText = ''
						return true
					} else if (!checkPwd(obj.value)) {
						obj.valid = false
						obj.errorText = '手机号码格式不正确'
						return false
					} else {
						obj.valid = true
						obj.errorText = ''
						return true
					}
				}
			},
		}
	},
	methods: {
		phoneChange () {
			return this.rules.phone(this.form.phone)
		},
		valiCodeChange () {
			return this.rules.valiCode(this.form.valiCode)
		},
		passwordChange () {
			return this.rules.password(this.form.password)
		},
		invitorChange () {
			return this.rules.invitor(this.form.invitor)
		},
		next () {
			if (this.form.phone.valid) {
				this.step = 2
			} else{
				this.rules.phone(this.form.phone)
			}
		},
		regist () {
			if (this.rules.valiCode(this.form.valiCode) && this.rules.password(this.form.password) && (this.form.invitor.valid || this.rules.invitor(this.form.invitor))) {
				alert('注册成功')
			}
		},
		pwdOpenChange () {
			console.log(14)
			this.pwdOpen = !this.pwdOpen
			this.pwpType = this.pwdOpen ? 'text' : 'password'
		}
	},
	mounted () {
		let invitor = this.$route.params.invitor
		console.log(invitor)
		if (!!invitor) {
			this.form.invitor.value = invitor
			this.form.invitor.valid = true
			this.invitorHide = true
		}
	}
}
</script>

<style scoped="scoped" lang="less">
@import url('../../config/base.less');
.agree-check{
	transform: scale(.7);
}
.market-waring{
	display: block;
	text-align: center;
	margin-top: 1rem;
}
.waring-link{
	color: #40c4ff;
}
.waring-msg{
	vertical-align: .6em;
}
.waring{
	width: 80%;
	margin-top: .2rem;
	margin-left: auto;
	margin-right: auto;
	font-size: 12px;
}
.eye.eye-open{
	background-image: url(../../assets/icon/eye-open.png);
}
.eye{
	position: absolute;
	right: .2rem;
	top: .3rem;
	width: .4rem;
	height: .27rem;
	background-image: url(../../assets/icon/eye-close.png);
	background-size: contain;
	background-repeat: no-repeat;
	
}
.invitor-arrow.open{
	transform: rotateZ(-90deg);
}
.invitor-arrow{
	transition: transform .3s;
	position: absolute;
	right: 0.1rem;
	top: -.2rem;
	font-size: 0.5rem;
	color: rgba(0, 0, 0, 0.38);
}
.send-valid{
	position: absolute;
	top: 0.25rem;
	right: 0;
	color: rgba(0, 0, 0, 0.38);
	text-indent: .5em;
	border-left: 1px solid rgba(0, 0, 0, 0.38);
}
.form-two{
	margin-top: 20px;
}
.rigist-item-wrap.hidden{
	display: none;
}
.rigist-item-wrap{
	position: relative;
}
.regist-page{
	width: 100%;
	overflow: hidden;
	background-image: url('@{image}/login-regist/regist-bg.jpg');
	background-size: cover;
}
.to-login{
	display: block;
	text-align: center;
	margin-top: .3rem;
}
.next{
	width: 80%;
	height: 45px;
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
.logo.hidden{
	display: none;
}
.regist-item{
	width: 100%;
}
.form-one{
	margin-top: 20px;
}
.regist-form{
	width: 80%;
	margin-top: .5rem;
	margin-left: auto;
	margin-right: auto;
}
.logo{
	display: block;
	margin-left: auto;
	margin-right: auto;
	margin-top: .9rem;
	width: 115px;
}
.gift{
	display: block;
	text-align: center;
	font-size: 16px;
	margin-top: 20px;
	letter-spacing: .2em;
}
.value{
	color: #f25159;
	font-size: 20px;
	margin: 0 .6em;
}
</style>
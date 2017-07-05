<template>
	<div class="clearfix regist-page" :style="fullHeightStyle">
		<img :class="{hidden: logoHidden}" class="logo" src="../../assets/icon/spa-logo.png"/>
		<span class="gift" v-for="item in gifts">注册即送<span class="value">{{item.value}}</span>{{item.type}}</span>
		<div v-if="step === 1" class="regist-form form-one">
			<mu-text-field hintText="手机号码" v-model="form.phone.value" type="number" :maxLength="11" @input="vali(form, rules, 'phone')" class="regist-item" 
				 inputClass="regist-item-input" hintTextClass="regist-item-tips" :errorText="form.phone.errorText"  />
		</div>
		<div v-if="step === 2" class="regist-form form-two">
				<div class="rigist-item-wrap">
					<mu-text-field hintText="真实姓名" type="text" v-model="form.name.value" class="regist-item" @input="vali(form, rules, 'name')" @focus="scrollChange($event)"
						hintTextClass="regist-item-tips" inputClass="regist-item-input" :errorText="form.name.errorText"  />
					<div v-show="form.name.value.length > 0" class="input-clear"  @click="form.name.value = ''"></div>
				</div>
				<div class="rigist-item-wrap">
					<mu-text-field hintText="身份证号" type="text" v-model="form.idCard.value" class="regist-item" @input="vali(form, rules, 'idCard')"  @focus="scrollChange($event)"
						hintTextClass="regist-item-tips" inputClass="regist-item-input" :errorText="form.idCard.errorText"  />
					<div v-show="form.idCard.value.length > 0" class="input-clear"  @click="form.idCard.value = ''"></div>
				</div>
				<div class="rigist-item-wrap">
					<mu-text-field hintText="密码" :type="pwpType" v-model="form.password.value" class="regist-item" @input="vali(form, rules, 'password')"  @focus="scrollChange($event)"
						hintTextClass="regist-item-tips" inputClass="regist-item-input" :errorText="form.password.errorText"  />
					<div class="eye" :class="{'eye-open': pwdOpen}" @click="pwdOpenChange"></div>
				</div>
				<div class="rigist-item-wrap">
					<mu-text-field hintText="验证码" v-model="form.valiCode.value" type="number" class="regist-item" @input="vali(form, rules, 'valiCode')"  @focus="scrollChange($event)"
						hintTextClass="regist-item-tips" inputClass="regist-item-input" :errorText="form.valiCode.errorText"  />
					<span class="send-valid" @click="next">{{text}}</span>
				</div>
				<div class="rigist-item-wrap" :class="{hidden: invitorHide}">
					<mu-text-field v-if="invitorOpen" hintText="推荐人" type="number" v-model="form.invitor.value" class="regist-item"  @input="vali(form, rules, 'invitor')"
						hintTextClass="regist-item-tips" inputClass="regist-item-input" :errorText="form.invitor.errorText"  />
					<svg class="iconfont invitor-arrow" :class="{open: invitorOpen}" aria-hidden="true" @click="invitorOpen = !invitorOpen">
					    <use xlink:href="#icon-back"></use>
					</svg>
				</div>
		</div>
		<div class="waring" v-if="step === 2">
			 <mu-checkbox label="" v-model:value="agreeAgreement" class="demo-checkbox agree-check"/> <span class="waring-msg">同意<span class="waring-link" @click="agreeDialog = true">《用户协议》</span></span>
		</div>
		<button v-if="step === 1" class="next" @click="next">下一步</button>
		<button v-if="step === 2" class="next" @click="formSubmit(form, rules)">立即注册</button>
		<router-link class="to-login"  to="/app">已有账号，立即登录</router-link>
		<span class="market-waring">
			<svg class="iconfont download-icon"  aria-hidden="true">
			    <use xlink:href="#icon-sm-ok"></use>
			</svg>
			市场有风险，投资需谨慎
		</span>
		<mu-dialog :open="agreeDialog" @close="agreeDialog = false" title="余惠宝注册服务协议"  :scrollable="false" >
			<div style="width: 100%;height: 10rem;overflow: auto;">
				<Agreement/>
			</div>
		</mu-dialog>
		
	</div>
</template>

<script>
import {checkNotNull, checkPhone, checkInvitorPhone, checkIdcard, checkPwd, validate, resultMerge} from '@/tool/regx'
import {notice} from '@/tool/talk'
import Agreement from '@/components/pure/regist/Agreement'

	function getTop(e){
		var offset=e.offsetTop;
		if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
		return offset;
	}
export default {
	data () {
		return {
			fullHeightStyle: {
		  		'min-height': document.documentElement.clientHeight + 'px'
		    },
			logoHidden: false,
			pwpType: 'password',
			pwdOpen: false,
			invitorOpen: false,
			invitorHide: false,
			agreeDialog: false,
			agreeAgreement: false,
			clock: null,
			height: 0,
			windowHeight: 0,
			elementHeight: 0,
			form: {
				phone: {
					value: '',
					errorText: '',
					bool: false
				},
				valiCode: {
					value: '',
					errorText: '',
					bool: false
				},
				password: {
					value: '',
					errorText: '',
					bool: false
				},
				name: {
					value: '',
					errorText: '',
					bool: false
				},
				idCard: {
					value: '',
					errorText: '',
					bool: false
				},
				invitor: {
					value: '',
					errorText: '',
					bool: true
				}
			},
			rules: {
				phone: [
					{ check: checkNotNull, message: '电话号码不能为空' },
					{ check: checkPhone, message: '电话号码格式不正确' },
				],
				valiCode: [
					{ check: checkNotNull, message: '验证码不能为空' },
				],
				name: [
					{ check: checkNotNull, message: '真实姓名不能为空' },
				],
				idCard: [
					{ check: checkNotNull, message: '身份证号码不能为空' },
					{ check: checkIdcard, message: '身份证号码格式不正确' },
				],
				password: [
					{ check: checkNotNull, message: '密码不能为空' },
					{ check: checkPwd, message: '密码为6~18位数字字母组合' },
				],
				invitor: [
					{ check: checkInvitorPhone, message: '邀请人手机号格式不正确' },
				]
			},
		}
	},
	computed: {
		text () {
			return this.$store.state.regist.text
		},
		step () {
			return this.$store.state.regist.step
		},
		gifts () {
			return this.$store.state.regist.gifts
		}
	},
	methods: {
		vali (form, rules, field) {
			  validate(form, rules, field) 
		},
		async formSubmit (form, rules) {
			if (await resultMerge(form, rules)) {
				let obj = {
					phone: this.form.phone.value,
					code: this.form.valiCode.value,
					name: this.form.name.value,
					idCard: this.form.idCard.value,
					password: this.form.password.value,
					invitor: this.form.invitor.value,
					type: 'H5'
				}
				if (this.agreeAgreement) {
					this.$store.dispatch('registSubmit', obj)
				} else{
					notice('请仔细阅读并同意用户协议')
				}
				
			}
		},
		async next () {
			if (this.form.phone.bool || await validate(this.form, this.rules, 'phone') ) {
				this.$store.dispatch('registSendCode',{phone: this.form.phone.value})
			}
		},
		pwdOpenChange () {
			this.pwdOpen = !this.pwdOpen
			this.pwpType = this.pwdOpen ? 'text' : 'password'
		},
		scrollChange (e) {
			let elementHeight = getTop(e.target)
			setTimeout(function () {
				window.scrollTo(0, elementHeight -document.documentElement.clientHeight / 2 + 10 )
			}, 500)
		}
	},
	mounted () {
		let invitor = this.$route.params.invitor
		if (!!invitor && checkInvitorPhone(invitor)) {
			this.form.invitor.value = invitor
			this.form.invitor.valid = true
			this.invitorHide = true
		}
		if (this.$store.state.regist.origin === 1) {
			this.form.phone.value = this.$store.state.regist.phone
			this.form.phone.bool = true
		}
	},
	destroyed () {
		this.$store.dispatch('registInit', 1)
		this.$store.dispatch('registOrigin', 0)
	},
	components: {
		Agreement
	}
}
</script>

<style type="text/css">
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
	width: 0.533333rem;
	height: 0.4rem;
	background-image: url(../../assets/icon/eye-close.png);
	background-size: contain;
	background-repeat: no-repeat;
}
.input-clear{
	position: absolute;
	width: 0.586666rem;
	height: 0.586666rem;
	right: .2rem;
	top: .2rem;
	background-image: url(../../assets/icon/close.png);
	background-size: contain;
	
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
	background-image: url(../../../static/img/regist-bg.jpg);
	background-size: cover;
}
.to-login{
	display: block;
	text-align: center;
	margin-top: .8rem;
	font-size: 0.373333rem;
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
	text-align: center;
	font-size: 0.4rem;
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
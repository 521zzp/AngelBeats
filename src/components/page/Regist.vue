<template>
	<div class="clearfix regist-page" :style="fullHeightStyle">
		<img :class="{hidden: logoHidden}" class="logo" src="../../assets/icon/spa-logo.png"/>
		<span class="gift" v-for="item in gifts">注册即送<span class="value">{{item.value}}</span>{{item.type}}</span>
		<div v-if="step === 1" class="regist-form form-one">
			<div class="rigist-item-wrap">
				<mu-text-field hintText="手机号码" v-model="formOne.phone.value" type="number" :maxLength="11" @input="vali(formOne, rules, 'phone')" class="regist-item" @focus="scrollChange($event)"
				 inputClass="regist-item-input" hintTextClass="regist-item-tips" :errorText="formOne.phone.errorText"  />
			</div>
			<div class="rigist-item-wrap">
				<mu-text-field hintText="密码" :type="pwpType" v-model="formOne.password.value" class="regist-item" @input="vali(formOne, rules, 'password')"  @focus="scrollChange($event)"
					hintTextClass="regist-item-tips" inputClass="regist-item-input" :errorText="formOne.password.errorText"  />
				<div class="eye" :class="{'eye-open': pwdOpen}" @click="pwdOpenChange"></div>
			</div>
			<div class="rigist-item-wrap" v-if="picNeed">
				<mu-text-field hintText="图形验证码" v-model="formOne.picCode.value" type="number" class="regist-item" @input="vali(formOne, rules, 'picCode')"  @focus="scrollChange($event)"
					hintTextClass="regist-item-tips" inputClass="regist-item-input" :errorText="formOne.picCode.errorText"  />
				<img class="img-Vali" :src="imgCodeSrc" @click="imgRefresh" alt="点击更新" title="点击更新" />
			</div>
			<div class="rigist-item-wrap">
				<mu-text-field hintText="手机验证码" v-model="formOne.valiCode.value" type="number" class="regist-item" @input="vali(formOne, rules, 'valiCode')"  @focus="scrollChange($event)"
					hintTextClass="regist-item-tips" inputClass="regist-item-input" :errorText="formOne.valiCode.errorText"  />
				<span class="send-valid" @click="sendCode">{{text}}</span>
			</div>
		</div>
		<div v-if="step === 2" class="regist-form form-two">
				<div class="rigist-item-wrap">
					<mu-text-field hintText="真实姓名" type="text" v-model="formTwo.name.value" class="regist-item" @input="vali(formTwo, rules, 'name')" @focus="scrollChange($event)"
						hintTextClass="regist-item-tips" inputClass="regist-item-input" :errorText="formTwo.name.errorText"  />
					<div v-show="formTwo.name.value.length > 0" class="input-clear"  @click="formTwo.name.value = ''"></div>
				</div>
				<div class="rigist-item-wrap">
					<mu-text-field hintText="身份证号" type="text" v-model="formTwo.idCard.value" class="regist-item" @input="vali(formTwo, rules, 'idCard')"  @focus="scrollChange($event)"
						hintTextClass="regist-item-tips" inputClass="regist-item-input" :errorText="formTwo.idCard.errorText"  />
					<div v-show="formTwo.idCard.value.length > 0" class="input-clear"  @click="formTwo.idCard.value = ''"></div>
				</div>
				<div class="rigist-item-wrap" :class="{hidden: invitorHide}">
					<mu-text-field v-if="invitorOpen" hintText="推荐人" type="number" v-model="formTwo.invitor.value" class="regist-item"  @input="vali(formTwo, rules, 'invitor')"
						hintTextClass="regist-item-tips" inputClass="regist-item-input" :errorText="formTwo.invitor.errorText"  />
					<svg class="iconfont invitor-arrow" :class="{open: invitorOpen}" aria-hidden="true" @click="invitorOpen = !invitorOpen">
					    <use xlink:href="#icon-back"></use>
					</svg>
				</div>
		</div>
		<div class="waring" v-if="step === 2">
			 <mu-checkbox label="" v-model:value="agreeAgreement" class="demo-checkbox agree-check"/> <span class="waring-msg">同意<span class="waring-link" @click="agreeDialog = true">《用户协议》</span></span>
		</div>
		<button v-if="step === 1" class="next" @click="next(formOne, rules)">下一步</button>
		<button v-if="step === 2" class="next" @click="formSubmit(formTwo, rules)">立即注册</button>
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
import {postModelTwo, analy} from '@/tool/net'
import Agreement from '@/components/pure/regist/Agreement'
import {BASEURL, REGIST_PIC_VALIDATE} from '@/config/url'
import store from '@/store'

function getTop(e){
	var offset=e.offsetTop;
	if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
	return offset;
}
/*
 * 异步验证验证码是否正确
 */
const checkPicCodeAsync = async (value) => {
	let timeStamp = store.state.regist.timeStamp
	if (value.length === 4) {
		try{
			const datas = await fetch(REGIST_PIC_VALIDATE, postModelTwo({picCode: value, timeStamp: timeStamp})).then(analy)
			return datas.code === 200
		}catch(e){
			return false
		}
	} else{
		return false
	}
};
export default {
	data () {
		
		return {
			fullHeightStyle: {
		  		'min-height': document.documentElement.clientHeight + 'px'
		    },
		    imgCodeSrc: BASEURL + '/captcha.svl', //图形验证码地址
		    imgCodeTimeStamp: '',
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
			formOne: {
				phone: {
					value: '',
					errorText: '',
					bool: false
				},
				picCode: {
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
			},
			formTwo: {
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
			/*rules:  */
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
		},
		picNeed () {
			return this.$store.state.regist.picCodeFlag
		},
		rules () {
			return {
				phone: [
					{ check: checkNotNull, message: '电话号码不能为空' },
					{ check: checkPhone, message: '电话号码格式不正确' },
				],
				valiCode: [
					{ check: checkNotNull, message: '验证码不能为空' },
				],
				picCode: this.picNeed ? [
					{ check: checkNotNull, message: '图形验证码不能为空' },
					{ check: checkPicCodeAsync, message: '图形验证码不正确' },
				] : [],
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
			}
		}
	},
	methods: {
		vali (form, rules, field) {
			  validate(form, rules, field) 
		},
		async formSubmit (form, rules) {
			if (await resultMerge(form, rules)) {
				let obj = {
					phone: this.formOne.phone.value,
					code: this.formOne.valiCode.value,
					password: this.formOne.password.value,
					name: this.formTwo.name.value,
					idCard: this.formTwo.idCard.value,
					invitor: this.formTwo.invitor.value,
					type: 'H5'
				}
				if (this.agreeAgreement) {
					this.$store.dispatch('registSubmit', obj)
				} else{
					notice('请仔细阅读并同意用户协议')
				}
				
			}
		},
		async next (form, rules) {
			if (await resultMerge(form, rules)) {
				this.$store.dispatch('registInit', 2)
				let obj = {
					phone : this.formOne.phone.value,
					code: this.formOne.valiCode.value,
				}
				this.$store.dispatch('registNext', obj)
			}
			
			/*if (this.form.phone.bool || await validate(this.form, this.rules, 'phone') ) {
				this.$store.dispatch('registSendCode',{phone: this.form.phone.value})
			}*/
		},
		async sendCode () {
			if (this.formOne.phone.bool || await validate(this.formOne, this.rules, 'phone') ) {
				if (this.formOne.picCode.bool || await validate(this.formOne, this.rules, 'picCode') ) {
					console.log('this.formOne.picCode.bool ')
					console.log(this.formOne.picCode.bool )
					this.$store.dispatch('registSendCode',{phone: this.formOne.phone.value})
				}
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
		},
		imgRefresh () {
			let timeStamp = new Date()*1
			this.$store.dispatch('registPicTime', timeStamp)
        	this.imgCodeSrc = BASEURL + '/captcha.svl?t=' + timeStamp
        }
	},
	mounted () {
		this.imgRefresh()
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
.img-Vali{
	position: absolute;
	right: 0;
	top: 0.25rem;
	width: 25%;
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
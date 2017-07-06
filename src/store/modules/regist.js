import * as types from '../mutation-types'
import {REGIST_SUBMIT, REGIST_CODE, REGIST_GIFTS, REGIST_PHONE_CODE_VALI } from '@/config/url'
import {postModelTwo, getModel, analy} from '@/tool/net'
import {feedback} from '@/tool/talk'
import store from '@/store'
import router from '@/router'
const state = {
	step: 1,
	text: '发送验证码',
	sendAbel: true,
	clock: null,
	gifts: [],
	origin: 0, //0表示直接注册页面发生验证码的，1表示从新手礼包领取过来
	phone: '', //手机号码临时存储
	picCodeFlag: false, //是否开启验证码
	timeStamp: '', //图形验证码时间戳
}

const actions = {
	async registSendCode ({commit},obj){
		if (state.sendAbel) {
			state.sendAbel = false
			fetch(REGIST_CODE, postModelTwo(obj)).then(analy)
				.then((datas)=>{
					if (datas.code === 200){
						feedback('ok', datas.message)
						if (state.origin === 1) {
							state.phone = obj.phone
							router.push('/regist')
						}
						let time = 60
						state.text = time + 's后重新发送'
						state.clock = setInterval(function () {
							time--
							state.text = time + 's后重新发送'
							if(time==0){
								state.text = '发送验证码'
								clearInterval(state.clock)
								state.sendAbel = true
							}
						},1000)
					}else{
						feedback('waring', datas.message)
						clearInterval(state.clock)
						state.text = '发送验证码'
						state.sendAbel = true
					}
			}).catch(function(error) {
				console.log('网络异常')
				feedback('error', '网络异常')
				state.sendAbel = true;
			  })
		}
  	},
  	registInit ({commit}, obj){
  		commit('REGIST_INIT', obj)
  	},
  	registSubmit ({commit}, obj) {
  		fetch(REGIST_SUBMIT, postModelTwo(obj)).then(analy).then(
  			(datas) => {
  				if(datas.code === 200){
  					feedback('ok', datas.message)
  					router.push('/app')
  				} else {
  					feedback('error', datas.message)
  				}
  			}
  		).catch(function(error){
  			feedback('error','网络异常')
  		})
  	},
  	registGifts ({commit}, obj){
  		fetch(REGIST_GIFTS, getModel()).then(analy).then(
  			(datas) => {
  				commit('REGIST_GIFTS', datas)
  			}
  		).catch(function(error){
  			feedback('error','网络异常')
  		})
  	},
  	registOrigin ({commit}, obj) {
  		commit('REGIST_ORIGIN', obj)
  	},
  	async registPicCodeFlag ({commit}, obj) {
  		var falg = await fetch(REGIST_PIC_SWITCH, getModel()).then(analy).then(
	  			(datas) => {
	  				return data;
	  			}
	  		).catch(function(error){
	  			feedback('error','网络异常')
	  		})
	  	if (falg !== undefined) {
	  		commit('REGIST_PIC_SWITCH', falg)
	  	}
  	},
  	registPicTime ({commit}, obj) {
  		commit('REGIST_PIC_TIME', obj)
  	},
  	registNext({commit}, obj) {
  		fetch(REGIST_PHONE_CODE_VALI, postModelTwo(obj)).then(analy).then(
  			(datas) => {
  				if (datas.code === 200) {
  					commit('REGIST_INIT', 2)
  				} else {
  					feedback('error',datas.message)
  				}
  			}
  		).catch(function(error){
  			feedback('error','网络异常')
  		})
  	}
  	
}

const mutations = {
	[types.REGIST_STEP] (state,obj) {
		state.step = obj;
    },
    [types.REGIST_INIT] (state,obj) {
		state.step = obj;
    },
    [types.REGIST_GIFTS] (state,obj) {
		state.gifts = obj;
    },
    [types.REGIST_ORIGIN] (state,obj) {
		state.origin = obj;
    },
    [types.REGIST_PIC_SWITCH] (state,obj) {
		state.picCodeFlag = obj;
    },
    [types.REGIST_PIC_TIME] (state,obj) {
		state.timeStamp = obj;
    },
	
}


export default{
	state,
	actions,
	mutations
}

import * as types from '../mutation-types'
import {REGIST_SUBMIT, REGIST_CODE, REGIST_GIFTS } from '@/config/url'
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
	phone: '' //手机号码临时存储
	
}

const actions = {
	registSendCode ({commit},obj){
		if (state.sendAbel) {
			state.sendAbel = false
			fetch(REGIST_CODE, postModelTwo(obj)).then(analy)
				.then((datas)=>{
					if (datas.result){
						feedback('ok', datas.msg)
						if (state.origin === 1) {
							state.phone = obj.phone
							router.push('/regist')
						}
						commit('REGIST_STEP', 2)
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
						feedback('waring', datas.msg)
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
  				if(datas.result){
  					feedback('ok', datas.msg)
  					router.push('/app')
  				} else {
  					feedback('error', datas.msg)
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
	
}


export default{
	state,
	actions,
	mutations
}

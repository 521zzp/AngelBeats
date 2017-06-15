import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'
import {actions} from './actions'
import {mutations} from './mutations'
/*import login from './modules/login'*/


Vue.use(Vuex)
let token = '';
let user = null;

try{
	token = localStorage.getItem('token');
	user = JSON.parse(localStorage.getItem('user'));
}catch(e){
	token = '';
	user = null;
}

const store = new Vuex.Store({
	state: {
		token:token, //user online state
		user: user ? user : {
			name: '音无结弦',
			img: '//i0.hdslb.com/bfs/face/121922b3ec1235997d5611f826e19faf31bd6d40.jpg_52x52.jpg',
		},
		trade: false, //平台是否开启交易
		loading: false, //全局加载中
		notice: {
			state: 1,
			config: null
		},
		feedback: {
			state: 1,
			config: null
		},
		simpleDialog: {
			state: 1,
			config: {
				title: '',
				content: '',
				onOk: () => {}
			}
		},
		confirmDialog: {
			state: 1,
			config: {
				title: '',
				content: '',
				onOk: () => {},
				onCancel: () => {}
			}
		},
	},
	mutations,
	actions,
	modules: {
	}
})

export default store

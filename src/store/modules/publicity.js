import * as types from '../mutation-types'
import {LOGIN, PUB_NEWS_DETAILS, PUB_NEWS_TOTAL, PUB_NEWS_LIST, PUB_ANNOUNCEMENT_TOTAL, PUB_ANNOUNCEMENT_LIST, PUB_ANNOUNCEMENT_DETAILS} from '@/config/url'
import {postModelTwo, getModel, analy} from '@/tool/net'
import {message} from '@/tool/talk'
import store from '@/store'
import router from '@/router'

const state = {
	bread: [], //面包屑导航
	navOpen: 1,
	newsDetails : {
		title: '', //新闻标题
		origin: '余惠宝', //来源
		time: '', //发布时间
		content: '', //内容，带标签的文本
		previous: {  //上一条新闻
			title:'',  //新闻标题
			id: '',   //新闻Id
		},
		next: {  //下一条新闻
			title: '', //新闻标题
			id: '', //新闻Id
		}
	},
	announcementDetails: {
		title: '', //公告标题
		origin: '余惠宝', //来源
		time: '', //发布时间
	    id: '', //公告id
	    previous: {  //上一条新闻
			title:'',  //新闻标题
			id: '',   //新闻Id
		},
		next: {  //下一条新闻
			title: '', //新闻标题
			id: '', //新闻Id
		}
	},
	newsTotal: 0,
	newsList: [],
	announcementTotal: 0,
	announcementList: []
	
}

const actions = {
	publicityBreadChange ({commit}, obj) {
		commit(types.PUB_BREAD_CHANGE, obj) 
	},
	publicityNavChange ({commit}, obj) {
		commit(types.PUB_NAV_CHANGE, obj)
	},
	publicityNewsDetails ({commit}, obj) {
		fetch(PUB_NEWS_DETAILS, postModelTwo(obj)).then(analy).then(
			(datas) => commit(types.PUB_NEWS_DETAILS, datas)
		)
	},
	publicityNewsTotal ({commit}, obj) {
		fetch(PUB_NEWS_TOTAL, getModel()).then(analy).then(
			(datas) => commit(types.PUB_NEWS_TOTAL, datas)
		)
	},
	publicityNewsList ({commit}, obj) {
		fetch(PUB_NEWS_LIST, postModelTwo(obj)).then(analy).then(
			(datas) => commit(types.PUB_NEWS_LIST, datas)
		)
	},
	publicityAnnouncementDetails ({commit}, obj) {
		fetch(PUB_ANNOUNCEMENT_DETAILS, postModelTwo(obj)).then(analy).then(
			(datas) => commit(types.PUB_ANNOUNCEMENT_DETAILS, datas)
		)
	},
	publicityAnnouncementTotal ({commit}, obj) {
		fetch(PUB_ANNOUNCEMENT_TOTAL, getModel()).then(analy).then(
			(datas) => commit(types.PUB_ANNOUNCEMENT_TOTAL, datas)
		)
	},
	publicityAnnouncementList ({commit}, obj) {
		fetch(PUB_ANNOUNCEMENT_LIST, postModelTwo(obj)).then(analy).then(
			(datas) => commit(types.PUB_ANNOUNCEMENT_LIST, datas)
		)
	},
}

const mutations = {
	[types.PUB_BREAD_CHANGE] (state,obj) {
		state.bread = obj
    },
    [types.PUB_NAV_CHANGE] (state,obj) {
		state.navOpen = obj
    },
    [types.PUB_NEWS_DETAILS] (state,obj) {
		state.newsDetails = obj
    },
    [types.PUB_NEWS_TOTAL] (state,obj) {
		state.newsTotal = obj.total
    },
    [types.PUB_NEWS_LIST] (state,obj) {
		state.newsList = obj
    },
    [types.PUB_ANNOUNCEMENT_DETAILS] (state,obj) {
		state.announcementDetails = obj
    },
    [types.PUB_ANNOUNCEMENT_TOTAL] (state,obj) {
		state.announcementTotal = obj.total
    },
    [types.PUB_ANNOUNCEMENT_LIST] (state,obj) {
		state.announcementList = obj
    },
   
}


export default{
	state,
	actions,
	mutations
}

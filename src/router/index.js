import Vue from 'vue'
import Router from 'vue-router'

const Regist = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['@/components/page/Regist.vue'], () => {
    resolve(require('@/components/page/Regist.vue'))
  })
}
const RegistGift = resolve => {
  require.ensure(['@/components/page/RegistGift.vue'], () => {
    resolve(require('@/components/page/RegistGift.vue'))
  })
}
const AppDownload = resolve => {
  require.ensure(['@/components/page/AppDownload.vue'], () => {
    resolve(require('@/components/page/AppDownload.vue'))
  })
}
const Form = resolve => {
  require.ensure(['@/components/page/Form.vue'], () => {
    resolve(require('@/components/page/Form.vue'))
  })
}



Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
    {
      path: '/regist',
      name: 'Regist',
      component: Regist
    },
    {
      path: '/regist/:invitor',
      component: Regist
    },
    {
      path: '/registGift',
      name: 'registGift',
      component: RegistGift
    },
    {
      path: '/app',
      name: 'appDownload',
      component: AppDownload
    },
  ]
})

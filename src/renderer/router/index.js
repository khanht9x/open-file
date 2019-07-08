import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'open-file',
      component: require('@/components/OpenFile/OpenFile').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

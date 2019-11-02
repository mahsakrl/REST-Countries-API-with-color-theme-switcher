import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => { return import('../views/Home.vue') }
  },
  {
    path: '/country/:countryId',
    name: 'country',
    component: () => { return import('../views/Country') }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

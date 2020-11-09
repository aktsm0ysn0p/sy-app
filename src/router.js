import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/Main/index.vue';
import Stocks from './pages/Main/stocks.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'Home',
    component: Home
  },
  {
    path: '/stocks',
    // name: 'Stocks',
    component: Stocks
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

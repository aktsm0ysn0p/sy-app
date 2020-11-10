import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/Main/index.vue';
import Stocks from './pages/Main/stocks.vue';
import Folders from './pages/Main/folders.vue';
import XFolder from './pages/Main/xfolder.vue';
import nopage from './pages/Main/nopage.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/stocks',
    component: Stocks
  },
  {
    path: '/folders',
    component: Folders,
  },
  {
    path: '/xfolder/:id',
    name: 'xfolder',
    component: XFolder,
  },
  {
    path: '*',
    component: nopage
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

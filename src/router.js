import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/Main/index.vue'
import Stocks from './pages/Main/stocks.vue'
import Folders from './pages/Main/folders.vue'
import XFolder from './pages/Main/xfolder.vue'
import nopage from './pages/Main/nopage.vue'
import Mypage from './pages/Main/mypage.vue'
import SignUp from './pages/Login/signUp'
import SignIn from './pages/Login/signIn'
import Welcome from './pages/Login/welcome'
// import firebase from "firebase/app";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/stocks',
    component: Stocks,
  },
  {
    path: '/folders',
    component: Folders,
  },
  {
    path: '/xfolder/:id',
    name: 'xfolder',
    component: XFolder,
    props: (route) => ({ id: Number(route.params.id) }),

  },
  {
    path: '/mypage',
    component: Mypage
  },
  {
    path: '/welcome',
    component: Welcome
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignUp
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SignIn
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

// router.beforeEach(async (to, from, next) => {
//   const requiresAuth = to.matched.some(recode => recode.meta.requiresAuth);
//   if (requiresAuth && !(await firebase.getCurrentUser())) {
//     next({ path: '/welcome', query: { redirect: to.fullPath } });
//   } else {
//     next();
//   }
// });


export default router

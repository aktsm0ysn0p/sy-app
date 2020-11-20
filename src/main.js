import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
// require('./assets/scss/main.scss')


// import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false
// import firebase from 'firebase';
// const firebaseConfig = {
//   apiKey: "AIzaSyD-nxH3Ll17edrxkmOEPspu7FB6YHsbbII",
//   authDomain: "sy-app-95070.firebaseapp.com",
//   databaseURL: "https://sy-app-95070.firebaseio.com",
//   projectId: "sy-app-95070",
//   storageBucket: "sy-app-95070.appspot.com",
//   messagingSenderId: "335463096329",
//   appId: "1:335463096329:web:d3a1f5de752c0dc38e18d8",
//   measurementId: "G-82DTJLLX63"
// };

// firebase.initializeApp(firebaseConfig);

// sync(store, router);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

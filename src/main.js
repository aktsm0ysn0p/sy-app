import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './assets/scss/main.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import config from './firebase/config'
import Firebase from "firebase/app";

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const firebaseApp = Firebase.initializeApp(config)
const firestore = firebaseApp.firestore()
firestore.settings({ timestampsInSnapshots: true })

Firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(user => {
      unsubscribe()
      resolve(user);
    }, reject);
  });
};
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

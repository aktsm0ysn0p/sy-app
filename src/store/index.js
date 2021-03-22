import Vue from 'vue'
import Vuex from 'vuex'
import Lists from './modules/Lists'
import Stocks from './modules/Stocks'
import Folders from './modules/Folders'
import MyQuotes from './modules/MyQuotes'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Lists: Lists,
    Stocks: Stocks,
    Folders: Folders,
    MyQuotes: MyQuotes
  }

});

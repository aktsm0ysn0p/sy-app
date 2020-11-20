import Vue from 'vue'
import Vuex from 'vuex'
import Lists from './modules/Lists'
import Stocks from './modules/Stocks'
import Folders from './modules/Folders'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Lists: Lists,
    Stocks: Stocks,
    Folders: Folders
  }

});

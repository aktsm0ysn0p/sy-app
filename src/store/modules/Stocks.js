import firestore from '@/firebase/firestore'
// import { find } from 'core-js/core/array';

const myRef = firestore.collection('my').doc("cLME2ZkXIVYpUXb4Ta9w");

export default {
  namespaced: true,
  state() {
    return {
      stocks: [],
    }
  },
  mutations: {
    init(state, payload) {
      state.stocks = payload
    },
    add(state, id) {
      state.stocks.push(id)
    },
    remove(state, id) {
      const index = state.stocks.findIndex(stock => stock === id)
      if (index !== -1) {
        state.stocks.splice(index, 1)
      }
    },
    update(state, newStocks) {
      state.stocks = newStocks
    },

  },
  getters: {
    stocks(state) {
      return state.stocks
    },
  },
  actions: {
    //初期化
    clear({ commit }) {
      commit('init', [])
    },
    //firestoreからストック入手
    start({ commit }) {
      myRef.get().then(doSnapshot => {
        const payload = doSnapshot.data().stocks;
        commit('init', payload)
      }).catch(e => console.log(e))
    },
    addData({ state, commit }, id) {
      const n = state.stocks.slice()
      n.push(id)
      myRef.update(
        {
          stocks: n
        }
      ).then(() => {
        commit('add', id)
      }).catch(e => console.log(e))
    },
    clickdeleData({ state, commit }, id) {
      const n = state.stocks.filter(stock => stock !== id)
      myRef.update(
        {
          stocks: n
        }
      ).then(() => {
        commit('remove', id)
      }).catch(e => console.log(e))
    },
    deleData({ state, commit }, deleArry) {
      const arr01 = [...new Set(state.stocks)],
            arr02 = [...new Set(deleArry)]
      const newStockArray = [...arr01, ...arr02].filter(value => !arr01.includes(value) || !arr02.includes(value))
      myRef.update(
        {
          stocks: newStockArray
        }
      ).then(() => {
        commit('update', newStockArray)
      }).catch(e => console.log(e))
    },
    deleMyQuote({ state, dispatch }, deleArray) {
      const sameStocks = [...new Set(state.stocks)].filter(value => deleArray.includes(value))
      if (!sameStocks.length) {
        console.log('この名言はストックにないよ')
        return
      }
      dispatch('deleData', sameStocks)
    }
  },
}

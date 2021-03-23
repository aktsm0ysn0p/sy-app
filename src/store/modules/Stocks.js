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
      console.log('stocks 2 fin')
      console.log(state.stocks)
    },
    update(state, newStocks) {
      state.stocks = newStocks
    }
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
    // deleData({ state, commit }, id) {
    //   const n = state.stocks.filter(stock => stock !== id)
    //   console.log(n)
    //   console.log('↑n')
    //   myRef.update(
    //     {
    //       stocks: n
    //     }
    //   ).then(() => {
    //     commit('remove', id)
    //   }).catch(e => console.log(e))
    // },
    deleData2({ state, commit }, deleArry) {
      const arr01 = [...new Set(state.stocks)],
            arr02 = [...new Set(deleArry)]
      const newStockArray = [...arr01, ...arr02].filter(value => !arr01.includes(value) || !arr02.includes(value))
      console.log(newStockArray)
      myRef.update(
        {
          stocks: newStockArray
        }
      ).then(() => {
        commit('update', newStockArray)
      }).catch(e => console.log(e))
    },
    deleMyQuote({ state, commit }, id) {
      const copySample = state.stocks.slice()
      const sample = copySample.find(stock => stock === id)
      if (typeof sample === undefined) {
        console.log('この名言はストックにないよ')
        return
      }
      const n = state.stocks.filter(stock => stock !== id)
      myRef.update(
        {
          stocks: n
        }
      ).then(() => {
        console.log('Stocks 1')
        commit('remove', id)
      })
    }
  },
}

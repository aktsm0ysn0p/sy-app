import firestore from '@/firebase/firestore'

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
  },

  getters: {
    getterStocks(state) {
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
    //
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

    deleData({ state, commit }, id) {
      const n = state.stocks.filter(stock => stock !== id)
      myRef.update(
        {
          stocks: n
        }
      ).then(() => {
        commit('remove', id)
      }).catch(e => console.log(e))
    },


  },




}

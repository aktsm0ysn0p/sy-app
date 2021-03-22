import firestore from '@/firebase/firestore'

const listsRef = firestore.collection('lists');

export default {
  namespaced: true,
  // unsubscribe: null,
  state() {
    return {
      lists: []
    }
  },
  mutations: {
    init(state, payload) {
      state.lists = payload
    },
    fetchLists(state) {
      listsRef.orderBy('lid').get().then(snapshot => {
        snapshot.forEach(doc => {
          state.lists.push(doc.data())
        })
      }).catch(e => console.log(e))
    },
  },
  getters: {
    lists(state) {
      return state.lists
    },
    lastIdNum(state) {
      const copylists = state.lists.slice()
      let lastNum = copylists[state.lists.length - 1]
      let copy = lastNum.lid + 1

      return copy
    }
  },
  actions: {
    clear({ commit }) {
      commit('init', [])
    },
    start({ commit }) {
      commit('fetchLists')
    },
    addList({ state, commit }, {quoteTitle, quoteName}) {
      const copylists = state.lists.slice()
      let picQuote = copylists[state.lists.length - 1]
      let nextNum = picQuote.lid + 1
      listsRef.add({
        lid: nextNum,
        title: quoteTitle,
        name: quoteName
      }).then(() => {
        commit('init', [])
      }).then(() => {
        commit('fetchLists')
      })
    }
  },


}

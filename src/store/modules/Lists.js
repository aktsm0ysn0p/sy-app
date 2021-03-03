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
    getterLists(state) {
      return state.lists
    },
  },
  actions: {
    clear({ commit }) {
      commit('init', [])
    },
    start({ commit }) {
      commit('fetchLists')
    }
  },


}

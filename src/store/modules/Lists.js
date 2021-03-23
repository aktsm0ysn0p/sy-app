import firestore from '@/firebase/firestore'
const listsRef = firestore.collection('lists')

export default {
  namespaced: true,
  state() {
    return {
      lists: [],
      targetDocId: ''
    }
  },
  mutations: {
    init(state, payload) {
      state.lists = payload
      console.log('Listes 3')
    },
    fetchLists(state) {
      listsRef.orderBy('lid').get().then(snapshot => {
        snapshot.forEach(doc => {
          state.lists.push(doc.data())
        })
        console.log('listes 4 fin')
      }).catch(e => console.log(e))
    },
    initTargetDocId(state, payload) {
      state.targetDocId = payload
      console.log('lists 1')
    },
    add(state, payload) {
      state.lists.push(payload)
    },
    remove(state, id) {
      const index = state.lists.findIndex(list => list.lid === id)
      if (index !== -1) {
        state.lists.splice(index, 1)
      }
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
        const n = {
          lid: nextNum,
          title: quoteTitle,
          name: quoteName
        }
        commit('add', n)
      }).catch(e => console.log(e))
    },
    deleList({ state, commit }, id) {
      listsRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.data().lid === id) {
            const targetDocId = doc.id
            commit('initTargetDocId', targetDocId)
          }
        })
      }).then(() => {
        listsRef.doc(state.targetDocId).delete()
      }).then(() => {
        commit('remove', id)
      }).catch(e => console.log(e))
    },
  },
}


    // addList({ state, commit, dispatch }, {quoteTitle, quoteName}) {
    //   const copylists = state.lists.slice()
    //   let picQuote = copylists[state.lists.length - 1]
    //   let nextNum = picQuote.lid + 1
    //   listsRef.add({
    //     lid: nextNum,
    //     title: quoteTitle,
    //     name: quoteName
    //   }).then(() => {
    //     commit('init', [])
    //   }).then(() => {
    //     commit('fetchLists')
    //   }).then(() => {
    //     dispatch('MyQuotes/addQuote2', state.lastIdNum, { root: true })
    //   }).catch(e => console.log(e))
    // },

import firestore from '@/firebase/firestore'

const myRef = firestore.collection('my').doc("cLME2ZkXIVYpUXb4Ta9w");

export default {
  namespaced: true,
  // unsubscribe: null,
  state() {
    return {
      folders: [],
      newfolder: '',
    }
  },
  mutations: {
    init(state, payload) {
      state.folders = payload
    },
    setText(state, value) {
      state.newfolder = value
    },
    add(state, n) {
      state.newfolder = ''
      state.folders.push(n)
    },
    remove(state, id) {
      const index = state.stocks.findIndex(stock => stock === id)
      if (index !== -1) {
        state.stock.splice(index, 1)
      }
    },
  },
  getters: {
    getterFolders(state) {
      return state.folders
    },
  },
  actions: {
    //初期化
    clear({ commit }) {
      commit('init', [])
    },
    //firestoreからfolders入手
    start({ commit, state }) {
      myRef.get().then(doSnapshot => {
        const payload = doSnapshot.data().folders;
        commit('init', payload)
        state.newfolder = ''
      }).catch(e => console.log(e))
    },
    //
    addData({ state, dispatch }) {
      let text = state.newfolder && state.newfolder.trim();
      if (!text) {
        return
      }
      let id;
      if (!state.folders.length) {
        id = 1
      } else {
        id = state.folders.slice(-1)[0].fid + 1
      }
      const n = {
        fid: id,
        title: state.newfolder,
        stocks: []
      }
      const copy = state.folders.slice()
      copy.push(n)
      myRef.update(
        {
          folders: copy
        }
      ).then( () => {
        dispatch('start')
      }).catch(e => console.log(e))
    },
    addFolderStock({state, dispatch}, {myfolderId, addStockId}) {
      state.folders.forEach((folder, index) => {
        if (folder.fid === myfolderId) {
          const f = addStockId;
          state.folders[index].stocks.push(f)
          const copy = state.folders.map(c => ({ ...c }))
          myRef.update(
            {
              folders: copy
            }
          ).then(() => {
            dispatch('start')
          }).catch(e => console.log(e))
        }
      });
    },
    deleFolderStock({ state, dispatch }, { myfolderId, deleStockId}) {
      state.folders.forEach((folder) => {
        if (folder.fid === myfolderId) {
          const newfolderstock = folder.stocks.filter(stock => stock !== deleStockId)
          folder.stocks = newfolderstock
          const copy = state.folders.map(c => ({ ...c }))
          myRef.update(
            {
              folders: copy
            }
          ).then(() => {
            dispatch('start')
          }).catch(e => console.log(e))
        }
      })
    },
    deleData({ state, dispatch }, id) {
      const n = state.folders.filter(folder => folder.fid !== id)
      myRef.update(
        {
          folders: n
        }
      ).then(() => {
        dispatch('start')
      }).catch(e => console.log(e))
    },
  },
}

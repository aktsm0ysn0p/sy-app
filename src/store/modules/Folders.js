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

    // newfoldertext(state, value) {

    // }
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
    start({ commit }) {
      myRef.get().then(doSnapshot => {
        const payload = doSnapshot.data().folders;
        commit('init', payload)
        console.log('folders取れたよ');
      }).catch(e => console.log(e))
    },
    //
    addData({ state, dispatch }) {
      let text = state.newfolder && state.newfolder.trim();
      if (!text) {
        return
      }
      const id = state.folders.slice(-1)[0].fid + 1
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
          console.log(copy);
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
    deleFolderStock({ state }, { myfolderId, deleStockId}) {
      state.folders.forEach((folder, index) => {
        if (folder.fid === myfolderId) {
          state.folders[index].stocks = state.myfolders[index].stocks.filter(stock => stock !== deleStockId);
          const copy = state.folders
          console.log(copy);
        }
      });
    },

    deleData({ state, dispatch }, id) {
      const n = state.folders.filter(folder => folder.fid !== id)
      console.log(n);
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

import firestore from '@/firebase/firestore'

const myRef = firestore.collection('my').doc("cLME2ZkXIVYpUXb4Ta9w");

export default {
  namespaced: true,
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
    updateFolderStock(state, {id, newArray}) {
      const index = state.folders.findIndex(folder => folder.fid === id)
      if (index !== -1) {
        state.folders[index].stocks = newArray
      }
    }
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
    addData({ state, dispatch, }) {
      let text = state.newfolder && state.newfolder.trim();
      if (!text) {
        alert('1文字以上入力してください')
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
    addFolderStock({ state, commit }, { myfolderId, addArray }) {
      const index = state.folders.findIndex(folder => folder.fid === myfolderId)
      if (index === -1) {
        return
      }
      const newFolderStocks = [...state.folders[index].stocks, ...addArray]
      commit('updateFolderStock', { id: myfolderId, newArray: newFolderStocks })
      const newFolders = state.folders.slice()
      myRef.update(
        {
          folders: newFolders
        }
      ).catch(e => console.log(e))
    },
    deleFolderStock({ state, commit }, { myfolderId, deleArry }) {
      const currentFolder = state.folders.find(folder => folder.fid === myfolderId)
      const arr01 = [...new Set(currentFolder.stocks)],
            arr02 = [...new Set(deleArry)]
      const newFolderStockArray = [...arr01, ...arr02].filter(value => !arr01.includes(value) || !arr02.includes(value))
      commit('updateFolderStock', { id: myfolderId, newArray: newFolderStockArray })
      const newFolders = state.folders.slice()
      myRef.update(
        {
          folders: newFolders
        }
      ).catch(e => console.log(e))
    },
    findDeleMyQuote({ state, commit }, deleArray) {
      const checkStock = []
      const checkFolderId = []
      state.folders.forEach( folder => {
        const sameStocks = [...new Set(folder.stocks)].filter(value => deleArray.includes(value))
        if (sameStocks.length) {
          checkFolderId.push(folder.fid)
          checkStock.push([...sameStocks])
        }
      })
      if (!checkFolderId.length) {
        console.log('Foldersの中にあなたが作った名言は入ってなかったです')
        return
      }
      for (let i = 0; i < checkFolderId.length; i++) {
        const fid = checkFolderId[i]
        const deleArray = checkStock[i]
        const currentFolder = state.folders.find(folder => folder.fid === fid)
        const arr01 = [...new Set(currentFolder.stocks)],
              arr02 = [...new Set(deleArray)]
        const newFolderStockArray = [...arr01, ...arr02].filter(value => !arr01.includes(value) || !arr02.includes(value))
        commit('updateFolderStock', { id: fid, newArray: newFolderStockArray })
      }
      const newFolders = state.folders.slice()
      myRef.update(
        {
          folders: newFolders
        }
      ).catch(e => console.log(e))
    }
  },
}

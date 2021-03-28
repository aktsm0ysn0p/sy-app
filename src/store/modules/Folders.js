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
    addFolder(state, newFolder) {
      state.newfolder = ''
      state.folders.push(newFolder)
    },
    removeFolder(state, fid) {
      const index = state.folders.findIndex(folder => folder.fid === fid)
      if (index !== -1) {
        state.folders.splice(index, 1)
      }
    },
    updateAddFolderStock(state, {id, addArray}) {
      const index = state.folders.findIndex(folder => folder.fid === id)
      if (index !== -1) {
        state.folders[index].stocks = [...state.folders[index].stocks, ...addArray]
        console.log(state.folders[index].stocks)
      }
    },
    updateDeleFolderStock(state, {id, deleArray}) {
      const index = state.folders.findIndex(folder => folder.fid === id)
      if (index !== -1) {
        const currentFolder = state.folders.find(folder => folder.fid === id)
        const arr01 = [...new Set(currentFolder.stocks)],
              arr02 = [...new Set(deleArray)]
        state.folders[index].stocks = [...arr01, ...arr02].filter(value => !arr01.includes(value) || !arr02.includes(value))
        console.log('1')
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
    addData({ state, commit}) {
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
      const newFolder = {
        fid: id,
        title: state.newfolder,
        stocks: []
      }
      commit('addFolder', newFolder)
      const updateFolders = state.folders.slice()
      myRef.update(
        {
          folders: updateFolders
        }
      ).catch(e => console.log(e))
    },
    deleData({ state, commit }, fid) {
      commit('removeFolder', fid)
      const updateFolders = state.folders.slice()
      myRef.update(
        {
          folders: updateFolders
        }
      ).catch(e => console.log(e))
    },
    addFolderStock({ state, commit }, { myfolderId, addArray }) {
      commit('updateAddFolderStock', { id: myfolderId, addArray: addArray })
      const newFolders = state.folders.slice()
      myRef.update(
        {
          folders: newFolders
        }
      ).catch(e => console.log(e))
    },
    deleFolderStock({ state, commit }, { myfolderId, deleArray }) {
      commit('updateDeleFolderStock', {
        id: myfolderId,
        deleArray: deleArray
      })
      const newFolders = state.folders.slice()
      myRef.update(
        {
          folders: newFolders
        }
      ).then(() => console.log('2'))
        .catch(e => console.log(e))
    },
    findDeleMyQuote({ state, dispatch }, deleArray) {
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
      checkFolderId.forEach((folderId, index) => {
        dispatch('deleFolderStock',{
          myfolderId: folderId,
          deleArray: checkStock[index],
        })
      })
    }
  },
}

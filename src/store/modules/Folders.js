import firestore from '@/firebase/firestore'

const myRef = firestore.collection('my').doc("cLME2ZkXIVYpUXb4Ta9w");

// const jjj = [
//   {id: 0, name: [3,4,5]},
//   { id: 9, name: [3,4,5]},
//   {id: 5, name: [3,4,5]},
//   {id: 2, name: [3,4,5]},
//   {id: 3, name: [3,4,5]},
// ]
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
    addFolderStock({ state, commit }, { myfolderId, addArray }) {
      const index = state.folders.findIndex(folder => folder.fid === myfolderId)
      if (index === -1) {
        return
      }
      const newFolderStocks = [...state.folders[index].stocks, ...addArray]
      console.log(myfolderId)
      console.log(newFolderStocks)
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
      console.log(currentFolder.stocks)
      const arr01 = [...new Set(currentFolder.stocks)],
            arr02 = [...new Set(deleArry)]
      const newFolderStockArray = [...arr01, ...arr02].filter(value => !arr01.includes(value) || !arr02.includes(value))
      console.log(newFolderStockArray)
      console.log('↑folders.stocksに残るやつ')
      commit('updateFolderStock', { id: myfolderId, newArray: newFolderStockArray })
      const newFolders = state.folders.slice()
      myRef.update(
        {
          folders: newFolders
        }
      ).catch(e => console.log(e))
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
        console.log(currentFolder.stocks)
        const arr01 = [...new Set(currentFolder.stocks)],
              arr02 = [...new Set(deleArray)]
        const newFolderStockArray = [...arr01, ...arr02].filter(value => !arr01.includes(value) || !arr02.includes(value))
        console.log(newFolderStockArray)
        console.log('↑folders.stocksに残るやつ')
        commit('updateFolderStock', { id: fid, newArray: newFolderStockArray })
      }
      const newFolders = state.folders.slice()
      console.log(newFolders)
      myRef.update(
        {
          folders: newFolders
        }
      ).catch(e => console.log(e))
    }
  },
}
    // deleMyQuote({ state, dispatch }, deleArray) {
    //   const sameStocks = [...new Set(state.stocks)].filter(value => deleArray.includes(value))
    //   console.log(sameStocks)
    //   if (!sameStocks.length) {
    //     console.log('この名言はストックにないよ')
    //     return
    //   }
    //   dispatch('deleData', sameStocks)
    // }

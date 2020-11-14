import Vue from 'vue'
import Vuex from 'vuex'
import Lists from './modules/Lists'
import Stocks from './modules/Stocks'
import Folders from './modules/Folders'

// import firestore from '@/firebase/firestore'

// const listsRef = firestore.collection('lists');
// const myRef = firestore.collection('my').doc("cLME2ZkXIVYpUXb4Ta9w");

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // lists: [],
    // stocks: [],
    // fols: [],
    // newfolder: '',
    // data: [],
    // myfolder: []

  },
  getters: {
    // stocks(state) {
    //   return state.stocks
    // },

    // myStockFolders(state) {
    //   const myStockFolders = [];
    //   console.log(state.stocks);
    //   const c = state.stocks.map(s => ({ ...s }));
    //   c.forEach(s => {
    //     console.log('kitakita!!!');
    //     const f = state.lists.find(list => list.lid === s.lid);
    //     console.log(f);
    //     myStockFolders.push(f);
    //   });
    //   return myStockFolders;
    // }

  },

  mutations: {
    // init(state, payload) {
    //   state.lists = payload
    //   state.stocks = payload
    // },
    // listsDataGet(state) {
    //   listsRef.orderBy('lid').get().then(doSnapshot => {
    //     doSnapshot.forEach(doc => {
    //       state.lists.push(doc.data())
    //     })
    //   }).catch(e => console.log(e));
    //   console.log('listsのデータ取り入ったよ！');
    // },
    // stocksDataGet(state) {
    //   myRef.get().then(doSnapshot => {
    //     state.stocks.push(doSnapshot.get('stocks'));
    //     console.log(state.stocks);
    //     state.fols.push(doSnapshot.get('folders'));
    //     console.log(state.fols);
    //   }).catch(e => console.log(e));
    // // },
    // setStock(state, id) {
    //   const target = state.stocks.find(stock => stock.lid === id);
    //   if (target) {
    //     // 既にストックされていたらtrue stockから削除する
    //     console.log(`tureらしいよ!`);
    //     const newfolers = state.stocks.filter(stock => stock.lid !== id);
    //     console.log(newfolers);
    //     state.stocks = newfolers;
    //   } else {
    //     //ストックされていなかったらfalse 追加してあげる
    //     console.log('falseらしいよ');
    //     const stock = { lid: id };
    //     state.stocks.push(stock);
    //   }

    // },
    // removeStock(state, num) {
    //   myRef.update({
    //     stocks_array: firestore.FieldValue.arrayRemove({lid: num})
    //   })

    // },
    newfoldertext(state, value) {
      state.newfolder = value;
    },
    addFolder(state) {
      let text = state.newfolder && state.newfolder.trim();
      if (!text) {
        return;
      }
      const id = state.myfolders.slice(-1)[0].id + 1;
      state.myfolders.push({
        id: id,
        title: state.newfolder,
        stocks: []
      });
      state.newfolder = '';
    },
    removeFolder(state, id) {
      state.myfolders =state.myfolders.filter(myfolder => myfolder.id !== id);
    },
    myfolderAddStock(state, { myfolderId, addStockId }) {
      console.log('store now');
      // const selectFolder = state.myfolders.filter(myfolder => myfolder.id === myfolderId);
      // const f = { id: addStockId };
      state.folders.forEach((folder, index) => {
        if (folder.fid === myfolderId) {
          const f = addStockId;
          state.myfolders[index].stocks.push(f);
        }
      });
    },
    myfolderDeleStock(state, {myfolderId, deleStockId}) {
      state.myfolders.forEach((folder, index) => {
        if (folder.id === myfolderId) {
          state.myfolders[index].stocks = state.myfolders[index].stocks.filter(stock => stock.id !== deleStockId);
        }
      });
    },
    // dataGet(state) {
    //   listsRef.get().then(snapshot => {
    //     snapshot.forEach(doc => {
    //       state.data.push(doc.data())
    //     })
    //   })

    // }
  },
  actions: {
    // listsDataGet({commit}) {
    //   commit('listsDataGet');
    // },
    // stocksDataGet({commit}) {
    //   commit('stocksDataGet');
    // },
    myfolderAddStock({ commit }, { myfolderId, addStockId }) {
      commit('myfolderAddStock', { myfolderId, addStockId});
    },
    myfolderDeleStock({ commit }, { myfolderId, deleStockId }) {
      commit('myfolderDeleStock', { myfolderId, deleStockId  })
    },
    // start({dispatch}) {

    // }


  },
  modules: {
    Lists: Lists,
    Stocks: Stocks,
    Folders: Folders
  }

});

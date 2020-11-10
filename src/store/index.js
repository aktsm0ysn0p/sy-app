import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists: [
      {
        id: 1,
        title: "吾輩は猫である",
        name: "夏目漱石",
        since: "1996 ~ 2000"
      },
      {
        id: 2,
        title: "明日はきっと晴れるよ",
        name: "高田愛佳",
        since: "1996 ~ 1998"
      },
      {
        id: 3,
        title: "2番じゃだめなんですか？",
        name: "蓮舫",
        since: "889 ~ 1000"
      },
      {
        id: 4,
        title: "ちっちゃいことは気にすんな",
        name: "ゆってぃー",
        since: "2010 ~ 2011"
      },
    ],
    folders: [
      {id: 3}
    ],
    myStockFolders: [],

    myfolders: [
      {
        id: 1,
        title: 'aika',
        stocks: [
          {id: 3}
        ]
      },
      {
        id: 2,
        title: 'takada',
        stocks: [
          { id: 3 },
          { id: 2 },
        ]
      },
    ],
    newfolder: '',

  },
  getters: {
    // myStockFolders(state) {
    //   state.folders.forEach(folder => {
    //     const f = state.lists.find(list => list.id === folder.id);
    //     state.myfolders.push(f);
    //   });
    //   return state.myfolders;
    // }

  },
  mutations: {
    setStock(state, id) {
      const target = state.folders.find(folder => folder.id === id);
      if (target) {
        // 既にストックされていたらtrue stockから削除する
        console.log(`tureらしいよ!`);
        const newfolers = state.folders.filter(folder => folder.id !== id);
        console.log(newfolers);
        state.folders = newfolers;
      } else {
        //ストックされていなかったらfalse 追加してあげる
        console.log('falseらしいよ');
        const stock = { id: id };
        state.folders.push(stock);
      }

    },
    // update(state) {
    //   state.folders.forEach(folder => {
    //     const f = state.lists.find(list => list.id === folder.id);
    //     state.myStockFolders.push(f);
    //   });
    // },
    removeStock(state, num) {
      const newfolers = state.folders.filter(folder => folder.id !== num);
      console.log(newfolers);
      state.folders = newfolers;
    },
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
    }

  }

});

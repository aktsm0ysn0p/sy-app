import firestore from '@/firebase/firestore'

const listsRef = firestore.collection('lists');

export default {
  namespaced: true,
  // unsubscribe: null,
  state() {
    return {
      flists: []
    }
  },
  actions: {

  },
  mutations:{
    dataGet(state) {
      listsRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          state.flists.push(doc.data())
        })
      })
    },
    setStock(state, id) {
      const target = state.folders.find(folder => folder.lid === id);
      if (target) {
        // 既にストックされていたらtrue stockから削除する
        console.log(`tureらしいよ!`);
        const newfolers = state.folders.filter(folder => folder.lid !== id);
        console.log(newfolers);
        state.folders = newfolers;
      } else {
        //ストックされていなかったらfalse 追加してあげる
        console.log('falseらしいよ');
        const stock = { lid: id };
        state.folders.push(stock);
      }

    }
  }


}

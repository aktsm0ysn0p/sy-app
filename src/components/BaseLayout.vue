<template>
  <div class="container">
    <TheLists v-if="active === 1" :chilLists="lists" :chilFolders="folders" @emiting="setStock" />
    <VStock v-else-if="active === 2" :lists="lists" :folders="folders" @removing="deleStock"/>
  </div>
</template>

<script>
import TheLists from './TheLists';
import VStock from './VStock';
export default {
  props: {
    'active': {
      type: Number
    }
  },
  data() {
    return {
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
        {id: 3},
      ]
    }
  },
  components: {
    TheLists,VStock
  },
  methods: {
    setStock(stock) {
      console.log('setStock!');
      const target = this.folders.find( folder => folder.id === stock.id);
      if (target) {
        // 既にストックされていたらtrue stockから削除する
        console.log(`tureらしいよ!`);
        const newfolers = this.folders.filter(folder => folder.id !== stock.id);
        this.folders = newfolers;
      } else {
        //ストックされていなかったらfalse 追加してあげる
        console.log('falseらしいよ');
        this.folders.push(stock);
      }
    },
    deleStock(stock) {
      console.log('呼ばれたよ');
      const newfolers = this.folders.filter(folder => folder.id !== stock.id);
      this.folders = newfolers;

    }

  },
  // created() {
  //   // // const mylist = this.lists.slice();


  //   // let mylists = this.lists.map(list => ({...list}));
  //   // mylists.forEach(list => {
  //   //   list.stock = false;
  //   //   const f = this.folders.find(folder => folder.id === list.id);
  //   //   list.stock = f ? true : false;
  //   //   });

  //   // console.log(mylists);
  //   // console.log(this.lists);
  //   // this.mylists = mylists;

  //   // // console.log(this.mylists);
  //   // // console.log(this.lists);
  //   // // console.log(this.folders);
  // }
}
</script>

<style scoped>
.container {
  width: 90%;
  margin: 10vh auto;
}
</style>

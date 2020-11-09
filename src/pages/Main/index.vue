<template>
  <div class="lists-page">
    <TheHeader />
    <nav>
      <ul>
        <li><router-link to="/">●</router-link></li>
        <li><router-link to="/stocks">☆</router-link></li>
      </ul>
    </nav>
    <div class="container">
      <div class="quote-wrapper">
        <div class="quote-card" v-for="list in lists" :key= "list.id">
          <h3>{{list.title}}</h3>
          <span @click="setStock(list.id)" :class="{nowstock : folders.find(folder=> folder.id === list.id)}">○</span>
          <p>{{list.since}}{{list.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import TheHeader from '../../components/TheHeader';
// import TheLists from './components/TheLists';




export default {
  name: 'Home',
  components: {
    TheHeader,
  },
  data() {
    return {
      isStock: false,
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
      ],
    }
  },
  methods: {
    setStock(id) {
      const target = this.folders.find( folder => folder.id === id);
      if (target) {
        // 既にストックされていたらtrue stockから削除する
        console.log(`tureらしいよ!`);
        const newfolers = this.folders.filter(folder => folder.id !== id);
        console.log(newfolers);
        this.folders = newfolers;
      } else {
        //ストックされていなかったらfalse 追加してあげる
        console.log('falseらしいよ');
        const stock = {id: id};
        this.folders.push(stock);
      }
    },
  }

}
</script>

<style>

.lists-page {
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  width: 90%;
  margin: 10vh auto;
}
.quote-card {
  padding: 20px;
  margin: 10px 0;
  border: solid 1px #5ABD57;
  background-color: #A9F791;
}
h3 {
  text-align: center;
  font-size: .8rem;
}
p {
  float: right;
  font-size: .8em;
}
span {
  cursor: pointer;
}
.nowstock {
  font-weight: bold;
  background: pink;
}

</style>

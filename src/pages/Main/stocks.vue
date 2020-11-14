<template>
  <div class="stock-page">
    <TheHeader />
    <nav>
      <ul>
        <li><router-link to="/">●</router-link></li>
        <li><router-link to="/stocks">☆</router-link></li>
        <li><router-link to="/folders">▲</router-link></li>
      </ul>
    </nav>
    <!-- <BaseLayout :active="isSelect" /> -->
    <div class="container">
      <div class="inner">
        <span class="inner-title">ストック一覧</span>
        <div class="inner-folder">
          <div v-if="my.length">
            <div class="quote-card" v-for="meigenn in my" :key= "meigenn.lid">
              <h3>{{meigenn.title}}</h3>
              <span @click="removeStock(meigenn.lid)">削除</span>
              <p>{{meigenn.since}}{{meigenn.name}}</p>
            </div>
          </div>
          <p v-else>まだ何もありません</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Firebase from "firebase/app";
import TheHeader from '../../components/TheHeader';
import { mapState } from 'vuex';


export default {
  name: 'Stocks',
  components: {
    TheHeader,
  },
  computed: {
    ...mapState('Lists',['lists']),
    ...mapState('Stocks',['stocks']),
    // lists() {
    //   return this.$store.getters['Lists/getterLists']
    // },
    // stocks() {
    //   return this.$store.getters['Stocks/getterStocks']
    // },
    my() {
      const m = [];
      this.stocks.forEach(stock => {
        const f = this.lists.find(list => list.lid === stock);
        m.push(f)
      })
      return m
    }
  },
  // data() {
  //   return {
  //     myStockFolders: []
  //   }
  // },
  methods: {
    init() {
      // this.$store.dispatch('Lists/clear');
      // this.$store.dispatch('Stocks/clear');
    },
    start() {
      // this.$store.dispatch('Lists/start')
      this.$store.dispatch('Stocks/start')
    },
    removeStock(id) {
      this.$store.dispatch('Stocks/deleData', id);
    },
    update() {
      this.stocks.forEach(stock => {
      const f = this.lists.find(list => list.lid === stock);
      this.myStockFolders.push(f);
      });
      return this.myStockFolders
    },
  },
  created() {
    // this.init();
    // this.start();
    // console.log(this.$store.state.lists);
    // console.log(this.$store.state.stocks);
    // console.log(this.$store.state.folders);

  },
  // mounted() {
  //   this.update();
  // }

}
</script>

<style>
.stock-page {
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  width: 90%;
  margin: 10vh auto;
}
.inner-title {
  border-bottom: 1px solid red;
}
.inner-folder {
  background-color: #eeeeee;
  padding: 10px;
  min-height: 30vmin;
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
</style>

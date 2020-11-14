<template>
  <div class="lists-page">
    <TheHeader />
    <nav>
      <ul>
        <li><router-link to="/">●</router-link></li>
        <li><router-link to="/stocks">☆</router-link></li>
        <li><router-link to="/folders">▲</router-link></li>
      </ul>
    </nav>
    <div class="container">
      <div class="quote-wrapper">
        <div class="quote-card" v-for="list in lists" :key= "list.lid">
          <h3>{{list.title}}</h3>
          <span @click="checkStock(list.lid)" :class="{nowstock : stocks.find(stock=> stock === list.lid)}">○</span>
          <p>{{list.name}}   {{list.since}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import TheHeader from '../../components/TheHeader';


export default {
  name: 'Home',
  components: {
    TheHeader,
  },
  computed: {
    lists() {
    return this.$store.getters['Lists/getterLists']
    },
    stocks() {
      return this.$store.getters['Stocks/getterStocks']
    }
  },
  methods: {
    init() {
      this.$store.dispatch('Lists/clear');
      this.$store.dispatch('Stocks/clear');
    },
    start() {
      this.$store.dispatch('Lists/start');
      this.$store.dispatch('Stocks/start');
    },
    add(id) {
      this.$store.dispatch('Stocks/addData', id);
    },
    dele(id) {
      this.$store.dispatch('Stocks/deleData', id);
    },
//----イベントmethods----
    checkStock(id) {
      const target = this.stocks.find(stock => stock === id);
      // target ? this.dele(id) : this.$store.dispatch('Stocks/addData', id);
      target ? this.dele(id) : this.add(id) ;
    },

  },
  created() {
    // this.init();
    // this.start();
    // console.log('index.js 更新');
    // console.log(this.$store.state.lists);
    // console.log(this.$store.state.stocks);
    // console.log(this.$store.state.folders);

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

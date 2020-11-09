<template>
  <div id="app">
    <TheHeader />
    <nav>
      <ul>
        <li><button @click="tabClick(1)" :class="{active : isSelect === 1}">●</button></li>
        <li><button @click="tabClick(2)" :class="{active : isSelect === 2}">☆</button></li>
      </ul>
    </nav>
    <!-- <BaseLayout :active="isSelect" /> -->
    <div class="container">
      <div class="inner">
        <span class="inner-title">ストック一覧</span>
        <div class="inner-folder">
          <div v-if="folders.length">
            <div class="quote-card" v-for="meigenn in meigenns" :key= "meigenn.id">
              <h3>{{meigenn.title}}</h3>
              <span @click="deleStock(meigenn.id)" :class="{nowstock : meigenn.stock}">削除</span>
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

import TheHeader from './components/TheHeader';
// import VStock from './components/VStock';


export default {
  components: {
    TheHeader,
  },
  props: {
    lists: Array,
    folders: Array
  },
  data() {
    return {
      myStockFolders: []
    }
  },
  created() {
    
  },
  methods: {
    deleStock(id) {
      const stock = {id: id};
      this.$emit('emiting', stock);
    }
  }

}
</script>

<style>
body {
  margin: 0;
}
.container {
  width: 90%;
  margin: 10vh auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
.active {
  color: red;
}
nav {
  text-align: center;
}
nav > ul {
  display: flex;
  justify-content: space-around;
}
ul {
  list-style: none;
  padding: 0;
}
button{
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  appearance: none;
}
</style>

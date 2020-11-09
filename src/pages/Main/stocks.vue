<template>
  <div class="stock-page">
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
              <span @click="removeStock(meigenn.id)">削除</span>
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

import TheHeader from '../../components/TheHeader';


export default {
  name: 'Stocks',
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
  methods: {
    removeStock(num) {
      const stock = {id: num};
      this.$emit('removing', stock);
      this.myStockFolders = this.myStockFolders.filter(folder => folder.id !== num);
    },
    update() {
      this.folders.forEach(folder => {
      const f = this.lists.find(list => list.id === folder.id);
      this.myStockFolders.push(f);
    });
    },

  },
  created() {
    this.update();
    console.log('更新！');
  }

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

<template>
  <div>
    <div class="inner">
      <span class="inner-title">ストック一覧</span>
        <div class="inner-folder">
          <div v-if="">
            <div class="quote-card" v-for="meigenn in meigenns" :key= "meigenn.id">
              <h3>{{meigenn.title}}</h3>
              <span @click="onStock(meigenn.id)" :class="{nowstock : meigenn.stock}">削除</span>
              <p>{{meigenn.since}}{{meigenn.name}}</p>
            </div>
          </div>
          <p v-else>まだ何もありません</p>
        </div>
    </div>
  </div>
</template>

<script>
// import VStockItem from './VStockItem';
export default {
  props: {
    meigenns: Array
  },


}
</script>

<style scoped>
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

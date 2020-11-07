<template>
  <div class="wrapper">
    <div class="inner">
      <span>フォルダ一覧</span>
      <div class="inner-folder">
        <!-- <div class="quote-card" v-for="list in gchilLists" :key= "list.id" >
          <h3>{{list.title}}</h3>
          <span @click="onStock(list.id)" :class="{nowstock : gchilFolders.find(folder => folder.id === list.id)}">○</span>
          <p>{{list.since}}{{list.name}}</p>
        </div> -->
        <p v-if="gfolders.length">受け取ったよ</p>

        <p v-else>まだ何もありません</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    glists: {
      type: Array,
      required: true,
    },
    gfolders: {
      type: Array,
      required: true,
    }
  }

}
</script>

<style scoped>
/* span {
  border-bottom: 1px solid red;
}
.inner-folder {
  background-color: #eeeeee;
  padding: 10px;
  min-height: 30vmin;
} */
</style>

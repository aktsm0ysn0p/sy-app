<template>
  <div>
    <div class="wrapper">
      <div class="inner">
        <span class="inner-title">フォルダ一覧</span>
        
        <div class="inner-folder">

          <p>まだ何もありません</p>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="inner">
        <span class="inner-title">ストック一覧</span>
        <div class="inner-folder" >
          <div v-if="myfolders.length">
            <div class="quote-card" v-for="list in myfolders" :key= "list.id" >
              <a @click.prevent="removeStock(list.id)">削除</a>
              <h3>{{list.title}}</h3>
              <p>{{list.since}}{{list.name}}</p>
            </div>
          </div>
          <p v-else>まだ何もありません</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lists: {
      type: Array,
      required: true,
    },
    folders: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      myfolders: []
    }
  },
  methods: {
    removeStock(num) {
      const stock = {id: num};
      this.$emit('removing', stock);
      this.myfolders = this.myfolders.filter(folder => folder.id !== num);
    },
    update() {
      this.folders.forEach(folder => {
      const f = this.lists.find(list => list.id === folder.id);
      this.myfolders.push(f);
    });
    },

  },
  created() {
    this.update();
    console.log('更新！');
  }

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

<template>
<div>
  <div class="xfolder-page" v-if="currentFolder && currentStock">
    <div class="container">
      <h1>{{currentFolder.title}}</h1>
      <span><router-link to="/folders">もどる</router-link></span>
      <div>
        <button @click="onAdd">+</button>
        <button @click="onDele">ゴミ</button>
      </div>
      <div class="inner">
        <span class="inner-title">ストック一覧</span>
        <p>{{ folderId  }} </p>
        <div class="inner-folder">
          <div v-if="currentStock.length">
            <div class="quote-card" v-for="stock in currentStock" :key= "stock.lid">
              <h3>{{stock.title}}</h3>
              <p>{{stock.since}}{{stock.name}}</p>
            </div>
          </div>
          <p v-else>まだ何もありません</p>
        </div>
      </div>
      <TheAddmodal v-if="showAddModal" @emitingadd="onAdd" :addStock="addStock" @checkToggle="checkToggle" @onSubmit="onAddSubmit"/>
      <TheDelemodal v-if="showDeleModal" @emitingdele="onDele" :deleStock="deleStock" @checkToggleDele="checkToggleDele"
      @onDeleSubmit="onDeleSubmit"/>
    </div>
  </div>
  <div v-else>
    <p>読み込みに失敗しました。フォルダー一覧からもう一度やり直してください。</p>
    <span><router-link to="/folders">もどる</router-link></span>
  </div>
</div>

</template>

<script>

import { mapState } from 'vuex';
import TheAddmodal from '../../components/TheAddmodal';
import TheDelemodal from '../../components/TheDelemodal';


export default {
  name: 'XFolder',
  components: {
    TheAddmodal, TheDelemodal
  },
  computed: {
    ...mapState('Lists',['lists']),
    ...mapState('Stocks',['stocks']),
    ...mapState('Folders',['folders']),
    folderId() {
      return this.$route.params.id;
    },
    currentFolder() {
      let currentFolder = []
      currentFolder = this.folders.find(myfolder => myfolder.fid === this.folderId )
      return currentFolder
    },

    currentStock() {
      console.log(this.currentFolder);
      const currentStock = [];
      this.currentFolder.stocks.forEach(stock => {
        const f = this.lists.find(list => list.lid === stock );
        currentStock.push(f);
      });
      console.log(currentStock);
      return currentStock
    },

    addStock() {
      const result = this.stocks.filter(f =>
        !this.currentStock.some(c => c.lid === f)
      );
      let addStock = [];
      result.forEach(stock => {
      let f = this.lists.find(list => list.lid === stock);
      this.$set(f, 'isDone', false);
      addStock.push(f);
      });
      return addStock
    },

    deleStock() {
      let deleStock = [];
      this.currentFolder.stocks.forEach(stock => {
        const f = this.lists.find(list => list.lid === stock );
        deleStock.push(f);
      });
      deleStock.forEach(n => {
        this.$set(n, 'isDone', false)
      })
      console.log(deleStock);
      return deleStock
    }

  },
  data() {
    return {
      showAddModal: false,
      showDeleModal: false,
    }
  },
  created() {
    // console.log(this.$route.params.id);
    // console.log(isNaN(this.$route.params.id));
  },
  methods: {
    // init() {
    //   this.$store.dispatch('Folders/clear')
    // },
    // start() {
    //   this.$store.dispatch('Folders/start')
    // },
    onAdd() {
      this.showAddModal = !this.showAddModal;
      this.addStock.forEach(stock  => {
        stock.isDone = false
      });
    },
    onDele() {
      this.showDeleModal = !this.showDeleModal;
      this.deleStock.forEach(stock  => {
        stock.isDone = false
      });
    },
    checkToggle(id) {
      this.addStock.forEach(stock => {
        if (stock.lid === id) {
          stock.isDone = !stock.isDone;
          console.log(this.addStock);
        }
      });
    },
    checkToggleDele(id) {
      this.deleStock.forEach(stock => {
        if (stock.lid === id) {
          this.$set(stock, 'isDone', !stock.isDone)
          console.log(this.deleStock);
        }
      });
    },
    onAddSubmit() {
      const result = this.addStock.filter(stock => stock.isDone);
      console.log(result);
      result.forEach(re => {
        this.$store.dispatch('Folders/addFolderStock', {myfolderId: this.currentFolder.fid, addStockId: re.lid});
      });
      this.showAddModal = !this.showAddModal;
    },
    onDeleSubmit() {
      const result = this.deleStock.filter(stock => stock.isDone)
      ;console.log(result);
      result.forEach(re => {
        this.$store.dispatch('Folders/deleFolderStock', {myfolderId: this.currentFolder.fid, deleStockId: re.lid});
      });
      this.showDeleModal = !this.showDeleModal;
    }
  },

}
</script>

<style>
.xfolder-page {
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

button {
  display: inline-block;
}
</style>

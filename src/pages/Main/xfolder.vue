<template>
  <div class="xfolder-page">
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
            <div class="quote-card" v-for="stock in currentStock" :key= "stock.id">
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

</template>

<script>

// import TheHeader from '../../components/TheHeader';
import { mapState } from 'vuex';
import TheAddmodal from '../../components/TheAddmodal';
import TheDelemodal from '../../components/TheDelemodal';


export default {
  name: 'XFolder',
  components: {
    TheAddmodal, TheDelemodal
  },
  computed: {
    ...mapState(['lists']),
    ...mapState(['folders']),
    ...mapState(['myfolders']),
    folderId() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      currentFolder: null,
      currentStock:[],
      addStock: [],
      deleStock: [],
      showAddModal: false,
      showDeleModal: false
    }
  },
  created() {
    this.selectFolder();
    this.selectStock();
    this.selectAddStock();
    this.selectDeleStock();
    console.log('更新！');
  },
  methods: {
    selectFolder() {
    this.currentFolder = this.myfolders.find(myfolder => myfolder.id === this.folderId );
    },
    selectStock() {
      if (!this.currentFolder.stocks.length) {
        return;
      }
      this.currentFolder.stocks.forEach(stock => {
        const f = this.lists.find(list => list.id === stock.id );
        this.currentStock.push(f);
        console.log(this.currentStock);
      });
    },
    selectAddStock() {
      const result = this.folders.filter(f =>
        !this.currentStock.some(c => c.id === f.id)
      );
      if (!result.length) {
        this.addStock = [];
        return;
      }
      result.forEach(folder => {
      let f = this.lists.find(list => list.id === folder.id);
      // f.isDone = false;
      this.$set(f, 'isDone', false);
      this.addStock.push(f);
      });
    },
    selectDeleStock() {
      const copy = this.currentStock.map(s => ({...s}));
      copy.forEach(stock => {
        this.$set(stock, 'isDone', false);
        this.deleStock.push(stock);
        });
      console.log(this.deleStock);
    },
    onAdd() {
      this.showAddModal = !this.showAddModal;
    },
    onDele() {
      this.showDeleModal = !this.showDeleModal;
    },
    checkToggle(id) {
      this.addStock.forEach(stock => {
        if (stock.id === id) {
          stock.isDone = !stock.isDone;
        }
      });
    },
    checkToggleDele(id) {
      this.deleStock.forEach(stock => {
        if (stock.id === id) {
          stock.isDone = !stock.isDone;
        }
      });
    },
    onAddSubmit() {
      const result = this.addStock.filter(stock => stock.isDone);
      result.forEach(re => {
        this.$store.dispatch('myfolderAddStock', {myfolderId: this.currentFolder.id, addStockId: re.id});
        this.$delete(re, 'isDone');
        this.currentStock.push(re);
      });
      this.selectAddStock();
      this.onAdd();
    },
    onDeleSubmit() {
      const result = this.deleStock.filter(stock => stock.isDone);
      result.forEach(re => {
        this.$store.dispatch('myfolderDeleStock', {myfolderId: this.currentFolder.id, deleStockId: re.id});
        this.$delete(re, 'isDone');
        this.currentStock = this.currentStock.filter(stock => stock.id !== re.id);
      });
      this.selectDeleStock();
      this.onDele();
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

<template>
  <div class="xfolder-page">
    <div class="container">
      <h1>{{currentFolder[0].title}}</h1>
      <span><router-link to="/folders">もどる</router-link></span>
      <button @click="onAdd">+</button>
      <button @click="onDele">ゴミ</button>
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
      <TheAddmodal :isAdd="isAdd" @emitingadd="onAdd" :addStock="addStock"/>
      <TheDelemodal  :isDele="isDele" @emitingdele="onDele" :addStock="addStock"/>
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
      isAdd: false,
      isDele: false
    }
  },
  created() {
    this.selectFolder();
    // console.log(this.currentFolder[0].stocks);
    this.selectStock();
    // this.add();
    console.log('更新！');
  },
  methods: {
    selectFolder() {
    this.currentFolder = this.myfolders.filter(myfolder => myfolder.id === this.folderId );
    },
    selectStock() {

      if (!this.currentFolder[0].stocks.length) {
        return;
      }
      this.currentFolder[0].stocks.forEach(stock => {
        const f = this.lists.find(list => list.id === stock.id );
        this.currentStock.push(f);
      });
    },
    add() {
      this.addStock = this.currentStock.forEach(stock => {
        const f = this.folders.filter(folder => folder.id !== stock.id);
        this.addStock.push(f);
      });
    },
    onAdd() {
      this.isAdd = !this.isAdd;
    },
    onDele() {
      this.isDele = !this.isDele;
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
</style>

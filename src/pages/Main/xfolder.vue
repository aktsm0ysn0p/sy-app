<template>
<div>
  <div class="xfolder-page" v-if="currentFolder !== undefined">
    <div class="container">
      <h1>{{currentFolder.title}}</h1>
      <span class="back"><router-link to="/folders">もどる</router-link></span>
      <div class="edit-btns">
        <button @click="onAdd">+</button>
        <button @click="onDele">ゴミ</button>
      </div>
      <div class="inner">
        <!-- <span class="inner-title">ストック一覧</span> -->
        <p>{{ folderId  }} </p>
        <div class="inner-folder">
          <div v-if="currentStock.length">
            <div class="quote-card" v-for="stock in currentStock" :key= "stock.lid">
              <h3 class="frame-box-001">{{stock.title}}</h3>
              <div class="bottom-wrapper">
                <div class="text-wrapper">
                  <p>{{stock.name}}</p>
                  <p>{{stock.since}}</p>
                </div>
              </div>
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
  // props: {
  //   this.folderId!: number;
  // },
  computed: {
    ...mapState('Lists',['lists']),
    ...mapState('Stocks',['stocks']),
    ...mapState('Folders',['folders']),
    folderId() {
      if (typeof(this.$route.params.id) !== 'number') {
        return Number(this.$route.params.id)
      }
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
  created() {
    if (typeof(this.folderId) === 'number') {
      console.log('number');
    }else if (typeof(this.$route.params.id) === 'string') {
        console.log('string');
    }
    console.log(typeof(this.folderId));
    console.log('ugoita');
  },
  data() {
    return {
      showAddModal: false,
      showDeleModal: false,
    }
  },
  methods: {
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

<style lang="scss">
$bar-style: solid;
$bar-size: 2px;
$bar-color: #ffffff;

.xfolder-page {
  color: #2c3e50;
  background: linear-gradient(#ccc 1px, transparent 2px);
  background-size: auto 2rem;
  padding-bottom: 20px;
  .container {
    width: 90%;
    margin: 10vh auto;

    h1 {
      font-weight: normal;
      padding: 20px 0 30px 0;
      text-align: center;
      font-size: 2rem;
    }

    .back {
      text-decoration: none;
    }

    .edit-btn {
      button {
        display: inline-block;
        padding: .75em 4em;
        border: 2px solid #333;
        border-radius: 3em .5em 2em .5em/.4em 2em .5em 3em;
        color: #333;
        text-decoration: none;
        text-align: center;
      }
    }

    .inner {
      .inner-folder {
        background-color: #eeeeee;
        padding: 10px;
        min-height: 30vmin;
        .quote-card {
          padding: 20px;
          margin: 10px 0;
          box-shadow: 0 .25rem .25rem hsla(0, 0%, 0%, .1);
          background-image:
          linear-gradient(180deg, hsla(0, 0%, 45%, .1) 2rem, hsla(0, 100%, 100%, 0) 2.5rem),
          linear-gradient(180deg, hsla(200, 100%, 85%, 1), hsla(200, 100%, 85%, 1));
          font-size: 1.125rem;
          line-height: 1.8;
          border-radius: 5px;

          .frame-box-001 {
            padding: 30px;
            position: relative;
            text-align: center;
            font-size: 1rem;

            &::before, &::after {
              content:'';
              width: 30px;
              height: 30px;
              position: absolute;
            }

            &::before {
              border-left: $bar-style $bar-size $bar-color;
              border-top: $bar-style $bar-size $bar-color;
              top: 0;
              left: 0;
            }

            &::after {
              border-right: $bar-style $bar-size $bar-color;
              border-bottom: $bar-style $bar-size $bar-color;
              bottom: 0;
              right: 0;
            }
          }

          .bottom-wrapper {
            display: flex;
            justify-content: space-between;

            .text-wrapper {
              display: flex;
              flex-direction: column;

              p {
                font-size: .8em;
              }

            }

          }

        }
      }

    }
  }
}

</style>

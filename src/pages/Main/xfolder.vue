<template>
    <div class="xfolder-page" v-if="currentFolder !== undefined">
      <div class="container">
        <div class="back"
          ><router-link to="/folders"><font-awesome-icon icon="long-arrow-alt-left" /><p>back</p></router-link></div
        >
        <h1>{{ currentFolder.title }}</h1>
        <div class="edit-btns">
          <button @click="onAdd">追加</button>
          <button @click="onDele">ゴミ</button>
        </div>
        <div class="inner">
          <div class="inner-folder">
            <div v-if="currentStock.length" class="quote-wrapper">
              <div
                class="quote-card"
                v-for="stock in currentStock"
                :key="stock.lid"
              >
                <h3 class="frame-box-001">{{ stock.title }}</h3>
                <div class="bottom-wrapper">
                  <div class="text-wrapper">
                    <p>{{ stock.name }}</p>
                    <p>{{ stock.since }}</p>
                  </div>
                </div>
              </div>
            </div>
            <p v-else>このフォルダまだ何もありません</p>
          </div>
        </div>
        <transition name="fade">
          <TheAddmodal
            v-if="showAddModal"
            @emitingadd="onAdd"
            :addStock="addStock"
            @checkToggleAdd="checkToggleAdd"
            @onSubmit="onAddSubmit"
          />
          <TheDelemodal
            v-if="showDeleModal"
            @emitingdele="onDele"
            :deleStock="deleStock"
            @checkToggleDele="checkToggleDele"
            @onDeleSubmit="onDeleSubmit"
          />
        </transition>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import TheAddmodal from "../../components/TheAddmodal";
import TheDelemodal from "../../components/TheDelemodal";

export default {
  name: "XFolder",

  components: {
    TheAddmodal,
    TheDelemodal,
  },

  data() {
    return {
      showAddModal: false,
      showDeleModal: false,
    };
  },

  computed: {
    ...mapState("Lists", ["lists"]),
    ...mapState("Stocks", ["stocks"]),
    ...mapState("Folders", ["folders"]),

    folderId() {
      if (typeof this.$route.params.id !== "number") {
        return Number(this.$route.params.id);
      }
      return this.$route.params.id;
    },

    currentFolder() {
      let currentFolder = [];
      currentFolder = this.folders.find(
        (myfolder) => myfolder.fid === this.folderId
      );
      return currentFolder;
    },

    currentStock() {
      const currentStock = [];
      this.currentFolder.stocks.forEach((stock) => {
        const f = this.lists.find((list) => list.lid === stock);
        if (typeof f !== undefined) {
          currentStock.push(f);
        }
      });
      return currentStock;
    },

    addStock() {
      const result = this.stocks.filter(
        (f) => !this.currentStock.some((c) => c.lid === f)
      );
      let addStock = [];
      result.forEach((stock) => {
        let f = this.lists.find((list) => list.lid === stock);
        this.$set(f, "isDone", false);
        addStock.push(f);
      });
      return addStock;
    },

    deleStock() {
      let deleStock = [];
      this.currentFolder.stocks.forEach((stock) => {
        const f = this.lists.find((list) => list.lid === stock);
        deleStock.push(f);
      });
      deleStock.forEach((n) => {
        this.$set(n, "isDone", false);
      });
      return deleStock;
    },
  },

  methods: {
    onAdd() {
      this.showAddModal = !this.showAddModal;
      this.addStock.forEach((stock) => {
        stock.isDone = false;
      });
    },

    onDele() {
      this.showDeleModal = !this.showDeleModal;
      this.deleStock.forEach((stock) => {
        stock.isDone = false;
      });
    },

    checkToggleAdd(id) {
      this.addStock.forEach((stock) => {
        if (stock.lid === id) {
          // stock.isDone = !stock.isDone;
          this.$set(stock, "isDone", !stock.isDone);
        }
      });
    },

    checkToggleDele(id) {
      this.deleStock.forEach((stock) => {
        if (stock.lid === id) {
          this.$set(stock, "isDone", !stock.isDone);
        }
      });
    },

    onAddSubmit() {
      const result = this.addStock.filter((stock) => stock.isDone);
      result.forEach((re) => {
        this.$store.dispatch("Folders/addFolderStock", {
          myfolderId: this.currentFolder.fid,
          addStockId: re.lid,
        });
      });
      this.showAddModal = !this.showAddModal;
    },

    onDeleSubmit() {
      const result = this.deleStock.filter((stock) => stock.isDone);
      result.forEach((re) => {
        this.$store.dispatch("Folders/deleFolderStock", {
          myfolderId: this.currentFolder.fid,
          deleStockId: re.lid,
        });
      });
      this.showDeleModal = !this.showDeleModal;
    },
  },
};
</script>

<style lang="scss">
$bar-style: solid;
$bar-size: 2px;
$bar-color: #ffffff;

.xfolder-page {
  color: #2c3e50;
  background: linear-gradient(#ccc 1px, transparent 2px);
  background-size: auto 2rem;
  padding-bottom: 60px;

  .container {
    min-height: 100vh;
    width: 90%;
    margin: 0 auto;
    padding: 30px;
    // @media (max-width: 767px) {
    //   padding-bottom: 60px;
    // }

    h1 {
      font-weight: normal;
      padding: 20px 0 10px;
      font-size: 2rem;
      font-family: 'zatsu';
    }

    .back {
      text-decoration: none;
      // padding: 20px 0;
      a {
        text-decoration: none;
        color: #2c3e50;
        p {
          font-family: 'zatsu';
        }
      }
    }

    .edit-btns {
      display: flex;
      justify-content: flex-end;
      padding: 0 10px 10px;
      button {
        display: inline-block;
        padding: 0.75em 1em;
        border: 2px solid #29D9A7;
        border-radius: 3em 0.5em 2em 0.5em/.4em 2em 0.5em 3em;
        color: #333;
        text-align: center;
        font-family: 'zatsu';
        transition: all .5s;

        &:hover {
          background: #29D9A7;
        }


      }
    }

    .inner {
      .inner-folder {
        // background-color: #eeeeee;
        padding: 10px;
        min-height: 30vmin;

        .quote-wrapper {
          display: grid;
          grid-template-columns: repeat(auto-fit, 280px);
          grid-template-rows: 1fr;
          justify-content: center;
          grid-gap: 1rem 1rem;
        }

        .quote-card {
          padding: 1rem 1rem 0;
          // margin: 10px 0;
          box-shadow: 0 0.25rem 0.25rem hsla(0, 0%, 0%, 0.1);
          background-image: linear-gradient(
              180deg,
              hsla(0, 0%, 45%, 0.1) 2rem,
              hsla(0, 100%, 100%, 0) 2.5rem
            ),
            linear-gradient(
              180deg,
              hsla(200, 100%, 85%, 1),
              hsla(200, 100%, 85%, 1)
            );
          font-size: 1.125rem;
          line-height: 1.8;
          border-radius: 5px;

          .frame-box-001 {
            padding: 1rem;
            position: relative;
            text-align: center;
            font-size: 1rem;
            font-family: 'shunnka';


            &::before,
            &::after {
              content: "";
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
            justify-content: flex-end;

            .text-wrapper {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              padding: 1rem 0;

              p {
                font-size: 0.8em;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>

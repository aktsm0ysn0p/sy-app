<template>
  <div class="stocks-page" v-if="stockquotes">
    <transition name="fade">
      <Navber />
    </transition>
    <div class="container">
      <div class="inner">
        <h2 class="inner-title">LIKES</h2>
        <div class="edit-btns">
          <button @click="onDele"><font-awesome-icon icon="trash-alt" size="2x" class="pen" /></button>
        </div>
        <div class="inner-folder">
          <div v-if="stockquotes.length" class="quote-wrapper">
            <QuoteTag
              v-for="stockItem in stockquotes"
              :key="stockItem.lid"
              :stockItem="stockItem"
            />
          </div>
          <p v-else>まだ何もありません</p>
        </div>
      </div>
    </div>
    <transition name="fade">
      <TheDelemodal
        v-if="showDeleModal"
        @emitingdele="onDele"
        :deleStock="deleStock"
        @checkToggleDele="checkToggleDele"
        @onDeleSubmit="onDeleSubmit"
      />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navber from '../../components/TheNavber'
import TheDelemodal from "../../components/TheDelemodal";
import QuoteTag from '../../components/QuoteTag'

export default {
  name: 'Stocks',
  components: {
    Navber,
    TheDelemodal,
    QuoteTag
  },
  data() {
    return {
      showDeleModal: false,
    }
  },
  computed: {
    ...mapGetters('Lists',['lists']),
    ...mapGetters('Stocks',['stocks']),
    stockquotes() {
      const stocks = [];
      this.stocks.forEach(stock => {
        const f = this.lists.find(list => list.lid === stock)
        stocks.push(f)
      })
      return stocks
    },
    deleStock() {
      let deleStock = [];
      this.stocks.forEach(stock => {
        const f = this.lists.find(list => list.lid === stock)
        deleStock.push(f);
      });
      deleStock.forEach((n) => {
        this.$set(n, "isDone", false);
      });
      return deleStock;
    },
  },
  methods: {
    onDele() {
      this.showDeleModal = !this.showDeleModal;
      this.deleStock.forEach((stock) => {
        stock.isDone = false;
      });
    },
    checkToggleDele(id) {
      this.deleStock.forEach((stock) => {
        if (stock.lid === id) {
          this.$set(stock, "isDone", !stock.isDone);
        }
      });
    },
    onDeleSubmit() {
      const result = this.deleStock.filter(stock => stock.isDone)
      if (result.length) {
        let newdeleArray = []
          result.forEach(dele => {
            newdeleArray.push(dele.lid)
          })
        this.$store.dispatch('Stocks/deleData', newdeleArray)
      } else {
        console.log('まだなにも選択されていません')
      }
      this.showDeleModal = !this.showDeleModal;
    },
  },
}
</script>

<style lang="scss">
$bar-style: solid;
$bar-size: 2px;
$bar-color: #ffffff;
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.stocks-page {
  color: #2c3e50;
  padding-bottom: 20px;
  background: linear-gradient(#ccc 1px, transparent 2px);
  background-size: auto 2rem;
  .container {
    min-height: 100vh;
    width: 90%;
    margin: 0 auto;
    padding: 20px 5px;
    @media (max-width: 767px) {
      padding-bottom: 60px;
    }
    .inner {
      .edit-btns {
        display: flex;
        justify-content: flex-end;
        padding-right: 2rem;
        button {
          transition: all .5s;
          color: #2c3e50;
          &:hover {
            color: #29D9A7;
          }
        }
      }
      .inner-title {
        padding: 1rem 0;
        font-size: 2rem;
        font-family: 'uchiyama';
      }
      .inner-folder {
        padding: 10px;
        min-height: 30vmin;
        .quote-wrapper {
          display: grid;
          grid-template-columns: repeat(auto-fit, 280px);
          grid-template-rows: 1fr;
          justify-content: center;
          grid-gap: 1rem 1rem;
          place-items: center
        }
      }
    }
  }
}

</style>

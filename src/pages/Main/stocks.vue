<template>
  <div class="stocks-page" v-if="my">
    <transition name="fade">
      <Navber v-if="!showDeleModal"/>
    </transition>
    <div class="container">
      <div class="inner">
        <h2 class="inner-title">LIKES</h2>
        <div class="edit-btns">
          <button @click="onDele">Delete</button>
        </div>
        <div class="inner-folder">
          <div v-if="my.length" class="quote-wrapper">
            <div
              class="quote-card"
              v-for="meigenn in my"
              :key= "meigenn.lid"
            >
              <h3 class="frame-box-001">{{meigenn.title}}</h3>
              <div class="bottom-wrapper">
                <div class="text-wrapper">
                  <p>{{meigenn.name}}</p>
                  <p>{{meigenn.since}}</p>
                </div>
              </div>
            </div>
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
import { mapState } from 'vuex';
import Navber from '../../components/TheNavber'
import TheDelemodal from "../../components/TheDelemodal";

export default {

  name: 'Stocks',


  data() {
    return {
      showDeleModal: false,
    }
  },


  components: {
    Navber,
    TheDelemodal
  },


  computed: {
    ...mapState('Lists',['lists']),
    ...mapState('Stocks',['stocks']),

    my() {
      const m = [];
      this.stocks.forEach(stock => {
        const f = this.lists.find(list => list.lid === stock);
        m.push(f)
      })
      return m
    },

    deleStock() {
      let deleStock = [];
      this.stocks.forEach(stock => {
        const f = this.lists.find(list => list.lid === stock);
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
          console.log(this.deleStock);
        }
      });
    },

    onDeleSubmit() {
      const result = this.deleStock.filter(stock => stock.isDone);
      result.forEach((re) => {
        this.$store.dispatch('Stocks/deleData', re.lid);
      });
      this.showDeleModal = !this.showDeleModal;
    },



  },

}
</script>

<style lang="scss">
$bar-style: solid;
$bar-size: 2px;
$bar-color: #ffffff;
.stocks-page {
  color: #2c3e50;
  padding-bottom: 20px;
  background: linear-gradient(#ccc 1px, transparent 2px);
  background-size: auto 2rem;
  .container {
    min-height: 100vh;
    width: 90%;
    margin: 0 auto;
    padding: 30px;
    @media (max-width: 767px) {
      padding-bottom: 60px;
    }

    .inner {
      .edit-btns {
        display: flex;
        justify-content: flex-end;
        button {
          // color: #2c3e50;  font-icon ようの色

          transition: all .5s;

          display: inline-block;
          padding: 0.75em 1em;
          border: 2px solid #29D9A7;
          border-radius: 3em 0.5em 2em 0.5em/.4em 2em 0.5em 3em;
          color: #333;
          text-align: center;
          // font-family: 'zatsu';

          font-family: 'uchiyama';

          &:hover {
            background: #29D9A7;
            // opacity: .6;
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
        }

        .quote-card {
          padding: 1rem 1rem 0;
          margin: 10px 0;
          box-shadow: 0 .25rem .25rem hsla(0, 0%, 0%, .1);
          background-image:
          linear-gradient(180deg, hsla(0, 0%, 45%, .1) 2rem, hsla(0, 100%, 100%, 0) 2.5rem),
          linear-gradient(180deg, hsla(200, 100%, 85%, 1), hsla(200, 100%, 85%, 1));
          // linear-gradient(180deg, #F0BCD6, #F0BCD6);
          font-size: 1.125rem;
          line-height: 1.8;
          border-radius: 5px;

          .frame-box-001 {
            padding: 1rem;
            position: relative;
            text-align: center;
            font-size: 1rem;
            font-family: 'shunnka';

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
            justify-content: flex-end;

            .text-wrapper {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              padding: 1rem 0;

              p {
                font-size: .8em;
                text-align: center;
              }

            }

          }

        }
      }

    }

  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>

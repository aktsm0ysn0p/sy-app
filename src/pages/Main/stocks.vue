<template>
  <div class="stocks-page" v-if="my">
    <Navber />
    <div class="container">
      <div class="inner">
        <h2 class="inner-title">LIKES</h2>
        <div class="inner-folder">
          <div v-if="my.length" class="quote-wrapper">
            <div class="quote-card" v-for="meigenn in my" :key= "meigenn.lid">
              <h3 class="frame-box-001">{{meigenn.title}}</h3>
              <div class="bottom-wrapper">
                <div @click="removeStock(meigenn.lid)" class="dele-wrapper"><font-awesome-icon icon="trash-alt" /></div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Navber from '../../components/TheNavber'

export default {

  name: 'Stocks',


  components: {
    Navber
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
    }

  },


  methods: {
    removeStock(id) {
      this.$store.dispatch('Stocks/deleData', id);
    },

    update() {
      this.stocks.forEach(stock => {
      const f = this.lists.find(list => list.lid === stock);
      this.myStockFolders.push(f);
      });
      return this.myStockFolders
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
            justify-content: space-between;

            .dele-wrapper {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 1rem;
              cursor: pointer;
            }

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
}
</style>

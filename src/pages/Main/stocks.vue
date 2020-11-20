<template>
  <div class="stocks-page" v-if="my">
    <nav>
      <ul>
        <li><router-link to="/">●</router-link></li>
        <li><router-link to="/stocks">☆</router-link></li>
        <li><router-link to="/folders">▲</router-link></li>
      </ul>
    </nav>
    <div class="container">
      <div class="inner">
        <h2 class="inner-title">ストック一覧</h2>
        <div class="inner-folder">
          <div v-if="my.length">
            <div class="quote-card" v-for="meigenn in my" :key= "meigenn.lid">
              <h3 class="frame-box-001">{{meigenn.title}}</h3>
              <div class="bottom-wrapper">
                <div @click="removeStock(meigenn.lid)">削除</div>
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
// import Firebase from "firebase/app";
// import TheHeader from '../../components/TheHeader';
import { mapState } from 'vuex';


export default {
  name: 'Stocks',
  // components: {
  //   TheHeader,
  // },
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
  background: #F5F5F5;
  padding-bottom: 20px;
  .container {
    width: 90%;
    margin: 10vh auto;

    .inner {
      .inner-title {
        font-weight: normal;
        padding: 20px 0 30px 0;
        text-align: center;
        font-size: 2rem;
      }
      .inner-folder {
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

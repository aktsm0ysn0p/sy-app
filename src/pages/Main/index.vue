<template>
  <div class="lists-page">
    <!-- <TheHeader /> -->
    <nav>
      <ul>
        <li><router-link to="/">●</router-link></li>
        <li><router-link to="/stocks">☆</router-link></li>
        <li><router-link to="/folders">▲</router-link></li>
      </ul>
    </nav>
    <div class="container">
      <div class="quote-wrapper">
        <div class="quote-card" v-for="list in lists" :key= "list.lid">
          <h3 class="frame-box-001">{{list.title}}</h3>
          <div class="bottom-wrapper">
            <div class="likes">
              <div class="likes-icon" @click="checkStock(list.lid)" :class="{nowstock : stocks.find(stock=> stock === list.lid)}"></div>
            </div>
            <div class="text-wrapper">
              <p>{{list.name}}</p>
              <p>{{list.since}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// import TheHeader from '../../components/TheHeader';


export default {
  name: 'Home',
  // components: {
  //   TheHeader,
  // },
  computed: {
    lists() {
    return this.$store.getters['Lists/getterLists']
    },
    stocks() {
      return this.$store.getters['Stocks/getterStocks']
    }
  },
  methods: {
    init() {
      this.$store.dispatch('Lists/clear');
      this.$store.dispatch('Stocks/clear');
    },
    start() {
      this.$store.dispatch('Lists/start');
      this.$store.dispatch('Stocks/start');
    },
    add(id) {
      this.$store.dispatch('Stocks/addData', id);
    },
    dele(id) {
      this.$store.dispatch('Stocks/deleData', id);
    },
//----イベントmethods----
    checkStock(id) {
      const target = this.stocks.find(stock => stock === id);
      // target ? this.dele(id) : this.$store.dispatch('Stocks/addData', id);
      target ? this.dele(id) : this.add(id) ;
    },

  },
  created() {
    // this.init();
    // this.start();
    // console.log('index.js 更新');
    // console.log(this.$store.state.lists);
    // console.log(this.$store.state.stocks);
    // console.log(this.$store.state.folders);

  }
}

</script>

<style lang="scss">
// @import '../../assets/scss/main.scss'
$bar-style: solid;
$bar-size: 2px;
$bar-color: #ffffff;

.lists-page {
  color: #2c3e50;
  background: #F5F5F5;
  padding-bottom: 20px;
  .container {
    width: 90%;
    margin: 10vh auto;
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
        .likes {
          position: relative;

          .likes-icon {
            width: 100px;
            height: 100px;
            background: url(http://nelog.jp/wp-content/uploads/2016/03/heart_animation.png) no-repeat;
            background-position: 0 0;
            cursor: pointer;
          }

        }
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

.nowstock {
  background-position: -2800px 0;
  -webkit-transition: background 1s steps(28);
  transition: background 1s steps(28);
}











</style>

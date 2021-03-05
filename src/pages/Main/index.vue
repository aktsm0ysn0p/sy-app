<template>
  <div class="lists-page">
    <Navber />
    <div class="container">
      <div class="img-wrapper">
        <div class="img-text">
          <h1>Famous quotes</h1>
          <p>前向きな気持ちになれる著名人の名言をまとめました。<br><span class="like">Like♡</span>ボタンから、あなたのお気に入りリストを作ってみよう。</p>
        </div>
        <img src="../../assets/img/IMG_4392.png" alt="" class="quote-img">
      </div>
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
import Navber from '../../components/TheNavber'

export default {

  name: 'Home',


  components: {
    Navber
  },


  computed: {
    lists() {
    return this.$store.getters['Lists/getterLists']
    },

    stocks() {
      return this.$store.getters['Stocks/getterStocks']
    }

  },


  methods: {
    add(id) {
      this.$store.dispatch('Stocks/addData', id);
    },

    dele(id) {
      this.$store.dispatch('Stocks/deleData', id);
    },
  //----イベントmethods----
    checkStock(id) {
      const target = this.stocks.find(stock => stock === id);
      target ? this.dele(id) : this.add(id) ;
    },

  },

}

</script>

<style lang="scss">

@function get_vw($size, $viewport:320){
  $rate: 100 / $viewport;
  @return $rate * $size * 1vw;
}

@mixin fz_vw($font_size:10){
  font-size: $font_size * 1px;
  font-size: get_vw($font_size);
}

$bar-style: solid;
$bar-size: 2px;
$bar-color: #ffffff;

// .component-fade-enter-active,
// .component-fade-leave-active {
//     transition: opacity .3s ease;
// }
// .component-fade-enter,
// .component-fade-leave-to {
//     opacity: 0;
//     transform: translateX(50px);
// }


.lists-page {

  color: #2c3e50;
  background: #F5F5F5;
  // padding-bottom: 20x;

  .container {
    width: 90%;
    margin: 0 auto;
    padding: 30px;
    @media (max-width: 767px) {
      padding-bottom: 80px;
    }

    .quote-img {
      display: block;
      width: 100%;
      object-fit: fill;
      // position: relative;
      padding-bottom: 10px;
      max-width: 800px;
      margin: 0 auto;
    }

    .img-text {
      margin: 0 auto;
      width: 80%;
      max-width: 800px;
      padding: 20px 0;


      h1 {
        text-align: center;
        padding: 1rem 0;
        @include fz_vw(20);
        @media (min-width: 768px) {
          font-size: 55px;
        }
        // font-family: 'andara';
      }
      p {
        text-align: center;
        font-family: 'Palatino Roman';
        @include fz_vw(13);
        @media (min-width: 768px) {
          font-size: 25px;
        }

        .like {
          color: #e23e4e;
          font-family: Avenir, Helvetica, Arial, sans-serif;
          font-weight: bold;
          font-family: 'uchiyama';
        }

      }
      // z-index: 10;
    }

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
      box-shadow: 0 .25rem .25rem hsla(0, 0%, 0%, .1);
      background-image:
      linear-gradient(180deg, hsla(0, 0%, 45%, .1) 2rem, hsla(0, 100%, 100%, 0) 2.5rem),
      linear-gradient(180deg, hsla(200, 100%, 85%, 1), hsla(200, 100%, 85%, 1));
      font-size: 1.125rem;
      line-height: 1.8;
      border-radius: 5px;
      animation: fadeInUp;
      animation-name: card;

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

        .likes {
          position: relative;
          .likes-icon {
            width: 100px;
            height: 100px;
            background: url(http://nelog.jp/wp-content/uploads/2016/03/heart_animation.png) no-repeat;
            background-position: 0 0;
            cursor: pointer;
          }
          .nowstock {
            background-position: -2800px 0;
            -webkit-transition: background 1s steps(28);
            transition: background 1s steps(28);
          }
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
@keyframes card { /*animetion-nameで設定した値を書く*/

  0% {opacity: 0} /*アニメーション開始時は不透明度0%*/

  100% {opacity: 1} /*アニメーション終了時は不透明度100%*/

}




</style>

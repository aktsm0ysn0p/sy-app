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
      <div>
        <transition-group class="quote-wrapper"  tag="div">
          <QuoteCard
            class="quote-card"
            v-for="quoteItem in quotes"
            :key= "quoteItem.lid"
            :quoteItem="quoteItem"
            :stocks="stocks"
            @addStock="addStock"
            @deleStock="deleStock"
          />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import Navber from '../../components/TheNavber'
import QuoteCard from '../../components/TheQuoteCard'
export default {
  name: 'Home',
  components: {
    Navber,QuoteCard
  },
  computed: {
    quotes() {
    return this.$store.getters['Lists/getterLists']
    },
    stocks() {
      return this.$store.getters['Stocks/getterStocks']
    },
  },
  methods: {
    addStock(id) {
      this.$store.dispatch('Stocks/addData', id);
    },
    deleStock(id) {
      this.$store.dispatch('Stocks/deleData', id);
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

.lists-page {
  color: #2c3e50;
  background: #F5F5F5;
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
      box-shadow: 0 .25rem .25rem hsla(0, 0%, 0%, .1);
      background-image:
      linear-gradient(180deg, hsla(0, 0%, 45%, .1) 2rem, hsla(0, 100%, 100%, 0) 2.5rem),
      linear-gradient(180deg, hsla(200, 100%, 85%, 1), hsla(200, 100%, 85%, 1));
      // background-image: url("../../assets/svg/mokomoko.svg");
      font-size: 1.125rem;
      line-height: 1.8;
      border-radius: 5px;
      transform: scale(0);
      animation-fill-mode: forwards;
      transition: all 1s;
    }
  }
}

</style>

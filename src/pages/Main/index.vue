<template>
  <div class="lists-page">
    <Navber />
    <div class="container">
      <div class="img-wrapper">
        <div class="img-text">
          <h1 class="title">Famous quotes</h1>
          <p class="title">前向きな気持ちになれる著名人の名言をまとめました。<br><span class="like">Like♡</span>ボタンから、あなたのお気に入りリストを作ってみよう。</p>
        </div>
        <div class="img-container">
          <img src="../../assets/img/gohho_left.png" class="quote-img left">
          <img src="../../assets/img/Einstein_right.png" class="quote-img right">
        </div>
      </div>
      <div>
        <div class="quote-wrapper">
          <QuoteCard
            v-for="quoteItem in quotes"
            :key= "quoteItem.lid"
            :quoteItem="quoteItem"
            :stocks="stocks"
            @addStock="addStock"
            @deleStock="deleStock"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navber from '../../components/TheNavber'
import QuoteCard from '../../components/TheQuoteCard'
// import gsap from "gsap"
export default {
  name: 'Home',
  components: {
    Navber,
    QuoteCard,
  },
  computed: {
    quotes() {
    return this.$store.getters['Lists/lists']
    },
    stocks() {
      return this.$store.getters['Stocks/stocks']
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
@keyframes SlideIn {
  0% {
    opacity: 0;
    transform: translateY(-64px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes imgAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes rightSlider {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes leftSlider {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
  animation: SlideIn 1.7s;
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
    .img-container {
      display: flex;
      max-width: 700px;
      padding-bottom: 10px;
      margin: 0 auto;
      align-items: flex-start;
      justify-content: space-around;

    }
    .quote-img {
      display: block;
      width: 50%;
      max-width: 300px;
      animation: imgAnimation 1.5s ease 0s 1 normal;
      opacity: .8;
    }
    .right {
      animation: rightSlider 1.7s;
    }
    .left {
      animation: leftSlider 1.7s;
    }
    .img-text {
      margin: 0 auto;
      width: 80%;
      max-width: 800px;
      padding: 20px 0;
      h1 {
        text-align: center;
        padding: 1rem 0;
        font-family: 'uchiyama';
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
  }
}
</style>

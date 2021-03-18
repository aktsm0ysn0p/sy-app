<template>
  <div class="lists-page">
    <Navber />
    <div class="container">
      <div class="img-wrapper">
        <div class="img-text">
          <h1 class="title">Famous quotes</h1>
          <p class="title">前向きな気持ちになれる著名人の名言をまとめました。<br><span class="like">Like♡</span>ボタンから、あなたのお気に入りリストを作ってみよう。</p>
        </div>
        <img src="../../assets/img/IMG_4392.png" alt="" class="quote-img">
      </div>
      <div>
        <!-- <div class="sample">
          <div class="left-btn" @click="isLeft">left</div>
          <div class="nakami">
            <SliderQuoteCard
            :quoteItem="quotes[current]"
            :stocks="stocks"
            @addStock="addStock"
            @deleStock="deleStock"
          />

          </div> -->
          <!-- <div class="right-btn" @click="isRight">right</div>
        </div> -->
        <div class="quote-wrapper">
          <!-- <div class="backimg"> -->
          <QuoteCard
            v-for="quoteItem in quotes"
            :key= "quoteItem.lid"
            :quoteItem="quoteItem"
            :stocks="stocks"
            @addStock="addStock"
            @deleStock="deleStock"
          />
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navber from '../../components/TheNavber'
import QuoteCard from '../../components/TheQuoteCard'
// import SliderQuoteCard from '../../components/SliderQoteCard'
export default {
  name: 'Home',
  components: {
    Navber,
    QuoteCard,
    // SliderQuoteCard
  },
  computed: {
    quotes() {
    return this.$store.getters['Lists/getterLists']
    },
    stocks() {
      return this.$store.getters['Stocks/getterStocks']
    },
  },
  data() {
    return {
      // current: 0
    }
  },
  methods: {
    addStock(id) {
      this.$store.dispatch('Stocks/addData', id);
    },
    deleStock(id) {
      this.$store.dispatch('Stocks/deleData', id);
    },
    // isLeft() {
    //   this.current --
    //   if (this.current < 0) {
    //     this.current = this.quotes.length -1
    //   }
    // },
    // isRight() {
    //   this.current ++
    //   if (this.current === this.quotes.length) {
    //     this.current = 0
    //   }
    // }
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
.title {
  animation: SlideIn 1.7s;
}

// .sample {
//   background: pink;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   .nakami {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     min-width: 500px;
//     // width: 235px;
//     // min-height: 60vh;
//     // padding: 1rem 1rem 0;
//     // margin: 10px 0;
//     // position: relative;
//     // font-size: 1.125rem;
//     // vertical-align: top;
//     // display: inline-block;
//     // color: #4b453c;
//     // background: #F7E999;
//     // line-height: 1.8;
//     // box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
//     // width: 235px;
//   }
//   .left-btn, .right-btn {
//     padding: 10px;
//     border-radius: 50%;
//     background: skyblue;
//     &:hover {
//       opacity: .5;
//     }
//   }
// }

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
      animation: imgAnimation 1.5s ease 0s 1 normal;
      opacity: .8;
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
        // font-family: 'zatsu';
        // font-family: 'shunnka';
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
      // display: flex;
      // flex-direction: column;
      // align-items: center;
      // // max-height: 100vh;
      // // position: fixed;
    }
  }
}
// .backimg {
//   width: 235px;
//   min-height: 50vh;
//   padding: 1rem 1rem 0;
//   margin: 10px 0;
//   position: relative;
//   font-size: 1.125rem;
//   vertical-align: top;
//   display: inline-block;
//   color: #4b453c;
//   background: #F7E999;
//   line-height: 1.8;
//   // transform: rotate(1deg);
//   // text-align: center;
//   box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
//   // position: relative;
// }
</style>

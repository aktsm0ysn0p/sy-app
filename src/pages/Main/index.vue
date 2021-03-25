<template>
  <div class="lists-page">
    <Navber />
    <div class="container">
      <div class="title-wrapper">
        <div class="title-inner">
          <div class="text-container">
            <h1 class="title">Famous quotes</h1>
          </div>
          <img src="../../assets/img/gohho_left.png" class="quote-img left">
          <img src="../../assets/img/Einstein_right.png" class="quote-img right">
        </div>
      </div>
      <SubTitle />
      <!-- <img src="../../assets/img/clip2.png" alt=""> -->
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
import SubTitle from '../../components/TheSubTitle'
import QuoteCard from '../../components/TheQuoteCard'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'


// gsap.registerPlugin(ScrollTrigger)


export default {
  name: 'Home',
  components: {
    Navber,
    QuoteCard,
    SubTitle
  },
  computed: {
    quotes() {
    return this.$store.getters['Lists/lists']
    },
    stocks() {
      return this.$store.getters['Stocks/stocks']
    },
  },
  mounted(){
    // this.scrollItem()
  },
  methods: {
    // scrollItem() {
    //   gsap.to('.a', {
    //     x: 50,
    //     // rotation: 90,
    //     duration: 2,
    //     scrollTrigger: {
    //       trigger: '.a',
    //       start: 'center center',
    //       markers: true
    //     }
    //   })
    // },
    addStock(id) {
      this.$store.dispatch('Stocks/addData', id);
    },
    deleStock(id) {
      console.log(id)
      this.$store.dispatch('Stocks/clickdeleData', id);
    },
  },
}
</script>

<style lang="scss">
//タイトル左＿向かい合わせ
.a {
  background: pink;
  width: 200px;
  height: 200px;
}
@function get_vw($size, $viewport:320){
  $rate: 100 / $viewport;
  @return $rate * $size * 1vw;
}
@mixin fz_vw($font_size:10){
  font-size: $font_size * 1px;
  font-size: get_vw($font_size);
}
@keyframes TitleSlideIn {
  0% {
    opacity: 0;
    transform: translateY(-40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes TitleSlideInMobile {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes rightSlider {
  0% {
    opacity: 0;
    transform: translateX(-25px);
  }
  100% {
    opacity: .7;
    transform: translateY(0);
  }
}
@keyframes leftSlider {
  0% {
    opacity: 0;
    transform: translateX(25px);
  }
  100% {
    opacity: .7;
    transform: translateY(0);
  }
}
.title {
  animation: TitleSlideIn 2.5s;
  animation-timing-function: ease;
  animation-delay: 1.5s;
  animation-fill-mode: forwards;
  @media (max-width: 480px) {
      animation: TitleSlideInMobile 2s;
      animation-delay: 1s;
      animation-fill-mode: forwards;
      animation-timing-function: ease;
  }
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
    .title-wrapper {
      height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
      @media (max-width: 480px) {
        height: 200px;
      }
      .title-inner {
        display: flex;
        margin: 0 auto;
        align-items: flex-start;
        justify-content: space-between;
        align-items: center;
      }
      .text-container {
        margin: 0 auto;
        width: 80%;
        max-width: 800px;
        padding: 20px 0;
        order: 1;
        @media (max-width: 480px) {
        order: 2;
      }
        //タイトル左＿向かい合わせ  order: 1;
        //タイトルセンター order: 2;
        h1 {
          text-align: center;
          padding: 1rem 0;
          font-family: 'uchiyama';
          opacity: 0;

          @include fz_vw(20);
          @media (min-width: 768px) {
            font-size: 60px;
          }
        }
      }
    }
    .quote-img {
      display: block;
      width: 25%;
      max-width: 300px;
      opacity: 0;
      @media (max-width: 480px) {
        width: 32%;
      }
    }
    .right {
      animation: rightSlider 1.5s ease .5s  normal;
      animation-fill-mode: forwards;
      order: 3;
      @media (max-width: 480px) {
      }

    }
    .left {
      animation: leftSlider 1.5s ease .5s normal;
      animation-fill-mode: forwards;
      order: 2;
      //タイトル左＿向かい合わせ  order: 2;
      //タイトルセンター order: 1;
      @media (max-width: 480px) {
        order: 1;
      }
    }
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
// //  スマホ縦↓
// @media screen and (max-width: 480px) {
//     .img-wrapper {
//     height: 300px;
//   }
// }





</style>

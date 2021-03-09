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
        <transition-group class="quote-wrapper" name="list" tag="div">
          <div class="quote-card" v-for="list in lists" :key= "list.lid">
            <div :class="{fadeIn: visible}" >
              <h3 class="frame-box-001">{{list.title}}</h3>
              <div class="bottom-wrapper">
                <div class="likes">
                  <div class="likes-icon" @click="checkStock(list.lid)" :class="{nowstock : stocks.find(stock=> stock === list.lid)}"><font-awesome-icon icon="heart"/>
                  </div>
                  <div class="ripple"  :class="{clickrepple : stocks.find(stock=> stock === list.lid) }"></div>
                </div>
                <div class="text-wrapper">
                  <p>{{list.name}}</p>
                  <p>{{list.since}}</p>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import Navber from '../../components/TheNavber'

export default {

  name: 'Home',

  data() {
    return {
      visible: false,
    }
  },

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

    handleScroll() {
      if (!this.visible) {
        let top = this.$el.getBoundingClientRect().top
        this.visible = top < window.innerHeight + 100
      }
    }

  },

  created() {
    window.addEventListener("scroll", this.handleScroll)
  },

  destroyed() {
      window.removeEventListener("scroll", this.handleScroll);
    },


}

</script>

<style lang="scss">

.fadeIn {
  animation: fadeIn 2s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@function get_vw($size, $viewport:320){
  $rate: 100 / $viewport;
  @return $rate * $size * 1vw;
}

@mixin fz_vw($font_size:10){
  font-size: $font_size * 1px;
  font-size: get_vw($font_size);
}

@keyframes heart {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      color: #dd4646;
    }
}
@keyframes repple {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
}

$bar-style: solid;
$bar-size: 2px;
$bar-color: #ffffff;

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

      transition: all 1s;
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
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          .likes-icon {
            width: 50px;
            height: 50px;
            color: #bdbebd;
            font-size: 1.7em;
            text-align: center;
            position: relative;
            z-index: 1;
            border-radius: 50%;
            transition: all .7s;
            left: 1.5px;
            @media (min-width: 768px){
              &:hover {
                background: pink;
              }
            }

          }
          .nowstock {
            animation-name: heart;
            animation-duration: .6s;
            animation-fill-mode: forwards;
          }
          .ripple {
            position: absolute;
            width: 85px;
            height: 85px;
            background: #dd4646;
            border-radius: 50%;
            transform: scale(0);
          }
          .clickrepple {
            animation-name: repple;
            animation-duration: .6s;
            animation-fill-mode: forwards;
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
    .list-enter,
    .list-leave-to {
      opacity: 0;
      transform: translateY(100px);
    }
    .list-leave-active {
      position: absolute;
    }

  }


}




</style>

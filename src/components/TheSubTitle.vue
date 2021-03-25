<template>
  <div class="sub-title-wrapper">
    <div class="sub-text-container">
      <p :class="{'sub-title-item': fadeIn}" class="fade1">前向きな気持ちになれる<br></p>
      <p :class="{'sub-title-item': fadeIn}" class="fade2">著名人の名言をまとめました。<br></p>
        <span class="like">
          <span :class="{'like-animation': fadeIn}"  class="l">L</span>
          <span :class="{'like-animation': fadeIn}"  class="i">I</span>
          <span :class="{'like-animation': fadeIn}"  class="k">K</span>
          <span :class="{'like-animation': fadeIn}"  class="e">E</span>
          <span :class="{'like-animation': fadeIn}"  class="h">♡</span>
        </span>
        <p :class="{'sub-title-item': fadeIn}" class="fade3">ボタンから<br></p>
      <p :class="{'sub-title-item': fadeIn}" class="fade4">あなたのお気に入りリストを作ってみよう。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubTitle',
  data() {
    return {
      fadeIn: false,
    }
  },
  created() {
    window.addEventListener("scroll", this.homeScroll)
  },
  destroyed() {
    window.removeEventListener("scroll", this.homeScroll)
  },
  methods: {
    homeScroll() {
      if (!this.fadeIn) {
        let top = this.$el.getBoundingClientRect().top
        this.fadeIn = top < window.innerHeight + 50;
      }
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
// @keyframes lineSlideIn {
//   0% { opacity: 0; }
//   100% { opacity: .8; }
// }
@keyframes SubTitleSlideIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0px); }
}
@keyframes likeSlideIn {
  0%   { transform: scale(1.0, 1.0) translate(0%, 0%) translateY(100px);  }
  15%  { transform: scale(0.9, 0.9) translate(0%, 5%); }
  30%  { transform: scale(1.3, 0.8) translate(0%, 10%); }
  50%  { transform: scale(0.8, 1.3) translate(0%, -10%); }
  70%  { transform: scale(1.1, 0.9) translate(0%, 5%); }
  100% { transform: scale(1.0, 1.0) translate(0%, 0%) translateY(0px); opacity: 1; }
}
.sub-title-item {
  animation: SubTitleSlideIn 1.5s;
  animation-fill-mode: forwards;
  @media (max-width: 480px) {
    animation: SubTitleSlideIn 1s;
    animation-fill-mode: forwards;
  }
}
.like-animation {
  animation: likeSlideIn 1s linear 0s 1;
  animation-fill-mode: forwards;
}
.fade1 { animation-delay: 1s; opacity: 0; }
.fade2 { animation-delay: 1.5s; opacity: 0; }
.fade3 { animation-delay: 2.8s; opacity: 0; display: inline-block; }
.fade4 { animation-delay: 2.9s; opacity: 0; }

.l { animation-delay: 2.1s; opacity: 0; }
.i { animation-delay: 2.2s; opacity: 0; }
.k { animation-delay: 2.3s; opacity: 0; }
.e { animation-delay: 2.4s; opacity: 0; }
.h { animation-delay: 2.7s; opacity: 0; }

.sub-title-wrapper {
  // height: 280px;
  @media (max-width: 480px) {
    // height: 150px;
    // display: block;
  }
  .sub-text-container {
    margin: 0 auto 150px;
    width: 80%;
    max-width: 800px;
    padding: 20px 0;
    text-align: center;
    @media (max-width: 480px) {
      margin: 0 auto 100px;
    }
    p {
      text-align: center;
      font-family: 'Palatino Roman';
      line-height: 2.5;
      @include fz_vw(13);
      @media (min-width: 480px) {
        font-size: 22px;

      }
      @media (min-width: 767px) {
        font-size: 27px;
      }

    }
    .like {
      text-align: center;
      color: #e23e4e;
      font-weight: bold;
      font-family: 'uchiyama';
      @media (min-width: 480px) {
        font-size: 22px;
      }
      @media (min-width: 767px) {
        font-size: 27px;
      }
    }
    span {
      display: inline-block;
    }
  }
}
// .box17{
//     margin:2em 0;
//     position: relative;
//     padding: 0.5em 1.5em;
//     border-top: solid 1px #2c3e50;
//     border-bottom: solid 1px #2c3e50;
//     animation: lineSlideIn 3s;
//       animation-delay: 1.5s;
//   animation-fill-mode: forwards;
//   opacity: 0;
//   @media (max-width: 480px) {
//     animation: lineSlideIn 1s;
//     animation-fill-mode: forwards;
//   }
// }
// .box17:before, .box17:after{
//     content: '';
//     position: absolute;
//     top: -10px;
//     width: 2px;
//     height: -webkit-calc(100% + 20px);
//     height: calc(100% + 20px);
//     background-color: #2c3e50;
// }
// .box17:before {left: 10px;}
// .box17:after {right: 10px;}
// .box17 p {
//     margin: 0;
//     padding: 0;
// }
</style>

<template>
  <div class="sample" :class="[overlapColor(quoteItem.lid),{fadeIn: visible}]">
    <div :class="[selectColor(quoteItem.lid),{fadeIn: visible}]"  class="quote-card" >
      <h3 class="frame-box-001">{{quoteItem.title}}</h3>
      <div class="bottom-wrapper">
        <div class="btn-container">
          <div class="likes">
            <div class="likes-icon" @click="stockIconClicked(quoteItem.lid)" :class="{'nowstock': isStocked}"><font-awesome-icon icon="heart"/>
            </div>
            <div class="ripple" :class="{'clickRipple' : isStocked}"></div>
          </div>
        </div>
        <div class="text-container">
          <p>{{quoteItem.name}}</p>
        </div>
      </div>
      <img src="../assets/img/clip2.png" class="clip" :class="{clipFadeIn: visible}">
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuoteCard',
  props: {
    quoteItem: Object,
    stocks: Array,
  },
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    isStocked() {
      return this.stocks.find(stock=> stock === this.quoteItem.lid)
    },
    selectColor() {
      return function (id) {
        if (id % 4 === 0) {
          return 'green'
        } else if (id % 4 === 3 || id === 3) {
          return 'pink'
        } else if (id % 4 === 2 || id === 2) {
          return 'blue'
        } else if(id % 4 === 1 || id === 1) {
          return 'yellow'
        }
      }
    },
    overlapColor() {
      return function (id) {
        if (id % 4 === 0) {
          return 'overlap-green'
        } else if (id % 4 === 3 || id === 3) {
          return 'overlap-pink'
        } else if (id % 4 === 2 || id === 2) {
          return 'overlap-blue'
        } else if(id % 4 === 1 || id === 1) {
          return 'overlap-yellow'
        }
      }
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll)
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll)
  },
  methods: {
    stockIconClicked(id) {
      const target = this.stocks.find(stock => stock === id);
      console.log('kitataaa');
      target ? this.$emit('deleStock', id) : this.$emit('addStock', id) ;
    },
    handleScroll() {
      if (!this.visible) {
        let top = this.$el.getBoundingClientRect().top
        this.visible = top < window.innerHeight + 5;
      }
    },
  },
}
</script>

<style lang="scss">
$bar-style: solid;
$bar-size: 2px;
$bar-color: #ffffff;
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
@keyframes clipFadeIn {
  0% {
    opacity: 0;
    top: -130px;
  }
  100% {
    opacity: 1;
    top: -75px;
  }
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
@keyframes sample {
  0% {
    opacity: 0;

  }
  100% {
    opacity: 1;
    width: 130px;
  }
}
.fadeIn {
  animation: fadeIn 1s;
  animation-delay: .5s;
  animation-fill-mode: forwards;
}
.clipFadeIn {
  animation: clipFadeIn 1.5s;
  animation-delay: .7s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}
.sample {
  opacity: 0;
}
.quote-card {
  width: 235px;
  min-height: 235px;
  padding: 1rem 1rem 0;
  margin: 10px 0 80px;
  position: relative;
  font-size: 1.125rem;
  vertical-align: top;
  display: inline-block;
  color: #4b453c;
  line-height: 1.8;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  transform: scale(0);
  animation-fill-mode: forwards;
  transition: all 1s;
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
.clickRipple {
  animation-name: repple;
  animation-duration: .6s;
  animation-fill-mode: forwards;
}
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
}
.btn-container {
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
  }
}
.text-container {
  display: flex;
  flex-direction: column-reverse;
  // justify-content: space-between;
  padding: 1rem 0;
  p {
    font-size: .8em;
    text-align: center;
  }
}

.clip {
  position: absolute;
  width: 90px;
  display: block;
  top: -75px;
  left: 75px;
  opacity: 0;
}
.yellow {
  background: #F7E999;
}
.blue {
  background: #b9dcf4;
}
.pink {
  background: #FFBDA3;
}
.green {
  background: #CAF4B9;
}
.overlap-yellow {
  position: relative;
  z-index: 10;
  width: 235px;
  min-height: 235px;
    &::before, &::after {
    content: "";
    width: 100%;
    height: 75%;
    position: absolute;
    border: 120px solid #F7E999;
    left: 0;
    box-sizing: border-box;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    transition: 0.3s all ease-out;
  }
  &::before {
    transform: rotate(2deg);
    top: 1rem;
    z-index: -10;
  }
  &::after {
    transform: rotate(-2deg);
    top: 1rem;
    z-index: -20;
  }
}
.overlap-blue {
  position: relative;
  z-index: 10;
  width: 235px;
  min-height: 235px;
    &::before, &::after {
    content: "";
    width: 100%;
    height: 75%;
    position: absolute;
    border: 120px solid #b9dcf4;
    left: 0;
    box-sizing: border-box;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    transition: 0.3s all ease-out;
  }
  &::before {
    transform: rotate(2deg);
    top: 1rem;
    z-index: -10;
  }
  &::after {
    transform: rotate(-2deg);
    top: 1rem;
    z-index: -20;
  }
}
.overlap-pink {
  position: relative;
  z-index: 10;
  width: 235px;
  min-height: 235px;
    &::before, &::after {
    content: "";
    width: 100%;
    height: 75%;
    position: absolute;
    border: 120px solid #FFBDA3;
    left: 0;
    box-sizing: border-box;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    transition: 0.3s all ease-out;
  }
  &::before {
    transform: rotate(2deg);
    top: 1rem;
    z-index: -10;
  }
  &::after {
    transform: rotate(-2deg);
    top: 1rem;
    z-index: -20;
  }
}
.overlap-green {
  position: relative;
  z-index: 10;
  width: 235px;
  min-height: 235px;
    &::before, &::after {
    content: "";
    width: 100%;
    height: 75%;
    position: absolute;
    border: 120px solid #CAF4B9;
    left: 0;
    box-sizing: border-box;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    transition: 0.3s all ease-out;
  }
  &::before {
    transform: rotate(2deg);
    top: 1rem;
    z-index: -10;
  }
  &::after {
    transform: rotate(-2deg);
    top: 1rem;
    z-index: -20;
  }
}
</style>

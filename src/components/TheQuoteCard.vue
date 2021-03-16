<template>
  <div :class="{fadeIn: visible}" class="quote-card" >
    <!-- <SampleLog /> -->
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
        <p>{{quoteItem.since}}</p>
      </div>
    </div>

  </div>
</template>

<script>
// import SampleLog from '../assets/svg/mokomoko.svg'
export default {
  name: 'QuoteCard',
  // components: {
  //   SampleLog
  // },
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
    }
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
      target ? this.$emit('deleStock', id) : this.$emit('addStock', id) ;
    },
    handleScroll() {
      if (!this.visible) {
        let top = this.$el.getBoundingClientRect().top
        this.visible = top < window.innerHeight + 50;
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
.fadeIn {
  animation: fadeIn 1.5s;
}

.quote-card {
  padding: 1rem 1rem 0;
  box-shadow: 0 .25rem .25rem hsla(0, 0%, 0%, .1);
  background-image:
  linear-gradient(180deg, hsla(0, 0%, 45%, .1) 2rem, hsla(0, 100%, 100%, 0) 2.5rem),
  linear-gradient(180deg, hsla(200, 100%, 85%, 1), hsla(200, 100%, 85%, 1));

  font-size: 1.125rem;
  line-height: 1.8;
  border-radius: 5px;
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
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0;
  p {
    font-size: .8em;
    text-align: center;
  }
}
</style>

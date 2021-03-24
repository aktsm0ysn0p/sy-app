<template>
  <div :class="[selectClass(quoteItem.lid),{fadeIn: visible}]"  class="quote-card" >
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
        <!-- <p>{{quoteItem.since}}</p> -->
      </div>
    </div>
    <div class="pin"></div>
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
    selectClass() {
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
        console.log()
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
}
.sample {
  // &:before {
  //   animation: sample 3.7s;
  // }
}

.pin {
  position: absolute;
  top: 0;
  left: 10;

}
.quote-card {
  width: 235px;
  min-height: 235px;
  padding: 1rem 1rem 0;
  margin: 10px 0;
  position: relative;
  font-size: 1.125rem;
  vertical-align: top;
  display: inline-block;
  color: #4b453c;
  // background: #F7E999;
  line-height: 1.8;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  position: relative;

  transform: scale(0);
  animation-fill-mode: forwards;
  transition: all 1s;
  // &:before {
  //   animation-fill-mode: forwards;
  //   width: 0px;
  //   // width: 130px;
  //   display: block;
  //   content: "";
  //   background: rgba(227, 200, 114, 0.4);
  //   height: 28px;
  //   box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  //   border-radius: 6px/18px 0;
  //   position: absolute;
  //   top: -13px;
  //   left: 50px;
  //   -webkit-transform: rotate(-2deg);
  //   -moz-transform: rotate(-2deg);
  //   -o-transform: rotate(-2deg);
  //   -ms-transform: rotate(-2deg);
  //   transform: rotate(-2deg);
  // }
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
</style>

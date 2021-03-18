<template>
  <div :class="selectClass(quoteItem.lid)" class="slider-quote-card" >
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

export default {
  name: 'SliderQuoteCard',
  props: {
    quoteItem: Object,
    stocks: Array,
  },
  data() {
    return {
      // visible: false,
    }
  },
  computed: {
    isStocked() {
      return this.stocks.find(stock=> stock === this.quoteItem.lid)
    },
    selectClass() {
      return function (id) {
        if (id % 4 === 0) {
          return 'slider-green'
        } else if (id % 4 === 3 || id === 3) {
          return 'slider-pink'
        } else if (id % 4 === 2 || id === 2) {
          return 'slider-blue'
        } else if(id % 4 === 1 || id === 1) {
          return 'slider-yellow'
        }
      }
    },
  },
  methods: {
    stockIconClicked(id) {
      const target = this.stocks.find(stock => stock === id);
      target ? this.$emit('deleStock', id) : this.$emit('addStock', id) ;
    },
  },
}
</script>

<style lang="scss">
$bar-style: solid;
$bar-size: 2px;
$bar-color: #ffffff;
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

.slider-quote-card {
  width: 235px;
  // min-height: 235px;
  height: 300px;
  padding: 1rem 1rem 0;
  margin: 10px 0;
  position: relative;
  font-size: 1.125rem;
  vertical-align: top;
  display: inline-block;
  color: #4b453c;
  line-height: 1.8;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);

  // // transform: scale(0);
  // animation-fill-mode: forwards;
  // transition: all 1s;

  &:before, &:after {
    content: "";
    height: 98%;
    position: absolute;
    width: 100%;
    z-index: -1;
  }
  &:before {
    background: #FFBDA3;
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
    left: -5px;
    top: 4px;
    transform: rotate(-2.5deg);
  }
  &:after {
    background: #CAF4B9;
    box-shadow: 0 0 3px rgba(0,0,0,0.2);
    right: -3px;
    top: 1px;
    transform: rotate(1.4deg);
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

.slider-yellow {
  background: #F7E999;
}

.slider-blue {
  background: #b9dcf4;
}

.slider-pink {
  background: #FFBDA3;
}

.slider-green {
  background: #CAF4B9;
}
</style>

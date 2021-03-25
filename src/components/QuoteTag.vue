<template>
  <div class="quote-tag" :class="selectClass(stockItem.lid)">
    <h3 class="frame-box-001">{{stockItem.title}}</h3>
      <div class="bottom-wrapper">
        <div class="text-wrapper">
          <p>{{stockItem.name}}</p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'QuoteTag',
  props: {
    stockItem: Object,
  },
  computed: {
    selectClass() {
      return function (id) {
        if (id % 4 === 0) {
          return 'note-green'
        } else if (id % 4 === 3 || id === 3) {
          return 'note-pink'
        } else if (id % 4 === 2 || id === 2) {
          return 'note-blue'
        } else if(id % 4 === 1 || id === 1) {
          return 'note-yellow'
        }
      }
    },
  }
}
</script>

<style lang="scss">
$bar-style: solid;
$bar-size: 2px;
$bar-color: #ffffff;
.quote-tag {
  width: 235px;
  min-height: 235px;
  padding: 1rem 1rem 0;
  margin: 10px 0;
  position: relative;
  font-size: 1.125rem;
  vertical-align: top;
  display: inline-block;
  color: #4b453c;
  line-height: 1.8;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  &:before {
    display: block;
    content: "";
    background: rgba(227, 200, 114, 0.4);
    width: 130px;
    height: 28px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    border-radius: 6px/18px 0;
    position: absolute;
    top: -13px;
    left: 50px;
    -webkit-transform: rotate(-2deg);
    -moz-transform: rotate(-2deg);
    -o-transform: rotate(-2deg);
    -ms-transform: rotate(-2deg);
    transform: rotate(-2deg);
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
    justify-content: flex-end;
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

.note-yellow {
  background: #F7E999;
  -webkit-transform: rotate(2deg);
  -moz-transform: rotate(2deg);
  -o-transform: rotate(2deg);
  -ms-transform: rotate(2deg);
  transform: rotate(2deg);
}

.note-blue {
  background: #b9dcf4;
  -webkit-transform: rotate(-2deg);
  -moz-transform: rotate(-2deg);
  -o-transform: rotate(-2deg);
  -ms-transform: rotate(-2deg);
  transform: rotate(-2deg);
}

.note-pink {
  background: #FFBDA3;
  -webkit-transform: rotate(1deg);
  -moz-transform: rotate(1deg);
  -o-transform: rotate(1deg);
  -ms-transform: rotate(1deg);
  transform: rotate(1deg);
}

.note-green {
  background: #CAF4B9;
  -webkit-transform: rotate(-1deg);
  -moz-transform: rotate(-1deg);
  -o-transform: rotate(-1deg);
  -ms-transform: rotate(-1deg);
  transform: rotate(-1deg);
}

</style>

<template>
  <div :class="{fadeIn: visible}" >
    <h3 class="frame-box-001">{{quoteItem.title}}</h3>
    <div class="btn-wrapper">
      <div class="likes">
        <div class="likes-icon" @click="stockIconClicked(quoteItem.lid)" :class="acitiveStock"><font-awesome-icon icon="heart"/>
        </div>
        <div class="ripple" :class="activeClass"></div>
      </div>
      <div class="text-wrapper">
        <p>{{quoteItem.name}}</p>
        <p>{{quoteItem.since}}</p>
      </div>
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
    activeClass() {
      return {
        clickrepple : this.stocks.find(stock=> stock === this.quoteItem.lid)
      }
    },
    acitiveStock() {
      return {
        nowstock : this.stocks.find(stock=> stock === this.quoteItem.lid)
      }
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

<style scoped>
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
.fadeIn {
  animation: fadeIn 1.5s;
}
</style>

<template>
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
</template>

<script>
export default {

  name: 'QuoteCard',

  props: {
    list: Object,
    stocks: Array,
  },

  data() {
    return {
      visible: false,
    }
  },

  methods: {

    checkStock(id) {
      const target = this.stocks.find(stock => stock === id);
      target ? this.$emit('dele', id) : this.$emit('add', id) ;
    },

    handleScroll() {
      if (!this.visible) {
        let top = this.$el.getBoundingClientRect().top
        this.visible = top < window.innerHeight + 100;
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

<style scoped>
.fadeIn {
  animation: fadeIn 1.5s;
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
</style>

<template>
  <div class="quote-wrapper">
    <div class="quote-card" v-for="meigenn in meigenns" :key= "meigenn.id">
      <h3>{{meigenn.title}}</h3>
      <span @click="onStock(meigenn.id)" :class="{nowstock : meigenn.stock}">○</span>
      <p>{{meigenn.since}}{{meigenn.name}}</p>
    </div>
  </div>
</template>

<script>
// import BaseLayout from './BaseLayout';
export default {
  props: {
    meigenns: Array
  },
  data() {
    return {
      isStock: false
    }
  },
  methods: {
    onStock(num) {
      const stock = {id: num};
      this.$emit('emiting', stock)
      // console.log(stock);
    }
  }


}
</script>

<style scoped>
.quote-card {
  padding: 20px;
  margin: 10px 0;
  border: solid 1px #5ABD57;
  background-color: #A9F791;
}
h3 {
  text-align: center;
  font-size: .8rem;
}
p {
  float: right;
  font-size: .8em;
}
span {
  cursor: pointer;
}
.nowstock {
  font-weight: bold;
  background: pink;
}

</style>

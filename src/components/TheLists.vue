<template>
  <div class="quote-wrapper">
    <div class="quote-card" v-for="list in chilLists" :key= "list.id" >
      <h3>{{list.title}}</h3>
      <span @click="onStock(list.id)" :class="{nowstock : chilFolders.find(folder => folder.id === list.id)}">○</span>
      <p>{{list.since}}{{list.name}}</p>
    </div>
  </div>
</template>

<script>
// import BaseLayout from './BaseLayout';
export default {
  props: {
    chilLists: {
      type: Array,
      required: true,
    },
    chilFolders: {
      type: Array,
      required: true,
    }
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

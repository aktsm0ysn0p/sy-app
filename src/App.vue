<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {

  created() {
    this.$store.dispatch('Lists/start');
    this.$store.dispatch('Stocks/start');
    this.$store.dispatch('Folders/start')
    console.log('Appで全部取得！！');
  }
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
}
.active {
  color: red;
}
nav {
  text-align: center;
}
nav > ul {
  display: flex;
  justify-content: space-around;
}
ul {
  list-style: none;
  padding: 0;
}
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  appearance: none;
}
</style>

<template>
  <div id="app">
    <TheHeader />
    <nav>
      <ul>
        <li><button @click="tabClick(1)" :class="{active : isSelect === 1}">●</button></li>
        <li><button @click="tabClick(2)" :class="{active : isSelect === 2}">☆</button></li>
      </ul>
    </nav>
    <BaseLayout :active="isSelect" />
  </div>
</template>

<script>

import TheHeader from './components/TheHeader';
import BaseLayout from './components/BaseLayout';


export default {
  components: {
    TheHeader, BaseLayout,
  },
  data() {
    return {
      isSelect: 1,
    }
  },
  methods: {
    tabClick(number) {
      this.isSelect = number;
    }
  }

}
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
  color: #2c3e50;
  margin-top: 60px;
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
button{
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  appearance: none;
}
</style>

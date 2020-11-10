<template>
  <div class="lists-page">
    <TheHeader />
    <nav>
      <ul>
        <li><router-link to="/">●</router-link></li>
        <li><router-link to="/stocks">☆</router-link></li>
        <li><router-link to="/folders">▲</router-link></li>
      </ul>
    </nav>
    <div class="container">
      <div class="quote-wrapper">
        <div class="quote-card" v-for="list in lists" :key= "list.id">
          <h3>{{list.title}}</h3>
          <span @click="setStock(list.id)" :class="{nowstock : folders.find(folder=> folder.id === list.id)}">○</span>
          <p>{{list.since}}{{list.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import TheHeader from '../../components/TheHeader';
import { mapState } from 'vuex';


export default {
  name: 'Home',
  components: {
    TheHeader,
  },
  computed: {
    ...mapState(['lists']),
    ...mapState(['folders'])
  },
  methods: {
    setStock(id) {
      this.$store.commit('setStock', id);
    }
  }
}

</script>

<style>

.lists-page {
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  width: 90%;
  margin: 10vh auto;
}
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

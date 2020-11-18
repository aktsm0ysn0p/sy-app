<template>
  <div class="folders-page" v-if="folders">
    <TheHeader />
    <nav>
      <ul>
        <li><router-link to="/">●</router-link></li>
        <li><router-link to="/stocks">☆</router-link></li>
        <li><router-link to="/folders">▲</router-link></li>
      </ul>
    </nav>
    <div class="container">
      <div class="inner">
        <span class="inner-title">フォルダ一覧</span>
        <input type="text" v-model="inputValue">
        <button @click="addFolder">add</button>
          <div class="inner-folder">
            <div v-if="folders.length">
              <div class="quote-card" v-for="myfolder in folders" :key= "myfolder.fid">
                <router-link :to="{name: 'xfolder', params: {id: myfolder.fid}}"  >
                <p>{{myfolder.fid}}</p>
                <h3>{{myfolder.title}}</h3>
                </router-link>
                <router-view></router-view>
                <span @click="deleFolder(myfolder.fid)">削除</span>
              </div>
            </div>
            <p v-else>まだ何もありません</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import TheHeader from '../../components/TheHeader';
export default {
  name: 'Folders',
  components: {
    TheHeader,
  },
  computed: {
    ...mapState('Folders',['newfolder']),
    inputValue: {
      get() {
        return this.newfolder;
      },
      set(value) {
        this.setText(value);
      }
    },
    folders() {
      return this.$store.getters['Folders/getterFolders']
    }

  },
  methods: {
    ...mapMutations('Folders',['setText']),
    init() {
      this.$store.dispatch('Folders/clear')
    },
    start() {
      this.$store.dispatch('Folders/start')
    },
    addFolder() {
      this.$store.dispatch('Folders/addData')
    },
    deleFolder(id) {
      this.$store.dispatch('Folders/deleData', id)
    }
  },


}

</script>

<style scoped>
.folders-page {
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  width: 90%;
  margin: 10vh auto;
}
.inner-title {
  border-bottom: 1px solid red;
}
.inner-folder {
  background-color: #eeeeee;
  padding: 10px;
  min-height: 30vmin;
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
</style>

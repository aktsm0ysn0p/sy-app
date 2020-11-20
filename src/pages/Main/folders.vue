<template>
  <div class="folders-page" v-if="folders">
    <!-- <TheHeader /> -->
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
                <h3 class="frame-box-001">{{myfolder.title}}</h3>
                </router-link>
                <div class="bottom-wrapper">
                  <span @click="deleFolder(myfolder.fid)">削除</span>
                </div>
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
// import TheHeader from '../../components/TheHeader';
export default {
  name: 'Folders',
  // components: {
  //   TheHeader,
  // },
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

<style lang="scss">
$bar-style: solid;
$bar-size: 2px;
$bar-color: #ffffff;
.folders-page {
  color: #2c3e50;
  // background: #F5F5F5;
  padding-bottom: 20px;
  background: linear-gradient(#ccc 1px, transparent 2px);
  background-size: auto 2rem;
  .container {
    width: 90%;
    margin: 10vh auto;

    .inner {
      .inner-title {
        font-weight: normal;
        padding: 20px 0 30px 0;
        text-align: center;
        font-size: 2rem;
      }
      .inner-folder {
        background-color: #eeeeee;
        padding: 10px;
        min-height: 30vmin;

        .quote-card {
          padding: 20px;
          margin: 10px 0;
          box-shadow: 0 .25rem .25rem hsla(0, 0%, 0%, .1);
          background-image:
          linear-gradient(180deg, hsla(0, 0%, 45%, .1) 2rem, hsla(0, 100%, 100%, 0) 2.5rem),
          linear-gradient(180deg, hsla(200, 100%, 85%, 1), hsla(200, 100%, 85%, 1));
          font-size: 1.125rem;
          line-height: 1.8;
          border-radius: 5px;

          .frame-box-001 {
            padding: 30px;
            position: relative;
            text-align: center;
            font-size: 1rem;

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
            span {
              cursor: pointer;
            }
          }

        }
      }

    }
  }
}
p {
  font-size: .8em;
}

</style>

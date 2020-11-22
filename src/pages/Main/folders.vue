<template>
  <div class="folders-page" v-if="folders">
    <Navber />
    <div class="container">
      <div class="inner">
        <h1 class="inner-title">Custom Lists</h1>
        <input type="text" v-model="inputValue">
        <button @click="addFolder">add</button>
          <div class="inner-folder">
            <div v-if="folders.length">
              <div class="quote-card" v-for="myfolder in folders" :key= "myfolder.fid">
                <router-link :to="{name: 'xfolder', params: {id: myfolder.fid}}" class="link" >
                <h3>{{myfolder.title}}</h3>
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
import Navber from '../../components/TheNavber'

export default {

  name: 'Folders',


  components: {
    Navber
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
  height: 100%;
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
        padding: 1rem 0;
        // text-align: center;
        font-size: 2rem;
        font-family: 'uchiyama';
      }
      .inner-folder {
        // background-color: #eeeeee;
        padding: 10px;
        min-height: 30vmin;

        .quote-card {
          // padding: 20px;
          // margin: 10px 0;
          // box-shadow: 0 .25rem .25rem hsla(0, 0%, 0%, .1);
          // background-image:
          // linear-gradient(180deg, hsla(0, 0%, 45%, .1) 2rem, hsla(0, 100%, 100%, 0) 2.5rem),
          // linear-gradient(180deg, hsla(200, 100%, 85%, 1), hsla(200, 100%, 85%, 1));
          // font-size: 1.125rem;
          // line-height: 1.8;
          // border-radius: 5px;
          padding: 0.5em;
          margin-bottom: 5px;
          line-height: 1.5;
          border-left: 6px solid #FFA000;
          border-bottom: 2px solid #E0E0E0;
          background: #FFE082;
          color:#FFA000;

          .link {
            text-decoration: none;

            &:hover {
              text-decoration: red;
            }
          }

          h3 {
            // padding: 30px;
            position: relative;
            // text-align: center;
            font-size: 1rem;
            font-family: 'zatsu';
            color: #2c3e50;
          }

          .bottom-wrapper {
            span {
              cursor: pointer;
              float: right;
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

<template>
  <div class="folders-page" v-if="folders">
    <Navber />
    <div class="container">
      <div class="inner">
        <h1 class="inner-title">Custom Lists</h1>
        <div class="pen-wrapper">
          <button @click="onPen"><font-awesome-icon icon="pencil-alt" size="2x" class="pen" /></button>
        </div>
          <div class="inner-folder">
            <div v-if="folders.length">
              <div class="quote-card" v-for="myfolder in folders" :key= "myfolder.fid">
                <router-link :to="{name: 'xfolder', params: {id: myfolder.fid}}" class="link" >
                <h3>{{myfolder.title}}</h3>
                </router-link>
                <div class="dele-wrapper">
                  <font-awesome-icon icon="trash-alt" @click="deleFolder(myfolder.fid)"  />
                </div>

              </div>
            </div>
            <p v-else>まだ何もありません</p>
          </div>
          <transition>
            
            <div v-show="openPen" class="edit-wrapper">
              <div class="edit">
                <input type="text" v-model="inputValue" ref="focusThis" >
                <button @click="addFolder">add</button>
              </div>
            </div>
          </transition>
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

  data() {
    return {
      openPen: false,

    }
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

    onPen() {
      this.openPen = !this.openPen
      console.log(this.openPen)
      if (this.openPen) {
        this.$nextTick(() => this.$refs.focusThis.focus())
        console.log(this.$refs);
      }



    },
    // fo() {
    //   this.$refs.focusThis.focus()
    // },

    addFolder() {
      this.$store.dispatch('Folders/addData')
      // this.onPen();
    },

    deleFolder(id) {
      if (!confirm('ほんとに消す？')) {
        return
      }
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
  height: 100vh;
  color: #2c3e50;
  // background: #F5F5F5;
  padding-bottom: 20px;
  background: linear-gradient(#ccc 1px, transparent 2px);
  background-size: auto 2rem;
  .container {
    width: 90%;
    margin: 0 auto;
    padding: 20px;
    @media (max-width: 767px) {
      padding-bottom: 60px;
    }

    .inner {
      .inner-title {
        font-weight: normal;
        padding: 1rem 0;
        // text-align: center;
        font-size: 2rem;
        font-family: 'uchiyama';
      }
      .pen-wrapper {
        display: flex;
        justify-content: flex-end;

        .pen {
          color: #2c3e50;
        }

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

          // padding: 0.5em;
          // margin-bottom: 5px;
          // line-height: 1.5;
          // border-left: 6px solid #FFA000;
          // border-bottom: 2px solid #E0E0E0;
          // background: #FFE082;

          // color:#FFA000;
          display: flex;
          justify-content: space-between;

          .link {
            text-decoration: none;
            display: block;
            padding: 0.5em;
            margin-bottom: 5px;
            line-height: 1.5;
            border-left: 6px solid #FFA000;
            border-bottom: 2px solid #E0E0E0;
            // background: #FFE082;
            // background: #F0E590;
            // background: #FFF5AE;
            background: #FFF475;
            // background: #F0D793;
            color:#FFA000;
            flex-grow: 2;

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

          .dele-wrapper {
            padding-left: 5px;
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
              font-size: 1rem;
            }

          }

          .bottom-wrapper {
            flex-grow: 1;

            span {
              cursor: pointer;
              float: right;
            }
          }

        }
      }
      .v-enter-active, .v-leave-active {
        transform: translate(0px, 0px);
        transition: transform .5s;
      }

      .v-enter, .v-leave-to {
        transform: translateX(100vw) translateX(0px);
      }

      .edit-wrapper {

        .edit {
          padding: 0.5em;
          margin-bottom: 5px;
          line-height: 1.5;
          border-left: 6px solid #FFA000;
          border-bottom: 2px solid #E0E0E0;
          background: #FFE082;
          color:#FFA000;
          display: flex;
          // justify-content: space-between;

          input {
            display: block;
            border: none;
            outline: none;
            // background: #FFE082;
            line-height: 1.5;
            font-family: 'zatsu';
          }

          button {
            font-family: 'zatsu';
            font-weight: bold;
            display: inline-block;
            padding: 0.5em .75em;
            border: 2px solid #FFA000;
            border-radius: 3em 0.5em 2em 0.5em/.4em 2em 0.5em 3em;
            color: #333;
            // text-decoration: none;
            text-align: center;
            font-family: 'zatsu';
            margin-left: .5rem;

            &:hover {
              background: yellow;
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

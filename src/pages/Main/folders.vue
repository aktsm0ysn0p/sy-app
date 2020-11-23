<template>
  <div class="folders-page" v-if="folders">
    <Navber />
    <div class="container">
      <div class="inner">
        <h1 class="inner-title">Custom Lists</h1>
        <div class="pen-wrapper">
          <button @click="onPen"><font-awesome-icon icon="plus-circle" size="2x" class="pen" /></button>
        </div>
          <div class="inner-folder">
            <div v-if="folders.length">
              <div class="quote-card" v-for="myfolder in folders" :key= "myfolder.fid">
                <router-link :to="{name: 'xfolder', params: {id: myfolder.fid}}" class="link" >
                <h3>{{myfolder.title}}</h3>
                </router-link>
                <div class="dele-wrapper">
                  <font-awesome-icon icon="trash-alt" @click="deleFolder(myfolder.fid, myfolder.title)"  />
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
                  <!-- <button @click="chansellNewFolder">cansell</button> -->
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

    chansellNewFolder() {
      this.openPen = false

    },

    deleFolder(id, title) {
      if (!confirm(title + 'リストを本当に消しますか？')) {
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
  color: #2c3e50;
  padding-bottom: 20px;
  background: linear-gradient(#ccc 1px, transparent 2px);
  background-size: auto 2rem;
  .container {
    min-height: 100vh;
    width: 90%;
    margin: 0 auto;
    padding: 20px 5px;
    @media (max-width: 767px) {
      padding-bottom: 60px;
    }

    .inner {
      .inner-title {
        padding: 1rem 0;
        font-size: 2rem;
        font-family: 'uchiyama';
      }
      .pen-wrapper {
        display: flex;
        justify-content: flex-end;
        padding-right: 2rem;

        .pen {
          color: #2c3e50;
        }

      }
      .inner-folder {
        // background-color: #eeeeee;
        padding: 10px;
        min-height: 30vmin;

        .quote-card {
          display: flex;
          justify-content: space-between;

          .link {
            text-decoration: none;
            display: block;
            padding: 0.5em;
            margin-bottom: 5px;
            line-height: 1.5;
            border-left: 6px solid #77F895;
            border-bottom: 2px solid #E0E0E0;
            background: #9DFFB4;
            color:#2c3e50;
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
            color: #6A7274;
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


      .edit-wrapper {

        .edit {
          // padding: 0.5em;
          // margin-bottom: 5px;
          // line-height: 1.5;
          // border-left: 6px solid #FFA000;
          // border-bottom: 2px solid #E0E0E0;
          // background: #FFE082;
          // color:#FFA000;
          display: flex;
          text-decoration: none;
            // display: block;
            padding: 0.5em;
            margin-bottom: 5px;
            line-height: 1.5;
            border-left: 6px solid #77F895;
            border-bottom: 2px solid #E0E0E0;
            background: #9DFFB4;
            color:#2c3e50;
          // justify-content: space-between;

          input {
            display: block;
            border: none;
            outline: none;
            background: #9DFFB4;
            line-height: 1.5;
            font-family: 'zatsu';
          }

          button {
            font-family: 'zatsu';
            font-weight: bold;
            display: inline-block;
            padding: 0.5em .75em;
            border: 2px solid #77F895;
            border-radius: 5px;
            color: #333;
            text-align: center;
            font-family: 'zatsu';
            margin-left: .5rem;
            background: #B6F2B1;

            &:hover {
              background: #eeeeee;
            }
          }
        }
      }



    }
  }
}
.v-enter-active, .v-leave-active {
  transform: translate(0px);
  transition: transform .5s;
}

.v-enter, .v-leave-to {
  transform: translateX(-100vw);
}
p {
  font-size: .8em;
}

</style>

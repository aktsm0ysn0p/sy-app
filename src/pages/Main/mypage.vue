<template>
  <div>
    <div class="mypage" v-if="checkAuth">
      <Navber />
      <div class="container">
        <h1 class="page-title">myquotes</h1>
        <div class="sign-out-wrapper">
          <div class="btn-wrapper">
            <p @click="singout" class="sign-out-btn">サインアウト</p>
          </div>
        </div>
        <div class="quote-edit-btns">
          <button @click="onCretatModal"><font-awesome-icon icon="edit" size="2x" class="quote-btn" /></button>
          <button><font-awesome-icon icon="trash-alt" size="2x" class="quote-btn"/></button>
        </div>
        <div v-if="mycreatedQuotes.length" class="my-quote-wrapper">
          <!-- <QuoteTag
            v-for="m in originalQuotes"
            :key="m.lid"
            :stockItem ="myQuote"
          /> -->
          <h1>{{myQuotes}}</h1>
        </div>
        <div v-else>
          <p >あなたが作った名言はまだありません</p>
        </div>
      </div>
      <CreateQuote
        v-show="createQuote"
        @onCretatModal="onCretatModal"
      />
    </div>
    <div v-else>
      <Navber />
      <Welcome />
    </div>
  </div>
</template>

<script>
import Navber from '../../components/TheNavber'
import CreateQuote from '../../components/CreateQuote'
import Welcome from '../Login/welcome'
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import { mapGetters, mapState } from 'vuex'
// import QuoteTag from '../../components/QuoteTag'


export default {
  name: 'Mypage',
  components: {
    Navber,
    CreateQuote,
    Welcome,
    // QuoteTag
  },
  data() {
    return {
      createQuote: false,
      deleteQuote: false,
    }
  },
  computed: {
    ...mapGetters('MyQuotes',['checkAuth']),
    ...mapGetters('Lists',['lists', 'lastIdNum']),
    ...mapState('MyQuotes', ['myQuotes']),
    originalQuotes() {
      const quotes = []
      console.log(`ヤッホー！！！${this.myQuotes}`)
        this.myQuotes.forEach(my => {
          const t = this.lists.find(list => list.lid === my )
          if (!typeof t === undefined) {
            console.log(`myQuotes発見！！ lid: ${t.lid}   titile: ${t.title}`)
            quotes.push(t)
          }
        })
      return quotes
    },
    createdQuotes() {
      const mycreatedQuotes = []
      this.myQuotes.forEach((quote) => {
        const target = this.lists.find(list => list.lid === quote)
        mycreatedQuotes.push(target)
      })
      return mycreatedQuotes
    }
  },
  methods: {
    onCretatModal() {
      this.createQuote = !this.createQuote
    },
    singout() {
      if (!confirm('本当にサインアウトしますか？')) {
        return
      }
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch('MyQuotes/checkOut')
          this.$router.push({ path: '/' })
        })
        .catch(error => {
          alert(error);
        });
    }
  }
}
</script>

<style lang="scss">
$bar-style: solid;
$bar-size: 2px;
$bar-color: #ffffff;
.mypage {
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
      padding-bottom: 80px;
    }
    .page-title {
      padding: 1rem 0 0;
      font-size: 2rem;
      font-family: 'uchiyama';
    }
    .quote-edit-btns {
      display: flex;
      justify-content: flex-end;
      padding: 0 10px 10px;
      .quote-btn {
        color: #2c3e50;
        transition: all .5s;
        margin-right: 1rem;
        &:hover {
          color: #29D9A7;
        }
      }
    }
    .sign-out-wrapper {
      margin: 0 auto;
      padding-bottom: 30px;
      display: flex;
      justify-content: flex-end;
      .btn-wrapper {
        // padding: 20px 0;
        .sign-out-btn {
          // display: inline-block;
          // padding: 0.5em 1em;
          // text-decoration: none;
          // background: #668ad8;
          // color: #FFF;
          // border-radius: 3px;
          // width: 20vh;
          transition: all .9s;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
            text-decoration-color: #2c3e50;
          }
        }
      }
      p {
        // margin-top: 10px;
      }
    }

  }
}
</style>

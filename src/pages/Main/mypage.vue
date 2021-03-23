<template>
  <div class="mypage">
    <div>
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
          <button @click="onDeleModal"><font-awesome-icon icon="trash-alt" size="2x" class="quote-btn"/></button>
        </div>
        <div v-if="createdQuotes.length" class="my-quote-wrapper">
          <QuoteTag
            v-for="myQuote in createdQuotes"
            :key="myQuote.lid"
            :stockItem ="myQuote"
          />
        </div>
        <div v-else>
          <p >あなたが作った名言はまだありません</p>
        </div>
      </div>
      <transition name="fade2">
          <CreateQuote
            v-if="createQuote"
            @onCretatModal="onCretatModal"
          />
          <TheDelemodal
            v-if="deleteQuote"
            @emitingdele="onDeleModal"
            :deleStock="deleMyQuotes"
            @checkToggleDele="checkToggleDele"
            @onDeleSubmit="onDeleSubmit"
          />
      </transition>
    </div>
  </div>
</template>

<script>
import Navber from '../../components/TheNavber'
import CreateQuote from '../../components/CreateQuote'
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import { mapGetters } from 'vuex'
import QuoteTag from '../../components/QuoteTag'
import TheDelemodal from "../../components/TheDelemodal"

export default {
  name: 'Mypage',
  components: {
    Navber,
    CreateQuote,
    QuoteTag,
    TheDelemodal
  },
  data() {
    return {
      createQuote: false,
      deleteQuote: false,
    }
  },
  computed: {
    ...mapGetters('MyQuotes',['myQuotes']),
    ...mapGetters('Lists',['lists']),
    createdQuotes() {
      const mycreatedQuotes = []
      if (this.myQuotes.length) {
        this.myQuotes.forEach((quote) => {
          const target = this.lists.find(list => list.lid === quote)
          if (typeof target !== undefined) {
            mycreatedQuotes.push(target)
          }
        })
      }
        return mycreatedQuotes
    },
    deleMyQuotes() {
      const deleQuote = []
      this.myQuotes.forEach((quote) => {
        const target = this.lists.find(list => list.lid === quote)
        if (typeof target !== undefined) {
          deleQuote.push(target)
        }
      })
      if (deleQuote.length) {
        deleQuote.forEach((n) => {
          this.$set(n, "isDone", false);
        })
      }
      console.log(deleQuote)
      return deleQuote
    }
  },
  created() {
    this.myQuotes.forEach((quote) => {
          const target = this.lists.find(list => list.lid === quote)
          if (typeof target === undefined) {
            console.log(target)
          }
        })
  },
  methods: {
    onCretatModal() {
      this.createQuote = !this.createQuote
    },
    onDeleModal() {
      this.deleteQuote = !this.deleteQuote
      this.deleMyQuotes.forEach((stock) => {
        stock.isDone = false;
      })
    },
    checkToggleDele(id) {
      this.deleMyQuotes.forEach((quote) => {
        if (quote.lid === id) {
          this.$set(quote, "isDone", !quote.isDone);
          console.log(this.deleMyQuotes)
        }
      })
    },
    onDeleSubmit() {
      const result = this.deleMyQuotes.filter(quote => quote.isDone)
      if (result.length) {
        let newdeleArray = []
          result.forEach(dele => {
            newdeleArray.push(dele.lid)
            // this.$store.dispatch('Lists/deleList', dele.lid)
        })
        console.log(newdeleArray)
        this.$store.dispatch('MyQuotes/deleQuoteCall', newdeleArray)
      } else {
        console.log(`なにも選択されていません`)
      }
      this.deleteQuote = !this.deleteQuote
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
.fade2-enter-active,
.fade2-leave-active {
  transition: opacity .3s ease;
}
.fade2-enter,
.fade2-leave-to {
  opacity: 0;
}
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
        .sign-out-btn {
          transition: all .9s;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
            text-decoration-color: #2c3e50;
          }
        }
      }
    }
    .my-quote-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fit, 280px);
      grid-template-rows: 1fr;
      justify-content: center;
      grid-gap: 1rem 1rem;
    }

  }
}
</style>

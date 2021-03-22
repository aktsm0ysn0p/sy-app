<template>
  <div class="signup">
    <div class="container">
      <h2>新規登録</h2>
      <input type="email" placeholder="メールアドレス" v-model="inputSignUpEmail">
      <input type="password" placeholder="パスワード" v-model="inputSignUpPass">
      <div class="btn-wrapper">
        <button @click="signUp" class="button">送信</button>
      </div>
      <p @click="initUser">
        <router-link to="/signin" class="switch" >サインインはこちらから</router-link>
      </p>
      <p @click="initUser">
        <router-link to="/mypage" class="back">もどる</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Signup',
  computed: {
    ...mapGetters('MyQuotes',['userEmail', 'userPass']),
    inputSignUpEmail: {
      get() {
        return this.userEmail
      },
      set(value) {
        this.initUserEmail(value)
      }
    },
    inputSignUpPass: {
      get() {
        return this.userPass
      },
      set(value) {
        this.initUserPass(value)
      }
    }
  },
  methods: {
    ...mapMutations('MyQuotes', ['initUserEmail', 'initUserPass']),
    initUser() {
      this.$store.dispatch('MyQuotes/initUser')
    },
    signUp() {
      this.$store.dispatch('MyQuotes/signUp')
      .then(() => {
          this.$router.push({ path: '/' })
      })
    },
  }
}
</script>


<style lang="scss" scoped>
.signup {
  color: #2c3e50;
  background: #F5F5F5;
  .container {
    min-height: 100vh;
    width: 90%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin: 0 auto;
    padding: 30px;
    @media (max-width: 767px) {
      padding-bottom: 80px;
    }
    h2 {
      font-weight: normal;
    }
    .back{
      color: #2c3e50;
    }
    a {
      color: #42b983;
    }
    input {
      margin: 10px 0;
      padding: 10px;
    }
    .btn-wrapper {
      padding: 20px 0;
      .button {
        display: inline-block;
        padding: 0.5em 1em;
        text-decoration: none;
        background: #668ad8;
        color: #FFF;
        border-bottom: solid 4px #627295;
        border-radius: 3px;
        width: 20vh;
        transition: all .4s;
        &:hover {
          opacity: .7;
        }
      }
    }
    p {
      margin: 10px 0;
    }
  }
}
</style>

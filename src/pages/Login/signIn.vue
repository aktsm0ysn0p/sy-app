<template>
  <div class="signin">
    <div class="container">
      <h2>サインイン</h2>
      <input type="email" placeholder="メールアドレス" v-model="email">
      <input type="password" placeholder="パスワード" v-model="password">
      <div class="btn-wrapper">
        <button @click="signIn" class="button">サインイン</button>
      </div>
      <p>
        <router-link to="/signup">新規登録はこちらから</router-link>
      </p>
      <p>
        <router-link to="/welcome" class="back">タイトルにもどる</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        alert("サインイン！")
        this.$router.push({ path: '/' })
      })
      .catch(error => {
          alert(error);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.signin {
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

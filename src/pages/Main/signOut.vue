<template>
  <div class="signout">
    <Navber />
    <div class="container">
      <h2>SING OUT</h2>
      <div class="btn-wrapper">
        <button @click="singout" class="button">サインアウト</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navber from '../../components/TheNavber'
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
export default {
  name: 'Signout',
  components: {
    Navber
  },
  methods: {
    singout() {
      if (!confirm('本当にサインアウトしますか？')) {
        return
      }
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ path: '/welcome' })
        })
        .catch(error => {
          alert(error);
        });
    }
  }
}
</script>

<style lang="scss">
.signout {
  color: #2c3e50;
  background: #F5F5F5;
  .container {
    min-height: 100vh;
    width: 90%;
    margin: 0 auto;
    padding: 30px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    @media (max-width: 767px) {
      padding-bottom: 80px;
    }
    h2 {
      font-weight: normal;
    }
    .btn-wrapper {
      padding: 20px 0;
      .button {
        display: inline-block;
        padding: 0.5em 1em;
        text-decoration: none;
        background: #668ad8;
        color: #FFF;
        border-radius: 3px;
        width: 20vh;
        transition: all .4s;
        &:hover {
          opacity: .7;
        }
      }
    }
    p {
      margin-top: 10px;
    }
  }
}
</style>

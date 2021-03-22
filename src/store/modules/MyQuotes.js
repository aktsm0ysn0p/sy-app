// import firestore from '@/firebase/firestore'
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import firestore from '@/firebase/firestore'
const usersdb = firestore.collection("users")


const already = {
  english: 'The email address is already in use by another account.',
  japanese: 'このメールアドレスはすでに別のアカウントで使用されています。'
}
const shortPass = {
  english: 'Password should be at least 6 characters',
  japanese: 'パスワードは6文字以上である必要があります'
}

export default {
  namespaced: true,
  state() {
    return {
      checkAuth: false,
      docId: '',
      myQuotes: [],
      quoteTitle: '',
      quoteName: '',
      user: {
        email: '',
        pass: ''
      }
    }
  },
  getters: {
    checkAuth(state) {
      return state.checkAuth
    },
    userEmail(state) {
      return state.user.email
    },
    userPass(state) {
      return state.user.pass
    },
    docId(state) {
      return state.docId
    },
    myQuotes(state) {
      return state.myQuotes
    },
    quoteTitle(state) {
      return state.quoteTitle
    },
    quoteName(state) {
      return state.quoteName
    },

  },
  mutations: {
    initCheckAuth(state) {
      state.checkAuth = false
    },
    checkAuth(state) {
      state.checkAuth = true
    },
    initUserEmail(state, payload) {
      state.user.email = payload
    },
    initUserPass(state, payload) {
      state.user.pass = payload
    },
    initDocId(state, payload) {
      state.docId = payload
    },
    initMyQuotes(state, payload) {
      state.myQuotes = payload
    },
    initQuoteTitle(state, payload) {
      state.quoteTitle = payload
    },
    initQuoteName(state, payload) {
      state.quoteName = payload
    },
    pushMyQuotes(state, payload) {
      state.myQuotes.push(payload)
    },
    addUser(state) {
      usersdb.add(
        {
          email: state.user.email,
          myquotes: []
        }
      )
    }
  },
  actions: {
    start({commit, dispatch}) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(`ログイン！ メールアドレス： ${user.email}`)
          const currentEmail = user.email
          commit('checkAuth')
          dispatch('getMyQuotes2', currentEmail)
        } else {
          commit('initCheckAuth')
        }
      })
    },
    signUp({ state, dispatch, commit }) {
      firebase.auth().createUserWithEmailAndPassword(state.user.email, state.user.pass
      ).then(() => {
        dispatch('signIn')
      }).then(() => {
        commit('addUser')
      })
      .catch(error => {
        if (error.message === already.english) {
          alert(already.japanese)
          return
        } else if (error.message === shortPass.english) {
          alert(shortPass.japanese)
          return
        }
        alert(error.message)
      })
    },
    signIn({ state }) {
      firebase.auth().signInWithEmailAndPassword(state.user.email, state.user.pass)
        .catch(error => {
        if (error.message === already.english) {
          alert(already.japanese)
          return
        } else if (error.message === shortPass.english) {
          alert(shortPass.japanese)
          return
        }
        alert(error.message)
      })
    },
    getMyQuotes({ state, commit }) {
      usersdb.get().then(doSnapshot => {
        doSnapshot.forEach(doc => {
          if (doc.data().email === state.user.email) {
            const payload = doc.data().myquotes
            commit('initMyQuotes', payload)
            commit('initDocId', doc.id)
          }
        })
      })
    },
    getMyQuotes2({ commit }, crrentEmail) {
      usersdb.get().then(doSnapshot => {
        doSnapshot.forEach(doc => {
          if (doc.data().email === crrentEmail) {
            console.log('ログインユーザのドキュメント発見！')
            const payload = doc.data().myquotes
            console.log(`これがmyQuotes: ${payload}`)
            commit('initMyQuotes', payload)
            commit('initUserEmail', crrentEmail)
            commit('initDocId', doc.id)
          }
        })
      })
    },
    initQuote({ commit }) {
      commit('initQuoteTitle', '')
      commit('initQuoteName', '')
    },
    initUser({ commit }) {
      commit('initUserEmail', '')
      commit('initUserPass', '')
    },
    checkOut({ commit }) {
      commit('initCheckAuth')
      commit('initUserEmail', '')
      commit('initUserPass', '')
      commit('initDocId', '')
      commit('initMyQuotes', [])
    },
    addQuote({ state, dispatch }, lastNum) {
      const quoteTitle = state.quoteTitle && state.quoteTitle.trim();
      const quoteName = state.quoteName && state.quoteName.trim();
      if (!quoteTitle || !quoteName) {
        console.log('空白です')
        return
      }
      dispatch('Lists/addList', { quoteTitle: quoteTitle, quoteName: quoteName }, { root: true })
        .then(() => {
          let copy
          if (state.myQuotes.length) {
            copy = state.myQuotes.slice()
            copy.push(lastNum)
          } else {
            copy = [lastNum]
          }
          usersdb.doc(state.docId).update({
            myquotes: copy
          })
        })
        .then(() => {
        dispatch('initQuote')
      })

    }
  }
}
//.then(() => {
      //   commit('checkAuth')
      // }).then(() => {
      //   dispatch('getMyQuotes')
      // })

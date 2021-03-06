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
    addMyQuotes(state, payload) {
      state.myQuotes.push(payload)
    },
    addUser(state) {
      usersdb.add(
        {
          email: state.user.email,
          myquotes: []
        }
      )
    },
    updateMyQuotes(state, newMyQuotes) {
      state.myQuotes = newMyQuotes
    }
  },
  actions: {
    start({dispatch}) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          const currentEmail = user.email
          dispatch('getMyQuotes', currentEmail)
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
    getMyQuotes({ commit }, crrentEmail) {
      usersdb.get().then(doSnapshot => {
        doSnapshot.forEach(doc => {
          if (doc.data().email === crrentEmail) {
            const payload = doc.data().myquotes
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
      commit('initUserEmail', '')
      commit('initUserPass', '')
      commit('initDocId', '')
      commit('initMyQuotes', [])
    },
    addQuote({ state, dispatch, commit }, lastNum) {
      const quoteTitle = state.quoteTitle && state.quoteTitle.trim();
      const quoteName = state.quoteName && state.quoteName.trim();
      if (!quoteTitle || !quoteName) {
        console.log('空白です')
        return
      }
      dispatch('Lists/addList', { quoteTitle: quoteTitle, quoteName: quoteName }, { root: true })
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
        .then(() => {
          dispatch('initQuote')
          commit('addMyQuotes', lastNum)
        }).catch(e => console.log(e))
    },
    deleQuoteCall({ dispatch }, deleArry) {
      dispatch('Stocks/deleMyQuote', deleArry, { root: true })
      dispatch('Folders/findDeleMyQuote', deleArry, { root: true })
      dispatch('deleQuote', deleArry)
    },
    deleQuote({ state, commit }, deleArry) {
      const arr01 = [...new Set(state.myQuotes)],
            arr02 = [...new Set(deleArry)]
      const newMyQuotesArray = [...arr01, ...arr02].filter(value => !arr01.includes(value) || !arr02.includes(value))
      usersdb.doc(state.docId).update({
        myquotes: newMyQuotesArray
      })
      .then(() => {
        commit('updateMyQuotes', newMyQuotesArray)
      }).catch(e => console.log(e))
    }
  }
}

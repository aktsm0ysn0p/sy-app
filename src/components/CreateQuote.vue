<template>
  <div class="overlay">
    <div class="modal-inner">
      <div class="sample-wrapper">
        <div class="sample-quote" :class="selectClass">
          <h3 class="frame-box">{{this.inputTitle}}</h3>
          <div class="text-container">
            <p>{{this.inputName}}</p>
          </div>
        </div>
      </div>
      <div class="edit-wrapper">
        <div class="edit-text-container">
          <p>名言</p>
          <p v-show="errorTitle">!!名言は50文字以内に収めてください!!</p>
          <input type="text" v-model="inputTitle" placeholder="Quote 50文字以内">
          <p>名前</p>
          <p v-show="errorName">!!名前は15文字以内に収めてください!!</p>
          <input type="text" v-model="inputName" placeholder="Name 15文字以内">
        </div>
        <div class="btn-container">
          <button @click="onCreateModal">キャンセル</button>
          <button @click="addNewQuote">追加</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'CreateQuote',
  data() {
    return {
      errorTitle: false,
      errorName: false
    }
  },
  computed: {
    ...mapGetters('MyQuotes', ['quoteTitle', 'quoteName']),
    ...mapGetters('Lists', ['lastIdNum']),
    inputTitle: {
      get() {
        return this.quoteTitle
      },
      set(value) {
          if (value.length > 50) {
          this.errorTitle = true
          return
        } else {
          this.errorTitle = false
          this.initQuoteTitle(value)
        }
      }
    },
    inputName: {
      get() {
        return this.quoteName
      },
      set(value) {
        if (value.length > 15) {
          this.errorName = true
          return
        } else {
          this.errorName = false
          this.initQuoteName(value)
        }
      }
    },
    selectClass() {
        if (this.lastIdNum % 4 === 0) {
          return 'green'
        } else if (this.lastIdNum % 4 === 3 || this.lastIdNum === 3) {
          return 'pink'
        } else if (this.lastIdNum % 4 === 2 || this.lastIdNum === 2) {
          return 'blue'
        } else if(this.lastIdNum % 4 === 1 || this.lastIdNum === 1) {
          return 'yellow'
        } else {
          return 'yellow'
        }
    },

  },

  methods: {
    ...mapMutations('MyQuotes',['initQuoteTitle', 'initQuoteName']),
    onCreateModal() {
      this.$store.dispatch('MyQuotes/initQuote')
      this.errorTitle = false
      this.errorName = false
      this.$emit('onCretatModal')
    },
    addNewQuote() {
      console.log(this.errorTitle)
      console.log(this.errorName)
      if (!this.errorTitle && !this.errorName) {
        this.$store.dispatch('MyQuotes/addQuote', this.lastIdNum)
        this.$emit('onCretatModal')
      }
    }
  }


}
</script>

<style lang="scss">
$bar-style: solid;
$bar-size: 2px;
$bar-color: #ffffff;
.overlay {
  z-index:110;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);
  display: flex;
  overflow: auto;
  .modal-inner {
    z-index:22;
    width:80%;
    max-width: 700px;
    padding: 1em;
    background:#fff;
    margin: auto;
    display: flex;
    flex-direction: column;
    // align-items: center;
    .sample-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      .sample-quote {
        width: 235px;
        min-height: 235px;
        padding: 1rem 1rem 0;
        margin: 10px 0;
        position: relative;
        font-size: 1.125rem;
        vertical-align: top;
        display: inline-block;
        color: #4b453c;
        // background: #F7E999;
        line-height: 1.8;
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
        .frame-box {
          padding: 1rem;
          position: relative;
          text-align: center;
          font-size: 1rem;
          font-family: 'shunnka';
          &::before, &::after {
            content:'';
            width: 30px;
            height: 30px;
            position: absolute;
          }
          &::before {
            border-left: $bar-style $bar-size $bar-color;
            border-top: $bar-style $bar-size $bar-color;
            top: 0;
            left: 0;
          }
          &::after {
            border-right: $bar-style $bar-size $bar-color;
            border-bottom: $bar-style $bar-size $bar-color;
            bottom: 0;
            right: 0;
          }
        }
        .text-container {
          display: flex;
          justify-content: flex-end;
          padding: 1rem 0;
          p {
            font-size: .8em;
            text-align: center;
          }
        }
      }

    }
    .edit-wrapper {
      .edit-text-container {
        max-width: 500px;
        margin: auto;
        input {
          width: 100%;
          padding: 10px 15px;
          font-size: 16px;
          border-radius: 3px;
          border: 2px solid #ddd;
          box-sizing: border-box;
          margin-bottom: 1rem;
        }
      }
      .btn-container {
        display: flex;
        justify-content: space-between;
        button {
          display: inline-block;
          padding: 0.75em 1em;
          border: 1px solid #29D9A7;
          border-radius: 5px;
          color: #333;
          text-align: center;
          transition: all .5s;
          &:hover {
            background: #29D9A7;
          }
        }
      }
    }
  }
}
.yellow {
  background: #F7E999;
}

.blue {
  background: #b9dcf4;

}

.pink {
  background: #FFBDA3;
}

.green {
  background: #CAF4B9;
}
</style>

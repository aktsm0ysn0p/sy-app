<template>
  <div class="overlay">
    <div class="modal-inner">
      <div v-if="deleStock.length">
        <p>どの名言をに削除する？</p>
          <div v-for="stock in deleStock" :key="stock.lid" class="quote-card">
            <label>
              <div class="modal-input-wrapper">
                <input type="checkbox" @change="checkToggleDele(stock.lid)" >
              </div>
              <div :class="{'active' : stock.isDone}">
                <h3 >{{stock.title}}</h3>
                <div class="name-wrapper">
                  <p>{{stock.name}}</p>
                </div>
              </div>
            </label>
          </div>
          <div class="select-btn-wrapper">
            <button @click="onDele">キャンセル</button>
            <button @click="onDeleSubmit"> 決定</button>
          </div>
      </div>
      <div v-else>
        <p >削除するストックがありません</p>
        <button @click="onDele">retuen</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'TheDelemodal',


  props: {
    deleStock: Array,
  },


  methods: {
    onDele() {
      this.$emit('emitingdele');
    },

    checkToggleDele(id) {
      this.$emit('checkToggleDele', id);
    },

    onDeleSubmit() {
      this.$emit('onDeleSubmit');
    }

  }


}
</script>

<style scoped>
.active {
  color: #5ABD57;
}
.overlay {
  z-index:1;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);
  display: flex;
  /* align-items: center;
  justify-content: center; */
  /* overflow-y: scroll; */
  overflow: auto;
}
.modal-inner {
  z-index:2;
  width:80%;
  padding: 1em;
  background:#fff;
  margin: auto;
}

.quote-card {
  padding: 5px 10px;
  margin: 10px 0;
  background: #b3e6ff;
  font-size: 1.125rem;
  line-height: 1.8;
  border-radius: 5px;
}

label {
  display: flex;
}

.modal-input-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}


h3 {
  text-align: center;
  /* font-weight: normal; */
  font-family: 'shunnka';
  padding: .5rem;
}

.name-wrapper {
  display: flex;
  justify-content: flex-end;
}

.select-btn-wrapper {
  display: flex;
  justify-content: space-between;
}

button {
  display: inline-block;
  padding: 0.75em 1em;
  border: 1px solid #29D9A7;
  border-radius: 5px;
  color: #333;
  text-align: center;
  transition: all .5s;
}

button:hover {
  background: #29D9A7;
}
</style>

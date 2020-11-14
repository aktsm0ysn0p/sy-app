<template>
  <div class="overlay">
    <div class="modal-inner">
      <div v-if="deleStock.length">
        <p>どの名言をに削除する？</p>
          <div v-for="stock in deleStock" :key="stock.lid" class="quote-card">
            <label>
              <input type="checkbox" @change="checkToggleDele(stock.lid)" >
              <h3 :class="{'active' : stock.isDone}">{{stock.title}}</h3>
              <p>{{stock.since}}{{stock.name}}</p>
            </label>
          </div>
          <!-- <p>{{isDones}}</p> -->
          <button @click="onDele">キャンセル</button>
          <button @click="onDeleSubmit"> 決定</button>
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
      // console.log('ktaaaaaa');
    },
    onDeleSubmit() {
      this.$emit('onDeleSubmit');
    }
  }
}
</script>

<style scoped>
.active {
  color: red;
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
  align-items: center;
  justify-content: center;
}
.modal-inner {
  z-index:2;
  width:50%;
  padding: 1em;
  background:#fff;
}

.quote-card {
  padding: 20px;
  margin: 10px 0;
  border: solid 1px #5ABD57;
  background-color: #A9F791;
}
</style>

<template>
  <div class="overlay">
    <div class="modal-inner">
      <div v-if="addStock.length">
        <p>どの名言を追加する？</p>
        <div v-for="stock in addStock" :key="stock.lid" class="quote-card">
          <label>
            <div class="modal-input-wrapper">
              <input type="checkbox" @change="checkToggleAdd(stock.lid)" >
            </div>
            <div :class="{'done' : stock.isDone}">
              <h3 >{{stock.title}}</h3>
              <div class="name-wrapper">
                <p>{{stock.name}}</p>
              </div>
            </div>
          </label>
        </div>
        <div class="select-btn-wrapper">
          <button @click="onAdd">キャンセル</button>
          <button @click="onSubmit"> 決定</button>
        </div>
      </div>
      <div v-else>
        <p >追加するストックがありません</p>
        <button @click="onAdd">retuen</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheAddmodal',
  props: {
    addStock: Array,
  },
  methods: {
    onAdd() {
      this.$emit('emitingadd');
    },
    onSubmit() {
      this.$emit('onSubmit');
    },
    checkToggleAdd(id) {
      this.$emit('checkToggleAdd', id);
    }
  },
}
</script>

<style scoped>
.overlay {
  z-index:1;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);
  display: flex;
  overflow: auto;
}
.modal-inner {
  z-index:2;
  width:80%;
  padding: 1em;
  background:#fff;
  margin: auto;
}
.done {
  color: #5ABD57;
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

<template>
  <div class="overlay">
    <div class="modal-inner">
      <div v-if="addStock.length">
        <p>どの名言をに追加する？</p>
          <div v-for="stock in addStock" :key="stock.lid" class="quote-card">
            <label>
              <input type="checkbox" @change="checkToggle(stock.lid)" >
              <h3 :class="{'done' : stock.isDone}">{{stock.title}}</h3>
              <p>{{stock.since}}{{stock.name}}</p>
            </label>
          </div>
          <!-- <p>{{isDones}}</p> -->
          <button @click="onAdd">キャンセル</button>
          <button @click="onSubmit"> 決定</button>
      </div>
      <div v-else>
        <p >追加できるストックがありません</p>
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
    checkToggle(id) {
      this.$emit('checkToggle', id);
    }

  },
  created() {
    // this.$emit('selectAddStock');
  }
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
  align-items: center;
  justify-content: center;
}
.modal-inner {
  z-index:2;
  width:50%;
  padding: 1em;
  background:#fff;
}
.done {
  color: #5ABD57;
}
.quote-card {
  padding: 20px;
  margin: 10px 0;
  border: solid 1px #5ABD57;
  background-color: #A9F791;
}
</style>

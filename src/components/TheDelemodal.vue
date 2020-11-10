<template>
  <div v-show="this.isDele">
    <div v-if="addStock.length">
      <p>どの名言をに追加する？</p>
      <div>
        <p></p>
      </div>
      <button @click="onDele">キャンセル</button>
      <button>決定</button>
    </div>
    <p v-else>追加できるストックがありません</p>
    <button @click="onDele">retuen</button>
  </div>
</template>

<script>
export default {
  name: 'TheDelemodal',
  props: {
    isDele: Boolean,
    addStock: Array,
  },
  methods: {
    onDele() {
      this.$emit('emitingdele');
    }
  }
}
</script>

<template>
  <div v-show="this.isAdd">
    <div v-if="addStock.length">
      <p>どの名言をに追加する？</p>
      <div>
        <p></p>
      </div>
      <button @click="onAdd">キャンセル</button>
      <button>決定</button>
    </div>
    <p v-else>追加できるストックがありません</p>
    <button @click="onAdd">retuen</button>
  </div>
</template>

<script>
export default {
  name: 'TheAddmodal',
  props: {
    isAdd: Boolean,
    addStock: Array,
  },
  methods: {
    onAdd() {
      this.$emit('emitingadd');
    }
  }
}
</script>

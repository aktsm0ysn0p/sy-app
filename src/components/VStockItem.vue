<template>
  <div class="wrapper">
    <div class="inner">
      <span>フォルダ一覧</span>
      <div class="inner-folder">
        <p>まだ何もありません</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gchildStocks: Array
  }

}
</script>

<style scoped>
span {
  border-bottom: 1px solid red;
}
.inner-folder {
  background-color: #eeeeee;
  padding: 10px;
  min-height: 30vmin;
}
</style>

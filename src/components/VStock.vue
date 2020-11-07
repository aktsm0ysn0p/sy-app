<template>
  <div>
    <VStockItem />
    <VStockItem />
  </div>
</template>

<script>
import VStockItem from './VStockItem';
export default {
  props: {
    meigenns: Array
  },
  components: {
    VStockItem
  }

}
</script>

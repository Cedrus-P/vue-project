<script>
  export default{
    emits:['my-click']
  }
</script>

<template>
  <div @click="$emit('my-click')">自定义事件</div>
</template>

<style lang="scss" scoped>

</style>

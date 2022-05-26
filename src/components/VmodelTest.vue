<script>
  export default{
    props:{
      modelValue:{
        type: Number,
        default: 0
      }
    }
  }
</script>
<template>
  <div @click="$emit('update:modelValue', modelValue +1)">{{counter}}</div>
</template>
<style lang="scss" scoped>

</style>

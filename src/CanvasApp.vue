<script>
 import { reactive, ref } from "vue";
 export default{
   setup(){
     const state = reactive({
       data: [
         {name:'带专', count:200, color:'brown'},
         {name:'本科', count:300, color:'yellow'},
         {name:'硕士', count:100, color:'pink'},
         {name:'博士', count:50, color:'skyblue'},
       ]
     })
     function handleClick(){
       state.data.push({name:'其他', count:80, color:'orange'})
     }
     return {
       state,
       handleClick
     }
   }
 }
</script>
<template>
  <piechat @click="handleClick" :data="state.data" :x="200" :y="200" :r="200"></piechat>
</template>
<style lang="scss" scoped>

</style>

<template>
  <div>
    <bar></bar>
    <food-result></food-result>
  </div>
</template>

<script>

import FoodResult from '../components/FoodResult.vue'
import Bar from '../components/Bar.vue'
export default {
  components:{ Bar, FoodResult},
  props : {
    isRandom : Boolean
  }
  }
  
</script>

<style>
</style>
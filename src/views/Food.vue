<template>
  <div>
    <bar></bar>
    <food-result class="my-10" :food ="this.chosen" :isRandom="false"></food-result>
    {{test()}}
  </div>
</template>

<script>

import FoodResult from '../components/FoodResult.vue'
import Bar from '../components/Bar.vue'
export default {
  components:{ Bar, FoodResult},
  props : {
    chosen : {},
  },
  methods:{
    test(){
      console.log(this.chosen)
    }
  }
}
  
</script>

<style>
</style>
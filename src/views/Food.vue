<template>
  <div>
    <bar></bar>
    <food-result class="my-10" :food ="this.chosen" :isRandom="false"></food-result>
  </div>
</template>

<script>

import FoodResult from '../components/FoodResult.vue'
import Bar from '../components/Bar.vue'
import Food from "../store/Foods";
export default {
  components:{ Bar, FoodResult},
  created(){
    this.getFoodRec()
  },
  methods:{
    getFoodRec(){
        this.chosen = Food.getters.foodrec
    }
  }
}
  
</script>

<style>
</style>
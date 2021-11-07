<template>
<div>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
  <bar></bar>
  <v-sheet
    class="ma-md-16 mx-lg-auto random"
    color= #C50000
    height="350"
    rounded-xl
    width="650"
  >
    <div class="random_card">
      <v-card 
      class="mx-lg-auto random"
      color= "white"
      height="200"
      width="530"
      rounded-xl
      >
      <v-card-text class="text-center foodrandom">
        <h2>อาหารที่สุ่มได้</h2>
      </v-card-text>
      <h1 class="result_text mt-7">{{chosenFood_name}}</h1>
      </v-card>
      <div class="random_btn">
        <v-btn 
        class="ma-md-5"
        color ="white"
        outlined
        rounded
        x-large
        @click="picker"
      >
      <span class="material-icons">casino</span>
      random</v-btn>
      </div>
    </div>
  </v-sheet>
  <food-result v-if="this.chosenFood.ingredients!=null" :food="this.chosenFood" :isRandom="true" :isLike="false" :foodRank="this.foodRank"></food-result>
  <rank v-else :foods="this.foodRank" :isHaveData="this.isHaveData"></rank>
</div>
</template>

<script>
import FoodStore from '@/store/Foods'
import Bar from '../components/Bar.vue'
import FoodResult from '../components/FoodResult.vue'
import Rank from '../components/Rank.vue'
  export default {
  components: { Bar,FoodResult,Rank},
  data() {
    return {
      foods: [],
      chosenFood_name: '',
      chosenFood : {},
      foodRank: [],
      isHaveData : false
    }
  },
  created(){
    this.fetchFoods(),
    this.fetchFoodsRank()
  },
  methods: {
    async fetchFoods() {
      await FoodStore.dispatch('fetchFoods')

      this.foods = FoodStore.getters.foods
    },
    picker(){
      this.chosenFood=null
      var numIndex = Math.floor(Math.random() * this.foods.length)
      console.log('numIndex',numIndex)
      this.chosenFood = this.foods[numIndex]
      this.chosenFood_name = this.foods[numIndex].name
      this.fetchFoodsRank()
    },
    async fetchFoodsRank() {
            await FoodStore.dispatch('getFoodsRank')
            this.foodRank = FoodStore.getters.foodrank
            this.isHaveData = true
    },
  }
  }
</script>

<style scoped lang="css">
.foodrandom{
  font-family: 'supermarket';
  font-size: 20px;
}
.random_card {
  margin: auto;
  padding-top: 40px;
  align-items: center;
}
.random_btn {
  text-align: center;
}
.result_text{
  font-family: "FC Palette";
  text-align: center;
  font-size: 50px;
}
.random {
  border-radius: 30px;
}

</style>
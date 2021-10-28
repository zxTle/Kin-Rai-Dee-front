<template>
  
  <div class="recommend_card">
      <v-container class = my-3>
         <v-row no-gutters row:8>
        <template v-for = "(food,idex) in foodData">
          <v-col md="6" :key = "idex" >
           
      <v-card 
        class="my-8 recommend"
        color= "white"
        height="300"
        width="400"
        rounded-xl
        elevation = "10"
        to = "/random" 
      >
      <img 
        :src="food.img_path" 
        height="200px"
        class = "my-5 img"
      /> 
      <v-card-text>
         <h2 class="food-name">{{food.name}}</h2>
      </v-card-text>
      </v-card>
       
       </v-col>
      </template>
       </v-row>
      </v-container>
    </div>
  
</template>

<script>
import Food from "../store/Foods";
export default {
    data() {
        return {
           foodData : [],
        }
    },
   created(){
    this.fetchFoods()
    },
  methods: {
    async fetchFoods() {
      await Food.dispatch('fetchFoods')
      this.foodData = Food.getters.foods
      console.log(this.foodData)
      }
  }
  
}
</script>

<style scoped lang="css">
.reccomend_card {
  margin: auto;
  padding-top: 40px;
  align-items: center;
}
.food-name{
  font-family: "FC Palette";
  text-align: center;
  font-size: 30px;
  color: #000000;
}
.recommend {
  border-radius: 30px;
}
.img {
  border-radius: 30px;
}
</style>
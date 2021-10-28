<template>
  
  <div class="recommend_card">
      <v-container class = my-3>
         <v-row no-gutters >
        <template v-for = "(foodData,idex) in 10">
          {{picker()}}
          <v-col md="6" :key = "idex" >
           
      <v-card 
        class="my-8 recommend"
        color= "white"
        height="300"
        width="400"
        rounded-xl
        elevation = "10"
        to = "/food" 
      >
      <img 
        :src="chosenFood.img_path"
        height="200px"
        class = "my-5 img"
      /> 
      <v-card-text>
         <h2 class="food-name">{{chosenFood.name}}</h2>
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
           chosenFood : {}
        }
    },
   created(){
    this.fetchFoods()
    },
  methods: {
     picker(){
      this.chosenFood = null
      var numIndex = Math.floor(Math.random() * this.foodData.length)
      this.chosenFood = this.foodData[numIndex]
      },
    async fetchFoods() {
      await Food.dispatch('fetchFoods')
      this.foodData = Food.getters.foods
      console.log(this.foodData)
      },

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
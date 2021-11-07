<template>
  
  <div class="recommend_card">

      <v-container class = my-3>
        <v-row no-gutters >
          <template v-for = "(foodData,idex) in 10">
          {{picker()}}
          <v-col md="6" :key = "idex">

            <v-card 
            class="my-8 recommend"
            color= "white"
            height="300"
            width="400"
            rounded-xl
            elevation = "10"
            @click="clickRec()"
            >
            <img 
            :src="chosenFood_img"
            height="200px"
            class = "my-5 img"
            /> 
            <v-card-text>
              <h2 class="food-name">{{chosenFood_name}}</h2>
            </v-card-text>
            </v-card>

            <transition name="slide" appear v-if="showModal">
              <div class="modal">
                <foodview class="food" :chosen="chosenFood"></foodview>
                <v-btn @click="showModal=false">Return to Home page</v-btn>
              </div>
            </transition>

          </v-col>
          </template>
       </v-row>

      </v-container>

    </div>
</template>

<script>
import Food from "../store/Foods";
import foodview from '../views/Food';
//import FoodResult from './FoodResult.vue';
export default {
  components: { foodview},
    data() {
        return {
           foodData : [],
           chosenFood : {},
           chosenFood_name: {},
           chosenFood_img: {},
           showModal: false
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
      this.chosenFood_name = this.foodData[numIndex].name
      this.chosenFood_img = this.foodData[numIndex].img_path
      },
    async fetchFoods() {
      await Food.dispatch('fetchFoods')
      this.foodData = Food.getters.foods
      console.log(this.foodData)
      },
      clickRec(){
        this.showModal = true
      }
  }
  
}
</script>

<style scoped lang="css">
.recommend_card {
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
.modal{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  background-color: white;
  
}
.food{
  transform: scale(100%);
}
</style>
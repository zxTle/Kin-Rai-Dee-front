<template>
<div>
  <bar></bar>
  <div align="center">
    <v-btn to ="/random" class="btnkin rounded-xl" color="#D72323" width="300px" height="50">
      <v-icon color="white" left size="40px">
        mdi-silverware
      </v-icon>
      <p class="kinrai">วันนี้กินอะไรดีน้า</p>
    </v-btn>
    <h1 class="rec">- เมนูแนะนำ -</h1>
    <recommend v-if="this.isHaveData" :foods="this.foods"></recommend>
  </div>
  
  <!-- <div>
    <v-container class="btn">
      <v-btn  elevation="2" to="/signup">Signup</v-btn> |
      <router-link to ="/test">Test</router-link> |
      <router-link to = "/admin">Admin</router-link> |
      <router-link to = "/login">Login</router-link> |
    </v-container>
  </div> -->
</div>

</template>

<script>
import Bar from '../components/Bar.vue'
import Recommend from '../components/Recommend.vue'
import Food from "../store/Foods";
export default {
  components: { Bar, Recommend },
    name: 'Home',
    data(){
      return{
        foods:[],
        isHaveData : false
      }
    },
    created(){
    this.fetchFoods()
  },
  methods: {
    async fetchFoods() {
      await Food.dispatch('fetchFoods')
      this.foodData = Food.getters.foods
      while(this.foods.length <= 10){
        this.chosenFood = null
        var numIndex = Math.floor(Math.random() * this.foodData.length)
        this.chosenFood = this.foodData[numIndex]
        if(!this.foods.some((item) => item === this.chosenFood)){
          this.foods.push(this.chosenFood)
        }
      }
      this.isHaveData=true
      },

  }
}
</script>

<style scoped lang="css">
  .btn{
    margin-top: 100px;
    text-align: center;
  }
  .btnkin{
    margin-top: 50px;
    border-radius: 20px;
  }
  .kinrai{
    color: white;
    font-family: "FC Palette";
    padding-top: 30px;
    padding-left: 10px;
    font-size: 30px;
    text-align: center;
  }
  .rec{
    background: -webkit-linear-gradient(#c50000, #FFE248);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 50px;
    font-family: "FC Palette";
    font-size: 100px;
  }

 

</style>

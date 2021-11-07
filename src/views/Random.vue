<template>
<div>
  <bar></bar>

    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x transition="scroll-y-transition"
      max-width="500"
      height="430">
      <template v-slot:activator="{ on, attrs }">
          <div 
          v-bind="attrs"
          v-on="on"
          class="mr-16 mt-8 d-flex flex-row-reverse">
            <v-img  src="../assets/filter-filled-tool-symbol.png" max-height="35" max-width="35"  ></v-img>
          </div>
      </template>
      <v-card class="mx-auto" max-width="500" height="430" rounded-xl>
        <v-card-title class = "font_only" style="background:#C50000;color:white">
          Filter Types & Categories
        </v-card-title>
        <v-row no-gutters justify="start" class="ml-10">
          <div class="border" >Categories </div>
        </v-row>

        <v-row justify="start">
          <v-select v-model="selectedChoice" :items="categories" label="Categories" class="mx-8 mt-2" multiple chips ></v-select>
        </v-row>

        <v-row no-gutters justify="start" class="ml-10">
          <div class="border" >Types</div>
        </v-row>

        <v-row justify="start">
          <v-select v-model="selectedChoice" :items="types" label="Types" class="mx-8 mt-2" multiple chips></v-select>
        </v-row>

      </v-card>
    </v-menu>


  <!-- <div class="mr-16 mt-8 d-flex flex-row-reverse">
    <v-img  src="../assets/filter-filled-tool-symbol.png" max-height="35" max-width="35"  ></v-img>
  </div> -->
 <h1>{{selectedChoice}}</h1>
 <v-card v-for="(food,index) in filteredFood" :key="index"> {{ food }} </v-card>

  <v-sheet
    class="mb-lg-14 mt-3 mx-lg-auto random"
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
      <v-card-text class="text-center ">
        <h2>อาหารที่สุ่มได้</h2>
      </v-card-text>
      <h1 class="result_text">{{chosenFood_name}}</h1>
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
  <food-result v-if="this.chosenFood.ingredients!=null" :food="this.chosenFood" :isRandom="true"></food-result>
  <h1 v-else>dsda</h1>
</div>
</template>

<script>
import FoodStore from '@/store/Foods'
import Bar from '../components/Bar.vue'
import FoodResult from '../components/FoodResult.vue'
  export default {
  components: { Bar,FoodResult},
  data() {
    return {
      foods: [],
      chosenFood_name: '',
      chosenFood : {},
      categories : ["จีน", "เกาหลี", "อิตาลี", "ไทย", "อินเดีย", "ญี่ปุ่น", "นานาชาติ"],
      types : ["คาว", "หวาน"],
      selectedChoice : []
    }
  },
  created(){
    this.fetchFoods()
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
    },
  },
  computed:{
    filteredFood: function(){
        let res = this.foods.filter((element) => {
        // เลือกแค่ category ไม่ได้เลือก type

          let selectedCgr = this.selectedChoice.indexOf(element.category) // element นี้มี category อยู่ใน selectedCgr
          let selectedT = this.selectedChoice.indexOf(element.type)
          let selectedBoth = this.selectedChoice.indexOf(element.category && element.type) 
          
          console.log("Cgr",selectedCgr);
          console.log("Type",selectedT);
          console.log("Both",selectedBoth);

          // console.log("category",this.selectedChoice.indexOf(element.category)!== -1)
          // console.log("type",this.selectedChoice.indexOf(element.type)!==-1)
          // ทั้งคู่
          // เลือกแค่ category ไม่ได้เลือก type
          if(selectedBoth !== -1 && selectedCgr===0){
            console.log("both element",element.name)
            return true
          }
          else if(selectedCgr!==-1 && selectedT!==-1){ //&& selectedBoth===false){
            console.log("cgr element",element.name)
            return true;
          }
          //เลือกแค่ type ไม่ได้เลือก category
          else if(selectedT!==-1 && selectedCgr!==-1){// && selectedBoth===false){
            console.log("type element",element.name)
            return true;
          }
          else if(selectedT ===-1 && selectedCgr>=0 && selectedBoth===-1){
            console.log("enter");
            return true
          }
          else if( selectedCgr ===-1 && selectedT >=0 && selectedBoth===0){
            return true
          }
    
          


        //if(this.selectedChoice.indexOf(element.category)===-1 && this.selectedChoice.indexOf(element.type)===-1) return this.foods;
        // return this.selectedChoice.includes(element.category);
          });
        console.log(res);
        return res;
    }
  }

  }
</script>

<style scoped lang="css">
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
  font-size: 80px;
}
.random {
  border-radius: 30px;
}

.font_only{
  font-family: "FC Palette";
  font-size: 26px;
}

.border {
  font-family: "supermarket";
  font-size: 24px;
  font-weight: bold;
  color: #252525;
  margin-left: -11px;
  margin-top: 20px;
  text-align: center;
  padding-top: 0px;
  width: 190px;
  height: 50px;
  background: #ffffff;
  border: 6px solid #d72323;
  border-radius: 100px;
}

</style>
<template>
<div>
    <div>
        <v-card class="name-food rounded-pill" elevation="5" max-width="500" height="70"  outlined v-if="!isRandom">
        {{food.name}}</v-card>
    </div>
    <div class="food-result" align= "center">
    <v-card class="pic" elevation="10">
        <v-img :src ="food.img_path"
        :aspect-ratio="15/9">
        </v-img> 
    </v-card>
    <v-btn @click="gotograb"  class="grab-btn rounded-pill" elevation="2" width="210" height="40" color="#10C652">
        <v-img src="../assets/grab-food.png" contain aspect-ratio="1.67" class="imgic"></v-img>
        <p class="btn-text" >สั่งอาหาร</p>
    </v-btn>
    <v-btn :disabled=isLike @click="like" class="like-btn rounded-pill" elevation="2" width="210" height="40" color="#FC476E" v-if="isRandom">
        <v-img src="../assets/like.png" contain aspect-ratio="1.67" class="imgic"></v-img>
        <p class="btn-text" >ถูกใจเลย</p>
        
    </v-btn>
    <v-sheet color="#C50000" elevation="10" width="280" height="70" rounded="pill">
        <p class="ingd">ส่วนประกอบ</p>
    </v-sheet>
    <v-sheet  class="ingdList" width="850" max-height="2000"> 
        <v-card  v-for="item in igd" :key="item" class="igd rounded-pill" width="800" height="45"  outlined>
            <p class="igd_text">{{item.split(":")[0]}} <span style="float:right">{{item.split(":")[1]}}</span></p>  
        </v-card>
    </v-sheet>

    <v-sheet v-if="igd.length > 6" class="howto" color="#C50000" elevation="10" width="280" height="70" rounded="pill">
        <p>วิธีทำ</p>
    </v-sheet>
    <v-sheet v-else-if="igd.length <= 6" class="howto2" color="#C50000" elevation="10" width="280" height="70" rounded="pill">
        <p>วิธีทำ</p>
    </v-sheet>
    <v-sheet class="howList" max-width="1500" max-height="1200">
            <v-card  v-for="item in how" :key="item" class="how" max-width="1200" height="45" rounded="pill" outlined>
            <p class="how_text">{{item}} </p>  
        </v-card>
    </v-sheet>  
    
  </div>
  <rank v-if="isRandom" :foods="this.foodRank" :isHaveData="this.isHaveData"></rank>
</div>
  
</template>

<script>
import Food from '../store/Foods'
import Rank from './Rank.vue'
export default {
  components: { Rank },
    props : {
        food : {},
        isRandom : Boolean,
        isLike : Boolean,
        foodRank :[]
    },
    data (){
        return{
            isHaveData : true
        }
    },
    methods :{
        gotograb(){
            window.open(this.food.grabLink,"_blank")
        },
        async like(){
            this.food.score += 1
            await this.updateScore()
            this.isLike = true;
            this.fetchFoodsRank()
        },
        async updateScore(){
           await Food.dispatch("updateScore",this.food)
        },
         async fetchFoodsRank() {
            await Food.dispatch('getFoodsRank')
            this.foodRank = Food.getters.foodrank
        },
    },
    computed :{
        igd:function(){
            return this.food.ingredients.split(",")
        },
        how:function(){
            return this.food.how_to.split(",")
        }
    }
    

}
</script>

<style src= "../assets/css/food-result.css" scoped lang = "css">

</style>
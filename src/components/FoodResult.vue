<template>
<div>
    <div>
        <v-card class="name-food" elevation="5" max-width="300" height="45" rounded="pill" outlined v-if="!isRandom">
        {{food.name}}</v-card>
    </div>
    <div class="food-result" align= "center">
    <v-card class="pic" elevation="10">
        <v-img :src ="food.img_path"
        :aspect-ratio="15/9">
        </v-img> 
    </v-card>
    <v-btn @click="gotograb"  class="grab-btn" elevation="2" width="210" height="40" rounded="pill" color="#10C652">
        <v-img src="../assets/grab-food.png" contain aspect-ratio="1.67" class="imgic"></v-img>
        <p class="btn-text" >สั่งอาหาร</p>
    </v-btn>
    <v-btn class="like-btn" elevation="2" width="210" height="40" rounded="pill" color="#FC476E" v-if="isRandom">
        <v-img src="../assets/like.png" contain aspect-ratio="1.67" class="imgic"></v-img>
        <p class="btn-text" >ถูกใจเลย</p>
        
    </v-btn>
    <v-sheet color="#C50000" elevation="10" width="280" height="70" rounded="pill">
        <p class="ingd">ส่วนประกอบ</p>
    </v-sheet>
    <v-sheet  class="ingdList" width="850" max-height="1000"> 
        <v-card  v-for="item in igd" :key="item" class="igd" width="800" height="45" rounded="pill" outlined>
            <p class="igd_text">{{item.split(":")[0]}} <span style="float:right">{{item.split(":")[1]}}</span></p>  
        </v-card>
    </v-sheet>

    <v-sheet class="howto" color="#C50000" elevation="10" width="280" height="70" rounded="pill">
        <p>วิธีทำ</p>
    </v-sheet>
    <v-sheet class="howList" max-width="1200" max-height="1000">
            <v-card  v-for="item in how" :key="item" class="how" max-width="950" height="45" rounded="pill" outlined>
            <p class="how_text">{{item}} </p>  
        </v-card>
    </v-sheet>  
    
  </div>
</div>
  
</template>

<script>
export default {
    props : {
        food : {},
        isRandom : Boolean
    },
    data (){
        return{

        }
    },
    methods :{
        gotograb(){
            window.open(this.food.grabLink,"_blank")
        }
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
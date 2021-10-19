<template>
  <div class="food-result" align= "center">
      <v-card class="pic">
        <img :src = "food.img_path"/>
      </v-card>
      
      

  </div>
</template>

<script>
export default {
    props : {
        food : {}
    },
    data (){
        return {
            food_img : ''
        }
    }

}
</script>

<style src= "../assets/css/food-result.css" scoped lang = "css">

</style>
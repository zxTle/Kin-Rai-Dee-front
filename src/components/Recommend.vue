<template>
  <div class="recommend_card">

      <v-container class = my-3>
         <v-row no-gutters >
        <template v-for = "idex in 10">
          <v-col md="6" :key = "idex" >
      <v-card 
        class="my-8 recommend"
        color= "white"
        height="300"
        width="400"
        rounded-xl
        elevation = "10"
        @click="pick(idex)"
      >
      <v-img 
        :src="chosenFood_img[idex]"
        height="200px"
        class = "my-5 img rounded-b"
      ></v-img>
      <v-card-text>
         <h2 class="food-name">{{chosenFood_name[idex]}}</h2>
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
  props :{
    foods :[]
  },
  created(){
    this.setVariable()
  },
    data() {
        return {
           foodData : [],
           chosenFood_name: [],
           chosenFood_img: []
        }
    },
    methods:{
      setVariable(){
        for(let i=0;i<this.foods.length;i++){
          this.chosenFood_name[i] = this.foods[i].name
          this.chosenFood_img[i] = this.foods[i].img_path
        }
      },
      pick(index){
        for(let i=0;i<this.foods.length;i++){
          if(i===index){
            Food.dispatch('setFoodRec',this.foods[i])
          }
        }
        this.$router.push("/food");
      }
    }
      // pick(){
      //   console.log(this.chosenFood_name);
      //   Food.dispatch('setFoodRec',this.chosenFood)
      //   this.$router.push("/food")
      // }
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
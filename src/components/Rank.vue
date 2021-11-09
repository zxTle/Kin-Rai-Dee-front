<template>

  <div class="mb-12">
      <v-img  class="crown" src="../assets/crown.png" aspect-ratio="1" width="70" height=70></v-img>
      <v-card class="img rounded-circle" width="120" height="120" elevation="3" color="#C50000">
        <v-img v-if="this.isHaveData" :src="foods[0].img_path" class="rounded-circle image-food" :aspect-ratio="1" width="100" height="100"></v-img>
      </v-card> 
      <div v-if="this.isHaveData" class="card" align=center>
          <v-card class="rounded-xl" width="800" height="630">
          <v-card class="rounded-b" width="800" height="120" color="#C50000" @click="pickfirst">
              <p v-if="foods[0].score === 1"><span style="float:left" class="rank-text">1</span><span style="float:left" class="normal">{{foods[0].name}}</span> <span  class="normal" style="float:right">{{foods[0].score}} Like</span></p>
              <p v-if="foods[0].score != 1"><span style="float:left" class="rank-text">1</span><span style="float:left" class="normal">{{foods[0].name}}</span> <span  class="normal" style="float:right">{{foods[0].score}} Likes</span></p>
          </v-card>
          <v-card v-for="i in 3" :key=i class="rounded mt-6" elevation="5" width="750" height="100" @click="picknext(i)">
              <p v-if="foods[i].score === 1"><span style="float:left" class="rank-text1">{{i+1}}</span><span style="float:left" class="normal1">{{foods[i].name}}</span>
              <v-card class="rounded-circle img1" width="90" height="90" elevation="1" color="#C50000">
                 <v-img :src="foods[i].img_path" class="rounded-circle img-in" :aspect-ratio="1" width="80" height="80"></v-img> 
              </v-card>
               <span  class="normal1" style="float:right">{{foods[i].score}} Like</span></p>
               <p v-if="foods[i].score != 1"><span style="float:left" class="rank-text1">{{i+1}}</span><span style="float:left" class="normal1">{{foods[i].name}}</span>
              <v-card class="rounded-circle img1" width="90" height="90" elevation="1" color="#C50000">
                 <v-img :src="foods[i].img_path" class="rounded-circle img-in" :aspect-ratio="1" width="80" height="80"></v-img> 
              </v-card>
               <span  class="normal1" style="float:right">{{foods[i].score}} Likes</span></p>
          </v-card>
          <v-card class="rounded-t mt-6" elevation="5" width="750" height="100" @click="picklast">
              <p><span style="float:left" class="rank-text1">5</span><span style="float:left" class="normal1">{{foods[4].name}}</span>
              <v-card class="rounded-circle img1" width="90" height="90" elevation="1" color="#C50000">
                 <v-img :src="foods[4].img_path" class="rounded-circle img-in" :aspect-ratio="1" width="80" height="80"></v-img> 
              </v-card>
               <span  class="normal1" style="float:right">{{foods[4].score}} Likes</span></p>
          </v-card>
          </v-card>
      </div>
  </div>
</template>

<script>
import Food from "../store/Foods"
export default {
    props :{
        foods : [],
        isHaveData : Boolean
    },
    methods : {
        pickfirst(){
            Food.dispatch('setFoodRec',this.foods[0])
            this.$router.push("/food");
        },
        picknext(index){
            Food.dispatch('setFoodRec',this.foods[index])
            this.$router.push("/food");
        },
        picklast(){
            Food.dispatch('setFoodRec',this.foods[4])
            this.$router.push("/food");
        }
    }

}
</script>

<style src="../assets/css/rank.css"  scoped lang = "css">

</style>
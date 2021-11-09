<template>
  <div>
    <bar></bar>
    <div>
        <v-card class="history-text rounded-pill" elevation="5" width="250" height="50"  outlined>
        ประวัติการสุ่ม</v-card>
    </div>
    <div>
      <v-card v-for="item in foodsHistory" :key="item" class="item rounded-pill" width="1200" height="50" color="#C50000">
            <p class="text">{{item.timestamp}} => {{item.foodId}} <v-btn class="btn rounded-xl" style="float:right" @click="pick(item)"><v-icon>mdi-book</v-icon><span class="text-btn">ข้อมูลอาหาร</span></v-btn></p>  
        </v-card>
    </div>
  </div>
</template>

<script>
import Bar from "@/components/Bar.vue";
import History from "../store/Histories";
import { getAuth } from "firebase/auth";
import Food from "../store/Foods"
export default {
  components: {
    Bar,
  },
  data(){
    return {
      foodsHistory : [],
      foodSelect :{}
    }
  },
  created(){
    this.fetchHistory()
  },methods :{
    async fetchHistory(){
      await History.dispatch('getHistory',getAuth().currentUser.uid)
      this.foodsHistory = History.getters.history
    },
    pick(item){
      this.getFood(item)
    },
    async getFood(item){
      let name = item.foodId
      await Food.dispatch('getFoodByName',name)
      this.foodSelect = Food.getters.foodhis
      Food.dispatch('setFoodRec',this.foodSelect)
      this.$router.push("/food");
    }
  }
}
</script>

<style src="../assets/css/history.css" scoped land="css">

</style>
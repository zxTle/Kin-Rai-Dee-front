<template>
  <div>
    <bar></bar>

    <v-menu
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
      transition="scroll-y-transition"
      max-width="500"
      height="430"
    >
      <template v-slot:activator="{ on, attrs }">
        <div
          v-bind="attrs"
          v-on="on"
          class="mr-16 mt-8 d-flex flex-row-reverse"
        >
          <v-img
            src="../assets/filter-filled-tool-symbol.png"
            max-height="35"
            max-width="35"
            color="#C50000"
          ></v-img>
        </div>
      </template>
      <v-card class="mx-auto" max-width="500" height="430">
        <v-card-title
          class="font_only"
          style="background: #c50000; color: white"
        >
          Filter Types & Categories
        </v-card-title>
        <v-row no-gutters justify="start" class="ml-10">
          <div class="border">Categories</div>
        </v-row>

        <v-row justify="start">
          <v-select
            v-model="selectedChoiceCtg"
            :items="categories"
            label="Categories"
            class="mx-13 mt-2"
            multiple
            chips
          ></v-select>
        </v-row>

        <v-row no-gutters justify="start" class="ml-10">
          <div class="border">Types</div>
        </v-row>

        <v-row justify="start">
          <v-select
            v-model="selectedChoiceType"
            :items="types"
            label="Types"
            class="mx-13 mt-2"
            multiple
            chips
          ></v-select>
        </v-row>
      </v-card>
    </v-menu>

    <!-- <div class="mr-16 mt-8 d-flex flex-row-reverse">
    <v-img  src="../assets/filter-filled-tool-symbol.png" max-height="35" max-width="35"  ></v-img>
  </div> -->
    <!-- <h1>{{selectedChoiceCtg}}</h1>
 <h1>{{selectedChoiceType}}</h1>
 <v-card v-for="(food,index) in filteredFood" :key="index"> {{ food }} </v-card> -->

    <v-sheet
      class="mb-lg-14 mt-3 mx-lg-auto random"
      color="#C50000"
      height="350"
      rounded-xl
      width="650"
    >
      <div class="random_card">
        <v-card
          class="mx-lg-auto random"
          color="white"
          height="200"
          width="530"
          rounded-xl
        >
          <v-card-text class="text-center foodrandom">
            <h2>อาหารที่สุ่มได้</h2>
          </v-card-text>
          <h1 class="result_text mt-7">{{ chosenFood_name }}</h1>
        </v-card>
        <div class="random_btn">
          <v-btn
            class="ma-md-5"
            color="white"
            outlined
            rounded
            x-large
            @click="picker"
          >
            <span class="material-icons">casino</span>
            random</v-btn
          >
        </div>
      </div>
    </v-sheet>
    <food-result
      v-if="this.chosenFood.ingredients != null"
      :food="this.chosenFood"
      :isRandom="true"
      :isLike="false"
      :foodRank="this.foodRank"
    ></food-result>
    <rank v-else :foods="this.foodRank" :isHaveData="this.isHaveData"></rank>
  </div>
</template>

<script>
import FoodStore from "@/store/Foods";
import Bar from "../components/Bar.vue";
import FoodResult from "../components/FoodResult.vue";
import Rank from "../components/Rank.vue";
import History from "../store/Histories";
import { getAuth } from "firebase/auth";

export default {
  components: { Bar, FoodResult, Rank },
  data() {
    return {
      foods: [],
      chosenFood_name: "",
      chosenFood: {},
      foodRank: [],
      isHaveData: false,
      categories: [
        "จีน",
        "เกาหลี",
        "อิตาลี",
        "ไทย",
        "อินเดีย",
        "ญี่ปุ่น",
        "นานาชาติ",
      ],
      types: ["คาว", "หวาน"],
      selectedChoiceCtg: [],
      selectedChoiceType: [],
    };
  },
  created() {
    this.fetchFoods(), this.fetchFoodsRank();
  },
  methods: {
    async fetchFoods() {
      await FoodStore.dispatch("fetchFoods");

      this.foods = FoodStore.getters.foods;
    },
    picker() {
      this.chosenFood = null;
      var numIndex = Math.floor(Math.random() * this.filteredFood.length);
      this.chosenFood = this.filteredFood[numIndex];
      this.chosenFood_name = this.filteredFood[numIndex].name;
      this.fetchFoodsRank();
      this.addHistory()
    },
    async addHistory(){
        if(getAuth().currentUser){
        let foodHis = {
          userId : getAuth().currentUser.uid,
          foodId:this.chosenFood_name
        }
        await History.dispatch('addHistory',foodHis)
      }
    },
    async fetchFoodsRank() {
      await FoodStore.dispatch("getFoodsRank");
      this.foodRank = FoodStore.getters.foodrank;
      this.isHaveData = true;
    },
  },
  computed: {
    filteredFood: function () {
      let res = this.foods.filter((element) => {
        // เลือกแค่ category ไม่ได้เลือก type

        let selectedCtg = this.selectedChoiceCtg.includes(element.category); // element นี้มี category อยู่ใน selectedCgr
        let selectedT = this.selectedChoiceType.includes(element.type);

        if (
          this.selectedChoiceCtg.length === 0 &&
          this.selectedChoiceType.length === 0
        ) {
          return true;
        }

        // ถ้าเลือกแค่อย่างใดอย่างหนึ่ง either category
        else if (
          this.selectedChoiceCtg.length === 0 ||
          this.selectedChoiceType.length === 0
        ) {
          if (selectedCtg) return true;
          else if (selectedT) return true;
        } else {
          console.log("เลือกทั้งคู่");
          return (
            this.selectedChoiceCtg.includes(element.category) &&
            this.selectedChoiceType.includes(element.type)
          );
        }

        //if(this.selectedChoice.indexOf(element.category)===-1 && this.selectedChoice.indexOf(element.type)===-1) return this.foods;
        // return this.selectedChoice.includes(element.category);
      });
      return res;
    },
  },
};
</script>

<style scoped lang="css">
.foodrandom {
  font-family: "supermarket";
  font-size: 20px;
}
.random_card {
  margin: auto;
  padding-top: 40px;
  align-items: center;
}
.random_btn {
  text-align: center;
}
.result_text {
  font-family: "FC Palette";
  text-align: center;
  font-size: 50px;
}
.random {
  border-radius: 30px;
}

.font_only {
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
<template>
<div>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
  <bar></bar>
  <v-sheet
    class="ma-md-16 mx-lg-auto random"
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
      <h1 class="result_text">สปาเกตตี้</h1>
      </v-card>
      <div class="random_btn">
        <v-btn 
        class="ma-md-5"
        color ="white"
        outlined
        rounded
        x-large
      >
      <span class="material-icons">casino</span>
      random</v-btn>
      </div>
    </div>
  </v-sheet>
</div>
</template>

<script>
import Bar from '../components/Bar.vue'
  export default {
  components: { Bar }
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

</style>
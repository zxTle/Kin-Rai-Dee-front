<template>
<div>
  <bar></bar>
  <div align="center">
    <v-btn to ="/random" class="btnkin" color="#D72323" width="200px">
      <v-icon color="white" left size="25px">
        mdi-silverware
      </v-icon>
      <p class="kinrai">วันนี้กินอะไรดีน้า</p>
    </v-btn>
    
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
  export default {
  components: { Bar },
    name: 'Home',
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
    padding-top: 25px;
    padding-left: 10px;
    font-size: 20px;
    text-align: center;
  }

 

</style>

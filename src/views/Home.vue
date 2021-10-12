<template>
<div>
  <bar></bar>
  <div>
    <v-container class="btn">
      <v-btn  elevation="2" to="/signup">Signup</v-btn> |
      <router-link to ="/test">Test</router-link> |
      <router-link to = "/admin">Admin</router-link> |
    </v-container>
  </div>
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
 

</style>

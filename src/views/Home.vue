<template>
  <v-container class="btn">
    <v-btn  elevation="2" to="/signup">Signup</v-btn>
    <router-link to ="/test">Test</router-link>
  </v-container>

</template>

<script>
  export default {
    name: 'Home'
  }
</script>

<style scoped lang="css">
  .btn{
    text-align: center;
  }
</style>

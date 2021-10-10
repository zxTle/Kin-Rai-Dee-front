<template>
  <v-container class="btn">
    <v-btn  elevation="2" to="/signup">Signup</v-btn> |
    <router-link to ="/test">Test</router-link> |
    <router-link to = "/admin">Admin</router-link> |
  </v-container>
  
</template>

<script>
export default {

}
</script>

<style scoped lang="css">
  .btn{
    text-align: center;
  }
</style>

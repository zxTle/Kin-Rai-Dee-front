<template>
  <v-container class="btn">
    <log-in-suc></log-in-suc>
    <h1>{{ name }}</h1>
    <v-btn  elevation="2" to="/signup">Signup</v-btn> |
    <router-link to ="/test">Test</router-link> |
    <router-link to = "/login">Login</router-link> |
    <router-link to = "/logout">Logout</router-link> |
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

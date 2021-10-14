<template>
  <div>

    <h1>Login</h1>
    <v-form>
    <div class="input field">
      <label>Email</label>
      <v-col>
        <v-text-field v-model="email"></v-text-field>
      </v-col>
    </div>

    <div class="input-field">
        <label>Password</label>
        <v-text-field v-model="password"></v-text-field>
    </div>
    </v-form>


    <v-btn v-on:click="login" class="btn btn-large">Login</v-btn>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'login',
    data: function(){
        return{
          email: "",
          password:""
        };
    },
    methods:{
      login: function(e){
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email,this.password)
          .then(
            // user => {

            // }
          )
      }
    }
};
</script>

<style>
</style>
<template>
  <div class="form-wrap">
    <v-form class="login">
      <h2>Log in</h2>
      <v-text-field v-model="email"></v-text-field>
      <v-text-field v-model="password"></v-text-field>
      <v-btn @click="login">sign in</v-btn>
    </v-form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
    name: 'login',
    data: function(){
        return{
          email: "",
          password:""
        };
    },
    methods:{
      login (){
        const auth = getAuth();
        signInWithEmailAndPassword(auth,this.email,this.password)
          .then((userCredential)=> {
            const user = userCredential.user
            console.log(user.uid)
            this.$router.push("/");
          })
          .catch((err)=>{
            console.log(err)
          }
          )
      }
    }
};
</script>

<style>
</style>
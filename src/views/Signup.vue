<template>
    <v-container class="filform">
      <h1>Signup</h1>
      <label>Name : </label>
      <v-col class="filname" md="5">
        <v-text-field  v-model = "signup_form.name" outlined ></v-text-field>
     </v-col>
      <label>Surname : </label>
      <v-col class="filsurname" md="5">
        <v-text-field  v-model = "signup_form.surname" outlined ></v-text-field>
      </v-col>
      <label>Email : </label>
      <v-col class="filemail" md="5">
        <v-text-field  type="email" v-model = "signup_form.email" outlined ></v-text-field>
      </v-col>
      <label>Passsword : </label>
      <v-col class="filepass" md="5">
        <v-text-field  type="password" v-model = "signup_form.password"  outlined ></v-text-field>
      </v-col>
      <label>Confirm passsword : </label>
      <v-col class="filepass" md="5">
        <v-text-field  type="password" v-model = "signup_form.cfpass" outlined ></v-text-field>
      </v-col>
      <v-btn class= "btnsignup" @click="addFrom" elevation="2">Sign up</v-btn>
    </v-container>
</template>

<script>


export default {
  name: "Signup",
  data() {
    return {
      signup_form : {
        name : '',
        surname : '',
        email : '',
        password : '',
        cfpass :''
      }
    }
  },
  methods : {
    clearForm(){
      this.signup_form = {
        name : '',
        surname : '',
        email : '',
        password : '',
        cfpass :''
      }
    },
    addFrom(){
      if (this.signup_form.password != this.signup_form.cfpass){
        console.log("error")
        alert("Password and Confirm password not match ")
      }
      else {
        let payload = {
          name: this.signup_form.name,
          surname : this.signup_form.surname,
          email : this.signup_form.email,
          password :this.signup_form.password,
          cfpass :this.signup_form.cfpass
        }

        console.log(payload)
        this.clearForm()
      }
    }
  }

}
</script>

<style scoped lang="css">
.btnsignup{
  text-align: center;
}

</style>
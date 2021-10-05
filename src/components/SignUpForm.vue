<template>
    <v-form class="filform">
      <h1>Signup</h1>
      <label>Name : </label>
      <v-col class="filname" md="5">
        <v-text-field  v-model = "signup_form.name" outlined ></v-text-field>
     </v-col>
      <label>Surname : </label>
      <v-col class="filsurname" md="5">
        <v-text-field  v-model = "signup_form.surName" outlined ></v-text-field>
      </v-col>
      <label>Email : </label>
      <v-col class="filemail" md="5">
        <v-text-field  type="email" v-model = "signup_form.email" outlined ></v-text-field>
      </v-col>
      <label>Username : </label>
      <v-col class="filusername" md="5">
        <v-text-field v-model= "signup_form.username" outlined></v-text-field>
      </v-col>
      <label>Passsword : </label>
      <v-col class="filepass" md="5">
        <v-text-field  type="password" v-model = "signup_form.password"  outlined ></v-text-field>
      </v-col>
      <label>Confirm passsword : </label>
      <v-col class="filepass" md="5">
        <v-text-field  type="password" v-model = "signup_form.cfpass" outlined ></v-text-field>
      </v-col>
      
      <v-menu max-width="290"
      v-model="menu"
  :close-on-content-click="false">
    <template v-slot:activator="{ on }">
        <v-text-field  :value="formattedDate" label="Birthday Date" prepend-icon="mdi-calendar-range" v-on="on"></v-text-field>
    </template>
    <v-date-picker v-model="signup_form.birthDay"
    @change="menu = false"></v-date-picker>
    </v-menu>

      <v-btn class= "btnsignup" @click="addFrom" elevation="2">Sign up</v-btn>
    </v-form>
</template>

<script>
import Account from '../store/Accounts'
import { format, parseISO } from 'date-fns'
export default {
  data() {
    return {
      signup_form : {
        username : '',
        name : '',
        surName : '',
        email : '',
        password : '',
        cfpass :'',
        birthDay : ''
      },
      account : [],
      menu: false
    }
  },created () {
        this.fetchAccount()
    },
  methods : {
    async fetchAccount(){
            await Account.dispatch('fetchAccount')
            this.account = Account.getters.accounts
        },
    clearForm(){
      this.signup_form = {
        username : '',
        name : '',
        surName : '',
        email : '',
        password : '',
        cfpass :'',
        birthDay : ''
      }
    },
    save(date){
        this.$refs.menu.save(date)
    },
    addFrom(){
      console.log(this.signup_form.birthDay)
      if (!(this.checkField())){
        alert("Can't create account")
      }
      else {
        let payload = {
          username : this.signup_form.username,
          name: this.signup_form.name,
          surName : this.signup_form.surName,
          email : this.signup_form.email,
          password :this.signup_form.password,
          cfpass :this.signup_form.cfpass,
          birthDay : this.signup_form.birthDay
        }

        Account.dispatch('signupAccount',payload)
        this.clearForm()
      }
    },
    checkField(){
      this.account.forEach((acc) => {
        if((acc.username == this.signup_form.username) || (acc.email == this.signup_form.email)){
          return false
          }
      })
      if (this.signup_form.password != this.signup_form.cfpass){
        return false
      }
      else {return true}
    }
  },
  computed : {
    formattedDate(){
      return this.signup_form.birthDay ? format(parseISO(this.signup_form.birthDay), 'dd-MM-yyyy') : ''
    }
  }
}
</script>

<style>
.btnsignup{
  text-align: center;
}
.datefil{
  width: 60px;
}
</style>
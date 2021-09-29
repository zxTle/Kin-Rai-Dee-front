<template>
    <v-container class="filform">
      <h1>Signup</h1>
      <label>Name : </label>
      <v-col class="filname" md="5">
        <v-text-field  v-model = "name" outlined ></v-text-field>
     </v-col>
      <label>Surname : </label>
      <v-col class="filsurname" md="5">
        <v-text-field  v-model = "surname" outlined ></v-text-field>
      </v-col>
      <label>Email : </label>
      <v-col class="filemail" md="5">
        <v-text-field  type="email" v-model = "mail" outlined ></v-text-field>
      </v-col>
      <label>Passsword : </label>
      <v-col class="filepass" md="5">
        <v-text-field  type="password" v-model = "pass" outlined ></v-text-field>
      </v-col>
      <label>Confirm passsword : </label>
      <v-col class="filepass" md="5">
        <v-text-field  type="password" v-model = "cfpass" outlined ></v-text-field>
      </v-col>

    </v-container>
</template>

<script>


export default {
  name: "Signup",

}
</script>

<style scoped lang="css">


</style>
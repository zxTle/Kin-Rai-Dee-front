<template>
  <div>

    <h1>Login</h1>
    <v-form>
    <div class="input field">
      <label>Email</label>
      <v-col>
        <v-text-field></v-text-field>
      </v-col>
    </div>

    <div class="input-field">
        <label>Password</label>
        <v-text-field></v-text-field>
    </div>
    </v-form>


    <v-btn class="btn btn-large">Login</v-btn>
  </div>
</template>

<script>
export default {
    name: 'login',
    data: function(){
        return{}
    }
};
</script>

<style>
</style>
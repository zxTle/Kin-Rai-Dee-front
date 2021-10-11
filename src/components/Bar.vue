<template>
  <div>
  <v-card height="300px">
    <v-app-bar fade-img-on-scroll absolute prominent  src="../assets/cover.png" height="300px">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" id="icon" color ="white"></v-app-bar-nav-icon>
    <div  class = "web-name">
        <p class= "engname">Kin Rai Dee</p>
        <p class = "thainame">วันนี้กินไรดี ?</p>
    </div>
    
    </v-app-bar>
  </v-card>
        <v-navigation-drawer
        v-model="drawer"
        absolute
        bottom
        temporary
        color="#C50000"
    >
        <v-list nav>
        <v-list-item-group class="menu">
            <v-list-item>
            <v-list-item-title class="home-btn">หน้าหลัก</v-list-item-title>
            </v-list-item>

            <v-list-item>
            <v-list-item-title class="random-btn">สุ่มอาหาร</v-list-item-title>
            </v-list-item>

            <v-list-item>
            <v-list-item-title class="signin-btn">เข้าสู่ระบบ</v-list-item-title>
            </v-list-item>

            <v-list-item to="/signup">
            <v-list-item-title class="signup-btn">สมัครสมาชิก</v-list-item-title>
            </v-list-item>
        </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</div>
</template>

<script>
export default {
    name : 'Bar',
    data() {
      return {
        drawer :false
      
      }
    }
}
</script>

<style scoped lang="css" src = "../assets/style.css"></style>

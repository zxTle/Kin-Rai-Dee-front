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
        <v-container class="closebar">
          <v-btn icon @click.stop="drawer = !drawer">
            <v-icon color="white">
              fas fa-times
            </v-icon>
          </v-btn>
        </v-container>
        <v-list-item-group class="menu">
            <v-list-item to="/">
            <v-list-item-title class="home-btn">หน้าหลัก</v-list-item-title>
            </v-list-item>

            <v-list-item to="/random" >
            <v-list-item-title class="random-btn">สุ่มอาหาร</v-list-item-title>
            </v-list-item>

            <v-list-item to=/login  v-if="!isLoggedIn">
            <v-list-item-title class="signin-btn">เข้าสู่ระบบ</v-list-item-title>
            </v-list-item>

            <v-list-item to="/signup"  v-if="!isLoggedIn">
            <v-list-item-title class="signup-btn">สมัครสมาชิก</v-list-item-title>
            </v-list-item>

            <v-list-item to="/admin" v-if="isLoggedIn && isAdmin">
            <v-list-item-title class="signup-btn">เพิ่มอาหาร</v-list-item-title>
            </v-list-item>

            <v-list-item to="/profile" v-if="isLoggedIn">
            <v-list-item-title class="signup-btn">ข้อมูลส่วนตัว</v-list-item-title>
            </v-list-item>
            
            <v-list-item v-if="isLoggedIn">
            <v-list-item-title @click="logOut"  class="signup-btn">ออกจากระบบ</v-list-item-title>
            </v-list-item>
        </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</div>
</template>

<script>
import { getAuth } from "firebase/auth";
import Account from "../store/Accounts";

export default {
  name: "Bar",
  data() {
    return {
      drawer: false,
      isLoggedIn: false,
      currentUser: false,
      accountData: {},
      isAdmin : false
    };
  },
  created() {
    if (getAuth().currentUser) {
      (this.isLoggedIn = true),
        (this.currentUser = getAuth().currentUser.email);
      //this.getAccount(getAuth().currentUser.uid);
    }
  },
  methods: {
    logOut() {
      getAuth()
        .signOut()
        .then(() => {
          if (this.$router.currentRoute.path != "/") {
            this.$router.push("/");
          } else {
            location.reload();
          }
        });
    },
    checkRoles() {
      if (this.accountData.roles === "admin") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    },
    async getAccount(uid) {
      await Account.dispatch("getAccData", uid);
      this.accountData = Account.getters.accountData;
      //check ข้อูลuser ในนี้แล้วจะขึ้น แต่ถ้าใน created หลังบรรทัด76 จะไม่ขึ้นเพราะยังทำฟังก์ชันนี้ไม่เสร็จ
      console.log(this.accountData.name);
      // console.log(this.accountData.roles);
      // console.log(this.checkRoles())
      this.checkRoles();
    },
  },
};
</script>

<style scoped lang="css" src = "../assets/style.css"></style>

<template>
  <v-sheet
    class="ma-md-2 mx-lg-auto"
    color= #ffffff
    height="480"
    rounded-xl
    width="630"
    outlined
    tile
  >
    <div class="topic">
      <h1>Profile</h1>
    </div>
  
    <v-container>
      <!-- name and surname -->
      <v-row class ="pt-5 ml-10" no-gutters>
        <v-col cols="16" sm="5">
          <label class="pa-5 font-FC-Palette">
            Name
          </label>
          <label class="profile-data">{{accountData.name}}</label>
        </v-col>
        

        <v-col cols="16" sm="5">
          <label class="pa-5 font-FC-Palette">
            Surname
          </label>
          <label class="profile-data">{{accountData.surName}}</label>
        </v-col>
      </v-row>

      <!-- username -->
      <v-row class ="pt-5 ml-10" no-gutters>
        <v-col cols="16" sm="10">
          <label class="pa-5 font-FC-Palette">
            Username
          </label>
          <label class="profile-data">{{accountData.username}}</label>
        </v-col>
      </v-row>

      <!-- email -->
      <v-row class ="pt-5 ml-10" no-gutters>
        <v-col cols="16" sm="10">
          <label class="pa-5 font-FC-Palette">
            Email
          </label>
          <label class="profile-data">{{accountData.email}}</label>
        </v-col>
      </v-row>

      <!-- birthday -->
      <v-row class ="pt-5 ml-10" no-gutters>
        <v-col cols="16" sm="10">
          <label class="pa-5 font-FC-Palette">
            Birthday
          </label>
          <!-- ได้วันเกิดใครมาไม่รู้ ค่อยแก้ทีหลัง -->
          <label class="profile-data">{{accountData.birthDay}}</label>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
    
</template>

<script>
import { getAuth } from "firebase/auth";
import Account from "../store/Accounts";
import { format, parseISO } from "date-fns";

export default {
  data() {
    return{
      accountData : {},
      date: ''
    }
  },
  created() {
    this.getAccount(getAuth().currentUser.uid);
  },
  methods: {
    async getAccount(uid) {
      await Account.dispatch("getAccData", uid);
      this.accountData = Account.getters.accountData;
      // console.log(this.accountData.birthDay);
      console.log(this.accountData);

      // โค้ดข้างล่างใช้ไม่ได้ค่ะ ติดไว้ก่อน
      this.date = this.accountData.birthDay
        ? format(parseISO(this.accountData.birthDay), "dd-MM-yyyy")
        : "";
        
    },

  }

}
</script>

<style scoped lang="css">
.topic {
  font-family: "FC Palette";
  font-size: 25px;
  margin-left: 50px;
  margin-top: 50px;
  text-align: center;
  padding-top: 10px;
  width: 200px;
  height: 100px;
  background: #ffffff;
  border: 7.75px solid #d72323;
  border-radius: 100px;
}
.font-FC-Palette{
  font-family: "FC Palette";
  color: #d72323;
  font-size: 30px;
}
.profile-data{
  font-family: "supermarket";
  font-size: 21px;
}
</style>
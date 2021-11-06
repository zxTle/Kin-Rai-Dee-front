<template>
  <v-sheet
    class="ma-md-2 mx-lg-auto"
    color="#ffffff"
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
      <v-row class="pt-5 ml-10" no-gutters>
        <v-col>
          <div class="d-flex flex-row">
            <label class="font-FC-Palette"> Name </label>
            <label v-if="showName" class="ml-10 profile-data">{{
              accountData.name
            }}</label>
            <v-icon class="ml-5" v-if="showName" @click="changeName">{{
              icons.mdiPencil
            }}</v-icon>
            <v-text-field
              class="ml-5"
              v-if="isEditName"
              v-model="profile_form.name"
              outlined
              rounded
              dense
            ></v-text-field>
            <v-btn class="ml-5" v-if="isEditName" @click="editName"
              >ยืนยัน</v-btn
            >
          </div>
        </v-col>
      </v-row>

      <v-row class="pt-5 ml-10" no-gutters>
        <v-col>
          <div class="d-flex flex-row">
            <label class="font-FC-Palette"> Surname </label>
            <label v-if="showSurname" class="ml-10 profile-data">{{
              accountData.surName
            }}</label>
            <v-icon class="ml-5" v-if="showSurname" @click="changeSurname">{{
              icons.mdiPencil
            }}</v-icon>
            <v-text-field
              class="ml-5"
              v-if="isEditSurname"
              v-model="profile_form.surName"
              outlined
              rounded
              dense
            ></v-text-field>
            <v-btn class="ml-5" v-if="isEditSurname" @click="editSurname"
              >ยืนยัน</v-btn
            >
          </div>
        </v-col>
      </v-row>

      <!-- username -->
      <v-row class="pt-5 ml-10" no-gutters>
        <v-col>
          <div class="d-flex flex-row">
            <label class="font-FC-Palette"> Username </label>
            <label v-if="showUsername" class="ml-10 profile-data">{{
              accountData.username
            }}</label>
            <v-icon class="ml-5" v-if="showUsername" @click="changeUsername">{{
              icons.mdiPencil
            }}</v-icon>
            <v-text-field
              class="ml-5"
              v-model="profile_form.username"
              v-if="isEditUsername"
              outlined
              rounded
              dense
            ></v-text-field>
            <v-btn class="ml-5" v-if="isEditUsername" @click="editUsername"
              >ยืนยัน</v-btn
            >
          </div>
        </v-col>
      </v-row>

      <!-- email -->
      <v-row class="pt-5 ml-10" no-gutters>
        <v-col>
          <div class="d-flex flex-row">
            <label class="font-FC-Palette"> Email </label>
            <label v-if="showEmail" class="ml-10 profile-data">{{
              accountData.email
            }}</label>
            <v-icon class="ml-5" v-if="showEmail" @click="changeEmail">{{
              icons.mdiPencil
            }}</v-icon>
            <v-text-field
              class="ml-5"
              v-model="profile_form.email"
              v-if="isEditEmail"
              outlined
              rounded
              dense
            ></v-text-field>
            <v-btn class="ml-5" v-if="isEditEmail" @click="editEmail"
              >ยืนยัน</v-btn
            >
          </div>
        </v-col>
      </v-row>

      <!-- birthday -->
      <v-row class="pt-5 ml-10" no-gutters>
        <v-col cols="16" sm="10">
          <label class="font-FC-Palette"> Birthday </label>
          <!-- ได้วันเกิดใครมาไม่รู้ ค่อยแก้ทีหลัง -->
          <label class="ml-10 profile-data">{{ accountData.birthDay }}</label>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { getAuth } from "firebase/auth";
import Account from "../store/Accounts";
import { format, parseISO } from "date-fns";
import { mdiPencil } from "@mdi/js";

export default {
  data() {
    return {
      accountData: {},
      date: "",
      isEditName: false,
      showName: true,
      isEditSurname: false,
      showSurname: true,
      isEditUsername: false,
      showUsername: true,
      isEditEmail: false,
      showEmail: true,
      icons: {
        mdiPencil,
      },
      profile_form: {
        username: "",
        name: "",
        surName: "",
        email: "",
        birthDay: "",
      },
    };
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
    async updateProfile(accountData) {
      await Account.dispatch("updateProfile", accountData);
    },
    changeName() {
      this.isEditName = true;
      this.showName = false;
    },
    changeSurname() {
      this.isEditSurname = true;
      this.showSurname = false;
    },
    changeUsername() {
      this.isEditUsername = true;
      this.showUsername = false;
    },
    changeEmail() {
      this.isEditEmail = true;
      this.showEmail = false;
    },
    async editName() {
      this.isEditName = false;
      this.showName = true;

      this.accountData.name = this.profile_form.name;
      // let uid = getAuth().currentUser.uid
      await this.updateProfile(this.accountData);
    },
    editEmail() {
      this.isEditEmail = false;
      this.showEmail = true;
    },
    editSurname() {
      this.isEditSurname = false;
      this.showSurname = true;
    },
    editUsername() {
      this.isEditUsername = false;
      this.showUsername = true;
      // this.$router.push("/");
    },
  },
};
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
.font-FC-Palette {
  font-family: "FC Palette";
  color: #d72323;
  font-size: 30px;
}
.profile-data {
  font-family: "supermarket";
  font-size: 21px;
}
</style>
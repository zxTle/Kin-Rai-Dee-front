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
          <label class="pa-5 font-FC-Palette"> Name </label>
          <label v-if="showName" class="profile-data">{{
            accountData.name
          }}</label>
          <v-icon v-if="showName" @click="changeName">{{
            icons.mdiPencil
          }}</v-icon>
          <v-text-field
            v-if="isEditName"
            v-model="profile_form.name"
            outlined
            rounded
            dense
          ></v-text-field>
          <v-btn v-if="isEditName" @click="editName">ยืนยัน</v-btn>
        </div>
        </v-col>
      </v-row>

      <v-row class="pt-5 ml-10" no-gutters>
        <v-col cols="16" sm="5">
          <label class="pa-5 font-FC-Palette"> Surname </label>
          <label v-if="showSurname" class="profile-data">{{
            accountData.surName
          }}</label>
          <v-icon v-if="showSurname" @click="changeSurname">{{
            icons.mdiPencil
          }}</v-icon>
          <v-text-field
            v-if="isEditSurname"
            v-model="profile_form.surName"
            outlined
            rounded
            dense
          ></v-text-field>
          <v-btn v-if="isEditSurname" @click="editSurname">ยืนยัน</v-btn>
        </v-col>
      </v-row>

      <!-- username -->
      <v-row class="pt-5 ml-10" no-gutters>
        <v-col cols="16" sm="10">
          <label class="pa-5 font-FC-Palette"> Username </label>
          <label v-if="showUsername" class="profile-data">{{
            accountData.username
          }}</label>
          <v-icon v-if="showUsername" @click="changeUsername">{{
            icons.mdiPencil
          }}</v-icon>
          <v-text-field
            v-model="profile_form.username"
            v-if="isEditUsername"
            outlined
            rounded
            dense
          ></v-text-field>
          <v-btn v-if="isEditUsername" @click="editUsername">ยืนยัน</v-btn>
        </v-col>
      </v-row>

      <!-- email -->
      <v-row class="pt-5 ml-10" no-gutters>
        <v-col cols="16" sm="10">
          <label class="pa-5 font-FC-Palette"> Email </label>
          <label v-if="showEmail" class="profile-data">{{
            accountData.email
          }}</label>
          <v-icon v-if="showEmail" @click="changeEmail">{{
            icons.mdiPencil
          }}</v-icon>
          <v-text-field
            v-model="profile_form.email"
            v-if="isEditEmail"
            outlined
            rounded
            dense
          ></v-text-field>
          <v-btn v-if="isEditEmail" @click="editEmail">ยืนยัน</v-btn>
        </v-col>
      </v-row>

      <!-- birthday -->
      <v-row class="pt-5 ml-10" no-gutters>
        <v-col cols="16" sm="10">
          <label class="pa-5 font-FC-Palette"> Birthday </label>
          <!-- ได้วันเกิดใครมาไม่รู้ ค่อยแก้ทีหลัง -->
          <label class="profile-data">{{ accountData.birthDay }}</label>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
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
    editName() {
      this.isEditName = false;
      this.showName = true;

      const auth = getAuth();
      // console.log(this.accountData.surName);
      updateProfile(auth.currentUser, {
        name: this.profile_form.name,
      })
        .then(() => {
          console.log(this.accountData.name);
          // console.log("acces")
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editEmail() {
      this.isEditEmail = false;
      this.showEmail = true;

      const auth = getAuth();
      updateEmail(auth.currentUser, this.profile_form.email)
        .then(() => {
          console.log("success email");
        })
        .catch((error) => {
          console.log(error);
        });
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
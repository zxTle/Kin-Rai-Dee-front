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
          <label class="font-FC-Palette"> Email </label>
          <label class="ml-10 profile-data">{{ accountData.email }}</label>
        </v-col>
      </v-row>

      <!-- birthday -->
      <v-row class="pt-5 ml-10" no-gutters>
        <v-col>
          <div class="d-flex flex-row">
            <label class="font-FC-Palette"> Birthday </label>
            <label v-if="showBirthday" class="ml-10 profile-data">{{
              accountData.birthDay
            }}</label>
            <v-icon
              v-if="showBirthday"
              @click="changeBirthday"
              class="ml-5"
              large
              >event</v-icon
            >
            <v-date-picker
              v-model="profile_form.birthDay"
              class="ml-5"
              v-if="isEditBirthday"
            ></v-date-picker>
            <v-btn class="ml-5" v-if="isEditBirthday" @click="editBirthday"
              >ยืนยัน</v-btn
            >
          </div>
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
      isEditBirthday: false,
      showBirthday: true,
      icons: {
        mdiPencil,
      },
      profile_form: {
        username: "",
        name: "",
        surName: "",
        email: "",
        birthDay: null,
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
    clearForm() {
      this.profile_form = {
        username: "",
        name: "",
        surName: "",
        email: "",
        birthDay: null,
      };
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
    changeBirthday() {
      this.isEditBirthday = true;
      this.showBirthday = false;
    },
    async editBirthday() {
      this.isEditBirthday = false;
      this.showBirthday = true;

      if (this.profile_form.birthDay !== null) {
        this.accountData.birthDay = this.formattedDate;
        await this.updateProfile(this.accountData);
      }
      this.clearForm();
    },
    async editName() {
      this.isEditName = false;
      this.showName = true;

      if (this.profile_form.name !== "") {
        this.accountData.name = this.profile_form.name;
        await this.updateProfile(this.accountData);
      }
      this.clearForm();
    },
    async editSurname() {
      this.isEditSurname = false;
      this.showSurname = true;

      if (this.profile_form.surName !== "") {
        this.accountData.surName = this.profile_form.surName;
        // let uid = getAuth().currentUser.uid
        await this.updateProfile(this.accountData);
      }
      this.clearForm();
    },
    async editUsername() {
      this.isEditUsername = false;
      this.showUsername = true;

      if (this.profile_form.username !== "") {
        this.accountData.username = this.profile_form.username;
        await this.updateProfile(this.accountData);
      }
      this.clearForm();
    },
  },
  computed: {
    formattedDate() {
      return this.profile_form.birthDay
        ? format(parseISO(this.profile_form.birthDay), "dd-MM-yyyy")
        : "";
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
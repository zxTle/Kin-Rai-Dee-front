<template>
  <v-form class="filform ml-16" >
    <div class="border font-FC-Palette ml-16">
      <h1>Sign up</h1>
    </div>

    <v-sheet class="mt-10 ml-14" width="1500">
      <v-row class="d-flex flex-row ml-16">
        <label class="pt-5 font-FC-Palette font-size">Name : </label>
        <v-col class="filname" md="5" >
          <v-text-field
            class="text-field-size"
            v-model="signup_form.name"
            :rules="[() => !!signup_form.name || 'กรุณากรอกชื่อ']"
            outlined
            rounded
            dense
          ></v-text-field>
        </v-col>
        <label class="pt-5 font-FC-Palette font-size float-left "
          >Surname :
        </label>
        <v-col class="filsurname" md="5">
          <v-text-field
            class="text-field-size ml-2"
            v-model="signup_form.surName"
            :rules="[() => !!signup_form.surName || 'กรุณากรอกนามสกุล']"
            outlined
            rounded
            dense
          ></v-text-field>
        </v-col>
      </v-row>

      <div class="d-flex flex-row ml-16">
        <label class="font-FC-Palette font-size pt-5">Email : </label>
        <v-col class="filemail" md="5">
          <v-text-field
            class="text-field-size"
            type="email"
            v-model="signup_form.email"
            :rules="[() => !!signup_form.email || 'กรุณากรอกอีเมล']"
            outlined
            rounded
            dense
          ></v-text-field>
        </v-col>
        <label class="font-FC-Palette font-size pt-5 ml-1">Username : </label>
        <v-col class="filusername" md="5">
          <v-text-field
            class="text-field-size"
            v-model="signup_form.username"
            :rules="[() => !!signup_form.username || 'กรุณาตั้งชื่อผู้ใช้']"
            outlined
            rounded
            dense
          ></v-text-field>
        </v-col>
      </div>

      <div class="d-flex flex-row ml-16">
        <label class="font-FC-Palette font-size pt-5 ">Passsword :</label>
        <v-col class="filepass" md="5" ml="16">
          <v-text-field
            class="text-field-size300 ml-16"
            v-model="signup_form.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            :rules="rule.checkmin"
            outlined
            rounded
            dense
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
      </div>
      <div class="d-flex flex-row ml-16">
        <label class="font-FC-Palette font-size pt-5"
          >Confirm passsword :</label
        >
        <v-col class="filepass" md="5">
          <v-text-field
            class="text-field-size290"
            v-model="signup_form.cfpass"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            :rules="rule.checkcf"
            outlined
            rounded
            dense
            @click:append="show2 = !show2"
          ></v-text-field>
        </v-col>
      </div>

      <v-menu max-width="290" v-model="menu" :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-text-field
            :value="formattedDate"
            label="Birthday Date"
            class="font-FC-Palette font-size text-field-size ml-16"
            prepend-icon="mdi-calendar-range"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="signup_form.birthDay"
          @change="menu = false"
        ></v-date-picker>
      </v-menu>

      <v-col align="center">
        <v-btn
          class="white--text btnsignup font-FC-Palette"
          color="#d72323"
          rounded
          @click="addFrom"
          elevation="10"
          x-large
          :loading="loading"
          >Sign up</v-btn>
      </v-col>
    </v-sheet>
  </v-form>
</template>

<script>
import Account from "../store/Accounts";
import { format, parseISO } from "date-fns";
export default {
  data() {
    return {
      signup_form: {
        username: "",
        name: "",
        surName: "",
        email: "",
        password: "",
        cfpass: "",
        birthDay: "",
      },
      account: [],
      menu: false,
      loading: false,
      show1: false,
      show2: false,
      rule: {
        checkcf: [
          (value) => value == this.signup_form.password || "พาสเวิร์ดไม่ตรงกัน",
        ],
        checkmin: [
          (value) =>
            (value && value.length >= 6) || "ความยาวอย่างน้อย 6 ตัวอักษร",
        ],
      },
    };
  },
  created() {
    this.fetchAccount();
  },
  methods: {
    async fetchAccount() {
      await Account.dispatch("fetchAccount");
      this.account = Account.getters.accounts;
    },
    clearForm() {
      this.signup_form = {
        username: "",
        name: "",
        surName: "",
        email: "",
        password: "",
        cfpass: "",
        birthDay: "",
      };
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    addFrom() {

      if (!this.checkNull()) {
        alert("Please complete the form");
      } else if (!this.checkField()) {
        alert("This email or username already exist");
      } else if (!this.checkOther()) {
        alert("Please check your password and confirm-password");
      } else {
        let payload = {
          username: this.signup_form.username,
          name: this.signup_form.name,
          surName: this.signup_form.surName,
          email: this.signup_form.email,
          password: this.signup_form.password,
          cfpass: this.signup_form.cfpass,
          birthDay: this.formattedDate,
        };
        Account.dispatch("signupAccount", payload);
        alert("create account success");
        this.clearForm();
        this.$router.push("/");
      }
    },
    checkField() {
      this.account.forEach((acc) => {
        if (
          acc.username == this.signup_form.username ||
          acc.email == this.signup_form.email
        ) {
          return false;
        }
      });
      return true;
    },
    checkOther() {
      if (this.signup_form.password !== this.signup_form.cfpass) {
        return false;
      } else if (this.signup_form.password.length < 6) {
        return false;
      } else {
        return true;
      }
    },
    checkNull() {
      if (
        this.signup_form.username === "" ||
        this.signup_form.name === "" ||
        this.signup_form.surName === "" ||
        this.signup_form.email === "" ||
        this.signup_form.password === ""||
        this.signup_form.cfpass === "" ||
        this.signup_form.birthDay === null
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  computed: {
    formattedDate() {
      return this.signup_form.birthDay
        ? format(parseISO(this.signup_form.birthDay), "dd-MM-yyyy")
        : "";
    },
  },
};
</script>

<style scoped lang="css">
.text-field-size290 {
  width: 290px;
}
.text-field-size300 {
  width: 300px;
}
.text-field-size {
  width: 400px;
}
.font-size {
  font-size: 22px;
}
.font-FC-Palette {
  font-family: "FC Palette";
}
.font-form {
  font-family: Arial, Helvetica, sans-serif;
}
.btnsignup {
  font-size: 24px;
  box-shadow: 0px 0px 5px 5px rgba(83, 51, 51, 0.25);
  border-radius: 50px;
  width: 160px;
}
.datefil {
  width: 60px;
}
.border {
  font-size: 21px;
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
.v-text-field {
  font-family: "supermarket";
  font-size: 20px;
}
</style>
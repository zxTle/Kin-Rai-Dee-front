<template>
  <div class="form-wrap">
    <v-form class="login">
      <v-col align="center">
        <h2 class="font-FC-Palette border mt-5">Sign in</h2>
      </v-col>
      <v-col>
        <v-col>
          <v-col align="center">
            <div class="d-flex flex-row widht-text-field">
              <i class="material-icons prefix icon-size">email</i>
              <!-- <label class="pt-2 font-FC-Palette font-size">Email: </label> -->
              <v-text-field
                placeholder="email"
                class="ml-5"
                v-model="email"
                outlined
                rounded
                dense
              ></v-text-field>
            </div>
          </v-col>
          <div>
            <v-col align="center">
              <div class="d-flex flex-row widht-text-field">
                <i class="material-icons prefix icon-size">lock</i>
                <!-- <label class="pt-2 font-FC-Palette font-size">Passsword :</label> -->
                <v-text-field
                  class="ml-5"
                  placeholder="password"
                  v-model="password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  outlined
                  rounded
                  dense
                ></v-text-field>
              </div>
            </v-col>
          </div>
        </v-col>
      </v-col>

      <v-col align="center">
        <v-btn
          class="white--text btnsignup font-FC-Palette"
          color="#d72323"
          rounded
          elevation="10"
          x-large
          @click="login"
          >sign in</v-btn
        >
      </v-col>
    </v-form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//import Account from '../store/Accounts'

export default {
  name: "login",
  data: function () {
    return {
      email: "",
      password: "",
      show: false,
      accountData : {}
    };
  },
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          //this.getAccountData(user.uid) // ข้อมูลไม่ขึ้นในนี้เพราะว่าไม่ได้รอเรียกใช้ methodเสร็จ ข้อมูลเลยไม่ขึ้น
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
          alert("ไอดีผู้ใช้หรือรหัสผ่านผิด")
        });
    },

    }
    // async getAccountData(uid){
    //   console.log("enter")
    //   await Account.dispatch("getAccData",uid);
    //   this.accountData = Account.getters.accountData
    //   this.$router.push("/");
    // },
  
};
</script>

<style scoped lang="css">
.border {
  font-size: 50px;
  text-align: center;
  padding-top: 10px;
  width: 200px;
  height: 100px;
  background: #ffffff;
  border: 7.75px solid #d72323;
  border-radius: 100px;
}
.widht-text-field {
  width: 400px;
}
.widht-text-field2 {
  width: 450px;
}
.btnsignup {
  font-size: 20px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
}
.font-FC-Palette {
  font-family: "FC Palette";
}
.font-size {
  font-size: 22px;
}
.icon-size {
  font-size: 40px;
  color: #686868;
}
</style>
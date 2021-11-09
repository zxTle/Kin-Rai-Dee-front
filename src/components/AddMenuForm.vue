<template>
  <v-form class="filform">
    <div class="border">
      <h2>Add Menu</h2>
    </div>

    <div class="format">
      <div class="d-flex flex-row">
        <label class="pt-5">Name :</label>
        <v-col cols="5" sm="5">
          <v-text-field
            class="textField-format font-form ml-13"
            v-model="add_form.name"
            :rules="[() => !!add_form.name || 'กรุณากรอกข้อมูล']"
            outlined
            clearable
            rounded
            required
            dense
          ></v-text-field>
        </v-col>

        <label class="pt-5 ml-10">Type : </label>
        <v-col class="filtype">
          <v-select
            class="textField-format font-form ml-10"
            placeholder="types"
            :items="type"
            v-model="add_form.type"
            :rules="[() => !!add_form.type || 'กรุณากรอกข้อมูล']"
            outlined
            clearable
            rounded
            required
            dense
          ></v-select>
        </v-col>
      </div>

      <div class="d-flex flex-row">
        <label class="pt-5">Grab Link : </label>
        <v-col class="filgrablink" md="5">
          <v-text-field
            class="textField-format font-form ml-4"
            v-model="add_form.grabLink"
            :rules="[() => !!add_form.grabLink || 'กรุณากรอกข้อมูล']"
            outlined
            clearable
            rounded
            required
            dense
          ></v-text-field>
        </v-col>
        <label class="pt-5">Category : </label>
        <v-col class="filcategory mb-5" md="5">
          <v-select
            placeholder="category"
            class="textField-format font-form ml-1"
            :items="category"
            v-model="add_form.category"
            :rules="[() => !!add_form.category || 'กรุณากรอกข้อมูล']"
            outlined
            clearable
            rounded
            required
            dense
          ></v-select>
        </v-col>
      </div>

      <div>
        <label class="pt-3">Ingredients : </label>
        <v-col class="filingredients" md="5">
          <v-textarea
            class="font-form"
            v-model="add_form.ingredients"
            :rules="[() => !!add_form.ingredients || 'กรุณากรอกข้อมูล']"
            outlined
            clearable
            rounded
            required
          ></v-textarea>
        </v-col>
      </div>

      <div>
        <label class="pt-3">How To Cook : </label>
        <v-col class="filhowto" md="5">
          <v-textarea
            class="font-form"
            v-model="add_form.how_to"
            :rules="[() => !!add_form.how_to || 'กรุณากรอกข้อมูล']"
            outlined
            clearable
            rounded
            required
          ></v-textarea>
        </v-col>
      </div>

      <div class="d-flex flex-row">
        <v-container fluid>
          <label align="left">Choose image : </label>
          <v-file-input
            class="textField-format"
            required
            v-model="image"
            accept="image/png, image/jpeg ,image/jpg"
            label="Choose image (plz click upload before Add)"
            filled
            prepend-icon="mdi-camera"
            @change="onFileChange"
          ></v-file-input>
          <img :src="img" />
          <!-- <v-btn class="uploadBtn" color="#ffffff" @click="onUpload"
              >Upload</v-btn
            > -->
        </v-container>
      </div>
    </div>
    <v-col align="center">
      <v-btn
        class="btnAdd font-FC-Palette"
        color="#d72323"
        x-large
        @click="addMenu"
        elevation="10"
        >Add Food</v-btn
      >
    </v-col>
  </v-form>
</template>


<script>
//postข้อมูลที่Vuex ในstore แยกออกเป็นของอาหาร
import Food from "../store/Foods";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCBeoRbSKhqMVsPor4PCfJ5iWz3A_As9XI",
  authDomain: "kin-rai-dee-79110.firebaseapp.com",
  storageBucket: "kin-rai-dee-79110.appspot.com",
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
export default {
  data() {
    return {
      add_form: {
        name: "",
        type: "",
        category: "",
        grabLink: "",
        ingredients: "",
        how_to: "",
        img_path: "",
      },
      food: [],
      image: [], //เปลี่ยนจาก image:'' เพื่อแก้ error ตรง v-file-input
      img: "",
      type: ["คาว", "หวาน"],
      category: [
        "จีน",
        "เกาหลี",
        "อิตาลี",
        "ไทย",
        "อินเดีย",
        "ญี่ปุ่น",
        "ฝรั่งเศส",
        "นานาชาติ",
      ],
    };
  },
    created () {
        this.fetchFoods()
    },
    methods : {
        onFileChange(){
            this.createImage(this.image)
            console.log()
        },
        createImage(file){
            var reader = new FileReader();
            reader.onload=(e)=>{
                this.img = e.target.result
            }
            reader.readAsDataURL(file)
            console.log(file)
        },
        //  onUpload(){
        //       const storageRef = ref(storage,this.image.name)
        //      uploadBytes(storageRef, this.image).then((snapshot) => {
        //          getDownloadURL(snapshot.ref).then((url) =>{
        //             console.log(url)
            //           //url คือ ลิ้งรูปภาพที่จะเก็บใส่img_path
            //           this.add_form.img_path = url
            //     })
            //   });
        //},
        async fetchFoods(){
            await Food.dispatch('fetchFoods')
            this.food = Food.getters.foods
        },
        clearForm(){
            this.add_form = {
                name : '',
                type : '',
                category : '',
                grabLink : '',
                ingredients : '',
                how_to : '',
            }
            this.image = [], 
            this.img = ''
            this.$router.reload()
        },
        addMenu(){
            let check = true
            this.food.forEach( (foods,index) => {
                console.log(foods.name,index)
                if(foods.name == this.add_form.name) {
                    check = false }
                    }) 
            if (check == false) { alert("Name is Duplicate") }
            if (check == true) { 
                // เพื่อ upload ภาพ รวมกับ add menu ทีเดียว 
                const storageRef = ref(storage, this.image.name);
                uploadBytes(storageRef, this.image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url);
                    this.add_form.img_path = url;

                    let payload = {
                        name: this.add_form.name,
                        type: this.add_form.type,
                        category: this.add_form.category,
                        grabLink: this.add_form.grabLink,
                        ingredients: this.add_form.ingredients,
                        how_to: this.add_form.how_to,
                        img_path: this.add_form.img_path,
                    };
                    Food.dispatch("AddMenu", payload);
                    this.clearForm(); 
                });
                });
            }
        }
    }
}       
</script>

<style scoped lang="css">
.border {
  font-family: "FC Palette";
  font-size: 30px;
  margin-left: 50px;
  margin-top: 50px;
  text-align: center;
  padding-top: 15px;
  width: 200px;
  height: 100px;
  background: #ffffff;
  border: 7.75px solid #d72323;
  border-radius: 100px;
}
.format {
  margin-top: 40px;
  font-family: "FC Palette";
  margin-left: 40px;
  font-size: 22px;
}
.uploadBtn {
  font-family: "FC Palette";
  color: #000;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
}
.textField-format{
  width: 400px;
}
.font-FC-Palette{
  font-family: "FC Palette";
}
.font-form {
  font-family: Arial, Helvetica, sans-serif;
}
.btnAdd {
  font-size: 20px;
  color: #ffffff;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
}
.v-text-field{
  font-family: "supermarket";
  font-size: 20px;
}
</style>
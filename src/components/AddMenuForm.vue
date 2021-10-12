<template>
   <v-form class="filform">
         <h1>Add Menu</h1>

         <label>Name : </label>
         <v-col class="filname" md="5">
             <v-text-field  v-model = "add_form.name" outlined clearable></v-text-field>
         </v-col>
         <label>Type : </label>
         <v-col class="filtype" md="5">
             <v-text-field  v-model = "add_form.type" outlined clearable></v-text-field>
         </v-col>
         <label>Category : </label>
         <v-col class="filcategory" md="5">
             <v-text-field  v-model = "add_form.category" outlined clearable></v-text-field>
         </v-col>
         <label>Grab Link : </label>
         <v-col class="filgrablink" md="5">
             <v-text-field  v-model = "add_form.grabLink" outlined clearable></v-text-field>
         </v-col>
         <label>Ingredients : </label>
         <v-col class="filingredients" md="5">
             <v-textarea  v-model = "add_form.ingredients" outlined clearable></v-textarea>
         </v-col>
         <label>How To Cook : </label>
         <v-col class="filhowto" md="5">
             <v-textarea  v-model = "add_form.how_to" outlined clearable></v-textarea>
         </v-col>
        
         <v-container fluid> 
             <label align= "left">Choose image : </label>
             <v-file-input v-model="image" accept="image/png, image/jpeg ,image/jpg" 
             label="Choose image (plz click upload before Add)" filled prepend-icon="mdi-camera" @change="onFileChange"></v-file-input>
             <img :src ="img"/>
             <v-btn @click="onUpload">Upload</v-btn>
         </v-container>

          <v-btn class= "btnAdd" @click="addMenu" elevation="2">Add</v-btn>
   </v-form>
</template>

<script>
//postข้อมูลที่Vuex ในstore แยกออกเป็นของอาหาร
import Food from '../store/Foods'
import { getStorage, ref ,uploadBytes ,getDownloadURL } from "firebase/storage";
import {initializeApp} from 'firebase/app'
const firebaseConfig = {
  apiKey: "AIzaSyCqS1mhcPEIkF4Ng_Igq5OygqIve9yXdj0",
  authDomain: "kin-rai-dee-f9ff9.firebaseapp.com",
  storageBucket: "kin-rai-dee-f9ff9.appspot.com"
};
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);


export default {
    data(){
        return {
            add_form : {
                name : '',
                type : '',
                category : '',
                grabLink : '',
                ingredients : '',
                how_to : '',
                img_path: '',
            },
            food : [],
            image : [], //เปลี่ยนจาก image:'' เพื่อแก้ error ตรง v-file-input
            img : ''
        }
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
        onUpload(){
            const storageRef = ref(storage,this.image.name)
            uploadBytes(storageRef, this.image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) =>{
                    console.log(url)
                    //url คือ ลิ้งรูปภาพที่จะเก็บใส่img_path
                    this.add_form.img_path = url
                })
            });
        },
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
                img_path: ''
            }
            this.image = [], 
            this.img = ''
        },
        addMenu(){

            let payload = {
                name : this.add_form.name,
                type : this.add_form.type,
                category : this.add_form.category,
                grabLink : this.add_form.grabLink,
                ingredients : this.add_form.ingredients,
                how_to : this.add_form.how_to,
                img_path : this.add_form.img_path
            }

            Food.dispatch('AddMenu',payload)
            console.log(payload.img_path)
            this.clearForm()
        }
  
      
    }

}       
</script>

<style>

</style>
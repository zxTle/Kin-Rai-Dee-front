<template>
    <v-container>
        <h1 align= "center">Choose image</h1>
        <v-file-input v-model="image" accept="image/png, image/jpeg ,image/jpg" 
        label="Choose image" filled prepend-icon="mdi-camera" @change="onFileChange"></v-file-input>
        <v-btn @click="onUpload">Upload</v-btn>
        <img :src ="img"/>
    </v-container>
</template>

<script>
//postข้อมูลที่Vuex ในstore แยกออกเป็นของอาหาร
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
            image : '',
            img:''
        }
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
                })
            });
        }
    }
    
}
</script>

<style>

</style>
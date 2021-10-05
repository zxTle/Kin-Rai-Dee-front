import axios from "axios"

const auth_key = "auth-account"
const auth = JSON.parse(localStorage.getItem(auth_key))
const user = auth ? auth.user : ""
const api_endpoint = process.env.VUE_APP_ACCOUT_ENDPOINT || "http://localhost:8090"

export default {
    
    isAuthen(){
        return (user !== "")
    },

    getUser(){
        return user
    },

    async login ({user ,pass}){
        try{
            let url = api_endpoint + "/accounts"
            let body = {
                username : user,
                password : pass
            }
            let res = await axios.post(url,body)
            if(res.status === 200){
                console.log(res.data)
                localStorage.setItem(auth_key, JSON.stringify(res.data))
                return {
                    success : true,
                    user : res.data.user
                }
            }else{
                console.log("NOT 200", res)
            }
        }catch(e){
            console.error(e)
            if (e.response.status === 400){
                console.error(e.response.data.message[0].message[0].message)
                return{
                    success : false,
                    message : e.response.data.message[0].message[0].message
                }
            }
        }
    },

    // async register ( {username ,email ,password}){

    // },

    logout(){
        localStorage.removeItem(auth_key)
    }
}
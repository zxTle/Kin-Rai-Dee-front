<template>
<div>
    <h1>Log in</h1>
    <form @submit.prevent="login">
        <div>
            <label for="username">username</label>
            <input v-model="form.username" type="text" placeholder="username" autocomplete="off">
        </div>

        <div>
            <label for="password">password</label>
            <input v-model="form.password" type="password" placeholder="password" autocomplete="off">
        </div>

        <div>
            <button>Login</button>
        </div>
    </form>
</div>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
    data(){
        return{
            form :{
            username : '',
            password : ''
            }
        }
    },
    methods:{
        async login(){
            let res = await AuthService.login(this.form)
            if(res.success){
                this.$router.push('/')
            }
            else{
                alert(res.message)
            }
        }
    }
}
</script>

<style>

</style>
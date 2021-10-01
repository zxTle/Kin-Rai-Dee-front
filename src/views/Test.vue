<template>
    <div>
        {{ accounts }}
        
    </div>
</template>

<script>
import Account from '../store/Accounts'
export default {
    data(){
        return{
            accounts :[]
        }
    },
    created () {
        this.fetchAccount()
    },
    methods :{
        async fetchAccount(){
            await Account.dispatch('fetchAccount')
            this.accounts = Account.getters.accounts
        }
    }
    
}
</script>

<style scoped>

</style>
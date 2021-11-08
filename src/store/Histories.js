import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

let api = 'http://localhost:8090/accounts'
export default new Vuex.Store({
    state:{
        data:[
            {
                userId:'',
                foodId:'',
                timestamp : ''
            }
        ],
    },
    getters:{
        history : (state) => state.data
    },
    mutations:{
        fetch(state,{history}){
            state.data = history.data
        }
    },
    actions:{
        async addHistory({commit},historyData){
            let history = await axios.post(api,historyData)
            commit('add',history)
        }
    },
    modules:{

    }
})
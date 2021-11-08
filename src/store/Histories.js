import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

let api = 'http://localhost:8090/history'
export default new Vuex.Store({
    state:{
        data:[
            {
                historyId : '',
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
        },
        add(state,history){
            state.data.push(history)
        }
    },
    actions:{
        async addHistory({commit},historyData){
            let history = await axios.post(api,historyData)
            commit('add',history)
        },
        async getHistory({commit},userId){
            let history = await axios.get(api+"/"+userId)
            commit('fetch',{history})
        }

    },
    modules:{

    }
})
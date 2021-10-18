import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

let api = 'http://localhost:8090/accounts'
export default new Vuex.Store({
    state: { //state ใช้เก็บข้อมูล 
        data: [
            {
                userId: '',
                username: '',
                password: '',
                email: '',
                name: '',
                surName: '',
                birthDay: '',
                roles: '',
            }
        ],
        accData: {
            userId: "",
            username: "",
            password: "",
            email: "",
            name: "",
            surName: "",
            birthDay: "",
            roles: "",
        },
    },
    getters: {
        accounts: (state) => state.data,  // getค่าออกมา user คือkeyword เวลาเราจะเรียกค่าไปใช้ ส่งparameter state | ตัว arrow => คือreturn
        accountData: (state) => state.accData
    },
    mutations: {
        fetch(state, { acc }) {
            state.data = acc.data
        },
        addAccount(state, signup) {
            state.data.push(signup)
        },
        getUid(state, { acc }) {
            state.data = acc.accData
        }
    },
    actions: {
        async fetchAccount({ commit }) {
            let acc = await axios.get(api)
            commit('fetch', { acc })
        },
        async signupAccount({ commit }, account) {
            let acc = await axios.post(api, account)
            commit('addAccount', acc)
        },
        async getAccount({ commit }, uid) {
            let acc = await axios.get(api + "/" + uid)
            commit('getUid', acc)
        }
    },
    modules: {
    }
})

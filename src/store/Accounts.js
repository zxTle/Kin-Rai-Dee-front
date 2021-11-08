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
                roles: ''
            }
        ],
        accData: {}
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
        getAccountData(state, acc) {
            state.accData = acc.data
        },
        upProfile(state, acc) {
            var index = 0
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].userId == acc.userId) {
                    index = i;
                }
            }
            state.data[index].userId = acc.userId
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
        async getAccData({ commit }, uid) {
            let acc = await axios.get(api + "/" + uid)
            commit('getAccountData', acc)
        },
        async updateProfile({ commit }, accData) {
            let acc = await axios.put(api,accData)
            commit('upProfile', acc)
        }
    },
    modules: {
    }
})

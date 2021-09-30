import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

let api = 'http://localhost:8090/accounts'
export default new Vuex.Store({
  state: { //state ใช้เก็บข้อมูล 
      data :[
          {
              userId : '',
              username : '',
              password : '',
              email : '',
              name : '',
              surName : '',
              birthDay : Date
          }
      ]  
  },
  getters:{
      accounts : (state) => state.data  // getค่าออกมา user คือkeyword เวลาเราจะเรียกค่าไปใช้ ส่งparameter state | ตัว arrow => คือreturn
  },
  mutations: {
      fetch(state, {acc}){
          state.data = acc.data
      }
  },
  actions: {
      async fetchAccount({commit}){
          let acc = await axios.get(api)
          commit('fetch',{acc})
      }
  },
  modules: {
  }
})
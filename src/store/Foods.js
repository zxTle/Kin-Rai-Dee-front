import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

let api = 'http://localhost:8090/foods'
export default new Vuex.Store({
  state: { 
      data :[
          {
            name : '',
            type : '',
            category : '',
            grabLink : '',
            ingredients : '',
            how_to : '',
            img_path : ''
          }
      ]  
  },
  getters:{
      foods : (state) => state.data  
  },
  mutations: {
      fetch(state, {foods}){
          state.data = foods.data
      },
      addMenu(state,addMenu){
          state.data.push(addMenu)
      }
  },
  actions: {
      async fetchFoods({commit}){
          let foods = await axios.get(api)
          commit('fetch',{foods})
      },
      async AddMenu({commit},food){
          let foods = await axios.post(api,food)
          commit('addMenu',foods)
      }
  },
  modules: {
  }
})

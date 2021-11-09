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
      ],
      rank : [
        {
            name : '',
            type : '',
            category : '',
            grabLink : '',
            ingredients : '',
            how_to : '',
            img_path : ''
          }
      ],
      foodrec :{} ,
      foodHis : {}
  },
  getters:{
      foods : (state) => state.data  ,
      foodrank : (state) => state.rank,
      foodrec : (state) =>state.foodrec,
      foodhis : (state) => state.foodHis
  },
  mutations: {
      fetch(state, {foods}){
          state.data = foods.data
      },
      addMenu(state,addMenu){
          state.data.push(addMenu)
      },
      upScore(state,food){
          var index = 0;
          for(let i=0;i<state.data.length;i++){
              if(state.data[i].name == food.name){
                  index = i;
              }
          }
          state.data[index].score = food.score
      },
      fetchRank(state,{foods}){
          state.rank = foods.data
      },
      setRecFood(state,food){
        state.foodrec=food
      },
      getFoodByName(state,{food}){
          state.foodHis = food.data
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
      },
      async updateScore({commit},food){
          let foods = await axios.put(api,food)
          commit('upScore',foods)
      },
      async getFoodsRank({commit}){
          let foods = await axios.get(api+"/rank")
          commit('fetchRank',{foods})
      },
      setFoodRec({commit},food){
        commit('setRecFood',food)
      },
      async getFoodByName({commit},name){
          let food = await axios.get(api+"/"+name)
          commit('getFoodByName',{food})
      }
  },
  modules: {
  }
})

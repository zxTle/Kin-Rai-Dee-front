import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from "../views/Signup.vue"
import Test from "@/views/Test.vue"
import Random from "@/views/Random.vue"
import Login from "@/views/auth/Login.vue"
//import Logout from '@/views/auth/Logout.vue'
import Admin from '@/views/Admin.vue'
import { getAuth } from "firebase/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/test',
    name : 'Test',
    component :Test
  },
  {
    path: '/random',
    name : 'Random',
    component :Random,
  },
  {
    path : '/admin',
    name :'Admin',
    component : Admin,
    meta :{
      requiresAuth : true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  // const auth = getAuth();
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!getAuth().currentUser){
      next({
        path : '/login',
        query :{
          redirect : to.fullPath
        }
      });
    }
    else{
      next();
    }
  }
  else if(to.matched.some(record => record.meta.requiresGuest)){
    next({
      path : '/',
      query : {
        redirect : to.fullPath
      }
    });
  }
  else {
    next();
  }
})

export default router

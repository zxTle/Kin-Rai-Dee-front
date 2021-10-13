import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from "../views/Signup.vue"
import Test from "@/views/Test.vue"
<<<<<<< HEAD
import Login from "@/views/auth/Login.vue"
import Logout from '@/views/auth/Logout.vue'
=======
import Random from "@/views/Random.vue"
//import Login from "@/views/auth/Login.vue"
//import Logout from '@/views/auth/Logout.vue'
import Admin from '@/views/Admin.vue'

>>>>>>> develop

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/test',
    name : 'Test',
    component :Test
  },
  {
<<<<<<< HEAD
    path: '/login',
    name : 'Login',
    component : Login
  },
  {
    path: '/logout',
    name : 'Logout',
    component : Logout
  },
=======
    path: '/random',
    name : 'Random',
    component :Random
  },
  {
    path : '/admin',
    name :'Admin',
    component : Admin
  }
>>>>>>> develop
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

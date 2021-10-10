import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from "../views/Signup.vue"
import Test from "@/views/Test.vue"
import Login from "@/views/auth/Login.vue"
import Logout from '@/views/auth/Logout.vue'
import Admin from '@/views/Admin.vue'

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
    path : '/admin',
    name :'Admin',
    component : Admin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

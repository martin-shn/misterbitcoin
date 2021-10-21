import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Stats from '../views/Stats.vue'
import Contacts from '../views/Contacts.vue'
import ContactEdit from '../views/ContactEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats
  },
  {
    path: '/contacts/:contactId',
    name: 'Contact-details',
    component: Stats,
    children:[{
      path: 'edit',
      name: 'Contact-edit',
      component: ContactEdit
    }]
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

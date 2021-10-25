import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Stats from '../views/Stats.vue'
import Contacts from '../views/Contacts.vue'
import ContactEdit from '../views/ContactEdit.vue'
import ContactDetails from '../views/ContactDetails.vue'
import userService from "@/services/user.service.js";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
    
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats
  },
  {
    path: '/contacts/:contactId',
    name: 'Contact-details',
    component: ContactDetails,
    children: [{
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

router.beforeEach(async (to, from, next) => {
  if (to.path.includes('/login')) {
    const user = await userService.getLoggedInUser();
    if (user) next('/')
    else next();

  }
  if (to.path.includes('/signup')) {
    next();
  }

  else if (to.path.includes('/')) {
    const user = await userService.getLoggedInUser();
    
    if (!user) next('/login');
    else next();
  }

  else next();
});

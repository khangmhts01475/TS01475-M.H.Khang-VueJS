import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import BlogList from '../views/BlogList.vue'
import BlogPost from '../views/BlogPost.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import UserProfile from '../views/UserProfile.vue'
import ProfileInfo from '../views/ProfileInfo.vue'
import ProfileSettings from '../views/ProfileSettings.vue'

const isAuthenticated = () => {
  return localStorage.getItem('auth') === 'true'
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },

    { path: '/blogs', name: 'BlogList', component: BlogList },

    {
      path: '/blog/:id',
      name: 'BlogPost',
      component: BlogPost
    },

    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfile,
      alias: '/me',
      children: [
        { path: 'info', component: ProfileInfo },
        { path: 'settings', component: ProfileSettings }
      ]
    },

    { path: '/login', name: 'Login', component: Login },

    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router

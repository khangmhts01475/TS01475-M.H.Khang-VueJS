// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// ✅ correct paths based on your folder structure
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'

import Home from '@/views/post/Home.vue'
import PostDetail from '@/views/post/PostDetail.vue'
import PostEditor from '@/views/post/PostEditor.vue'

import Profile from '@/views/personal/Profile.vue'

const routes = [
  // Launch app at login
  { path: '/', redirect: '/login' },

  // Public routes
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },

  // Protected routes
  { path: '/home', name: 'home', component: Home, meta: { requiresAuth: true } },
  { path: '/profile', name: 'profile', component: Profile, meta: { requiresAuth: true } },

  // Posts
  { path: '/post/new', name: 'post-new', component: PostEditor, meta: { requiresAuth: true } },
  { path: '/post/:id', name: 'post-detail', component: PostDetail, meta: { requiresAuth: true } },
  { path: '/post/:id/edit', name: 'post-edit', component: PostEditor, meta: { requiresAuth: true } },

  // Fallback
  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// ✅ Route guard
router.beforeEach((to) => {
  const isAuth = localStorage.getItem('isAuthenticated') === 'true'

  if (to.meta.requiresAuth && !isAuth) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  // Optional: already logged in => keep out of login/register
  if ((to.path === '/login' || to.path === '/register') && isAuth) {
    return { path: '/home' }
  }

  return true
})

export default router

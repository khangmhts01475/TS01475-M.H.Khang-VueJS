<template>
  <div class="container py-5" style="max-width: 480px">
    <h2 class="mb-4 text-center">Login</h2>

    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          placeholder="Enter your email"
          autocomplete="email"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Enter your password"
          autocomplete="current-password"
        />
      </div>

      <button type="submit" class="btn btn-primary w-100">
        Đăng nhập
      </button>

      <p class="text-center mt-3 mb-0">
        Chưa có tài khoản?
        <RouterLink to="/register">Đăng ký</RouterLink>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('users') || '[]')
  } catch {
    return []
  }
}

function handleLogin() {
  errorMessage.value = ''

  if (!email.value.trim() || !password.value) {
    errorMessage.value = 'Vui lòng nhập đầy đủ email và mật khẩu'
    return
  }

  const users = getUsers()

  const user = users.find(
    u =>
      String(u.email || '').toLowerCase() === email.value.trim().toLowerCase() &&
      String(u.password || '') === password.value
  )

  if (!user) {
    errorMessage.value = 'Email hoặc mật khẩu không đúng'
    return
  }

  const sessionUser = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    avatarUrl: user.avatarUrl || ''
  }

  localStorage.setItem('currentUser', JSON.stringify(sessionUser))
  localStorage.setItem('isAuthenticated', 'true')

  const redirectTo =
    typeof route.query.redirect === 'string'
      ? route.query.redirect
      : '/home'

  router.push(redirectTo)
}
</script>

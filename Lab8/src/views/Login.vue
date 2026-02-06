<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const login = () => {
  localStorage.setItem('auth', 'true')
  router.push({ name: 'Dashboard' })
}
</script>

<template>
  <h3>Login</h3>
  <button class="btn btn-primary" @click="login">
    Fake Login
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const logout = () => {
  localStorage.removeItem('auth')
  router.push('/login')
}
</script>

<template>
  <h2>Dashboard (Protected)</h2>
  <button class="btn btn-danger" @click="logout">
    Logout
  </button>
</template>

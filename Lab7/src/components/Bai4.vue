<template>
  <div class="container mt-4">
    <LoginComponent
      v-if="!isLoggedIn"
      @login-success="handleLogin"
    />

    <CommentComponent
      v-else
      :username="username"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginComponent from './LoginComponent.vue'
import CommentComponent from './CommentComponent.vue'

const isLoggedIn = ref(false)
const username = ref('')

const handleLogin = (name) => {
  username.value = name
  isLoggedIn.value = true
}
</script>

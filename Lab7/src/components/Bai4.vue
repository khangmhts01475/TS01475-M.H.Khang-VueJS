<script setup>
import { ref } from 'vue'
import LoginComponent from './LoginComponent.vue'
import CommentComponent from './CommentComponent.vue'

const isLoggedIn = ref(false)
const currentUser = ref('')

const handleLogin = (username) => {
  isLoggedIn.value = true
  currentUser.value = username
}

const handleLogout = () => {
  isLoggedIn.value = false
  currentUser.value = ''
}
</script>

<template>
  <div class="container mt-5" style="max-width: 720px">
    <h2 class="text-center mb-4">Ứng dụng bình luận bài viết</h2>

    <LoginComponent v-if="!isLoggedIn" @login="handleLogin" />

    <CommentComponent
      v-else
      :user="currentUser"
      @logout="handleLogout"
    />
  </div>
</template>

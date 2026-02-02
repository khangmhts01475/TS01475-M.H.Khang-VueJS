<template>
  <div class="p-5 col-sm-4">
    <h3>Đăng nhập</h3>

    <form @submit.prevent="login">
      <div class="mb-3">
        <label>Tên đăng nhập:</label>
        <input
          type="text"
          class="form-control"
          v-model="username"
        />
      </div>

      <div class="mb-3">
        <label>Mật khẩu:</label>
        <input
          type="password"
          class="form-control"
          v-model="password"
        />
      </div>

      <button class="btn btn-primary" type="submit">
        Đăng nhập
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['login-success'])

const username = ref('')
const password = ref('')

const login = () => {
  if (username.value && password.value) {
    emit('login-success', username.value)
  }
}
</script>

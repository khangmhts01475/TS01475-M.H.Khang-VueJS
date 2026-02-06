<script setup>
import { ref } from 'vue'

const emit = defineEmits(['login'])

const username = ref('')
const password = ref('')
const error = ref('')

const submit = () => {
  error.value = ''

  if (!username.value.trim() || !password.value) {
    error.value = 'Vui lòng nhập đầy đủ tên và mật khẩu.'
    return
  }

  emit('login', username.value.trim())
  username.value = ''
  password.value = ''
}
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h4 class="mb-3">Đăng nhập</h4>

      <form @submit.prevent="submit">
        <div class="mb-3">
          <label class="form-label">Tên</label>
          <input class="form-control" v-model="username" placeholder="Nhập tên..." />
        </div>

        <div class="mb-3">
          <label class="form-label">Mật khẩu</label>
          <input
            class="form-control"
            type="password"
            v-model="password"
            placeholder="Nhập mật khẩu..."
          />
        </div>

        <div v-if="error" class="text-danger mb-3">{{ error }}</div>

        <button class="btn btn-primary w-100" type="submit">Đăng nhập</button>
      </form>
    </div>
  </div>
</template>

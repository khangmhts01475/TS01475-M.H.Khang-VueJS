<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = () => {
  // simple validation (fake auth for now)
  if (!email.value || !password.value) {
    errorMessage.value = 'Vui lòng nhập đầy đủ email và mật khẩu'
    return
  }

  // fake login success (ASM-friendly)
  console.log('Login info:', {
    email: email.value,
    password: password.value
  })

  errorMessage.value = ''
  alert('Đăng nhập thành công (giả lập)')
}
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow" style="width: 400px;">
      <div class="card-body">
        <h3 class="text-center mb-4">Đăng nhập</h3>

        <!-- Error message -->
        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleLogin">
          <!-- Email -->
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              v-model="email"
              placeholder="ten@example.com"
            />
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label class="form-label">Mật khẩu</label>
            <input
              type="password"
              class="form-control"
              v-model="password"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <!-- Button -->
          <button type="submit" class="btn btn-primary w-100">
            Đăng nhập
          </button>
        </form>

        <!-- Extra -->
        <p class="text-center mt-3 mb-0">
          Chưa có tài khoản?
          <a href="#">Đăng ký</a>
        </p>
      </div>
    </div>
  </div>
</template>

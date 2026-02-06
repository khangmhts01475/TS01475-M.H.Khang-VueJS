<script setup>
import { ref } from 'vue'

const isLoggedIn = ref(false)

const email = ref('')
const password = ref('')

const emailError = ref('')
const passwordError = ref('')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const login = () => {
  emailError.value = ''
  passwordError.value = ''

  if (!email.value) {
    emailError.value = 'Email là bắt buộc'
  } else if (!emailRegex.test(email.value)) {
    emailError.value = 'Email không hợp lệ'
  }

  if (!password.value) {
    passwordError.value = 'Mật khẩu là bắt buộc'
  }

  if (!emailError.value && !passwordError.value) {
    isLoggedIn.value = true
  }
}

const logout = () => {
  isLoggedIn.value = false
  email.value = ''
  password.value = ''
  emailError.value = ''
  passwordError.value = ''
}
</script>

<template>
  <div class="container mt-5" style="max-width: 420px">
    <!-- LOGIN FORM -->
    <div v-if="!isLoggedIn">
      <h3 class="text-center mb-4">Form đăng nhập</h3>

      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            v-model="email"
            placeholder="Nhập email"
          />
          <div v-if="emailError" class="text-danger mt-1">
            {{ emailError }}
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Mật khẩu</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Nhập mật khẩu"
          />
          <div v-if="passwordError" class="text-danger mt-1">
            {{ passwordError }}
          </div>
        </div>

        <button type="submit" class="btn btn-primary w-100">
          Đăng nhập
        </button>
      </form>
    </div>

    <!-- WELCOME SCREEN -->
    <div v-else class="text-center">
      <h3 class="mb-3">Chào mừng!</h3>
      <p class="mb-4 text-muted">{{ email }}</p>
      <button class="btn btn-secondary" @click="logout">
        Đăng xuất
      </button>
    </div>
  </div>
</template>

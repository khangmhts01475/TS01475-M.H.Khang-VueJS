<script setup>
import { ref } from 'vue'

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const avatarUrl = ref('')
const errorMessage = ref('')

const handleRegister = () => {
  // simple validation (fake register for now)
  if (!fullName.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Vui lòng nhập đầy đủ thông tin bắt buộc'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Mật khẩu xác nhận không khớp'
    return
  }

  // fake register success (ASM-friendly)
  console.log('Register info:', {
    fullName: fullName.value,
    email: email.value,
    password: password.value,
    avatarUrl: avatarUrl.value
  })

  errorMessage.value = ''
  alert('Đăng ký thành công (giả lập)')
}
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow" style="width: 480px;">
      <div class="card-body">
        <h3 class="text-center mb-4">Đăng ký</h3>

        <!-- Error message -->
        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleRegister">
          <!-- Full name -->
          <div class="mb-3">
            <label class="form-label">Họ và tên</label>
            <input
              type="text"
              class="form-control"
              v-model="fullName"
              placeholder="Nhập họ và tên"
            />
          </div>

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

          <!-- Confirm password -->
          <div class="mb-3">
            <label class="form-label">Xác nhận mật khẩu</label>
            <input
              type="password"
              class="form-control"
              v-model="confirmPassword"
              placeholder="Nhập lại mật khẩu"
            />
          </div>

          <!-- Avatar (optional) -->
          <div class="mb-3">
            <label class="form-label">Ảnh đại diện (tuỳ chọn)</label>
            <input
              type="url"
              class="form-control"
              v-model="avatarUrl"
              placeholder="https://example.com/avatar.png"
            />
            <div class="form-text">
              Dán link ảnh để hiển thị avatar sau này.
            </div>
          </div>

          <!-- Button -->
          <button type="submit" class="btn btn-primary w-100">
            Tạo tài khoản
          </button>
        </form>

        <!-- Extra -->
        <p class="text-center mt-3 mb-0">
          Đã có tài khoản?
          <a href="#">Đăng nhập</a>
        </p>
      </div>
    </div>
  </div>
</template>

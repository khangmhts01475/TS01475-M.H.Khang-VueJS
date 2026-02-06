<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const avatarUrl = ref('')
const errorMessage = ref('')

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('users') || '[]')
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users))
}

function handleRegister() {
  errorMessage.value = ''

  if (!fullName.value.trim() || !email.value.trim() || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Vui lòng nhập đầy đủ thông tin bắt buộc'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Mật khẩu xác nhận không khớp'
    return
  }

  const users = getUsers()
  const normalizedEmail = email.value.trim().toLowerCase()

  const existed = users.some(u => String(u.email || '').toLowerCase() === normalizedEmail)
  if (existed) {
    errorMessage.value = 'Email này đã được đăng ký'
    return
  }

  const newUser = {
    id: `u_${Date.now()}`,
    fullName: fullName.value.trim(),
    email: normalizedEmail,
    password: password.value,
    avatarUrl: avatarUrl.value.trim()
  }

  users.push(newUser)
  saveUsers(users)

  alert('Đăng ký thành công! Vui lòng đăng nhập.')
  router.push('/login')
}
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow" style="width: 480px;">
      <div class="card-body">
        <h3 class="text-center mb-4">Đăng ký</h3>

        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label class="form-label">Họ và tên</label>
            <input
              type="text"
              class="form-control"
              v-model="fullName"
              placeholder="Nhập họ và tên"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              v-model="email"
              placeholder="ten@example.com"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Mật khẩu</label>
            <input
              type="password"
              class="form-control"
              v-model="password"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Xác nhận mật khẩu</label>
            <input
              type="password"
              class="form-control"
              v-model="confirmPassword"
              placeholder="Nhập lại mật khẩu"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Ảnh đại diện (tuỳ chọn)</label>
            <input
              type="url"
              class="form-control"
              v-model="avatarUrl"
              placeholder=""
            />
          </div>

          <button type="submit" class="btn btn-primary w-100">
            Tạo tài khoản
          </button>
        </form>

        <p class="text-center mt-3 mb-0">
          Đã có tài khoản?
          <RouterLink to="/login">Đăng nhập</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

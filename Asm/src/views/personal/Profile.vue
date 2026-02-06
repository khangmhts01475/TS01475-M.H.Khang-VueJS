<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ---------- helpers ----------
function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser') || 'null')
  } catch {
    return null
  }
}

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

function saveCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user))
}

// ---------- state ----------
const currentUser = ref(getCurrentUser())
const errorMessage = ref('')
const successMessage = ref('')

if (!currentUser.value) {
  router.push('/login')
}

// Editable form
const form = ref({
  fullName: currentUser.value?.fullName || '',
  email: currentUser.value?.email || '',
  avatarUrl: currentUser.value?.avatarUrl || '',
  password: '',
  confirmPassword: ''
})

// ---------- actions ----------
function resetForm() {
  if (!currentUser.value) return
  form.value.fullName = currentUser.value.fullName || ''
  form.value.email = currentUser.value.email || ''
  form.value.avatarUrl = currentUser.value.avatarUrl || ''
  form.value.password = ''
  form.value.confirmPassword = ''
  errorMessage.value = ''
  successMessage.value = ''
}

function updateProfile() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.value.fullName.trim() || !form.value.email.trim()) {
    errorMessage.value = 'Họ tên và email không được để trống.'
    return
  }

  if (form.value.password || form.value.confirmPassword) {
    if (form.value.password !== form.value.confirmPassword) {
      errorMessage.value = 'Mật khẩu xác nhận không khớp.'
      return
    }
  }

  const users = getUsers()
  const idx = users.findIndex(u => u.id === currentUser.value.id)

  if (idx === -1) {
    errorMessage.value = 'Không tìm thấy tài khoản.'
    return
  }

  // Prevent email collision
  const normalizedEmail = form.value.email.trim().toLowerCase()
  const emailTaken = users.some(
    u => u.email === normalizedEmail && u.id !== currentUser.value.id
  )
  if (emailTaken) {
    errorMessage.value = 'Email này đã được sử dụng.'
    return
  }

  // Update user
  users[idx].fullName = form.value.fullName.trim()
  users[idx].email = normalizedEmail
  users[idx].avatarUrl = form.value.avatarUrl.trim()

  if (form.value.password) {
    users[idx].password = form.value.password
  }

  saveUsers(users)

  // Sync currentUser
  currentUser.value = {
    ...currentUser.value,
    fullName: users[idx].fullName,
    email: users[idx].email,
    avatarUrl: users[idx].avatarUrl || ''
  }

  saveCurrentUser(currentUser.value)

  // Reset password fields
  form.value.password = ''
  form.value.confirmPassword = ''

  successMessage.value = 'Cập nhật thông tin thành công.'
}
</script>

<template>
  <div class="container py-4">
    <!-- Header -->
    <div class="mb-4">
      <h2 class="mb-1">Thông tin cá nhân</h2>
      <p class="text-muted mb-0">
        Xem và cập nhật thông tin tài khoản
      </p>
    </div>

    <!-- Messages -->
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>

    <div class="row g-4">
      <!-- Avatar -->
      <div class="col-12 col-md-4">
        <div class="card shadow-sm h-100">
          <div class="card-body text-center">
            <img
              v-if="form.avatarUrl"
              :src="form.avatarUrl"
              alt="avatar"
              class="rounded-circle mb-3"
              style="width:140px;height:140px;object-fit:cover;"
            />
            <div
              v-else
              class="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center mx-auto mb-3"
              style="width: 140px; height: 140px;"
            >
              <span class="text-muted">Avatar</span>
            </div>

            <input
              type="url"
              class="form-control"
              v-model="form.avatarUrl"
              placeholder="https://example.com/avatar.png"
            />
            <div class="form-text">
              Dán link ảnh để thay đổi avatar.
            </div>
          </div>
        </div>
      </div>

      <!-- Profile form -->
      <div class="col-12 col-md-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <form @submit.prevent="updateProfile">
              <div class="mb-3">
                <label class="form-label">Họ và tên</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.fullName"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="form.email"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Mật khẩu mới</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="form.password"
                  placeholder="Để trống nếu không đổi"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="form.confirmPassword"
                />
              </div>

              <div class="d-flex flex-column flex-md-row gap-2 justify-content-end mt-4">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="resetForm"
                >
                  Hủy thay đổi
                </button>
                <button type="submit" class="btn btn-primary">
                  Cập nhật thông tin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

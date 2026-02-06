<script setup>
import { computed, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser') || 'null')
  } catch {
    return null
  }
}

const user = ref(getCurrentUser())

const isAuth = computed(() => localStorage.getItem('isAuthenticated') === 'true' && !!user.value)

function refreshUser() {
  user.value = getCurrentUser()
}

// When user logs in/registers, Navbar won't automatically update unless we refresh.
// Easiest simple approach: refresh on every route nav via a tiny interval-free trick:
router.afterEach(() => refreshUser())

function logout() {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('currentUser')
  refreshUser()
  router.push('/login')
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
    <div class="container">
      <RouterLink class="navbar-brand fw-semibold" to="/home">
        Blog App
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        aria-label="Toggle navigation"
        @click="toggleMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" :class="{ show: isMenuOpen }">
        <!-- Left nav -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/home">Trang chủ</RouterLink>
          </li>

          <li class="nav-item" v-if="isAuth">
            <RouterLink class="nav-link" to="/post/new">Tạo bài viết</RouterLink>
          </li>

          <li class="nav-item" v-if="isAuth">
            <RouterLink class="nav-link" to="/profile">Hồ sơ</RouterLink>
          </li>
        </ul>

        <!-- Right side -->
        <div class="d-flex align-items-center gap-2">
          <!-- Logged out -->
          <template v-if="!isAuth">
            <RouterLink class="btn btn-outline-primary" to="/login">
              Đăng nhập
            </RouterLink>
            <RouterLink class="btn btn-primary" to="/register">
              Đăng ký
            </RouterLink>
          </template>

          <!-- Logged in -->
          <template v-else>
            <div class="d-flex align-items-center gap-2 me-2">
              <img
                v-if="user?.avatarUrl"
                :src="user.avatarUrl"
                alt="avatar"
                style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;"
              />
              <span class="text-muted small">
                {{ user?.fullName || 'User' }}
              </span>
            </div>

            <button type="button" class="btn btn-outline-danger" @click="logout">
              Logout
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

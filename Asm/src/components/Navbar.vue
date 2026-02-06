<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        Ứng dụng Blog
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarNav" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Trang chủ</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/post/new">Tạo bài viết</router-link>
          </li>
        </ul>

        <ul class="navbar-nav ms-auto align-items-lg-center">
          <!-- AUTHENTICATED -->
          <template v-if="isAuthenticated">
            <li class="nav-item me-2">
              <span class="navbar-text text-light">
                Xin chào, {{ displayName }}
              </span>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/profile">Hồ sơ</router-link>
            </li>

            <li class="nav-item">
              <button
                class="btn btn-outline-light btn-sm ms-lg-2"
                @click="logout"
              >
                Đăng xuất
              </button>
            </li>
          </template>

          <!-- NOT AUTHENTICATED -->
          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Đăng nhập</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/register">Đăng ký</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      isAuthenticated: false,
      currentUser: null
    };
  },

  computed: {
    displayName() {
      if (this.currentUser?.fullName) return this.currentUser.fullName;
      if (this.currentUser?.email) return this.currentUser.email;
      return "Người dùng";
    }
  },

  created() {
    this.syncAuth();
    window.addEventListener("storage", this.syncAuth);
  },

  beforeUnmount() {
    window.removeEventListener("storage", this.syncAuth);
  },

  methods: {
    syncAuth() {
      this.isAuthenticated =
        localStorage.getItem("isAuthenticated") === "true";

      const raw = localStorage.getItem("currentUser");
      this.currentUser = raw ? JSON.parse(raw) : null;

      if (!this.currentUser) {
        const email = localStorage.getItem("currentUserEmail");
        if (email) {
          this.currentUser = { email, fullName: "Người dùng" };
        }
      }
    },

    logout() {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("currentUserEmail");

      this.syncAuth();
      this.$router.push("/login");
    }
  }
};
</script>

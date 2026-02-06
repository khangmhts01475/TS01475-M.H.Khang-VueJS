<template>
  <div class="container mt-5" style="max-width: 420px">
    <h2 class="mb-4 text-center">Đăng nhập</h2>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <form @submit.prevent="login">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          v-model="email"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Mật khẩu</label>
        <input
          type="password"
          class="form-control"
          v-model="password"
          required
        />
      </div>

      <button class="btn btn-primary w-100">
        Đăng nhập
      </button>
    </form>

    <p class="text-center mt-3">
      Chưa có tài khoản?
      <router-link to="/register">Đăng ký</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },

  methods: {
    login() {
      const usersRaw = localStorage.getItem("users");
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      const user = users.find(u => u.email === this.email);

      if (user && user.password !== this.password) {
        this.error = "Mật khẩu không đúng.";
        return;
      }

      // Demo-friendly login:
      // If user does not exist, still allow login
      const currentUser = user || {
        id: this.email,
        email: this.email,
        fullName: "Người dùng",
        avatarUrl: ""
      };

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUserEmail", currentUser.email);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      this.$router.push("/");
    }
  }
};
</script>

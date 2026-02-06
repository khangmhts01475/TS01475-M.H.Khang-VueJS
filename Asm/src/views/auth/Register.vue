<template>
  <div class="container mt-5" style="max-width: 450px">
    <h2 class="mb-4 text-center">Đăng ký</h2>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <form @submit.prevent="register">
      <div class="mb-3">
        <label class="form-label">Họ và tên</label>
        <input
          type="text"
          class="form-control"
          v-model="fullName"
          placeholder="Nhập họ và tên"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          v-model="email"
          placeholder="ten@example.com"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Mật khẩu</label>
        <input
          type="password"
          class="form-control"
          v-model="password"
          placeholder="Nhập mật khẩu"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Xác nhận mật khẩu</label>
        <input
          type="password"
          class="form-control"
          v-model="confirmPassword"
          placeholder="Nhập lại mật khẩu"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Ảnh đại diện (tuỳ chọn)</label>
        <input
          type="text"
          class="form-control"
          v-model="avatarUrl"
        />
      </div>

      <button class="btn btn-primary w-100">
        Tạo tài khoản
      </button>
    </form>

    <p class="text-center mt-3">
      Đã có tài khoản?
      <router-link to="/login">Đăng nhập</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "Register",

  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatarUrl: "",
      error: ""
    };
  },

  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        this.error = "Mật khẩu xác nhận không khớp.";
        return;
      }

      const usersRaw = localStorage.getItem("users");
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      if (users.some(u => u.email === this.email)) {
        this.error = "Email đã được sử dụng.";
        return;
      }

      const newUser = {
        id: "u_" + Date.now(),
        fullName: this.fullName.trim(),
        email: this.email.trim(),
        password: this.password,
        avatarUrl: this.avatarUrl || ""
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // auto login after register (important for consistency)
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUserEmail", newUser.email);
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      this.$router.push("/");
    }
  }
};
</script>

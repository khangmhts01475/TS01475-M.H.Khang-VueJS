<template>
  <div class="container mt-4" style="max-width: 600px">
    <h2 class="mb-4">Hồ sơ cá nhân</h2>

    <div v-if="!user" class="alert alert-warning">
      Không tìm thấy thông tin người dùng.
    </div>

    <form v-else @submit.prevent="save">
      <div class="mb-3">
        <label class="form-label">Họ và tên</label>
        <input
          type="text"
          class="form-control"
          v-model="user.fullName"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          v-model="user.email"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Ảnh đại diện (URL)</label>
        <input
          type="text"
          class="form-control"
          v-model="user.avatarUrl"
        />
      </div>

      <button class="btn btn-success">
        Lưu thay đổi
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Profile",

  data() {
    return {
      user: null,
      originalEmail: ""
    };
  },

  created() {
    this.loadUser();
  },

  methods: {
    loadUser() {
      const rawUser = localStorage.getItem("currentUser");
      if (rawUser) {
        this.user = JSON.parse(rawUser);
        this.originalEmail = this.user?.email || "";
        return;
      }

      // fallback: try to recover user from email
      const email = localStorage.getItem("currentUserEmail");
      const usersRaw = localStorage.getItem("users");
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      this.user = users.find(u => u.email === email) || null;
      this.originalEmail = this.user?.email || email || "";
    },

    save() {
      if (!this.user) return;

      // normalize basic fields
      this.user.fullName = (this.user.fullName || "").trim();
      this.user.email = (this.user.email || "").trim();

      if (!this.user.fullName) {
        alert("Vui lòng nhập họ và tên.");
        return;
      }

      if (!this.user.email) {
        alert("Vui lòng nhập email.");
        return;
      }

      // update users list (match by id first; fallback to originalEmail)
      const usersRaw = localStorage.getItem("users");
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      let index = -1;

      if (this.user.id) {
        index = users.findIndex(u => u.id === this.user.id);
      }

      if (index === -1 && this.originalEmail) {
        index = users.findIndex(u => u.email === this.originalEmail);
      }

      // prevent duplicate email (if changed)
      const emailTaken = users.some((u, i) => {
        if (i === index) return false;
        return String(u.email || "").toLowerCase() === String(this.user.email || "").toLowerCase();
      });

      if (emailTaken) {
        alert("Email này đã được sử dụng bởi tài khoản khác.");
        return;
      }

      if (index !== -1) {
        users[index] = { ...users[index], ...this.user };
      } else {
        // if the user isn't in the list yet, add them
        if (!this.user.id) this.user.id = "u_" + Date.now();
        users.push({ ...this.user });
      }

      localStorage.setItem("users", JSON.stringify(users));

      // update current session user
      localStorage.setItem("currentUser", JSON.stringify(this.user));
      localStorage.setItem("currentUserEmail", this.user.email);

      // keep originalEmail in sync for future saves
      this.originalEmail = this.user.email;

      alert("Lưu hồ sơ thành công.");
    }
  }
};
</script>

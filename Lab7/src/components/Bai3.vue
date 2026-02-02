<template>
  <div class="container mt-4">
    <div class="row border p-3">
      <!-- CỘT TRÁI: FORM -->
      <div class="col-md-6">
        <h4>Form Đăng Ký</h4>

        <div class="mb-3">
          <label>Họ tên:</label>
          <input type="text" class="form-control" v-model="name" />
        </div>

        <div class="mb-3">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email" />
        </div>

        <div class="mb-3">
          <label>Mật khẩu:</label>
          <input type="password" class="form-control" v-model="password" />
        </div>

        <div class="mb-3">
          <label>Ngày sinh:</label>
          <input type="date" class="form-control" v-model="birthday" />
        </div>

        <div class="mb-3">
          <label>Giới tính:</label><br />
          <input type="radio" value="Nam" v-model="gender" /> Nam
          <input type="radio" value="Nữ" v-model="gender" class="ms-3" /> Nữ
          <input type="radio" value="Khác" v-model="gender" class="ms-3" /> Khác
        </div>

        <div class="mb-3">
          <label>Ngôn ngữ:</label><br />
          <input
            type="checkbox"
            value="Tiếng Việt"
            v-model="languages"
          /> Tiếng Việt
          <input
            type="checkbox"
            value="Tiếng Anh"
            v-model="languages"
            class="ms-3"
          /> Tiếng Anh
          <input
            type="checkbox"
            value="Tiếng Nhật"
            v-model="languages"
            class="ms-3"
          /> Tiếng Nhật
        </div>

        <button class="btn btn-primary" @click="register">
          Đăng ký
        </button>
      </div>

      <!-- CỘT PHẢI: THÔNG TIN -->
      <div class="col-md-6" v-if="isRegistered">
        <h4>Thông tin đã đăng ký:</h4>
        <p><strong>Họ tên:</strong> {{ name }}</p>
        <p><strong>Email:</strong> {{ email }}</p>
        <p><strong>Ngày sinh:</strong> {{ birthday }}</p>
        <p><strong>Giới tính:</strong> {{ gender }}</p>
        <p>
          <strong>Ngôn ngữ:</strong>
          {{ languages.join(', ') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const birthday = ref('')
const gender = ref('')
const languages = ref([])

const isRegistered = ref(false)

const register = () => {
  isRegistered.value = true
}
</script>

<script setup>
import { ref } from 'vue'

const isSubmitted = ref(false)

const user = ref({
  name: '',
  email: '',
  password: '',
  birthday: '',
  gender: '',
  languages: []
})

const submitForm = () => {
  isSubmitted.value = true
}
</script>

<template>
  <div class="container mt-5" style="max-width: 600px">
    <h3 class="mb-4 text-center">Form đăng ký</h3>

    <!-- FORM -->
    <form v-if="!isSubmitted" @submit.prevent="submitForm">
      <div class="mb-3">
        <label class="form-label">Họ tên</label>
        <input class="form-control" v-model="user.name" />
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" v-model="user.email" />
      </div>

      <div class="mb-3">
        <label class="form-label">Mật khẩu</label>
        <input type="password" class="form-control" v-model="user.password" />
      </div>

      <div class="mb-3">
        <label class="form-label">Ngày sinh</label>
        <input type="date" class="form-control" v-model="user.birthday" />
      </div>

      <div class="mb-3">
        <label class="form-label d-block">Giới tính</label>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            value="Nam"
            v-model="user.gender"
          />
          <label class="form-check-label">Nam</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            value="Nữ"
            v-model="user.gender"
          />
          <label class="form-check-label">Nữ</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label d-block">Ngôn ngữ</label>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="English"
            v-model="user.languages"
          />
          <label class="form-check-label">English</label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="Vietnamese"
            v-model="user.languages"
          />
          <label class="form-check-label">Vietnamese</label>
        </div>
      </div>

      <button class="btn btn-primary w-100" type="submit">
        Đăng ký
      </button>
    </form>

    <!-- RESULT -->
    <div v-else class="mt-4">
      <h4 class="mb-3">Thông tin đã đăng ký</h4>
      <ul class="list-group">
        <li class="list-group-item">
          <strong>Họ tên:</strong> {{ user.name }}
        </li>
        <li class="list-group-item">
          <strong>Email:</strong> {{ user.email }}
        </li>
        <li class="list-group-item">
          <strong>Ngày sinh:</strong> {{ user.birthday }}
        </li>
        <li class="list-group-item">
          <strong>Giới tính:</strong> {{ user.gender }}
        </li>
        <li class="list-group-item">
          <strong>Ngôn ngữ:</strong> {{ user.languages.join(', ') }}
        </li>
      </ul>
    </div>
  </div>
</template>

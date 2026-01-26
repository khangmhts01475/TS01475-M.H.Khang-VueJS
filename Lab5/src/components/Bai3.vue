<script setup>
import { reactive } from 'vue'

const userInfo = reactive({
  name: '',
  age: '',
  email: ''
})
</script>

<template>
  <div class="p-5 col-sm-8">
    <h1>Thông tin cá nhân</h1>

    <form>
      <div class="mb-3">
        <label>Họ và Tên</label>
        <br>
        <input
          v-model="userInfo.name"
          class="form-control"
          placeholder="Nhập họ và tên"
        >
      </div>

      <div class="mb-3">
        <label>Tuổi</label>
        <br>
        <input
          v-model="userInfo.age"
          type="number"
          class="form-control"
          placeholder="Nhập tuổi"
        >
      </div>

      <div class="mb-3">
        <label>Email</label>
        <br>
        <input
          v-model="userInfo.email"
          type="email"
          class="form-control"
          placeholder="Nhập email"
        >
      </div>
    </form>

    <!-- Live output -->
    <div class="mt-4 p-3 bg-dark text-white rounded">
        <h1>Thông tin đã nhập</h1>
      <p><b>Họ và Tên:</b> {{ userInfo.name }}</p>
      <p><b>Tuổi:</b> {{ userInfo.age }}</p>
      <p><b>Email:</b> {{ userInfo.email }}</p>
    </div>
  </div>
</template>

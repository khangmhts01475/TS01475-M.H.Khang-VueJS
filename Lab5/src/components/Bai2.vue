<script setup>
import { ref } from 'vue'

const userInput = ref('FPL')
</script>

<template>
  <div class="p-5">
    <input
      v-model="userInput"
      class="form-control"
      placeholder="Nhập dữ liệu vào đây"
    />

    <p class="mt-3">
      Giá trị bạn nhập: <b>{{ userInput }}</b>
    </p>
  </div>
</template>

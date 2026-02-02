<script setup>
import { ref, computed } from 'vue'

defineProps({
  msg: String,
})

const message = ref('Thông điệp ban đầu')

const updateMessage = () => {
  message.value = 'Thông điệp đã được thay đổi!'
}

const SoLuong = ref(0)
const SoTien  = ref(0)

const KetQua = computed(() => {
  return SoLuong.value * SoTien.value
})
</script>

<template>
  <div class="p-5">
    <p>{{ message }}</p>
    <button class="btn btn-dark" @click="updateMessage">
      Thay đổi thông điệp
    </button>

    <h3>Nhập số lượng:</h3>
    <input type="number" v-model="SoLuong" />
    <p>{{ SoLuong }}</p>

    <h3>Nhập số tiền:</h3>
    <input type="number" v-model="SoTien" />
    <p>{{ SoTien }}</p>

    <h3>Kết quả:</h3>
    <p>{{ KetQua }}</p>
  </div>
</template>

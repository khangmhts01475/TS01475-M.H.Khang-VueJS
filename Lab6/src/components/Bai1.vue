<script setup>
import { ref, computed } from 'vue'

const dtb = ref('')

const xepLoai = computed(() => {
  if (dtb.value === '') return ''

  const n = Number(dtb.value)
  if (isNaN(n)) return ''

  if (n < 5) return 'Yếu'
  else if (n < 6.5) return 'Trung bình'
  else if (n < 8) return 'Khá'
  else if (n < 9) return 'Giỏi'
  else return 'Xuất sắc'
})
</script>

<template>
  <div>
    <h3>Nhập điểm của bạn:</h3>

    <input type="number" v-model="dtb" />

    <p>{{ xepLoai }}</p>
  </div>
</template>

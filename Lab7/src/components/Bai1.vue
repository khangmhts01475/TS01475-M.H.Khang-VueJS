<script setup>
import { ref } from 'vue'

const newTask = ref('')
const tasks = ref([])

const addTask = () => {
  const value = newTask.value.trim()
  if (!value) return
  tasks.value.push(value)
  newTask.value = ''
}

const removeTask = (index) => {
  tasks.value.splice(index, 1)
}
</script>
<template>
  <div class="container mt-4" style="max-width: 700px">
    <h1 class="text-center mb-4">Quản lý công việc</h1>

    <div class="mb-3">
      <label class="form-label fw-semibold">Tên công việc:</label>
      <input
        class="form-control form-control-lg"
        v-model="newTask"
        placeholder="Nhập tên công việc"
      />
    </div>

    <button class="btn btn-primary btn-lg mb-4" @click="addTask">
      Thêm công việc
    </button>

    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-center py-3"
        v-for="(task, index) in tasks"
        :key="index"
      >
        <span class="fs-5">{{ task }}</span>
        <button class="btn btn-danger" @click="removeTask(index)">Xóa</button>
      </li>
    </ul>
  </div>
</template>

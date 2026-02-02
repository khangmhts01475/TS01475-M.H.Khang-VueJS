<style>
/* RESET cho bài 1 */
body {
  background-color: #f8f9fa !important;
  color: #212529 !important;
}

/* Card */
.card {
  background-color: #ffffff !important;
  border: 1px solid #dee2e6 !important;
  border-radius: 6px;
}

/* Tiêu đề */
h3 {
  color: #212529 !important;
  font-weight: 600;
}

/* Label */
.form-label {
  color: #212529 !important;
}

/* Input */
.form-control {
  background-color: #ffffff !important;
  color: #212529 !important;
  border: 1px solid #ced4da !important;
  border-radius: 6px;
  padding: 10px;
}

/* Placeholder */
.form-control::placeholder {
  color: #6c757d !important;
}

/* Nút thêm */
.btn-primary {
  background-color: #0d6efd !important;
  border-color: #0d6efd !important;
  color: #ffffff !important;
  font-size: 14px;
  padding: 6px 14px;
}

/* Danh sách */
.list-group-item {
  background-color: #ffffff !important;
  color: #212529 !important;
  border: 1px solid #dee2e6 !important;
  padding: 10px 12px;
}

/* Nút xóa */
.btn-danger {
  background-color: #dc3545 !important;
  border-color: #dc3545 !important;
  color: #ffffff !important;
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 5px;
}

</style>

<template>
  <div class="container mt-4">
    <div class="card mx-auto" style="max-width: 420px;">
      <div class="card-body">
        <h3 class="text-center mb-3">Quản lý công việc</h3>

        <!-- Form thêm công việc -->
        <form @submit.prevent="addTask">
          <div class="mb-3">
            <label class="form-label">Tên công việc:</label>
            <input
              type="text"
              class="form-control"
              v-model="newTask"
              placeholder="Nhập tên công việc"
            />
          </div>
          <button type="submit" class="btn btn-primary mb-3">
            Thêm công việc
          </button>
        </form>

        <!-- Danh sách công việc -->
        <ul class="list-group">
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
            v-for="(task, index) in tasks"
            :key="index"
          >
            {{ task }}
            <button
              class="btn btn-danger btn-sm"
              @click="removeTask(index)"
            >
              Xóa
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newTask = ref('')
const tasks = ref(['Ăn sáng', 'Đi học', 'Chơi bóng rổ'])

const addTask = () => {
  if (newTask.value.trim() !== '') {
    tasks.value.push(newTask.value)
    newTask.value = ''
  }
}

const removeTask = (index) => {
  tasks.value.splice(index, 1)
}
</script>

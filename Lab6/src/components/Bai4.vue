<script setup>
import { ref } from 'vue'

const hoTen = ref('')
const diem = ref('')
const ngaySinh = ref('')

const students = ref([
  { hoTen: 'Nguyễn Chí Hùng', diem: 8, ngaySinh: '2006-01-01' },
  { hoTen: 'Phạm Thị Lan', diem: 9, ngaySinh: '2006-05-15' }
])

const editingIndex = ref(-1)

const resetForm = () => {
  hoTen.value = ''
  diem.value = ''
  ngaySinh.value = ''
  editingIndex.value = -1
}

const submitForm = () => {
  if (!hoTen.value || diem.value === '' || !ngaySinh.value) return

  const score = Number(diem.value)
  if (isNaN(score) || score < 0 || score > 10) return

  const data = {
    hoTen: hoTen.value,
    diem: score,
    ngaySinh: ngaySinh.value
  }

  if (editingIndex.value === -1) {
    students.value.push(data)
  } else {
    students.value[editingIndex.value] = data
  }

  resetForm()
}

const editStudent = (index) => {
  const s = students.value[index]
  hoTen.value = s.hoTen
  diem.value = s.diem
  ngaySinh.value = s.ngaySinh
  editingIndex.value = index
}

const deleteStudent = (index) => {
  students.value.splice(index, 1)
  resetForm()
}
</script>

<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-4">
        <h2>Thêm học sinh</h2>

        <div class="mb-3">
          <label class="form-label">Họ tên:</label>
          <input v-model="hoTen" class="form-control" />
        </div>

        <div class="mb-3">
          <label class="form-label">Điểm:</label>
          <input v-model="diem" type="number" class="form-control" />
        </div>

        <div class="mb-3">
          <label class="form-label">Ngày sinh:</label>
          <input v-model="ngaySinh" type="date" class="form-control" />
        </div>

        <button class="btn btn-success" @click="submitForm">
          {{ editingIndex === -1 ? 'Thêm' : 'Cập nhật' }}
        </button>
      </div>

      <div class="col-md-8">
        <h2>Danh sách học sinh</h2>

        <table class="table">
          <thead>
            <tr>
              <th>Họ và tên</th>
              <th>Điểm</th>
              <th>Ngày sinh</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(s, index) in students" :key="index">
              <td>{{ s.hoTen }}</td>
              <td>{{ s.diem }}</td>
              <td>{{ s.ngaySinh }}</td>
              <td>
                <button class="btn btn-warning me-2" @click="editStudent(index)">
                  Sửa
                </button>
                <button class="btn btn-danger" @click="deleteStudent(index)">
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

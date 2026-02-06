<script setup>
import { ref } from 'vue'

const props = defineProps({
  user: { type: String, required: true }
})

const emit = defineEmits(['logout'])

const commentText = ref('')
const comments = ref([])

const addComment = () => {
  const value = commentText.value.trim()
  if (!value) return

  comments.value.unshift({
    user: props.user,
    content: value,
    time: new Date().toLocaleString()
  })

  commentText.value = ''
}

const logout = () => {
  emit('logout')
}
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 class="mb-0">Bình luận</h4>
          <div class="text-muted">Chào mừng, {{ user }}</div>
        </div>
        <button class="btn btn-outline-secondary" @click="logout">Đăng xuất</button>
      </div>

      <form class="d-flex gap-2 mb-3" @submit.prevent="addComment">
        <input
          class="form-control"
          v-model="commentText"
          placeholder="Nhập bình luận..."
        />
        <button class="btn btn-success" type="submit">Gửi</button>
      </form>

      <div v-if="comments.length === 0" class="alert alert-secondary mb-0">
        Chưa có bình luận nào.
      </div>

      <ul v-else class="list-group">
        <li class="list-group-item" v-for="(c, i) in comments" :key="i">
          <div class="d-flex justify-content-between">
            <strong>{{ c.user }}</strong>
            <small class="text-muted">{{ c.time }}</small>
          </div>
          <div>{{ c.content }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

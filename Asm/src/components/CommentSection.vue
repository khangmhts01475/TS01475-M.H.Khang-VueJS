<script setup>
import { computed, ref, watch } from 'vue'
import CommentItem from './CommentItem.vue'

const props = defineProps({
  postId: {
    type: String,
    required: true
  }
})

const errorMessage = ref('')
const infoMessage = ref('')
const commentText = ref('')

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser') || 'null')
  } catch {
    return null
  }
}

function loadPosts() {
  try {
    const data = JSON.parse(localStorage.getItem('posts') || '[]')
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function savePosts(posts) {
  localStorage.setItem('posts', JSON.stringify(posts))
}

const currentUser = ref(getCurrentUser())
const posts = ref(loadPosts())

// refresh user and posts when postId changes (or when revisiting)
watch(
  () => props.postId,
  () => {
    currentUser.value = getCurrentUser()
    posts.value = loadPosts()
    errorMessage.value = ''
    infoMessage.value = ''
    commentText.value = ''
  },
  { immediate: true }
)

const post = computed(() => posts.value.find(p => String(p.id) === String(props.postId)) || null)

const comments = computed(() => {
  const arr = post.value?.comments
  return Array.isArray(arr) ? arr : []
})

const commentCount = computed(() => comments.value.length)

function addComment() {
  errorMessage.value = ''
  infoMessage.value = ''

  if (!currentUser.value) {
    errorMessage.value = 'Vui lòng đăng nhập để bình luận.'
    return
  }
  if (!post.value) {
    errorMessage.value = 'Không tìm thấy bài viết.'
    return
  }

  const content = commentText.value.trim()
  if (!content) {
    errorMessage.value = 'Vui lòng nhập nội dung bình luận.'
    return
  }

  const target = posts.value.find(p => String(p.id) === String(props.postId))
  if (!target) {
    errorMessage.value = 'Không tìm thấy bài viết.'
    return
  }

  if (!Array.isArray(target.comments)) target.comments = []

  target.comments.unshift({
    id: `c_${Date.now()}`,
    userId: currentUser.value.id,
    userName: currentUser.value.fullName || 'User',
    content,
    createdAt: new Date().toISOString()
  })

  savePosts(posts.value)
  commentText.value = ''
  infoMessage.value = 'Đã gửi bình luận.'
}
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="mb-0">Bình luận</h4>
        <span class="badge text-bg-secondary">{{ commentCount }}</span>
      </div>

      <div v-if="errorMessage" class="alert alert-danger mb-3">
        {{ errorMessage }}
      </div>
      <div v-if="infoMessage" class="alert alert-success mb-3">
        {{ infoMessage }}
      </div>

      <div v-if="!currentUser" class="alert alert-warning mb-4">
        Vui lòng đăng nhập để bình luận.
      </div>

      <!-- Comment form -->
      <form class="mb-4" @submit.prevent="addComment">
        <div class="mb-3">
          <label class="form-label">Nội dung bình luận</label>
          <textarea
            v-model="commentText"
            class="form-control"
            rows="3"
            placeholder="Nhập bình luận..."
            :disabled="!currentUser"
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary" :disabled="!currentUser">
          Gửi bình luận
        </button>
      </form>

      <div v-if="comments.length === 0" class="text-muted">
        Chưa có bình luận nào.
      </div>

      <div v-else class="d-flex flex-column gap-3">
        <CommentItem
          v-for="(c, idx) in comments"
          :key="c.id"
          :comment="c"
          :index="idx"
        />
      </div>
    </div>
  </div>
</template>

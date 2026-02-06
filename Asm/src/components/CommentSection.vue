<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  postId: {
    type: String,
    required: true
  },
  canComment: {
    type: Boolean,
    default: true
  }
})

// ---------- helpers ----------
function safeParseJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null')
  } catch {
    return null
  }
}

function getCurrentUser() {
  // Prefer full object
  const obj = safeParseJson('currentUser')
  if (obj && typeof obj === 'object') return obj

  // Fallback: email-only login
  const email = localStorage.getItem('currentUserEmail')
  if (email) {
    return {
      id: email,
      email,
      fullName: email.split('@')[0] || 'User'
    }
  }

  return null
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

function nowIso() {
  return new Date().toISOString()
}

function formatDateTime(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  const hh = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  return `${dd}/${mm}/${yyyy} ${hh}:${mi}`
}

// ---------- state ----------
const currentUser = ref(getCurrentUser())
const posts = ref(loadPosts())

const post = computed(() =>
  posts.value.find(p => String(p.id) === String(props.postId)) || null
)

const comments = computed(() => post.value?.comments || [])

const newComment = ref('')
const errorMessage = ref('')

// ---------- actions ----------
function addComment() {
  errorMessage.value = ''

  if (!props.canComment) {
    errorMessage.value = 'Bạn không thể bình luận bài viết này.'
    return
  }

  if (!currentUser.value) {
    errorMessage.value = 'Vui lòng đăng nhập để bình luận.'
    return
  }

  if (!newComment.value.trim()) {
    errorMessage.value = 'Nội dung bình luận không được để trống.'
    return
  }

  if (!post.value) {
    errorMessage.value = 'Không tìm thấy bài viết.'
    return
  }

  const comment = {
    id: `c_${Date.now()}`,
    content: newComment.value.trim(),
    authorId: currentUser.value.id,
    authorName: currentUser.value.fullName || currentUser.value.email || 'User',
    createdAt: nowIso()
  }

  post.value.comments = post.value.comments || []
  post.value.comments.push(comment)

  savePosts(posts.value)
  newComment.value = ''
}
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h5 class="mb-3">
        Bình luận ({{ comments.length }})
      </h5>

      <!-- Cannot comment info -->
      <div
        v-if="!canComment"
        class="alert alert-warning"
      >
        Bài viết này không cho phép bình luận.
      </div>

      <!-- Comment list -->
      <div v-if="comments.length === 0" class="text-muted mb-3">
        Chưa có bình luận nào.
      </div>

      <div v-for="c in comments" :key="c.id" class="mb-3">
        <div class="fw-semibold">
          {{ c.authorName }}
          <span class="text-muted small ms-2">
            {{ formatDateTime(c.createdAt) }}
          </span>
        </div>
        <div style="white-space: pre-wrap;">
          {{ c.content }}
        </div>
      </div>

      <hr />

      <!-- Add comment -->
      <template v-if="canComment">
        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>

        <textarea
          v-model="newComment"
          class="form-control mb-2"
          rows="3"
          placeholder="Viết bình luận..."
        ></textarea>

        <div class="d-flex justify-content-end">
          <button class="btn btn-primary" @click="addComment">
            Gửi bình luận
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

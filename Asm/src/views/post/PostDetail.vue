<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// ---------- helpers ----------
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

function formatDateTime(iso) {
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  const hh = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  return `${dd}/${mm}/${yyyy} ${hh}:${mi}`
}

function formatDate(iso) {
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}

// ---------- state ----------
const currentUser = ref(getCurrentUser())
const posts = ref(loadPosts())
const postId = computed(() => String(route.params.id || ''))

const post = computed(() => posts.value.find(p => String(p.id) === postId.value) || null)

const isOwner = computed(() => {
  return !!(currentUser.value && post.value && post.value.authorId === currentUser.value.id)
})

const commentText = ref('')
const errorMessage = ref('')
const infoMessage = ref('')

// Ensure comments array exists
const comments = computed(() => {
  const arr = post.value?.comments
  return Array.isArray(arr) ? arr : []
})

const commentCount = computed(() => comments.value.length)

// ---------- actions ----------
function goBack() {
  router.back()
}

function goEdit() {
  if (!post.value) return
  if (!isOwner.value) {
    alert('Bạn không có quyền sửa bài viết này.')
    return
  }
  router.push(`/post/${post.value.id}/edit`)
}

function deletePost() {
  errorMessage.value = ''
  infoMessage.value = ''

  if (!post.value) return
  if (!isOwner.value) {
    alert('Bạn không có quyền xóa bài viết này.')
    return
  }

  const ok = confirm('Bạn có chắc muốn xóa bài viết này không?')
  if (!ok) return

  posts.value = posts.value.filter(p => p.id !== post.value.id)
  savePosts(posts.value)
  router.push('/home')
}

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

  const target = posts.value.find(p => String(p.id) === postId.value)
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
  <div class="container py-4">
    <!-- Top actions -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
      <div>
        <h2 class="mb-1">Chi tiết bài viết</h2>
        <p class="text-muted mb-0">Xem nội dung và bình luận</p>
      </div>

      <div class="d-flex gap-2">
        <button type="button" class="btn btn-outline-secondary" @click="goBack">
          Quay lại
        </button>

        <button
          type="button"
          class="btn btn-outline-primary"
          :disabled="!isOwner"
          @click="goEdit"
          title="Chỉ chủ bài viết mới sửa được"
        >
          Sửa bài viết
        </button>

        <button
          type="button"
          class="btn btn-outline-danger"
          :disabled="!isOwner"
          @click="deletePost"
          title="Chỉ chủ bài viết mới xóa được"
        >
          Xóa bài viết
        </button>
      </div>
    </div>

    <!-- Not found -->
    <div v-if="!post" class="alert alert-danger">
      Không tìm thấy bài viết.
    </div>

    <template v-else>
      <!-- Post content -->
      <div class="card shadow-sm mb-4">
        <img
          v-if="post.imageUrl"
          :src="post.imageUrl"
          class="card-img-top"
          alt="Post image"
          style="object-fit: cover; height: 260px;"
        />

        <div class="card-body">
          <h3 class="mb-2">{{ post.title }}</h3>

          <div class="d-flex flex-wrap gap-3 text-muted small mb-3">
            <span><strong>Tác giả:</strong> {{ post.authorName || 'User' }}</span>
            <span><strong>Ngày đăng:</strong> {{ formatDate(post.createdAt) }}</span>
            <span><strong>Chủ đề:</strong> {{ post.category || 'Tổng hợp' }}</span>
            <span v-if="post.status" class="badge text-bg-light">
              {{ post.status === 'public' ? 'Công khai' : 'Bản nháp' }}
            </span>
            <span v-if="post.pinned" class="badge text-bg-warning">Ghim</span>
          </div>

          <hr />

          <!-- Keep line breaks -->
          <p class="mb-0" style="white-space: pre-wrap;">
            {{ post.content }}
          </p>
        </div>
      </div>

      <!-- Comments -->
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

          <!-- Guest hint -->
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

          <!-- Comment list -->
          <div v-if="comments.length === 0" class="text-muted">
            Chưa có bình luận nào.
          </div>

          <div v-else class="d-flex flex-column gap-3">
            <div
              v-for="(c, idx) in comments"
              :key="c.id"
              class="border rounded p-3"
            >
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <strong>{{ c.userName || 'User' }}</strong>
                  <div class="text-muted small">{{ formatDateTime(c.createdAt) }}</div>
                </div>
                <span class="badge text-bg-light text-muted">#{{ idx + 1 }}</span>
              </div>

              <p class="mt-2 mb-0" style="white-space: pre-wrap;">
                {{ c.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

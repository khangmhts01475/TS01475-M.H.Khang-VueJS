<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CommentSection from '@/components/CommentSection.vue'

const route = useRoute()
const router = useRouter()

// ---------- helpers ----------
function safeParseJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null')
  } catch {
    return null
  }
}

function getCurrentUser() {
  const obj = safeParseJson('currentUser')
  if (obj && typeof obj === 'object') return obj

  const email = localStorage.getItem('currentUserEmail')
  if (email) {
    return {
      id: email, // stable id
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

function formatDate(iso) {
  if (!iso) return '--/--/----'
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}

function norm(s) {
  return String(s || '').toLowerCase().trim()
}

// ---------- state ----------
const currentUser = ref(getCurrentUser())
const posts = ref(loadPosts())

const postId = computed(() => String(route.params.id || ''))
const post = computed(() => posts.value.find(p => String(p.id) === postId.value) || null)

// ✅ Old posts may not have status -> treat as public
const normalizedStatus = computed(() => {
  return post.value?.status || 'public'
})

// ✅ Ownership: works for both new + old posts
const isOwner = computed(() => {
  if (!post.value || !currentUser.value) return false

  // New posts: authorId present
  if (post.value.authorId) {
    return post.value.authorId === currentUser.value.id
  }

  // Old posts: authorId missing -> fallback by authorName matching email/fullname
  const authorName = norm(post.value.authorName)
  const uEmail = norm(currentUser.value.email)
  const uName = norm(currentUser.value.fullName)

  return !!authorName && (authorName === uEmail || authorName === uName)
})

// ✅ Draft privacy: only owner can view drafts
const canView = computed(() => {
  if (!post.value) return false
  if (normalizedStatus.value === 'public') return true
  return isOwner.value
})

const canComment = computed(() => {
  if (!post.value) return false
  if (normalizedStatus.value === 'public') return true
  return isOwner.value
})

// ✅ Auto-claim: if old post has no authorId but you are owner, persist it
watchEffect(() => {
  if (!post.value || !currentUser.value) return
  if (post.value.authorId) return

  if (isOwner.value) {
    post.value.authorId = currentUser.value.id
    post.value.authorName =
      currentUser.value.fullName || currentUser.value.email || post.value.authorName || 'User'
    savePosts(posts.value)
  }
})

// ---------- actions ----------
function goBackHome() {
  router.push('/home')
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
</script>

<template>
  <div class="container py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
      <div>
        <h2 class="mb-1">Chi tiết bài viết</h2>
        <p class="text-muted mb-0">Xem nội dung và bình luận</p>
      </div>

      <div class="d-flex gap-2">
        <button type="button" class="btn btn-outline-secondary" @click="goBackHome">
          Về trang chủ
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

    <div v-if="!post" class="alert alert-danger">
      Không tìm thấy bài viết.
    </div>

    <div v-else-if="!canView" class="alert alert-warning">
      Đây là <strong>bản nháp</strong>. Chỉ chủ bài viết mới có thể xem.
    </div>

    <template v-else>
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

            <span class="badge text-bg-light">
              {{ normalizedStatus === 'public' ? 'Công khai' : 'Bản nháp' }}
            </span>

            <span v-if="post.pinned" class="badge text-bg-warning">Ghim</span>
          </div>

          <hr />

          <p class="mb-0" style="white-space: pre-wrap;">
            {{ post.content }}
          </p>
        </div>
      </div>

      <CommentSection :postId="post.id" :canComment="canComment" />
    </template>
  </div>
</template>

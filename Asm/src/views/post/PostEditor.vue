<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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

// ---------- state ----------
const currentUser = ref(getCurrentUser())
const posts = ref(loadPosts())

const postId = computed(() => String(route.params.id || ''))
const isEditMode = computed(() => route.path.includes('/edit') && !!postId.value)

const errorMessage = ref('')
const successMessage = ref('')

const form = ref({
  title: '',
  category: 'Tổng hợp',
  imageUrl: '',
  content: '',
  status: 'public', // ✅ default public to prevent confusion
  pinned: false
})

// ---------- post lookup ----------
function findPostById(id) {
  return posts.value.find(p => String(p.id) === String(id))
}

function isOwner(post) {
  if (!currentUser.value || !post) return false
  if (post.authorId) return post.authorId === currentUser.value.id

  // fallback for old posts
  const authorName = String(post.authorName || '').toLowerCase().trim()
  const uEmail = String(currentUser.value.email || '').toLowerCase().trim()
  const uName = String(currentUser.value.fullName || '').toLowerCase().trim()
  return !!authorName && (authorName === uEmail || authorName === uName)
}

function hydrateEditForm() {
  if (!isEditMode.value) return

  const p = findPostById(postId.value)
  if (!p) {
    errorMessage.value = 'Không tìm thấy bài viết.'
    return
  }
  if (!isOwner(p)) {
    errorMessage.value = 'Bạn không có quyền chỉnh sửa bài viết này.'
    return
  }

  // If it’s an old post missing authorId, claim it once
  if (!p.authorId && currentUser.value) {
    p.authorId = currentUser.value.id
    p.authorName = currentUser.value.fullName || currentUser.value.email || p.authorName || 'User'
    savePosts(posts.value)
  }

  form.value.title = p.title || ''
  form.value.category = p.category || 'Tổng hợp'
  form.value.imageUrl = p.imageUrl || ''
  form.value.content = p.content || ''
  form.value.status = p.status || 'public'
  form.value.pinned = !!p.pinned
}

hydrateEditForm()

// ---------- validation ----------
function validate() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.value.title.trim()) {
    errorMessage.value = 'Vui lòng nhập tiêu đề.'
    return false
  }
  if (!form.value.content.trim()) {
    errorMessage.value = 'Vui lòng nhập nội dung.'
    return false
  }
  if (form.value.imageUrl.trim() && !/^https?:\/\//i.test(form.value.imageUrl.trim())) {
    errorMessage.value = 'Link ảnh phải bắt đầu bằng http:// hoặc https://'
    return false
  }
  return true
}

// ---------- actions ----------
function cancel() {
  if (isEditMode.value) router.push(`/post/${postId.value}`)
  else router.push('/home')
}

function upsertPost(status) {
  form.value.status = status

  if (!currentUser.value) {
    errorMessage.value = 'Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.'
    router.push('/login')
    return
  }

  if (!validate()) return

  // Create
  if (!isEditMode.value) {
    const p = {
      id: `p_${Date.now()}`,
      title: form.value.title.trim(),
      category: form.value.category,
      imageUrl: form.value.imageUrl.trim(),
      content: form.value.content.trim(),
      status: form.value.status,
      pinned: !!form.value.pinned,

      authorId: currentUser.value.id,
      authorName: currentUser.value.fullName || currentUser.value.email || 'User',

      createdAt: nowIso(),
      updatedAt: nowIso(),
      comments: []
    }

    posts.value.unshift(p)
    savePosts(posts.value)
    router.push(`/post/${p.id}`)
    return
  }

  // Edit
  const existing = findPostById(postId.value)
  if (!existing) {
    errorMessage.value = 'Không tìm thấy bài viết.'
    return
  }
  if (!isOwner(existing)) {
    errorMessage.value = 'Bạn không có quyền chỉnh sửa bài viết này.'
    return
  }

  // Ensure ownership persisted
  if (!existing.authorId) {
    existing.authorId = currentUser.value.id
    existing.authorName = currentUser.value.fullName || currentUser.value.email || existing.authorName || 'User'
  }

  existing.title = form.value.title.trim()
  existing.category = form.value.category
  existing.imageUrl = form.value.imageUrl.trim()
  existing.content = form.value.content.trim()
  existing.status = form.value.status
  existing.pinned = !!form.value.pinned
  existing.updatedAt = nowIso()

  savePosts(posts.value)
  successMessage.value = 'Đã lưu bài viết.'
  router.push(`/post/${existing.id}`)
}

function deletePost() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!isEditMode.value) return

  const existing = findPostById(postId.value)
  if (!existing) {
    errorMessage.value = 'Không tìm thấy bài viết.'
    return
  }
  if (!isOwner(existing)) {
    errorMessage.value = 'Bạn không có quyền xóa bài viết này.'
    return
  }

  const ok = confirm('Bạn có chắc muốn xóa bài viết này không?')
  if (!ok) return

  posts.value = posts.value.filter(p => p.id !== existing.id)
  savePosts(posts.value)
  router.push('/home')
}
</script>

<template>
  <div class="container py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
      <div>
        <h2 class="mb-1">{{ isEditMode ? 'Chỉnh sửa bài viết' : 'Soạn bài viết' }}</h2>
        <p class="text-muted mb-0">
          {{ isEditMode ? 'Cập nhật nội dung bài viết' : 'Tạo bài viết mới' }}
        </p>
      </div>

      <div class="d-flex gap-2">
        <button type="button" class="btn btn-outline-secondary" @click="cancel">
          Hủy
        </button>
        <button type="button" class="btn btn-primary" @click="upsertPost(form.status)">
          Lưu bài viết
        </button>
      </div>
    </div>

    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>

    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="upsertPost(form.status)">
          <div class="mb-3">
            <label class="form-label">Tiêu đề</label>
            <input v-model="form.title" type="text" class="form-control" placeholder="Nhập tiêu đề bài viết" />
          </div>

          <div class="mb-3">
            <label class="form-label">Chủ đề</label>
            <select v-model="form.category" class="form-select">
              <option>Tổng hợp</option>
              <option>Công nghệ</option>
              <option>Đời sống</option>
              <option>Học tập</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Ảnh minh họa (tuỳ chọn)</label>
            <input v-model="form.imageUrl" type="url" class="form-control" placeholder="https://example.com/image.png" />
          </div>

          <div class="mb-3">
            <label class="form-label">Nội dung</label>
            <textarea v-model="form.content" class="form-control" rows="10" placeholder="Nhập nội dung bài viết..."></textarea>
          </div>

          <div class="row g-3">
            <div class="col-12 col-md-6">
              <label class="form-label">Trạng thái</label>
              <select v-model="form.status" class="form-select">
                <option value="draft">Bản nháp</option>
                <option value="public">Công khai</option>
              </select>
            </div>

            <div class="col-12 col-md-6">
              <label class="form-label">Ghim bài viết</label>
              <div class="form-check mt-2">
                <input v-model="form.pinned" class="form-check-input" type="checkbox" />
                <label class="form-check-label">Ghim lên đầu trang</label>
              </div>
            </div>
          </div>

          <hr class="my-4" />

          <div class="d-flex flex-column flex-md-row gap-2 justify-content-end">
            <button v-if="isEditMode" type="button" class="btn btn-outline-danger" @click="deletePost">
              Xóa bài viết
            </button>

            <button type="button" class="btn btn-outline-secondary" @click="upsertPost('draft')">
              Lưu bản nháp
            </button>

            <button type="button" class="btn btn-primary" @click="upsertPost('public')">
              Đăng bài
            </button>
          </div>

          <div class="alert alert-info mt-4 mb-0">
            Gợi ý: Bạn có thể lưu bản nháp hoặc đăng bài. Khi đăng bài, bài viết vẫn thuộc quyền quản lý của bạn.
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

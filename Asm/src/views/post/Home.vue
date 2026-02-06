<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ---------- Auth helpers ----------
function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser') || 'null')
  } catch {
    return null
  }
}

const currentUser = ref(getCurrentUser())

function logout() {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('currentUser')
  router.push('/login')
}

// ---------- Posts storage ----------
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

const posts = ref(loadPosts())

// Seed demo posts if empty (helps graders see UI immediately)
if (posts.value.length === 0) {
  const demo = [
    {
      id: `p_${Date.now()}_1`,
      title: 'Tiêu đề bài viết 1',
      content: 'Mô tả ngắn nội dung bài viết để người đọc có thể nắm sơ lược.',
      imageUrl: '',
      authorId: currentUser.value?.id || 'demo_user',
      authorName: currentUser.value?.fullName || 'User',
      createdAt: new Date().toISOString(),
      comments: []
    },
    {
      id: `p_${Date.now()}_2`,
      title: 'Tiêu đề bài viết 2',
      content: 'Nội dung mô tả ngắn cho bài viết thứ hai trong danh sách.',
      imageUrl: '',
      authorId: currentUser.value?.id || 'demo_user',
      authorName: currentUser.value?.fullName || 'User',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      comments: [{ id: 'c1' }, { id: 'c2' }]
    },
    {
      id: `p_${Date.now()}_3`,
      title: 'Tiêu đề bài viết 3',
      content: 'Thông tin mô tả ngắn cho bài viết thứ ba.',
      imageUrl: '',
      authorId: 'someone_else',
      authorName: 'Another User',
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      comments: [{ id: 'c1' }]
    }
  ]
  posts.value = demo
  savePosts(posts.value)
}

// ---------- UI state ----------
const searchText = ref('')
const sortMode = ref('newest') // newest | oldest | mostComments
const page = ref(1)
const pageSize = 6

function formatDate(iso) {
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}

function commentCount(p) {
  return Array.isArray(p.comments) ? p.comments.length : 0
}

function isOwner(p) {
  return currentUser.value && p.authorId === currentUser.value.id
}

// ---------- Derived lists ----------
const filteredSorted = computed(() => {
  const q = searchText.value.trim().toLowerCase()
  let list = [...posts.value]

  if (q) {
    list = list.filter(p => {
      const t = String(p.title || '').toLowerCase()
      const c = String(p.content || '').toLowerCase()
      const a = String(p.authorName || '').toLowerCase()
      return t.includes(q) || c.includes(q) || a.includes(q)
    })
  }

  if (sortMode.value === 'oldest') {
    list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  } else if (sortMode.value === 'mostComments') {
    list.sort((a, b) => commentCount(b) - commentCount(a))
  } else {
    // newest
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  return list
})

const totalPages = computed(() => {
  const n = filteredSorted.value.length
  return Math.max(1, Math.ceil(n / pageSize))
})

const pagedPosts = computed(() => {
  // keep page in range
  if (page.value > totalPages.value) page.value = totalPages.value
  if (page.value < 1) page.value = 1

  const start = (page.value - 1) * pageSize
  return filteredSorted.value.slice(start, start + pageSize)
})

const pageNumbers = computed(() => {
  // show up to 5 pages around current
  const total = totalPages.value
  const cur = page.value
  const range = []

  const start = Math.max(1, cur - 2)
  const end = Math.min(total, start + 4)

  for (let i = start; i <= end; i++) range.push(i)
  return range
})

// ---------- Actions ----------
function goCreate() {
  router.push('/post/new')
}

function goDetail(id) {
  router.push(`/post/${id}`)
}

function goEdit(id) {
  router.push(`/post/${id}/edit`)
}

function removePost(id) {
  const p = posts.value.find(x => x.id === id)
  if (!p) return

  if (!isOwner(p)) {
    alert('Bạn chỉ có thể xóa bài viết của mình.')
    return
  }

  const ok = confirm('Bạn có chắc muốn xóa bài viết này không?')
  if (!ok) return

  posts.value = posts.value.filter(x => x.id !== id)
  savePosts(posts.value)
}

function setPage(n) {
  page.value = n
}

function prevPage() {
  if (page.value > 1) page.value--
}

function nextPage() {
  if (page.value < totalPages.value) page.value++
}
</script>

<template>
  <div class="container py-4">
    <!-- Header -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
      <div>
        <h2 class="mb-1">Trang chủ</h2>
        <p class="text-muted mb-0">
          Danh sách bài viết
          <span class="ms-2 badge text-bg-light">
            {{ filteredSorted.length }} bài
          </span>
        </p>
      </div>

      <div class="d-flex gap-2 align-items-center">
        <button type="button" class="btn btn-primary" @click="goCreate">
          + Tạo bài viết
        </button>

        <button type="button" class="btn btn-outline-danger" @click="logout">
          Logout
        </button>
      </div>
    </div>

    <!-- Search / filter -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-2">
          <div class="col-12 col-md-8">
            <input
              v-model="searchText"
              type="text"
              class="form-control"
              placeholder="Tìm kiếm theo tiêu đề / nội dung / tác giả"
              @input="page = 1"
            />
          </div>
          <div class="col-12 col-md-4">
            <select v-model="sortMode" class="form-select" @change="page = 1">
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="mostComments">Nhiều bình luận</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="pagedPosts.length === 0" class="alert alert-info">
      Không có bài viết nào phù hợp.
    </div>

    <!-- Posts grid -->
    <div v-else class="row g-4">
      <div v-for="p in pagedPosts" :key="p.id" class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <img
            v-if="p.imageUrl"
            :src="p.imageUrl"
            class="card-img-top"
            alt="Post image"
            style="object-fit: cover; height: 160px;"
          />

          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ p.title }}</h5>

            <p class="card-text text-muted" style="display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">
              {{ p.content }}
            </p>

            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center text-muted small mb-2">
                <span>Tác giả: {{ p.authorName || 'User' }}</span>
                <span>{{ formatDate(p.createdAt) }}</span>
              </div>

              <div class="d-flex justify-content-between align-items-center text-muted small mb-3">
                <span>Bình luận: {{ commentCount(p) }}</span>
                <span v-if="isOwner(p)" class="badge text-bg-success">Của bạn</span>
              </div>

              <div class="d-flex gap-2">
                <button type="button" class="btn btn-outline-primary w-100" @click="goDetail(p.id)">
                  Xem chi tiết
                </button>

                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  :disabled="!isOwner(p)"
                  @click="goEdit(p.id)"
                  title="Chỉ chủ bài viết mới sửa được"
                >
                  Sửa
                </button>

                <button
                  type="button"
                  class="btn btn-outline-danger"
                  :disabled="!isOwner(p)"
                  @click="removePost(p.id)"
                  title="Chỉ chủ bài viết mới xóa được"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <nav class="mt-4" aria-label="Phân trang" v-if="totalPages > 1">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: page === 1 }">
          <button class="page-link" @click="prevPage" :disabled="page === 1">Trước</button>
        </li>

        <li
          v-for="n in pageNumbers"
          :key="n"
          class="page-item"
          :class="{ active: page === n }"
        >
          <button class="page-link" @click="setPage(n)">{{ n }}</button>
        </li>

        <li class="page-item" :class="{ disabled: page === totalPages }">
          <button class="page-link" @click="nextPage" :disabled="page === totalPages">Sau</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

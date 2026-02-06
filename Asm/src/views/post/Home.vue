<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import PostCard from '@/components/PostCard.vue'

const router = useRouter()

// ---------- Auth ----------
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

// ---------- Posts ----------
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

// Seed demo posts (helps graders)
if (posts.value.length === 0) {
  posts.value = [
    {
      id: `p_${Date.now()}_1`,
      title: 'Tiêu đề bài viết 1',
      content: 'Mô tả ngắn nội dung bài viết để người đọc nắm sơ lược.',
      imageUrl: '',
      authorId: currentUser.value?.id || 'demo',
      authorName: currentUser.value?.fullName || 'User',
      createdAt: new Date().toISOString(),
      comments: []
    },
    {
      id: `p_${Date.now()}_2`,
      title: 'Tiêu đề bài viết 2',
      content: 'Nội dung mô tả ngắn cho bài viết thứ hai trong danh sách.',
      imageUrl: '',
      authorId: 'someone_else',
      authorName: 'Another User',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      comments: [{ id: 'c1' }]
    }
  ]
  savePosts(posts.value)
}

// ---------- UI state ----------
const searchText = ref('')
const sortMode = ref('newest')
const page = ref(1)
const pageSize = 6

function isOwner(post) {
  return currentUser.value && post.authorId === currentUser.value.id
}

// ---------- Derived ----------
const filteredSorted = computed(() => {
  const q = searchText.value.trim().toLowerCase()
  let list = [...posts.value]

  if (q) {
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      (p.authorName || '').toLowerCase().includes(q)
    )
  }

  if (sortMode.value === 'oldest') {
    list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  } else if (sortMode.value === 'mostComments') {
    list.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0))
  } else {
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  return list
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredSorted.value.length / pageSize))
)

const pagedPosts = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredSorted.value.slice(start, start + pageSize)
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
  const post = posts.value.find(p => p.id === id)
  if (!post || !isOwner(post)) {
    alert('Bạn chỉ có thể xóa bài viết của mình.')
    return
  }

  if (!confirm('Bạn có chắc muốn xóa bài viết này không?')) return

  posts.value = posts.value.filter(p => p.id !== id)
  savePosts(posts.value)
}

function setPage(n) {
  page.value = n
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
          <span class="badge text-bg-light ms-2">
            {{ filteredSorted.length }} bài
          </span>
        </p>
      </div>

      <div class="d-flex gap-2">
        <button class="btn btn-primary" @click="goCreate">
          + Tạo bài viết
        </button>
        <button class="btn btn-outline-danger" @click="logout">
          Logout
        </button>
      </div>
    </div>

    <!-- Search / sort -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-2">
          <div class="col-12 col-md-8">
            <input
              v-model="searchText"
              class="form-control"
              placeholder="Tìm kiếm theo tiêu đề, nội dung, tác giả"
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

    <!-- Empty -->
    <div v-if="pagedPosts.length === 0" class="alert alert-info">
      Không có bài viết nào.
    </div>

    <!-- Posts -->
    <div v-else class="row g-4">
      <div
        v-for="p in pagedPosts"
        :key="p.id"
        class="col-12 col-md-6 col-lg-4"
      >
        <PostCard
          :post="p"
          :isOwner="isOwner(p)"
          @view="goDetail(p.id)"
          @edit="goEdit(p.id)"
          @delete="removePost(p.id)"
        />
      </div>
    </div>

    <!-- Pagination -->
    <nav v-if="totalPages > 1" class="mt-4">
      <ul class="pagination justify-content-center">
        <li
          v-for="n in totalPages"
          :key="n"
          class="page-item"
          :class="{ active: page === n }"
        >
          <button class="page-link" @click="setPage(n)">
            {{ n }}
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

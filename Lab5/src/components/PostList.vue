<script setup>
defineProps({
  posts: {
    type: Array,
    default: () => []
  }
})

const ChangeColor = () => {
  
}
</script>

<template>
  
  <div class="text-center">
    <h1 class="display-4 fw-semibold mb-4">Danh sách bài viết</h1>
      <button class="btn btn-primary px-4 py-2" @click="">
          Đổi màu bài viết
        </button>

    <div
      v-for="(post, index) in posts"
      :key="index"
      class="post-card mx-auto p-4 mb-4 text-start"
    >
      <h2 class="post-title text-center mb-2">{{ post.title }}</h2>
      <div class="post-author text-center mb-3">{{ post.author }}</div>

      <!-- ✅ content -->
      <p class="post-content mb-0">
        {{ post.content }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.post-card {
  max-width: 980px;
  border: 2px solid #d1d1d1;
  border-radius: 12px;
  background: #fff;
}

.post-title {
  color: #198754;
  font-weight: 700;
}

.post-author {
  color: #dc3545;
  font-weight: 500;
  font-size: 1.1rem;
}

.post-content {
  font-size: 1.05rem;
  line-height: 1.7;
}
</style>

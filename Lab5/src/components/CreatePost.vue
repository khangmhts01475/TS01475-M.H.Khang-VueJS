<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['add-post'])

const post = reactive({
  title: '',
  author: '',
  content: ''
})

const submitPost = () => {
  if (!post.title.trim() || !post.author.trim() || !post.content.trim()) return

  emit('add-post', { ...post })

  post.title = ''
  post.author = ''
  post.content = ''
}
</script>

<template>
  <div class="mb-5 text-center">
    <h1 class="display-4 fw-semibold mb-4">Tạo bài viết mới</h1>

    <div class="mx-auto form-wrap">
      <input
        v-model="post.title"
        class="form-control form-control-lg mb-3"
        placeholder="Tiêu đề bài viết"
      />

      <input
        v-model="post.author"
        class="form-control form-control-lg mb-3"
        placeholder="Tên tác giả"
      />

      <textarea
        v-model="post.content"
        class="form-control form-control-lg mb-3 w-100"
        rows="5"
        placeholder="Nội dung bài viết"
      ></textarea>

      <div class="d-flex justify-content-start">
        <button class="btn btn-primary px-4 py-2" @click="submitPost">
          Đăng bài
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-wrap {
  max-width: 900px; 
}
textarea {
  resize: vertical; 
}
</style>

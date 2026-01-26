<script setup>
import { ref } from 'vue'
import CreatePost from './components/CreatePost.vue'
import PostList from './components/PostList.vue'

const posts = ref([
  {
    title: 'Bật Mí 8 Nguyên Tắc Phối Màu Quần Áo Sành Điệu',
    author: 'Nguyễn Văn Tèo',
    content:
      'Bạn có thể phối áo màu xanh lá, quần màu kem và giày màu tím theo cách phối màu kiểu tam giác. Hoặc có thể phối các set đồ cùng ton lạnh hoặc nóng ...'
  }
])

const addPost = (post) => {
  posts.value.push(post)
}
</script>

<template>
  <div class="container mt-4">
    <CreatePost @add-post="addPost" />
    <PostList :posts="posts" />
  </div>
</template>

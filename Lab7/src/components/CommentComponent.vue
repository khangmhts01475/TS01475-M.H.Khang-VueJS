<template>
<div class="card p-3 overflow-hidden" style="max-width: 400px">

    <h4>Bình luận bài viết</h4>

<img
  :src="img1"
  class="img-fluid mb-3"
  style="width: 100%; object-fit: cover;"
/>


    <h5>8 loại rau củ quả giàu canxi</h5>
    <p>
      Canxi là khoáng chất cần thiết đối với cơ thể người. Có nhiều cách để
      bổ sung canxi, trong đó bổ sung qua đường ăn uống là cách tốt nhất.
      Có 8 loại rau củ giàu canxi...
    </p>

    <textarea
      class="form-control mb-2"
      rows="2"
      placeholder="Nhập bình luận của bạn"
      v-model="comment"
    ></textarea>

    <button class="btn btn-success mb-3" @click="send">
      Gửi bình luận
    </button>

    <h6>Danh sách các bình luận:</h6>
    <ul>
      <li v-for="(c, i) in comments" :key="i">
        <strong>{{ username }}:</strong> {{ c }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import img1 from '../assets/images/img1.jpg'

defineProps({
  username: String
})

const comment = ref('')
const comments = ref([])

const send = () => {
  if (comment.value) {
    comments.value.push(comment.value)
    comment.value = ''
  }
}
</script>

<!-- Bai3.vue -->
<script setup>
import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img3 from '../assets/img3.png'

const items = [
  {
    title: '8 loại rau củ quả giàu canxi',
    content:
      'Canxi là khoáng chất cần thiết đối với cơ thể người. Có nhiều cách để bổ sung canxi, trong đó bổ sung qua đường ăn uống là cách tốt nhất. Có 8 loại rau củ giàu canxi...',
    image: img1
  },
  {
    title: 'Các loại gia vị tốt cho sức khỏe',
    content:
      'Một số loại gia vị cung cấp nhiều polyphenol chống oxy hóa cao hơn các loại gia vị quen thuộc khác. Với một lượng nhỏ các món ăn đã thêm hương thơm và vị hấp dẫn...',
    image: img2
  },
  {
    title: '9 loại đậu bổ dưỡng nên dùng nhiều',
    content:
      'Đậu lăng, đậu nành, đậu phộng, đậu Hà Lan giàu chất xơ, protein cùng nhiều vitamin và khoáng chất giúp giảm lượng đường trong máu, tốt cho tim...',
    image: img3
  }
]

const viewDetail = (post) => {
  alert(`Bạn đã chọn: ${post.title}`)
}
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center">Kiến thức sức khỏe cộng đồng</h1>

    <div class="row">
      <div class="col-sm-4 mb-4" v-for="(item, index) in items" :key="index">
        <div class="card">
          <img :src="item.image" class="img-fluid" alt="Hình ảnh" />

          <div class="card-body">
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-text">{{ item.content }}</p>

            <button class="btn btn-info" @click="viewDetail(item)">Xem chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

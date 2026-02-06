<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  isOwner: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['view', 'edit', 'delete'])

function formatDate(iso) {
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}

const excerpt = computed(() => {
  const text = props.post.content || ''
  return text.length > 100 ? text.slice(0, 100) + '…' : text
})
</script>

<template>
  <div class="card h-100 shadow-sm">
    <img
      v-if="post.imageUrl"
      :src="post.imageUrl"
      class="card-img-top"
      alt="Post image"
      style="object-fit: cover; height: 160px;"
    />

    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ post.title }}</h5>

      <p class="card-text text-muted">
        {{ excerpt }}
      </p>

      <div class="mt-auto">
        <div class="d-flex justify-content-between align-items-center text-muted small mb-2">
          <span>Tác giả: {{ post.authorName || 'User' }}</span>
          <span>{{ formatDate(post.createdAt) }}</span>
        </div>

        <div class="d-flex gap-2">
          <button
            type="button"
            class="btn btn-outline-primary w-100"
            @click="emit('view')"
          >
            Xem chi tiết
          </button>

          <button
            type="button"
            class="btn btn-outline-secondary"
            :disabled="!isOwner"
            @click="emit('edit')"
          >
            Sửa
          </button>

          <button
            type="button"
            class="btn btn-outline-danger"
            :disabled="!isOwner"
            @click="emit('delete')"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

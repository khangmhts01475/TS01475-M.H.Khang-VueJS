<script setup>
const props = defineProps({
  comment: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})

function formatDateTime(iso) {
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  const hh = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  return `${dd}/${mm}/${yyyy} ${hh}:${mi}`
}
</script>

<template>
  <div class="border rounded p-3">
    <div class="d-flex justify-content-between align-items-start">
      <div>
        <strong>{{ comment.userName || 'User' }}</strong>
        <div class="text-muted small">
          {{ formatDateTime(comment.createdAt) }}
        </div>
      </div>
      <span class="badge text-bg-light text-muted">#{{ index + 1 }}</span>
    </div>

    <p class="mt-2 mb-0" style="white-space: pre-wrap;">
      {{ comment.content }}
    </p>
  </div>
</template>

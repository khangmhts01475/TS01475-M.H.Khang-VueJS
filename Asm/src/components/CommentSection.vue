<script setup>
import CommentItem from './CommentItem.vue'
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="mb-0">Bình luận</h4>
        <span class="badge text-bg-secondary">3</span>
      </div>

      <div class="alert alert-warning mb-4">
        Vui lòng đăng nhập để bình luận. (UI-only)
      </div>

      <!-- Comment form (disabled) -->
      <form class="mb-4">
        <div class="mb-3">
          <label class="form-label">Nội dung bình luận</label>
          <textarea
            class="form-control"
            rows="3"
            placeholder="Nhập bình luận..."
            disabled
          ></textarea>
        </div>

        <button type="button" class="btn btn-primary" disabled>
          Gửi bình luận
        </button>
      </form>

      <!-- Comment list -->
      <div class="d-flex flex-column gap-3">
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </div>
    </div>
  </div>
</template>

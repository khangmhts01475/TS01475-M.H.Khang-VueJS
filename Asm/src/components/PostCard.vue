<template>
  <div class="card h-100 shadow-sm">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">Tiêu đề bài viết</h5>

      <p class="card-text text-muted">
        Mô tả ngắn nội dung bài viết để người đọc nắm sơ lược.
      </p>

      <div class="mt-auto">
        <div class="d-flex justify-content-between align-items-center text-muted small mb-2">
          <span>Tác giả: User</span>
          <span>01/01/2026</span>
        </div>

        <div class="d-flex gap-2">
          <button type="button" class="btn btn-outline-primary w-100" disabled>
            Xem chi tiết
          </button>
          <button type="button" class="btn btn-outline-secondary" disabled>
            Sửa
          </button>
          <button type="button" class="btn btn-outline-danger" disabled>
            Xóa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

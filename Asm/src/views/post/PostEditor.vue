<template>
  <div class="container py-4">
    <!-- Header -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
      <div>
        <h2 class="mb-1">Soạn bài viết</h2>
        <p class="text-muted mb-0">Tạo mới hoặc chỉnh sửa bài viết (UI-only)</p>
      </div>

      <div class="d-flex gap-2">
        <button type="button" class="btn btn-outline-secondary" disabled>
          Hủy
        </button>
        <button type="button" class="btn btn-primary" disabled>
          Lưu bài viết
        </button>
      </div>
    </div>

    <!-- Editor form -->
    <div class="card shadow-sm">
      <div class="card-body">
        <form>
          <!-- Title -->
          <div class="mb-3">
            <label class="form-label">Tiêu đề</label>
            <input
              type="text"
              class="form-control"
              placeholder="Nhập tiêu đề bài viết"
              disabled
            />
          </div>

          <!-- Category (optional UI) -->
          <div class="mb-3">
            <label class="form-label">Chủ đề</label>
            <select class="form-select" disabled>
              <option selected>Chọn chủ đề</option>
              <option>Tổng hợp</option>
              <option>Công nghệ</option>
              <option>Đời sống</option>
              <option>Học tập</option>
            </select>
            <div class="form-text">Chủ đề giúp phân loại bài viết (tuỳ chọn).</div>
          </div>

          <!-- Image URL -->
          <div class="mb-3">
            <label class="form-label">Ảnh minh họa (tuỳ chọn)</label>
            <input
              type="url"
              class="form-control"
              placeholder="https://example.com/image.png"
              disabled
            />
          </div>

          <!-- Content -->
          <div class="mb-3">
            <label class="form-label">Nội dung</label>
            <textarea
              class="form-control"
              rows="10"
              placeholder="Nhập nội dung bài viết..."
              disabled
            ></textarea>
          </div>

          <!-- Status (optional UI) -->
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <label class="form-label">Trạng thái</label>
              <select class="form-select" disabled>
                <option selected>Bản nháp</option>
                <option>Công khai</option>
              </select>
            </div>

            <div class="col-12 col-md-6">
              <label class="form-label">Ghim bài viết</label>
              <div class="form-check mt-2">
                <input class="form-check-input" type="checkbox" disabled />
                <label class="form-check-label">
                  Ghim lên đầu trang
                </label>
              </div>
            </div>
          </div>

          <hr class="my-4" />

          <!-- Bottom actions -->
          <div class="d-flex flex-column flex-md-row gap-2 justify-content-end">
            <button type="button" class="btn btn-outline-danger" disabled>
              Xóa bài viết
            </button>
            <button type="button" class="btn btn-outline-secondary" disabled>
              Lưu bản nháp
            </button>
            <button type="button" class="btn btn-primary" disabled>
              Đăng bài
            </button>
          </div>

          <!-- Notice -->
          <div class="alert alert-info mt-4 mb-0">
            UI-only: Các nút và trường nhập hiện đang bị vô hiệu hóa. Sẽ kích hoạt sau khi thêm logic và authentication.
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

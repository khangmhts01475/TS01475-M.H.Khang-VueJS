<template>
  <div class="container py-4">
    <!-- Page header -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
      <div>
        <h2 class="mb-1">Trang chủ</h2>
        <p class="text-muted mb-0">Danh sách bài viết</p>
      </div>

      <!-- Create post (disabled for UI-only phase) -->
      <button type="button" class="btn btn-primary" disabled>
        + Tạo bài viết
      </button>
    </div>

    <!-- Search / filter shell -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-2">
          <div class="col-12 col-md-8">
            <input
              type="text"
              class="form-control"
              placeholder="Tìm kiếm theo tiêu đề"
              disabled
            />
          </div>
          <div class="col-12 col-md-4">
            <select class="form-select" disabled>
              <option selected>Lọc bài viết</option>
              <option>Mới nhất</option>
              <option>Cũ nhất</option>
              <option>Nhiều bình luận</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Posts grid -->
    <div class="row g-4">
      <!-- Post card -->
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">Tiêu đề bài viết 1</h5>
            <p class="card-text text-muted">
              Mô tả ngắn nội dung bài viết để người đọc có thể nắm sơ lược.
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
      </div>

      <!-- Post card -->
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">Tiêu đề bài viết 2</h5>
            <p class="card-text text-muted">
              Nội dung mô tả ngắn cho bài viết thứ hai trong danh sách.
            </p>

            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center text-muted small mb-2">
                <span>Tác giả: User</span>
                <span>02/01/2026</span>
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
      </div>

      <!-- Post card -->
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">Tiêu đề bài viết 3</h5>
            <p class="card-text text-muted">
              Thông tin mô tả ngắn cho bài viết thứ ba.
            </p>

            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center text-muted small mb-2">
                <span>Tác giả: User</span>
                <span>03/01/2026</span>
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
      </div>
    </div>

    <!-- Pagination shell -->
    <nav class="mt-4" aria-label="Phân trang">
      <ul class="pagination justify-content-center">
        <li class="page-item disabled">
          <span class="page-link">Trước</span>
        </li>
        <li class="page-item active">
          <span class="page-link">1</span>
        </li>
        <li class="page-item disabled">
          <span class="page-link">2</span>
        </li>
        <li class="page-item disabled">
          <span class="page-link">3</span>
        </li>
        <li class="page-item disabled">
          <span class="page-link">Sau</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

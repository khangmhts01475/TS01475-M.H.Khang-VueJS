<template>
  <div class="container py-4">
    <!-- Top actions -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
      <div>
        <h2 class="mb-1">Chi tiết bài viết</h2>
        <p class="text-muted mb-0">Xem nội dung và bình luận</p>
      </div>

      <div class="d-flex gap-2">
        <button type="button" class="btn btn-outline-secondary" disabled>
          Quay lại
        </button>
        <button type="button" class="btn btn-outline-primary" disabled>
          Sửa bài viết
        </button>
        <button type="button" class="btn btn-outline-danger" disabled>
          Xóa bài viết
        </button>
      </div>
    </div>

    <!-- Post content -->
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <h3 class="mb-2">Tiêu đề bài viết (mẫu)</h3>

        <div class="d-flex flex-wrap gap-3 text-muted small mb-3">
          <span><strong>Tác giả:</strong> User</span>
          <span><strong>Ngày đăng:</strong> 01/01/2026</span>
          <span><strong>Chủ đề:</strong> Tổng hợp</span>
        </div>

        <hr />

        <p class="mb-3">
          Đây là nội dung bài viết mẫu. Bạn có thể chia nội dung thành nhiều đoạn để thể hiện bố cục rõ ràng.
        </p>

        <p class="mb-3">
          Bài viết có thể bao gồm các nội dung như giới thiệu, phần thân bài, và kết luận. Trong giai đoạn UI-only,
          phần nội dung này chỉ là placeholder.
        </p>

        <p class="mb-0">
          Bạn cũng có thể thêm các thành phần khác như danh sách, trích dẫn hoặc hình ảnh minh họa sau này.
        </p>
      </div>
    </div>

    <!-- Comments -->
    <div class="card shadow-sm">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4 class="mb-0">Bình luận</h4>
          <span class="badge text-bg-secondary">3</span>
        </div>

        <!-- Notice (guest vs user hint) -->
        <div class="alert alert-warning mb-4">
          Vui lòng đăng nhập để bình luận. (UI-only: chức năng chưa hoạt động)
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
          <!-- Comment item 1 -->
          <div class="border rounded p-3">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <strong>User A</strong>
                <div class="text-muted small">01/01/2026 10:15</div>
              </div>
              <span class="badge text-bg-light text-muted">#1</span>
            </div>
            <p class="mt-2 mb-0">
              Đây là bình luận mẫu để minh họa giao diện hiển thị bình luận.
            </p>
          </div>

          <!-- Comment item 2 -->
          <div class="border rounded p-3">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <strong>User B</strong>
                <div class="text-muted small">01/01/2026 10:45</div>
              </div>
              <span class="badge text-bg-light text-muted">#2</span>
            </div>
            <p class="mt-2 mb-0">
              Nội dung bình luận thứ hai. Trong giai đoạn UI-only, dữ liệu sẽ được cố định.
            </p>
          </div>

          <!-- Comment item 3 -->
          <div class="border rounded p-3">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <strong>User C</strong>
                <div class="text-muted small">01/01/2026 11:05</div>
              </div>
              <span class="badge text-bg-light text-muted">#3</span>
            </div>
            <p class="mt-2 mb-0">
              Bình luận thứ ba để hoàn thiện bố cục danh sách bình luận.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

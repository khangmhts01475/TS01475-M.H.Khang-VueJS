<template>
  <div class="container py-4">
    <!-- Header -->
    <div class="mb-4">
      <h2 class="mb-1">Thông tin cá nhân</h2>
      <p class="text-muted mb-0">
        Xem và cập nhật thông tin tài khoản (UI-only)
      </p>
    </div>

    <div class="row g-4">
      <!-- Avatar section -->
      <div class="col-12 col-md-4">
        <div class="card shadow-sm h-100">
          <div class="card-body text-center">
            <div
              class="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center mx-auto mb-3"
              style="width: 140px; height: 140px;"
            >
              <span class="text-muted">Avatar</span>
            </div>

            <button type="button" class="btn btn-outline-secondary w-100" disabled>
              Thay đổi ảnh đại diện
            </button>

            <p class="text-muted small mt-3 mb-0">
              UI-only: Chức năng tải ảnh sẽ được bổ sung sau
            </p>
          </div>
        </div>
      </div>

      <!-- Profile form -->
      <div class="col-12 col-md-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <form>
              <!-- Full name -->
              <div class="mb-3">
                <label class="form-label">Họ và tên</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập họ và tên"
                  disabled
                />
              </div>

              <!-- Email -->
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="ten@example.com"
                  disabled
                />
              </div>

              <!-- Password -->
              <div class="mb-3">
                <label class="form-label">Mật khẩu mới</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Nhập mật khẩu mới"
                  disabled
                />
              </div>

              <!-- Confirm password -->
              <div class="mb-3">
                <label class="form-label">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Nhập lại mật khẩu"
                  disabled
                />
              </div>

              <!-- Actions -->
              <div class="d-flex flex-column flex-md-row gap-2 justify-content-end mt-4">
                <button type="button" class="btn btn-outline-secondary" disabled>
                  Hủy thay đổi
                </button>
                <button type="button" class="btn btn-primary" disabled>
                  Cập nhật thông tin
                </button>
              </div>

             
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

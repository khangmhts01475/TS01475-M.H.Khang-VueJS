<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
    <div class="container">
      <span class="navbar-brand fw-semibold">Blog App</span>

      <button
        class="navbar-toggler"
        type="button"
        disabled
        aria-label="Toggle navigation"
        title="UI-only"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse show">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="#" aria-disabled="true">Trang chủ</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" aria-disabled="true">Bài viết</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" aria-disabled="true">Hồ sơ</a>
          </li>
        </ul>

        <div class="d-flex gap-2">
          <button type="button" class="btn btn-outline-primary" disabled>
            Đăng nhập
          </button>
          <button type="button" class="btn btn-primary" disabled>
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

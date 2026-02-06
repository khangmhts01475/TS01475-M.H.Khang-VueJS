<template>
  <div class="card h-100">
    <img
      v-if="post.imageUrl"
      :src="post.imageUrl"
      class="card-img-top"
      alt="Ảnh bài viết"
    />

    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ post.title }}</h5>

      <p class="card-text text-muted mb-2">
        Tác giả: {{ post.authorName || "Người dùng" }}
      </p>

      <p class="card-text">
        {{ shortContent }}
      </p>

      <div class="mt-auto d-flex gap-2">
        <button class="btn btn-sm btn-primary" @click="$emit('view')">
          Xem chi tiết
        </button>

        <button
          v-if="isOwner"
          class="btn btn-sm btn-warning"
          @click="$emit('edit')"
        >
          Sửa
        </button>

        <button
          v-if="isOwner"
          class="btn btn-sm btn-danger"
          @click="$emit('delete')"
        >
          Xoá
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCard",

  props: {
    post: {
      type: Object,
      required: true
    },
    isOwner: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    shortContent() {
      if (!this.post.content) return "";
      return this.post.content.length > 100
        ? this.post.content.slice(0, 100) + "..."
        : this.post.content;
    }
  }
};
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-3">Danh sách bài viết</h2>

    <div v-if="posts.length === 0" class="alert alert-info">
      Chưa có bài viết nào.
    </div>

    <div class="row">
      <div
        class="col-md-4 mb-3"
        v-for="post in posts"
        :key="post.id"
      >
        <PostCard
          :post="post"
          :isOwner="isOwner(post)"
          @view="viewPost(post)"
          @edit="editPost(post)"
          @delete="deletePost(post)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";

export default {
  name: "Home",
  components: { PostCard },

  data() {
    return {
      posts: [],
      currentUser: null
    };
  },

  created() {
    this.loadUser();
    this.loadPosts();
  },

  methods: {
    loadUser() {
      const raw = localStorage.getItem("currentUser");
      this.currentUser = raw ? JSON.parse(raw) : null;
    },

    loadPosts() {
      const raw = localStorage.getItem("posts");
      this.posts = raw ? JSON.parse(raw) : [];
    },

    isOwner(post) {
      if (!this.currentUser) return false;

      return (
        post.authorId === this.currentUser.id ||
        post.authorName === this.currentUser.fullName
      );
    },

    viewPost(post) {
      this.$router.push(`/post/${post.id}`);
    },

    editPost(post) {
      if (!this.isOwner(post)) {
        alert("Bạn không có quyền chỉnh sửa bài viết này.");
        return;
      }
      this.$router.push(`/post/${post.id}/edit`);
    },

    deletePost(post) {
      if (!this.isOwner(post)) {
        alert("Bạn không có quyền xoá bài viết này.");
        return;
      }

      if (!confirm("Bạn có chắc chắn muốn xoá bài viết này không?")) return;

      this.posts = this.posts.filter(p => p.id !== post.id);
      localStorage.setItem("posts", JSON.stringify(this.posts));
    }
  }
};
</script>

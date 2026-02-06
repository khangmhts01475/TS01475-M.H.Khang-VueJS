<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <h2>Blog Post {{ route.params.id }}</h2>
</template>

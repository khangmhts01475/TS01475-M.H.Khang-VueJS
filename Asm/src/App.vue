<template>
  <!-- Navbar hidden on auth pages -->
  <Navbar v-if="showNavbar" />

  <router-view />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

const route = useRoute()

// Hide navbar on login & register pages
const showNavbar = computed(() => {
  return !['/login', '/register'].includes(route.path)
})
</script>

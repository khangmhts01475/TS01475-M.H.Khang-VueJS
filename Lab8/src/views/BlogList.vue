<template>
  <h2>Blog List</h2>
  <ul>
    <li v-for="id in 3" :key="id">
      <RouterLink :to="`/blog/${id}`">Blog {{ id }}</RouterLink>
    </li>
  </ul>
</template>

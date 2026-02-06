<template>
  <nav class="navbar navbar-expand navbar-light bg-light px-3">
    <RouterLink class="nav-link" to="/">Home</RouterLink>
    <RouterLink class="nav-link" to="/blogs">Blogs</RouterLink>
    <RouterLink class="nav-link" to="/dashboard">Dashboard</RouterLink>
    <RouterLink class="nav-link" to="/profile/info">Profile</RouterLink>
  </nav>

  <div class="container mt-4">
    <RouterView />
  </div>
</template>

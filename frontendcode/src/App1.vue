<!-- App.vue -->
<template>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">about</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script setup>
import { useRouter, useRoute } from './router3.js'

const router = useRouter()
const route = useRoute()

console.log(route.path) // 当前路径
</script>

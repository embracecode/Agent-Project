<template>
  <router-view></router-view>
</template>


<script setup lang="ts">
</script>



<style>
@import '@/assets/font/font.css';
.text-show {
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.van-uploader__input-wrapper {
  display: flex !important;
}
</style>

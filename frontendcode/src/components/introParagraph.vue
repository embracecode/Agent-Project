<template>
    <div class="main-header">
        <div>
            <p class="name-field">Hi, 我是Agent旅游智能体</p>
            <p class="intro-section">你的专属旅游助手， 可以帮您规划行程和解答出游问题哦！</p>
        </div>
        <div>
            <img src="@/assets/banner.jpeg" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.main-header {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 30px 0;
    img {
        width: 100%;
        object-fit: fill;
    }
    .name-field {
        font-size: 18px;
        color: palevioletred;
        font-family: "customFont";
    }
    .intro-section {
        font-weight: 600;
        line-height: 2;
        font-size: 16px;
    }
}
</style>
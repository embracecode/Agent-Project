<template>
    <div class="circle-container">
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.circle-container {
    display: flex;
    align-items: center;
    .circle {
        width: 7px;
        height: 7px;
        border-radius: 50px;
        background-color: #777a8d;
        margin: 0 4px;
        animation: colorChange 1s linear infinite;
    }
    .circle:nth-child(1) {
        animation-delay: 0s;
    }
    .circle:nth-child(2) {
        animation-delay: 0.33s;
    }
    .circle:nth-child(3) {
        animation-delay: 0.67s;
    }
    @keyframes colorChange {
        0% {
            background-color: #ffcc00;
        }
        33.33% {
            background-color: #ffcc00;
        }
        66.67% {
            background-color: #ffcc00;
        }
    }
}
</style>
<template>
    <van-nav-bar title="商品详情" fixed left-arrow placeholder></van-nav-bar>
    <img class="cover-image" src="@/assets/banner.jpeg" alt="">
    <div class="price-and-title">
        <p class="goods-price">￥199/人</p>
        <p class="goods-title">标题标题标题标题标题标题</p>
    </div>
    <div class="goods-details">
        <p class="goods-describe">产品特色</p>
        <img src="https://img0.baidu.com/it/u=1390845783,2336660791&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=652" alt="">
        <img src="https://img2.baidu.com/it/u=3399610971,3751382337&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889" alt="">
        <img src="https://img2.baidu.com/it/u=3225515393,2546144828&fm=253&fmt=auto?w=800&h=1200" alt="">
    </div>
    <div class="submit">
        <van-button type="primary" block>立即报名</van-button>
    </div>
    <div style="height: 100px;"></div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.cover-image {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
}
.price-and-title {
    background-color: #fff;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    .goods-price {
        font-size: 22px;
        color: red;
        padding-bottom: 10px;
    }
    .goods-title {
        font-size: 19px;
    }
}
.goods-details {
    background-color: #fff;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    .goods-describe {
        font-weight: 600;
        padding-bottom: 10px;
    }
    img {
        width: 100%;
    }
}
.submit {
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px 20px 20px 20px;
}
</style>
<template>
    <div class="goods-content">
        <p class="title">为你推荐以下相关的旅行套餐，官方严选：</p>
        <div class="goods-list">
            <div class="goods-item">
                <img src="@/assets/banner.jpeg" alt="">
                <p class="goods-title text-show">商品标题商品标题商品标题商品标题商品标题商品标题</p>
                <p class="goods-price">￥123</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.goods-content {
    background-color: #fff;
    border-radius: 4px;
    padding: 7px;
    .title {
        color: darkorchid;
        font-weight: 600;
    }
    .goods-list{
        overflow-x: auto;
        display: flex;
        gap: 7px;
        padding-top: 7px;
        .goods-item {
            width: 130px;
            background: #f3f3f3;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            flex-shrink: 0;  // 空间不足不会缩小
            img {
                width: 100%;
                height: 140px;
                object-fit: cover;
                border-radius: 4px;
            }
            .goods-title {
                font-size: 15px;
                font-weight: 600;
                line-height: 1.4;
                margin: 6px;
            }
            .goods-price {
                padding: 0 6px 6px 6px;
                color: red;
                font-weight: 600;
                margin-top: auto;
            }
        }
    }
}
</style>
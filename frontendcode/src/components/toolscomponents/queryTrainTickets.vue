<template>
    <div class="result-item">
        <div>
            <p class="query-time">9:00</p>
            <p class="station-name">昆山南</p>
        </div>
        <div class="train-run-number">
            <p>2小时5分</p>
            <p>D8546</p>
        </div>
        <div>
            <p class="query-time">9:00</p>
            <p class="station-name">昆山南</p>
        </div>
        <div>
            <p class="product-price">￥100</p>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.result-item {
    margin-top: 4px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 7px 0;
    border-top: 1px solid #f6f8fa;
    .query-time {
        font-weight: 600;
        font-size: 17px;
    }
    .station-name {
        font-weight: 600;
        font-size: 14px;
    }
    .train-run-number {
        p {
            font-size: 13px;
            color: #666697;
        }
    }
    .product-price {
        font-size: 17px;
        font-weight: 600;
        color: #006ff6;
    }
}
</style>
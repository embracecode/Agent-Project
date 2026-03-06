<template>
    <div class="weather-content">
        <div class="weather-item">
            <div class="day-time">11/09</div>
            <div class="day-weather">
                <img src="@/assets/cart.jpeg" alt="">
                <p>晴</p>
            </div>
            <div class="day-temperature">
                6~10°C
            </div>
        </div>
        <div class="weather-item">
            <div class="day-time">11/09</div>
            <div class="day-weather">
                <img src="@/assets/cart.jpeg" alt="">
                <p>多云</p>
            </div>
            <div class="day-temperature">
                6~10°C
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.weather-content {
    margin-top: 4px;
    background: linear-gradient(to bottom left, #2c305b, #6b6f91);
    color: #fff;
    border-radius: 4px;
    .weather-item {
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 15px;
        padding: 7px 0;
        .day-time {
            flex: 1;
            text-align: center;
        }
        .day-weather {
            flex: 1;
            display: flex;
            align-items: center;
            p {
                font-size: 13px;
                margin-left: 5px;
            }
            img {
                width: 30px;
                height: 30px;
            }
        }
        .day-temperature {
            flex: 1;
            text-align: center;
        }
    }
}
</style>
<template>
    <van-nav-bar title="投诉" fixed left-arrow placeholder></van-nav-bar>
    <div class="complaint-page">
        <p class="title-text">你要投诉谁</p>
        <van-field 
            is-link
            readonly
            placeholder="选择投诉对象"
            @click="showPicker = true"
        ></van-field>
        <van-popup :show="showPicker" round position="bottom">
            <van-picker :columns="columns"
                @confirm="showPicker = false">
            </van-picker>
        </van-popup>
    </div>
    <div class="complaint-page">
        <p class="title-text">请告诉我们发生了什么事</p>
        <van-field class="input-content" type="textarea" placeholder="输入投诉原因"></van-field>
    </div>
    <div class="complaint-page">
        <p class="title-text">事件发生在哪里</p>
        <van-field 
            is-link
            readonly
            placeholder="选择地区"
            @click="showCityPicker = true"
        ></van-field>
        <van-popup :show="showCityPicker" round position="bottom">
            <van-picker :columns="cityList"
                @confirm="showCityPicker = false">
            </van-picker>
        </van-popup>
    </div>
    <div class="complaint-page">
        <p class="title-text">你的诉求是</p>
        <van-field class="input-content" type="textarea" placeholder="点击输入处理诉求"></van-field>
    </div>
    <div class="complaint-page">
        <p class="title-text">最后，我需要了解您的个人信息， 用于核实事件以及后续对您反馈</p>
        <van-field label="你的姓名"  placeholder="点击输入姓名"></van-field>
        <van-field label="你的联系方式" type="tel"  placeholder="点击输入联系方式"></van-field>
        <van-field 
            is-link
            readonly
            placeholder="你在云南是如何履行的"
            @click="showTravePicker = true"
        ></van-field>
        <van-popup :show="showTravePicker" round position="bottom">
            <van-picker :columns="traveData"
                @confirm="showTravePicker = false">
            </van-picker>
        </van-popup>
    </div>
    <van-button class="submit-button" type="primary">提交投诉单</van-button>
    <div style="height: 150px;"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { cityData } from '../../config/city'
const columns = ref([{
    text: '投诉旅行社', value: '001',
}, {
    text: '投诉导游', value: '002',
}, {
    text: '投诉酒店', value: '003',
}, {
    text: '投诉景点', value: '004',
}]);

const showPicker = ref(false);

const cityList = ref(cityData)

const showCityPicker = ref(false);

const showTravePicker = ref(false);

const traveData = ref([{
    text: '自由行', value: '001',
}, {
    text: '跟团行', value: '002',
}])

</script>

<style scoped lang="scss">
.complaint-page {
    padding: 10px;
    .title-text {
        padding-bottom: 10px;
        font-weight: 600;
    }
    .input-content {
        background-color: #f8f9fd;
        border-radius: 10px;
        padding: 6px;
    }
}
.submit-button {
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: 10px;
}
</style>
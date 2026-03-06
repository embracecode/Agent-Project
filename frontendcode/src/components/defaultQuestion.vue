<template>
    <div class="support-agent">
        <img src="@/assets/yangtuo.jpeg" alt="">
        <p>Agent</p>
    </div>
    <div class="custom-service">
        <span class="tips">你可以这样问我</span>
        <div class="custom-service-list" v-for="item in questionList" :key="item.id" @click="handleResult(item.question)">
            <img src="@/assets/question.jpg" alt="">
            <p>{{ item.question }}</p>
        </div>
    </div>
    <div class="transform">
        换一换
    </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['selectQuestion']);
const questionList = [
    {
        question: '云南有什么好玩的地方？',
        id: 1
    },
    {
        question: '云南有什么特色美食？',
        id: 2
    },
]
const handleResult = (question: string) => {
    console.log(question);
    emit('selectQuestion', question);
}

</script>

<style scoped lang="scss">
.support-agent {
    display: flex;
    align-items: center;
    img {
        object-fit: fill;
        width: 35px;
        height: 35px;
        margin-right: 8px;
        background-color: #fff;
        border-radius: 50%;
    }
    p{
        font-size: 14px;
    }
}
.custom-service {
    background-color: #fff;
    margin: 10px 0;
    padding: 10px 10px;
    border-radius: 10px;
    border-top-left-radius: 0;
    .tips {
        font-size: 16px;
    }
    .custom-service-list {
        display: flex;
        align-items: center;
        border: 1px solid #f2f4ff;
        border-radius: 40px;
        margin-top: 10px;
        padding: 5px 7px;
        img {
            object-fit: fill;
            width: 25px;
            height: 25px;
            margin-right: 8px;
        }
        p {
            font-size: 14px;
        }
    }
}
.transform {
    background-color: #a8abb0;
    display: inline-flex;
    padding: 4px 7px;
    border-radius: 40px;
    font-size: 14px;
    opacity: .5;
    color: #f2f4ff;
}
</style>
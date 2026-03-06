<template>
    <div class="chat-message-wrap">
        <div class="chat-message" v-for="value in messageList">
            <div class="user-meassage" v-show="value.role === 'user' && value.content">
                <p>{{value.content}}</p>
            </div>
            <!-- 大模型回复 -->
            <div class="ai-message" v-show="value.role === 'system' && value.content">
                <div class="mark-text">
                    <markdownComponent :content="value.content"></markdownComponent>
                </div>
            </div>
        </div>
        <div ref="smooth-container"></div>
    </div>
    
    <InputArea :question="question" @childEvent="handleResult"></InputArea>
</template>

<script setup lang="ts">
//loading
import markdownComponent from './toolscomponents/markdownComponent.vue';
import type { MessageType } from '../utils';
import InputArea from './inputArea.vue';

import { ref, useTemplateRef, watch, nextTick } from 'vue';
const props = defineProps<{
    question: string
}>();
const messageList = ref<MessageType[]>([]);
const smoothContainer = useTemplateRef('smooth-container');
const handleResult = (data: any) => {
    messageList.value = data;
}

watch(messageList, async (list) => {
    // 等待 DOM 更新完毕
    await nextTick();
    const last = list[list.length - 1];
    if (last && last.role === 'system' && smoothContainer.value) {
        smoothContainer.value.scrollIntoView({ behavior: 'smooth' });
    }
}, { deep: true });
</script>

<style scoped lang="scss">
.chat-message-wrap {
    margin-bottom: 130px;
    max-height: calc(100vh - 120px); /* 或其他合适高度 */
    overflow-y: auto;               /* 让它成为滚动容器 */
}
.chat-message {
    display: flex;
    flex-direction: column;
    .user-meassage {
        margin-top: 15px;
        max-width: 70%;
        align-self: flex-end;
        opacity: 0;
        transform: translateY(20px);
        animation: fadeUp 0.2s ease-in-out forwards;
        p {
            font-size: 16px;
            line-height: 1.5;
            background-color: #3a71e8;
            border-radius: 10px;
            border-top-right-radius: 0;
            color: #fff;
            padding: 5px;
        }
    }
    @keyframes fadeUp {
        0% {
            opacity: 0;
            transform: translateY(20px)
        }
        100% {
            opacity: 1;
            transform: translateY(0)
        }
    }
    .send-iamge {
        display: flex;
        flex-direction: column;
        transform: translateY(20px);
        animation: fadeUp 0.2s ease-in-out forwards;
        .van-image {
            align-self: flex-end;
            margin-top: 4px;
        }
    }
    .ai-message {
        margin-top: 15px;
        align-self: flex-start;
        .mark-text {
            font-size: 16px;
            line-height: 1.5;
            background-color: #fff;
            border-radius: 10px;
            border-top-left-radius: 0;
            color: #333;
            padding: 5px;
        }
    }
}

</style>
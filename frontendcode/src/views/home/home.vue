<template>
    <div class="content">
        <!-- 顶部区域 -->
        <IntroParagraph></IntroParagraph>
        <!-- 默认问题 -->
        <DefaultQuestion @selectQuestion="handleSelectQuestion"></DefaultQuestion>
        <!-- 对话组件 -->
        <ChatMessage :question="quesiton"></ChatMessage>
        <!-- 底部输入框 -->
        <!-- <InputArea></InputArea> -->
    </div>
</template>

<script setup lang="ts">
import IntroParagraph from '@/components/introParagraph.vue';
import DefaultQuestion from '@/components/defaultQuestion.vue';
import ChatMessage from '../../components/chatMessage.vue';
import InputArea from '../../components/inputArea.vue';
import { ref } from 'vue';

const quesiton = ref<string>('');
const handleSelectQuestion = (question: string) => {
    quesiton.value = question;
}
</script>

<style scoped lang="scss">
.content {
    padding: 0 15px;
}
</style>
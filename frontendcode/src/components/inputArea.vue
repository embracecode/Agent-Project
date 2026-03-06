<template>
    <div class="input-content">
        <!-- 图片上传展示 -->
        <van-uploader v-if="false" v-model="fileList" 
        :max-count="1" :preview-size="60"
        :disabled="true"></van-uploader>
        <div class="data-query" v-if="false">
            <van-button size="small" type="default">查询火车票</van-button>
            <van-button size="small" type="default">查询天气</van-button>
            <van-uploader>
                <van-button size="small" type="default">图片问答</van-button>
            </van-uploader>
            <van-button size="small" type="default">一键投诉</van-button>
        </div>
        <div class="input-box-area">
            <img src="@/assets/clear.png" @click="clearMessage" alt="">
            <van-field class="input-message" type="textarea"
            placeholder="请输入内容"
            v-model="sendValue"
            :border="false"
            ></van-field>
            <van-button class="send-button" size="small" type="default" @click="sendMessage">发送</van-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { streamChat } from '../utils';
import type { MessageType } from '../utils';
import { ref, watch } from 'vue';
const emit = defineEmits<{
  (e: 'childEvent', data: MessageType[],): void,
  (e: 'complete', data: boolean): void
}>()

const props = defineProps<{
    question: string
}>();
const fileList = ref([{
    url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
}]);
type MessageTypes = MessageType[]

watch(props, () => {
    messages.value.push({ role: 'user', content: props.question });
    handleSend();
})

const isStreaming = ref(false);
const currentReply = ref('');
const messages = ref<MessageTypes>([]);
const sendValue = ref('');
const clearMessage = () => {
    sendValue.value = '';
    messages.value.length ? messages.value.pop() : '';
}
const sendMessage = () => {
    messages.value.push({ role: 'user', content: sendValue.value });
    handleSend();
    sendValue.value = '';
}

const handleSend = async () => {
  isStreaming.value = true;
  currentReply.value = '';
  messages.value.push({ role: 'system', content: '' });
  try {
    await streamChat(
      messages.value,
      (chunk, done) => {
        currentReply.value += chunk;
        // 更新最后一条消息的内容
        (messages.value[messages.value.length - 1] as MessageType).content = currentReply.value;
        emit('childEvent', messages.value);
      },
      (fullText, error) => {
        isStreaming.value = false;
        emit('complete', true);
        if (error) alert('出错了：' + error.message);
      }
    );
  } catch (e) {
    isStreaming.value = false;
  }
};

</script>

<style scoped lang="scss">
.input-content {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    :deep(.van-uploader__wrapper--disabled) {
        opacity: inherit;
        margin-left: 15px;
        .van-uploader__preview {
            background-color: #fff;
        }
    }
    .data-query {
        display: flex;
        align-items: center;
        .van-button {
            margin-left: 15px;
            margin-bottom: 5px;
        }
    }
    .input-box-area {
        background-color: #fff;
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        padding-top: 5px;
        img {
            width: 27px;
            height: 27px;
            margin: 0 10px;
        }
        .input-message {
            background-color: #f8f9fd;
            flex: 1;
            border-radius: 10px;
            padding: 6px;
        }
        .send-button {
            border: none;
            color: #409eff;
            font-size: 15px;
            font-weight: 600;
            margin: 0 5px;
        }
    }
}
</style>
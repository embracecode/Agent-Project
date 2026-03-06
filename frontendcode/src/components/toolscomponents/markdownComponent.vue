<!-- src/components/MarkdownView.vue -->
<template>
  <div 
    class="markdown-body" 
    v-html="renderedContent"
  ></div>
</template>

<script setup>
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';

// 定义 props
const props = defineProps({
  content: {
    type: String,
    default: ''
  }
});

// 初始化 markdown-it 实例
// html: true 允许嵌入 HTML 标签（如果需要）
// linkify: true 自动将 URL 转换为链接
// typographer: true 启用排版优化（如引号转换）
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true // 允许单个换行符变为 <br>
});

// 计算属性：实时解析 Markdown
const renderedContent = computed(() => {
  if (!props.content) return '';
  return md.render(props.content);
});
</script>

<style scoped>
/* 基础容器样式 */
.markdown-body {
  font-family: "customFont";
  font-size: 15px;
  line-height: 1.6;
  color: #333;
  word-wrap: break-word;
}

/* 表格样式核心代码 */
.markdown-body table {
  width: 100%;
  margin: 16px 0;
  border-collapse: collapse;
  display: block; /* 关键：允许表格在容器内滚动 */
  overflow-x: auto; /* 开启横向滚动 */
  white-space: nowrap; /* 防止单元格内容换行导致表格过窄 */
}

.markdown-body th,
.markdown-body td {
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  text-align: left;
}

.markdown-body th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #1f2937;
}

.markdown-body tr:nth-child(even) {
  background-color: #f3f4f6;
}

.markdown-body tr:hover {
  background-color: #eff6ff;
}

/* 其他常用元素样式优化 */
.markdown-body h3 {
  margin-top: 0;
  margin-bottom: 12px;
  color: #111827;
  font-size: 1.25rem;
}

.markdown-body strong {
  color: #d946ef; /* 高亮加粗文字，比如车次号 */
  font-weight: 700;
}

.markdown-body blockquote {
  border-left: 4px solid #d1d5db;
  padding-left: 12px;
  color: #6b7280;
  margin: 12px 0;
  background-color: #f9fafb;
  padding: 8px 12px;
  border-radius: 0 4px 4px 0;
}
</style>
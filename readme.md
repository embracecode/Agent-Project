# 云游宝智能助手项目

本项目是一个集成了 AI 聊天、工具调用、图片理解、火车票/天气查询等功能的智能助手系统，包含前后端完整代码。前端基于 Vue3/Vite，后端基于 Koa。

---

## 📦 目录结构

```
llmproject/
├── backendcode/      # 后端服务（Koa，AI、工具、接口等）
├── frontendcode/     # 前端应用（Vue3 + Vite + TypeScript）
├── routers_explanation.md # 路由实现说明
└── readme.md         # 项目说明（当前文件）
```

---

## 🚀 快速启动

### 1. 后端服务

```bash
cd backendcode
npm install
npm run dev
```
默认监听 3001 端口。

> ⚠️ 需在 `backendcode/config/` 下创建 `default.js`，参考 `backendcode/README.md` 示例，填写自己的 API Key。

### 2. 前端应用

```bash
cd frontendcode
npm install
npm run dev
```
默认访问 http://localhost:3000

---

## 🧩 主要功能
- 智能聊天（AI 大模型）
- 云南旅游攻略/景点/美食推荐
- 全国火车票实时查询
- 天气查询
- 图片理解与分析
- 一键投诉建议
- 多种工具组件（如 Markdown 渲染、商品搜索等）

---

## 🗂️ 重要文件说明

### 后端 backendcode/
- `app.js`         ：Koa 启动入口
- `controller/`    ：聊天、用户、图片等接口
- `config/`        ：配置与工具函数
- `utils/`         ：通用工具
- `validate/`      ：参数校验

### 前端 frontendcode/
- `src/components/`：聊天、输入、工具等 Vue 组件
- `src/views/`     ：首页、商品、投诉等页面
- `src/router/`    ：主路由配置（index.ts）
- `src/router2.js` ：自定义 Vue2 路由实现（学习/演示用）
- `src/router3.js` ：自定义 Vue3 路由实现（学习/演示用）
- `src/utils/`     ：消息处理、工具函数

---

## 📚 router2.js 和 router3.js 作用

详见 `routers_explanation.md`，简要说明如下：
- `router2.js`：演示如何用原生 JS 实现 Vue2 路由机制（选项式 API、mixin、hash/history 模式、全局组件等）。
- `router3.js`：演示如何用 Composition API 实现 Vue3 路由（响应式、依赖注入、全局组件、hash/history 模式等）。

二者均为自定义实现，便于理解路由原理，非生产环境主路由。

---

## 📝 其他说明
- 前后端均有独立 README.md，详细介绍各自用法与结构。
- 敏感配置（如 API Key）请勿提交到仓库。
- 如需扩展功能，建议优先参考官方 Vue Router、Koa 文档。

---

## 📮 联系与反馈
如有问题或建议，欢迎 issue 或邮件联系作者。

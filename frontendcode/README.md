# Vue 3 + TypeScript + Vite

本仓库包含一个更大项目的**前端**部分，基于 Vue 3、TypeScript 和 Vite 构建。应用提供了一个聊天界面，内置多个工具组件，并包含首页、商品、投诉等不同模块的视图，同时拥有结构化的工具函数与配置。

## 📁 项目结构

```text
frontendcode/
├── public/             # 静态资源
├── src/
│   ├── assets/         # 字体和媒体文件
│   ├── components/     # 可复用的 Vue 组件
│   │   ├── toolscomponents/ # 工具专用组件（搜索、天气、Markdown 等）
│   ├── config/         # 配置文件（城市等）
│   ├── router/         # Vue 路由配置
│   ├── utils/          # 帮助函数和处理器
│   └── views/          # 按功能组织的视图组件
├── index.html
├── package.json
├── tsconfig.*.json     # TypeScript 配置
└── vite.config.ts      # Vite 配置
```

## 🚀 快速开始

1. **安装依赖**
   ```bash
   npm install
   # 或
   yarn install
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```
   默认情况下，应用将在 `http://localhost:3000` 可访问。

3. **构建生产版本**
   ```bash
   npm run build
   ```

4. **预览生产构建**
   ```bash
   npm run preview
   ```

## 🧩 功能亮点

- 聊天界面，支持消息处理
- 多种工具组件：天气查询、商品搜索、火车票查询、Markdown 渲染
- 多个视图页：首页、商品、投诉
- 强类型的 TypeScript 支持
- 基于 Vite 的快速构建与热重载

## 🛠️ 开发说明

- 组件位于 `src/components`，大多数为单文件 Vue 组件（`.vue`）。
- 工具相关组件在 `src/components/toolscomponents` 下。
- 路由定义在 `src/router/index.ts`。
- 新的配置值请放在 `src/config` 中。
- 工具函数放在 `src/utils`。

## 📦 依赖

依赖通过 `package.json` 管理。主要依赖包括：

- `vue` / `@vue/runtime-dom`
- `vue-router`
- `vite`
- TypeScript

详细列表请参见 `package.json`。

## 📄 许可证

在此处指定许可证（例如：MIT）。

---

*此 README 文件根据当前项目结构自动生成。*



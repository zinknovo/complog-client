<h1 align="center">CompLog Client</h1>
<p align="center">CompLog 微服务系统的前端</p>
<div align="center">简体中文 | <a href="./README.md">English</a></div>

## 项目简介

这是 CompLog 的前端项目，已对接当前后端接口。

主要功能：

- 登录（auth-service）
- 用户管理（base-service）
- 部门管理（base-service）
- 制度管理与修订（policy-service）
- 仪表盘统计

## 技术栈

Vue3 + TypeScript + Vite + Element Plus + Tailwind CSS

## 本地开发

### 1. 安装依赖

```bash
pnpm install
# 或
npm install
```

### 2. 环境变量

开发环境通过 Vite 代理，不设置固定 base URL：

```
VITE_API_URL=
VITE_API_PROXY_URL=http://localhost:8080
VITE_PORT=5173
```

### 3. 启动后端服务

- `base-service`: http://localhost:8080
- `auth-service`: http://localhost:8081
- `policy-service`: http://localhost:8082

### 4. 启动前端

```bash
pnpm dev
# 或
npm run dev
```

打开：http://localhost:5173

## API 代理

`vite.config.ts` 已配置：

- `/api/auth` -> `http://localhost:8081`
- `/users`, `/departments` -> `http://localhost:8080`
- `/policies` -> `http://localhost:8082`

## 测试账号

默认账号（手机号 / 密码）：

- 13800138000 / 123456
- 13800138001 / 123456
- 13800138002 / 123456

## 许可证声明

本项目基于 `art-design-pro`（MIT License）。

- 原作者：Daymychen（art-design-pro）。
- 已保留原作者版权与许可证文本，见 `LICENSE`
- MIT 许可证允许商用，但需保留版权与许可证声明

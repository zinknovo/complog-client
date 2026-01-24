# Complog Client 本地开发指南

简体中文 | [English](./README_LOCAL_SETUP.md)

## 🎯 项目说明

这是 Complog 项目的前端部分，基于 art-design-pro 模板，已适配后端接口。

---

## 🚀 快速开始

### 1. 安装依赖

```bash
cd complog-client
pnpm install
```

### 2. 配置环境变量

已创建 `.env.development` 文件，开发环境通过 Vite 代理访问后端：

```
VITE_API_URL=
VITE_API_PROXY_URL=http://localhost:8080
VITE_PORT=5173
```

### 3. 启动后端服务

确保后端服务正在运行：

```bash
# base-service 运行在 http://localhost:8080
# auth-service 运行在 http://localhost:8081
# policy-service 运行在 http://localhost:8082
```

### 4. 启动前端

```bash
pnpm dev
```

前端会运行在 `http://localhost:5173`

---

## 📋 API 接口映射

### 已适配的接口

| 前端调用               | 后端接口               | 状态      |
| ---------------------- | ---------------------- | --------- |
| `GET /users`           | `GET /users`           | ✅ 已适配 |
| `POST /users`          | `POST /users`          | ✅ 已适配 |
| `GET /departments`     | `GET /departments`     | ✅ 已适配 |
| `POST /departments`    | `POST /departments`    | ✅ 已适配 |
| `POST /api/auth/login` | `POST /api/auth/login` | ✅ 已适配 |

### 字段映射

**用户列表字段转换**：

- 后端：`{ id, name, phone, deptId, deptName, role, status }`
- 前端：`{ id, userName, userPhone, userEmail, status, ... }`
- 转换逻辑在 `src/utils/api-adapter.ts`

**分页格式转换**：

- 后端：`{ count, pageNo, pageSize, lists }`
- 前端：`{ total, current, size, records }`
- 转换逻辑在 `src/utils/api-adapter.ts`

---

## 🔧 配置说明

### 环境变量

**开发环境** (`.env.development`)：

```env
VITE_API_URL=
VITE_API_PROXY_URL=http://localhost:8080
VITE_PORT=5173
```

**生产环境** (`.env.production`)：

```env
VITE_API_URL=https://your-api-id.execute-api.region.amazonaws.com/prod
```

### Vite 代理配置

前端通过 Vite 代理访问后端，避免 CORS 问题：

```typescript
// vite.config.ts 已配置代理
proxy: {
  '/api/auth': { target: 'http://localhost:8081', changeOrigin: true },
  '/users': { target: VITE_API_PROXY_URL, changeOrigin: true },
  '/departments': { target: VITE_API_PROXY_URL, changeOrigin: true },
  '/policies': { target: 'http://localhost:8082', changeOrigin: true }
}
```

---

## 📝 注意事项

### 1. 响应格式兼容

后端有两种响应格式：

- `base-service`: `{ code, msg, data }` ✅
- `auth-service`: `{ code, message, data }` ⚠️

HTTP 拦截器已兼容两种格式。

### 2. 字段映射

前端期望的字段和后端返回的字段不完全一致，已通过适配器转换：

- `src/utils/api-adapter.ts` - 字段转换工具

### 3. 分页参数

- 前端发送：`{ current: 1, size: 20 }`
- 后端期望：`{ pageNum: 1, pageSize: 20 }`
- 已在 API 调用中自动转换

---

## 🐛 常见问题

### 1. CORS 错误

**问题**：前端无法访问后端 API

**解决**：

- 确保使用 Vite 代理（已配置）
- 或后端配置 CORS（推荐）

### 2. 404 错误

**问题**：接口路径不匹配

**检查**：

- 后端接口路径是否正确
- 前端 API 调用路径是否正确
- 查看 `src/api/system-manage.ts` 和 `src/api/auth.ts`

### 3. 字段不匹配

**问题**：前端显示的数据不正确

**解决**：

- 检查 `src/utils/api-adapter.ts` 中的字段映射
- 根据实际后端返回调整映射逻辑

---

## 📚 相关文件

- `src/api/system-manage.ts` - 系统管理 API（用户、部门）
- `src/api/auth.ts` - 认证 API（登录）
- `src/utils/api-adapter.ts` - API 适配器（字段转换）
- `src/utils/http/index.ts` - HTTP 请求封装
- `.env.development` - 开发环境配置

---

## 🎯 下一步

1. ✅ 启动后端服务
2. ✅ 启动前端服务
3. ✅ 测试登录功能
4. ✅ 测试用户列表
5. ✅ 测试部门列表

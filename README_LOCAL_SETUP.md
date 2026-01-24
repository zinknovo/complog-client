# Complog Client Local Development Guide

English | [简体中文](./README_LOCAL_SETUP.zh-CN.md)

## 🎯 Overview

This is the frontend of the Complog project, based on the `art-design-pro` template and adapted to the backend APIs.

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
cd complog-client
pnpm install
```

### 2. Configure environment variables

The `.env.development` file is created, and Vite proxy is used in development:

```
VITE_API_URL=
VITE_API_PROXY_URL=http://localhost:8080
VITE_PORT=5173
```

### 3. Start backend services

Make sure backend services are running:

```bash
# base-service at http://localhost:8080
# auth-service at http://localhost:8081
# policy-service at http://localhost:8082
```

### 4. Start frontend

```bash
pnpm dev
```

The frontend runs at `http://localhost:5173`.

---

## 📋 API Mapping

### Integrated endpoints

| Frontend Call          | Backend Endpoint       | Status   |
| ---------------------- | ---------------------- | -------- |
| `GET /users`           | `GET /users`           | ✅ Ready |
| `POST /users`          | `POST /users`          | ✅ Ready |
| `GET /departments`     | `GET /departments`     | ✅ Ready |
| `POST /departments`    | `POST /departments`    | ✅ Ready |
| `POST /api/auth/login` | `POST /api/auth/login` | ✅ Ready |

### Field mapping

**User list mapping**:

- Backend: `{ id, name, phone, deptId, deptName, role, status }`
- Frontend: `{ id, userName, userPhone, userEmail, status, ... }`
- Mapping in `src/utils/api-adapter.ts`

**Pagination mapping**:

- Backend: `{ count, pageNo, pageSize, lists }`
- Frontend: `{ total, current, size, records }`
- Mapping in `src/utils/api-adapter.ts`

---

## 🔧 Configuration

### Environment variables

**Development** (`.env.development`):

```env
VITE_API_URL=
VITE_API_PROXY_URL=http://localhost:8080
VITE_PORT=5173
```

**Production** (`.env.production`):

```env
VITE_API_URL=https://your-api-id.execute-api.region.amazonaws.com/prod
```

### Vite proxy

Vite proxy is configured to avoid CORS issues:

```typescript
// vite.config.ts proxy configuration
proxy: {
  '/api/auth': { target: 'http://localhost:8081', changeOrigin: true },
  '/users': { target: VITE_API_PROXY_URL, changeOrigin: true },
  '/departments': { target: VITE_API_PROXY_URL, changeOrigin: true },
  '/policies': { target: 'http://localhost:8082', changeOrigin: true }
}
```

---

## 📝 Notes

### 1. Response format compatibility

The backend has two response formats:

- `base-service`: `{ code, msg, data }` ✅
- `auth-service`: `{ code, message, data }` ⚠️

The HTTP interceptor supports both formats.

### 2. Field mapping

The frontend fields differ from backend responses and are adapted via:

- `src/utils/api-adapter.ts` - field mapping

### 3. Pagination parameters

- Frontend sends: `{ current: 1, size: 20 }`
- Backend expects: `{ pageNum: 1, pageSize: 20 }`
- Mapping is done in API calls

---

## 🐛 Common Issues

### 1. CORS error

**Problem**: Frontend cannot access backend APIs

**Fix**:

- Ensure Vite proxy is enabled (recommended)
- Or configure CORS in backend

### 2. 404 error

**Problem**: API path mismatch

**Check**:

- Backend endpoint paths
- Frontend API paths
- Files: `src/api/system-manage.ts`, `src/api/auth.ts`

### 3. Field mismatch

**Problem**: Frontend data looks incorrect

**Fix**:

- Check mappings in `src/utils/api-adapter.ts`
- Adjust mapping based on actual backend response

---

## 📚 Related Files

- `src/api/system-manage.ts` - system management APIs (users, departments)
- `src/api/auth.ts` - auth APIs (login)
- `src/utils/api-adapter.ts` - API adapter (field mapping)
- `src/utils/http/index.ts` - HTTP request wrapper
- `.env.development` - development config

---

## 🎯 Next Steps

1. ✅ Start backend services
2. ✅ Start frontend
3. ✅ Test login
4. ✅ Test user list
5. ✅ Test department list

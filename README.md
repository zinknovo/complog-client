<h1 align="center">CompLog Client</h1>
<p align="center">Frontend for the CompLog microservice system</p>
<div align="center">English | <a href="./README.zh-CN.md">简体中文</a></div>

## Overview

This is the frontend for CompLog, adapted to the current backend APIs.

Core features:

- Login (auth-service)
- User management (base-service)
- Department management (base-service)
- Policy management + revisions (policy-service)
- Dashboard statistics

## Tech Stack

Vue 3 + TypeScript + Vite + Element Plus + Tailwind CSS

## Local Development

### 1. Install dependencies

```bash
pnpm install
# or
npm install
```

### 2. Configure environment

The dev env uses Vite proxy (no direct base URL):

```
VITE_API_URL=
VITE_API_PROXY_URL=http://localhost:8080
VITE_PORT=5173
```

### 3. Start backend services

- `base-service`: http://localhost:8080
- `auth-service`: http://localhost:8081
- `policy-service`: http://localhost:8082

### 4. Start frontend

```bash
pnpm dev
# or
npm run dev
```

Open: http://localhost:5173

## API Proxy

Vite proxy is configured in `vite.config.ts`:

- `/api/auth` -> `http://localhost:8081`
- `/users`, `/departments` -> `http://localhost:8080`
- `/policies` -> `http://localhost:8082`

## Test Accounts

Default demo accounts (phone + password):

- 13800138000 / 123456
- 13800138001 / 123456
- 13800138002 / 123456

## License Notice

This project is based on `art-design-pro` (MIT License).

- Original author: Daymychen (art-design-pro).
- The original copyright and license text are retained in `LICENSE`.
- MIT License allows commercial use with proper attribution.

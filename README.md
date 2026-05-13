# Worldex China Website

Full-stack website for Worldex China Exhibitions Co., Ltd.

## Tech Stack
- Frontend: Vue 3 + Vite + Pinia + Vue Router + Axios
- Backend: Node.js + Express + Knex
- Database: MySQL

## Setup

### Prerequisites
- Node.js 18+
- MySQL 8+

### Database
```bash
mysql -u root -p < worldex-server/migrations/001_init.sql
```

### Backend
```bash
cd worldex-server
cp .env .env.example  # edit DB credentials
npm install
npm start  # runs on port 3000
```

### Frontend
```bash
cd worldex-front
npm install
npm run dev  # runs on port 5173, proxies /api to backend
```

### Default Admin
- URL: http://localhost:5173/admin/login
- Username: admin
- Password: admin123

### Seed Data
```bash
cd worldex-server
node seeds/seed.js
```

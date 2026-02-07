# FixIt Now

Production-ready full-stack marketplace where customers request services and providers fulfill them.

## Stack
- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS
- **Backend:** Node.js, Express.js, Prisma, PostgreSQL
- **Auth:** JWT with role-based access control
- **Realtime:** Socket.IO (chat + notifications)
- **Payments:** Stripe payment intents
- **Uploads:** Cloudinary signed upload flow

## Monorepo Structure
- `frontend/` Next.js app
- `backend/` Express API, Socket.IO, Prisma

## Quick Start

### 1) Configure environment
Copy sample env files and fill values:

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

### 2) Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3) Run database migrations
```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

### 4) Start development servers
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

Frontend: `http://localhost:3000`  
Backend: `http://localhost:5000`

## Seed Admin Account (example)
Use Prisma Studio or create a user with `role=ADMIN` in the database.

## Production Notes
- Set strong JWT/Stripe/Cloudinary secrets.
- Configure secure cookies, CORS origin, and HTTPS in production.
- Deploy backend + database (Render/Railway/Fly/K8s) and frontend (Vercel).
- Add CI: lint, test, Prisma migrate, build.

## API
Implemented routes:
- Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- Customer: `/api/requests`, `/api/payments`, `/api/reviews`
- Provider: `/api/provider/requests`, `/api/provider/requests/:id`, `/api/provider/earnings`
- Admin: `/api/admin/users`, `/api/admin/providers`, `/api/admin/users/:id`, `/api/admin/analytics`
- Chat: `/api/chat/:requestId`

## Security
- Helmet + CORS + rate limiting
- Bcrypt password hashing
- JWT auth middleware
- Role middleware for RBAC
- Validation with Zod

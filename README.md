# MERN Auth Application

A full-stack authentication app with signup, login, and dashboard built with MongoDB, Express, React, and Node.js.

## Tech Stack

- **Backend**: Node.js + Express + MongoDB + JWT
- **Frontend**: React 18 + React Router

## Quick Start

### Backend
```bash
cd backend
npm install
# Create .env with MONGO_CONN and JWT_SECRET
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Deployment

- **Backend**: Render
- **Frontend**: Vercel

## API Endpoints

- `POST /auth/signup` - Register user
- `POST /auth/login` - Login user
- `GET /products` - Get products (protected)

## Features

- User registration & login
- JWT authentication
- Password hashing with bcrypt
- Confetti celebration on login
- Secure token-based API access

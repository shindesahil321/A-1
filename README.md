# MERN Authentication & Dashboard Application

A full-stack web application built with MongoDB, Express, React, and Node.js (MERN). Provides user registration, secure JWT-based authentication, and a personalized dashboard experience.

## Features

- **User Authentication**: Sign up, log in, and secure session management
- **JWT-based Authorization**: Stateless authentication using JSON Web Tokens
- **Password Security**: Passwords hashed with bcrypt; never stored in plaintext
- **Responsive Frontend**: React-based UI with form validation and error handling
- **RESTful API**: Clean API endpoints for auth and user operations
- **Celebration Effects**: Fun confetti animation on successful login
- **Production Ready**: Deployed on Render (backend) and Vercel (frontend)

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Atlas)
- **Authentication**: JWT (JSON Web Tokens) + bcrypt
- **Validation**: Joi for schema validation

### Frontend
- **Library**: React 18
- **Routing**: React Router v6
- **Notifications**: React Toastify
- **HTTP**: Fetch API

## Quick Start

### Local Development

**Backend**
```bash
cd backend
npm install
# Create .env with MONGO_CONN and JWT_SECRET
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
npm start
```

## Deployment

**Backend**: Render  
**Frontend**: Vercel

See full README for detailed setup and troubleshooting.

---

*Personalized MERN project with improved code clarity, better error messages, and production-ready deployment.*
# Task 6 — Form Validation with MongoDB Storage & JWT Authentication

A Node.js + Express app where users register and log in through a validated form. User data is stored in MongoDB (passwords hashed with bcrypt) and sessions are handled with JSON Web Tokens, with role-based access control.

## Features

- Registration and login forms with client-side validation (`public/js/validation.js`)
- Server-side validation that mirrors the client rules (`src/utils/validators.js`)
- Passwords hashed with bcryptjs before saving
- JWT authentication with a protected `/api/auth/me` route
- Role-based access (`user` / `admin`) — only admins can list all users
- Login count and last-login tracking per user

## Tech Stack

Node.js, Express, MongoDB (Mongoose), JWT (jsonwebtoken), bcryptjs, vanilla HTML/CSS/JS

## API Routes

| Method | Route | Access | Description |
| ------ | ----- | ------ | ----------- |
| POST | `/api/auth/register` | Public | Create an account |
| POST | `/api/auth/login` | Public | Log in and receive a JWT |
| GET | `/api/auth/me` | Logged in | Current user's profile |
| GET | `/api/users` | Admin only | List all users |

## Project Structure

```
Task-6-Auth-MongoDB-JWT/
├── server.js
├── src/
│   ├── config/db.js
│   ├── controllers/authController.js
│   ├── middleware/{auth.js, role.js}
│   ├── models/User.js
│   ├── routes/{authRoutes.js, userRoutes.js}
│   └── utils/validators.js
├── public/ (index.html, css/, js/)
├── .env.example
└── package.json
```

## Getting Started

1. `npm install`
2. Copy `.env.example` to `.env` and fill in your own MongoDB connection string and a strong `JWT_SECRET`
3. `npm start` (or `npm run dev` for auto-reload)
4. Open http://localhost:3000

## Author

T. Nikita — Cognifyz Web Development Internship

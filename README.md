# Apex Solutions — Company Website

A full-stack web application for a fictional technology company built with React, Node.js, Express, and MongoDB.

## Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS
- React Router v6
- Axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt Password Hashing

## Features

### Public Website
- **Home** — Hero section with CTA, features overview, call-to-action banner
- **About** — Company story, stats, core values
- **Services** — Detailed service cards with feature lists
- **Contact** — Form with client-side and server-side validation, saves to MongoDB

### Admin Panel
- **Authentication** — JWT-based login with bcrypt password hashing
- **Dashboard** — View, search, edit, and delete enquiries
- **Protected Routes** — Admin pages require valid JWT token

## Project Structure

```
company-website/
├── client/                     # React frontend
│   ├── public/
│   └── src/
│       ├── components/         # Reusable UI (Navbar, Footer, Modals)
│       ├── layouts/            # Layout wrappers (Public, Admin)
│       ├── pages/              # Route-level page components
│       ├── routes/             # ProtectedRoute guard
│       ├── services/           # Axios API client
│       └── App.jsx             # Router configuration
├── server/                     # Express backend
│   ├── config/                 # DB connection, env loader
│   ├── controllers/            # Route handlers
│   ├── middleware/              # Auth, error handler
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # Route definitions
│   ├── services/               # Business logic
│   ├── validators/             # Request validation rules
│   ├── utils/                  # AppError, catchAsync
│   ├── app.js                  # Express app setup
│   └── server.js               # Entry point
└── README.md
```

## API Reference

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Admin login | No |

**Login Request**
```json
{
  "email": "admin@company.com",
  "password": "Admin@123"
}
```

**Login Response**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "...",
    "name": "Admin",
    "email": "admin@company.com"
  }
}
```

### Enquiries

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/enquiries` | Submit enquiry | No |
| GET | `/api/enquiries` | List enquiries | Yes |
| GET | `/api/enquiries/:id` | Get enquiry | Yes |
| PUT | `/api/enquiries/:id` | Update enquiry | Yes |
| DELETE | `/api/enquiries/:id` | Delete enquiry | Yes |

**Create Enquiry**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "subject": "Website Development",
  "message": "I would like to discuss a new website project for my business."
}
```

**List Enquiries** — `GET /api/enquiries?search=john&page=1&limit=10&sort=-createdAt`

**Response**
```json
{
  "success": true,
  "enquiries": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd company-website
   ```

2. **Set up environment variables**
   ```bash
   cp server/.env.example server/.env
   ```
   Edit `server/.env` with your MongoDB URI and desired JWT secret.

3. **Install dependencies**
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

4. **Start the backend**
   ```bash
   cd server
   npm run dev
   ```
   Server starts on `http://localhost:5000`

5. **Start the frontend (development)**
   ```bash
   cd client
   npm run dev
   ```
   Client starts on `http://localhost:3000`

6. **Start in production (single server)**
   ```bash
   cd server
   NODE_ENV=production npm run dev
   ```
   The built client is served from `http://localhost:5000`

7. **Access the application**
   - Website: `http://localhost:3000` (dev) or `http://localhost:5000` (production)
   - Admin Login: `/admin/login`
   - Default credentials: `admin@company.com` / `Admin@123`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRES_IN` | Token expiry duration | `7d` |
| `ADMIN_NAME` | Default admin name | `Admin` |
| `ADMIN_EMAIL` | Default admin email | `admin@company.com` |
| `ADMIN_PASSWORD` | Default admin password | `Admin@123` |
| `VITE_API_URL` | API base URL (client) | `/api` |

## Error Handling

All API errors follow a consistent format:

```json
{
  "success": false,
  "message": "Description of what went wrong"
}
```

HTTP status codes used:
- `200` — Success
- `201` — Created
- `400` — Bad Request (validation error)
- `401` — Unauthorized (invalid token or credentials)
- `404` — Not Found
- `500` — Internal Server Error

## Built With

- [React](https://reactjs.org/) — UI library
- [Vite](https://vitejs.dev/) — Build tool
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [Express](https://expressjs.com/) — Web framework
- [MongoDB](https://www.mongodb.com/) — Database
- [Mongoose](https://mongoosejs.com/) — ODM
- [JSON Web Tokens](https://jwt.io/) — Authentication
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js) — Password hashing

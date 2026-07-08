# 🚀 Apex Solutions – Company Website

A full-stack company website built as an internship assessment using the MERN stack. The application includes a modern public website, a contact enquiry system, and a secure admin dashboard for managing enquiries.

---

# ✨ Features

## Public Website

- Responsive Landing Page
- About Page
- Services Page
- Contact Form
- Client-side Validation
- Server-side Validation
- Stores enquiries in MongoDB

---

## Admin Panel

- Secure JWT Authentication
- Passwords hashed using bcrypt
- Protected Routes
- View all enquiries
- Search enquiries
- Edit enquiry
- Delete enquiry
- Logout

---

# ✅ Assignment Checklist

- ✔ Multi-page React Website
- ✔ Responsive UI
- ✔ React Router
- ✔ Contact Form
- ✔ MongoDB Integration
- ✔ JWT Authentication
- ✔ Protected Admin Routes
- ✔ CRUD Operations
- ✔ Search Functionality
- ✔ Error Handling
- ✔ Production Ready Structure

---

# 🛠 Tech Stack

## Frontend

- React 18
- Vite
- Tailwind CSS
- React Router v6
- Axios

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt.js

---

# 📁 Folder Structure

```
company-website
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   └── App.jsx
│   └── public
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── validators
│   ├── utils
│   ├── app.js
│   └── server.js
│
└── README.md
```

---

# 🔐 Authentication

JWT authentication is used for the admin panel.

Passwords are securely hashed using **bcrypt** before storing them in MongoDB.

Protected routes require a valid JWT token.

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|------------|----------------|
| POST | /api/auth/login | Admin Login |

---

## Enquiries

| Method | Endpoint | Description |
|----------|----------------------|----------------|
| POST | /api/enquiries | Create enquiry |
| GET | /api/enquiries | Get all enquiries |
| GET | /api/enquiries/:id | Get enquiry |
| PUT | /api/enquiries/:id | Update enquiry |
| DELETE | /api/enquiries/:id | Delete enquiry |

---

# 📦 Installation

Clone the repository

```bash
git clone <repository-url>
```

Move inside project

```bash
cd company-website
```

Install backend dependencies

```bash
cd server
npm install
```

Install frontend dependencies

```bash
cd ../client
npm install
```

---

# ⚙ Environment Variables

Create:

```
server/.env
```

Example:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@company.com
ADMIN_PASSWORD=Admin@123
```

---

# ▶ Running the Project

Backend

```bash
cd server
npm run dev
```

Frontend

```bash
cd client
npm run dev
```

Frontend:

```
http://localhost:3000
```

Backend:

```
http://localhost:5000
```

---

# 👨‍💻 Default Admin Credentials

**Email**

```
admin@company.com
```

**Password**

```
Admin@123
```

---

# 🔍 Search Feature

The admin dashboard supports searching enquiries by:

- Name
- Email
- Subject
- Message

---

# 🛡 Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- Input Validation
- Error Handling Middleware
- MongoDB Validation
- Secure Environment Variables

---

# 📱 Responsive Design

The application is fully responsive for:

- Desktop
- Laptop
- Tablet
- Mobile

---

# 🚀 Future Improvements

- Pagination Controls
- Sorting
- Toast Notifications
- Email Notifications
- Role-based Authentication
- Image Upload
- Dashboard Analytics
- Dark Mode

---

# 📖 Built With

- React
- Vite
- Tailwind CSS
- Express
- Node.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt.js

---

# 👩 Author

**Sakshi Gaikwad**

---

# 📄 License

This project is licensed under the MIT License.

# JobConnect


# Job Platform Authentication System

This is a front-end implementation of an authentication system for a job platform with separate roles for **Workers** and **Employers**.

---

## 🚀 Key Features

### 🔐 User Authentication
- Signup with role selection (Worker/Employer)
- Login with email/password
- Session management using `localStorage`

### 🔑 Password Management
- Password strength indicator
- Show/hide password toggle
- Basic validation (length, match)

### 👥 User Roles
- Separate dashboards for Workers and Employers
- Role-specific features and navigation

### 💾 Data Storage
- All user data stored in `localStorage`
- Current session tracked via `localStorage`

### 📱 Responsive Design
- Optimized for mobile, tablet, and desktop
- Mobile-friendly navigation and layouts

### 🛡️ Security Considerations
> **Note:** This is a front-end-only implementation. For production:
- Passwords should be **hashed**
- Sensitive operations should be handled **server-side**

---

## 🧭 How to Use

### 📝 Signup Process
1. User selects a role (**Worker** or **Employer**)
2. Fills in the required information
3. Account is created and stored in `localStorage`
4. Redirects to the appropriate dashboard

### 🔓 Login Process
1. User enters email and password
2. System checks against stored users
3. If valid, a session is created and user is redirected to their dashboard

### 🚪 Logout
- Clears the current session
- Redirects to the homepage

### 🔁 Session Management
- Automatically redirects logged-in users away from login/signup pages
- Protects dashboard pages from unauthorized access

---

## ⚠️ Production Considerations

This implementation is **not suitable for production** without the following:

- Backend authentication system
- Password hashing (e.g., bcrypt)
- Email verification flow
- Real database for user data storage
- Robust error handling
- Security practices like CSRF protection

---

## 📂 Technologies Used

- HTML, CSS (with responsiveness)
- JavaScript (Vanilla)
- `localStorage` for data/session handling

---

## ✅ Status

This project demonstrates a **complete front-end authentication system** for a job platform. It is ideal for prototypes, personal projects, and frontend development practice.

---

## 📌 License

MIT License - feel free to use, modify, and improve.


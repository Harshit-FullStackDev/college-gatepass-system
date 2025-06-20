# 🎓 College Gatepass Management System

A full-stack web application for managing gatepass requests in a college environment, built using **Spring Boot** for the backend and **React** for the frontend. It includes role-based dashboards for **Students**, **Wardens**, and **Admins**.

---

## 🚀 Features

### 🧑‍🎓 Student
- Register & login
- Request a gatepass by providing a reason
- View all gatepass requests with statuses (Approved / Rejected / Pending)

### 🧑‍🏫 Warden
- View pending gatepass requests from students
- Approve or reject requests
- Search and filter requests by reason, name, or roll number
- View list of approved gatepasses
  
### 🛡️ Admin *(Planned)*
- Manage users (students and wardens)
- Monitor all gatepass activities
---
## 🛠️ Tech Stack

| Frontend | Backend |
|---------|---------|
| [React](https://reactjs.org/) + Tailwind CSS | [Spring Boot](https://spring.io/projects/spring-boot) |
| Axios (API Calls) | Spring Security + JWT (Authentication) |
| React Router DOM | MySQL (Database) |
| Context API (Auth Management) | JPA + Hibernate |

---

## 📁 Folder Structure
Full Stack GatePass/
│
├── college_gatepass/ # Spring Boot backend
│ ├── src/main/java/... # All Java packages
│ └── src/main/resources/ # Application configs, static files
│
├── frontend/
│ └── college-gatepass-frontend/ # React frontend project
│ ├── public/
│ ├── src/
│ │ ├── components/ # Navbar, ProtectedRoute, etc.
│ │ ├── context/ # AuthContext
│ │ ├── pages/ # Login, Register, Dashboards
│ │ └── api/axios.js # Axios instance with JWT
│
├── .gitignore
├── README.md
└── LICENSE

---

## 🧪 Local Setup

### 🔧 Prerequisites
- Node.js & npm
- Java 17+ and Maven
- MySQL

---

### 🔌 Backend Setup (`Spring Boot`)

```bash
cd college_gatepass
# Configure application.properties for your MySQL credentials
mvn spring-boot:run
Backend runs on: http://localhost:8080
🌐 Frontend Setup (React)
cd frontend/college-gatepass-frontend
npm install
npm run dev
Frontend runs on: http://localhost:5173
🔐 Authentication & Roles
Role-based access using JWT
Roles:
STUDENT
WARDEN
ADMIN (planned)
✅ Future Enhancements
Admin dashboard (user & gatepass management)
Email notifications
Export reports (PDF/Excel)
Better analytics/charts
Mobile responsiveness
📄 License
This project is licensed under the MIT License. See LICENSE for details.

🤝 Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

👨‍💻 Author
Harshit - Full Stack Developer

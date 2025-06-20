# College Gatepass System 🎓

A full-stack web application for managing college gate pass requests.

## 🔧 Tech Stack
- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Spring Boot, Spring Security, JWT, MySQL

## 📁 Folder Structure
project-root/
├── college_gatepass/ # Spring Boot backend
│ └── src/ ...
├── frontend/college-gatepass-frontend/ # React frontend
│ └── src/ ...
├── .gitignore
├── README.md

## 🚀 Running Locally

### Backend (Spring Boot)
```bash
cd college_gatepass
./mvnw spring-boot:run

### Frontend (React)
cd frontend/college-gatepass-frontend
npm install
npm run dev
🧠 Features
Role-based access for Students and Wardens

JWT authentication

Gatepass approval/rejection

Secure APIs

🗂️ Deployment
Separate branches:

main: full-stack

frontend: only React

backend: only Spring Boot
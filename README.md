# TaskFlow – Mini Project Management Application

TaskFlow is a modern, responsive MERN (MongoDB, Express, React, Node.js) web application designed for streamlined project and task management.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT and bcrypt password hashing.
- **Project Management**: Create, view, update, and delete projects.
- **Task Management**: Create, edit, delete, and categorize tasks with statuses (`To Do`, `In Progress`, `Completed`).
- **Priority & Deadlines**: Assign task priorities (`Low`, `Medium`, `High`) and track due dates.
- **Search & Filtering**: Real-time filtering by status, priority, project, and keyword search.
- **Interactive Dashboard**: Visual statistics on project progress, task completion metrics, and overdue alerts.

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Vanilla CSS / Modern UI styling
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT), bcryptjs
- **Version Control**: Git & GitHub (Feature branch workflow)

## 🌿 Git Branching Strategy

TaskFlow follows a production-grade 3-tier branch model:

- `main`: Production-ready, verified releases only.
- `testing`: Integration and staging branch.
- `feature/<name>`: Dedicated feature development branches (e.g., `feature/authentication`, `feature/project-crud`).

```text
feature/...  ──(Pull Request)──>  testing  ──(Final Verification)──>  main
```

## 📂 Project Structure

```text
TaskFlow-MERN/
├── client/           # Frontend React + Vite application
├── server/           # Backend Express + Node.js API
├── .gitignore        # Ignored files (node_modules, .env, build artifacts)
└── README.md         # Project documentation
```

## ⚙️ Getting Started

Instructions for running TaskFlow locally will be provided as the client and server modules are scaffolded.

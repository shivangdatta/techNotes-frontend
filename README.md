# 🎨 TechNotes Frontend

[![TechNotes](![image](https://github.com/shivangdatta/techNotes-frontend/assets/115028852/ad9ba67b-1a54-4d8d-bdb3-d92427e03c58)
)](https://technotes-frontend-zwm4.onrender.com)

## ✨ Overview

Welcome to **TechNotes** – a futuristic digital note management system designed to replace traditional sticky notes. This frontend application is built with React and Tailwind CSS, leveraging Redux and Redux Toolkit for efficient state management and caching. Enjoy a seamless note-taking experience with our feature-rich platform.

## 🚀 Key Features

- 🗒️ **Digital Note Management**: Upgrade from traditional sticky notes to a digital solution.
- 🔐 **Secure Login**: Role-based access control ensures appropriate access for employees, managers, and admins.
- 👥 **Employee Access**: Employees manage their notes; managers and admins oversee all notes and user settings.
- ⏰ **Weekly Login Enforcement**: Users must log in at least once a week using JWT access and refresh tokens.
- ⚙️ **Global State Management**: Efficient state management with Redux and Redux Toolkit.
- 🚀 **Caching and Prefetching**: Enhanced performance with caching, prefetching, and consistent data fetching.

## 🔑 User Roles and Access

### 🛡️ Admin/Manager
- **Credentials**: 
  - Username: `admin_user`
  - Password: `admin_password`
- **Privileges**:
  - View, edit, and delete all notes.
  - Manage user settings and create new users.
  - Immediate removal of employee access if needed.

### 👤 Employee
- **Credentials**:
  - Username: `employee_user`
  - Password: `employee_password`
- **Privileges**:
  - View and manage their assigned notes.
  - No access to user settings or deletion of others' notes.

## 🛠️ Technologies and Tools

### 📦 Frontend Stack

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Redux**: Predictable state container for JavaScript apps.
- **Redux Toolkit**: Simplifies Redux usage with `createSlice` and `createAsyncThunk`.
- **React Router**: Declarative routing for React applications.

### 📊 State Management

- **Redux**: Centralized state management for a single source of truth.
- **Redux Toolkit**: Tools for efficient state management and logic.
- **RTK Query**: Handles data fetching, caching, and synchronization.

### 🔒 Authentication

- **JWT**: Token-based authentication for secure sessions.
- **Token Management**: Uses access and refresh tokens.

### ⚡ Caching and Performance

- **RTK Query**: Enhances performance with data caching and prefetching.
- **Consistent Data Fetching**: Maintains data consistency with regular updates.

## 🚀 Getting Started

To begin using the TechNotes frontend:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/techNotes-frontend.git
   cd techNotes-frontend

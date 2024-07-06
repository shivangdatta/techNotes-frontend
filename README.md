# 🎨 TechNotes Frontend

![TechNotes](https://your-link-to-image.com/header.png)](https://technotes-frontend-zwm4.onrender.com)

## ✨ Overview

Welcome to **TechNotes** – a futuristic digital note management system designed to replace traditional sticky notes. This frontend application is built with React and Tailwind CSS, using Redux and Redux Toolkit for state management and caching. Dive into a seamless note-taking experience with our feature-rich platform.

## 🚀 Key Features

- 🗒️ **Digital Note Management**: Upgrade from traditional sticky notes to a digital solution.
- 🔐 **Secure Login**: Role-based access control to ensure appropriate access for employees, managers, and admins.
- 👥 **Employee Access**: Employees manage their notes; managers and admins oversee all notes and user settings.
- ⏰ **Weekly Login Enforcement**: Users must log in at least once a week using JWT access and refresh tokens.
- ⚙️ **Global State Management**: Efficient state management using Redux and Redux Toolkit.
- 🚀 **Caching and Prefetching**: Enhanced performance with caching, prefetching, and consistent data fetching for sensitive data.

## 🔑 User Roles and Access

### 🛡️ Admin/Manager
- **Credentials**: 
  - Username: `signed_up`
  - Password: `password`
- **Privileges**:
  - View, edit, and delete all notes.
  - Manage user settings and create new users.
  - Immediate removal of employee access if needed.

### 👤 Employee
- **Credentials**:
  - Username: `user`
  - Password: `user`
- **Privileges**:
  - View and manage their assigned notes.
  - Cannot access user settings or delete others' notes.

## 🛠️ Technologies and Tools

### 📦 Frontend Stack

- **React**: A library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Redux**: A predictable state container for JavaScript apps.
- **Redux Toolkit**: Simplifies Redux logic and state management.
- **React Router**: Declarative routing for React applications.

### 📊 State Management

- **Redux**: Manages the global state for a single source of truth.
- **Redux Toolkit**: Provides tools to simplify Redux usage, including `createSlice` for state and reducer logic, and `createAsyncThunk` for async operations.
- **RTK Query**: Handles data fetching, caching, and synchronization.

### 🔒 Authentication

- **JWT**: Secure token-based authentication.
- **Token-Based**: Sessions managed via access and refresh tokens.

### ⚡ Caching and Performance

- **RTK Query**: Caches and prefetches data to reduce network requests and enhance performance.
- **Consistent Fetching**: Regularly fetches active data every 15 seconds to maintain data consistency.

## 🚀 Getting Started

To start using the TechNotes frontend:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/techNotes-frontend.git
   cd techNotes-frontend

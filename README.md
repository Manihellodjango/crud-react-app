# Getting Started with CRUD React App

This project was releated to React CRUD Operations

## How to start the project

step 1: Clone the Repository from Github ------> git clone https://github.com/Manihellodjango/crud-react-app.git

step 2: Install node modules ---------> npm install 

step 3: Run the Backend JSON SERVER ----------> npx json-server --watch db.json 

step 4: Run the Frontend application -------> npm start 


# Task Management Application

A simple and intuitive task management application built with React. This application allows users to view, add, edit, mark as complete, and delete tasks. It uses React Router for navigation, Context API for state management, and JSON Server for simulating a backend API.

## Features

### 1. **Task Management**
- **View a list of all tasks**: See all tasks in a clean and organized table.
- **Add new tasks**: Easily add new tasks with a title, description, start date, end date, and priority.
- **Mark tasks as completed**: Toggle the completion status of tasks.
- **Edit tasks**: Update the title, description, and other details of existing tasks.
- **Delete tasks**: Remove tasks that are no longer needed.

### 2. **Technical Features**
- **React with Hooks**: Built using functional components and React Hooks (`useState`, `useEffect`, `useContext`).
- **React Router**: Supports multiple pages:
  - `/tasks`: Overview of all tasks.
  - `/tasks/:id`: Detailed view of a specific task.
- **JSON Server**: Simulates a backend API for CRUD operations.
- **Context API**: Manages global state for tasks and application settings.
- **Error Handling**: Gracefully handles faulty API requests and displays user-friendly error messages.

### 3. **Additional Features (Bonus)**
- **Unit Tests**: Includes unit tests written with Jest and React Testing Library.
- **Optimized Performance**: Uses lazy loading and memoization for better performance.
- **Mobile Responsiveness**: Designed to work seamlessly on both desktop and mobile devices.
- **User-Friendly UI/UX**: Provides feedback using toast messages and smooth animations.

---

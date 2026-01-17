# Todo Application (AltSchool Assessment 3)

A simple **Todo Application** built with **Node.js, TypeScript, Express, MongoDB (Atlas), EJS, and session-based authentication**.

This project allows users to sign up, log in, and manage their personal tasks. Each user can only access their own todos. Tasks can be created, viewed, filtered, completed, or deleted.

---

## Features

- User authentication (signup & login) using **sessions**
- Password hashing with **bcrypt**
- Create, view, complete, and delete todos
- Todo status management: `pending`, `completed`, `deleted`
- Filter todos by status (All / Pending / Completed)
- Server-side rendering with **EJS**
- MongoDB Atlas integration using **Mongoose**
- Basic UI styling with external CSS
- Built with **TypeScript**

---

## How It Works

1. User signs up with a **username and password**
2. User logs in
3. Session is created and stored
4. Authenticated user can:
   - Add new todos
   - View their todos
   - Mark todos as completed
   - Delete todos
   - Filter todos by status

---

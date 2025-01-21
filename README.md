# Blogging Platform Backend

## Live URL

[Live URL](http://your-live-url.com)

## Project Overview

The **Blogging Platform Backend** is a robust, secure, and API built for managing user-generated blogs. It supports two roles, Admin and User, with differentiated permissions for managing blogs. Users can create, read, update, and delete their blogs, while Admins can manage users and blog content with full control.

This backend application provides a public API for reading blogs with advanced search, sort, and filter functionalities. It also implements secure authentication and role-based access control (RBAC) for managing user interactions.

---

## Features

### User Roles

- **Admin**:
  - Can block users.
  - Can delete any blog.
  - Cannot update blogs.
- **User**:
  - Can register, login, and create their blogs.
  - Can update or delete only their own blogs.
  - Cannot perform admin actions.

### Authentication & Authorization

- Secure login and JWT-based authentication for user sessions.
- Role-based access control to differentiate between Admin and User actions.

### Blog Management

- **Public Blog API**: Fetch blogs with support for search, sorting, and filtering by title, content, or author.
- **User Blog Management**: Users can create, update, and delete their blogs.
- **Admin Blog Management**: Admins can delete any blog and block any user.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod for input validation
- **TypeScript**: For static typing and better code maintainability

---

## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in a user and get a JWT token.

### Blog Management

- **POST /api/blogs**: Create a blog.
- **PATCH /api/blogs/\*\***:id\*\*: Update a blog.
- **DELETE /api/blogs/\*\***:id\*\*: Delete a blog.
- **GET /api/blogs**: Get all blogs with search, sorting, and filtering options.

### Admin Actions

- **PATCH /api/admin/users/\*\***:userId\***\*/block**: Block a user.
- **DELETE /api/admin/blogs/\*\***:id\*\*: Delete any blog.

---

## Installation

### Prerequisites

- **Node.js**: Make sure you have Node.js installed (v16 or later).
- **MongoDB**: A MongoDB database (can use MongoDB Atlas for a cloud-based DB).

### Steps

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Install dependencies:

   ```bash
   cd blogging-platform-backend
   npm install
   ```

3. Create a `.env` file and add the following configuration:

   ```env
   PORT=5000
   MONGO_URI=<your_mongo_db_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   ```

4. Start the application:

   ```bash
   npm start:dev
   ```

5. The server will start on `http://localhost:5000`.

---

## Usage

Once the server is up and running, you can use the API by sending requests to the appropriate endpoints. Here's how you can interact with the API:

- **Register** a user by sending a POST request to `/api/auth/register`.
- **Log in** to get a JWT token by sending a POST request to `/api/auth/login`.
- Use the **token** for creating, updating, and deleting blogs.
- **Admin users** can manage other users and blogs.

Example of **Blog Creation** (POST `/api/blogs`):

```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{"title": "My First Blog", "content": "This is my first blog content."}'
```

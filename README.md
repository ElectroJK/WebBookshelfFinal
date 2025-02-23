# Library Management API

## Project Overview
This project is a Library Management API built using Node.js, Express, and MongoDB. It allows users to register, log in, manage books, and perform administrative tasks. The API includes authentication and authorization mechanisms using JWT.

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/library-management-api.git
   cd library-management-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/libraryDB
   PORT=3000
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:3000`.

## API Documentation

### Authentication
#### Register a new user
**POST** `/auth/register`
- Request Body:
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- Response:
  ```json
  { "message": "User registered successfully" }
  ```

#### User Login
**POST** `/auth/login`
- Request Body:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- Response:
  ```json
  { "token": "your_jwt_token" }
  ```

### Books
#### Get all books (Authenticated)
**GET** `/books`
- Headers:
  ```sh
  Authorization: Bearer <your_token>
  ```
- Response:
  ```json
  [
    {
      "_id": "bookId",
      "title": "Book Title",
      "author": "Author Name",
      "status": "Want to Read",
      "rating": 5
    }
  ]
  ```

#### Add a book (Authenticated)
**POST** `/books`
- Request Body:
  ```json
  {
    "title": "New Book",
    "author": "Author Name"
  }
  ```
- Response:
  ```json
  { "message": "Book added successfully" }
  ```

### Admin Routes
#### Get all users (Admin Only)
**GET** `/admin/users`
- Headers:
  ```sh
  Authorization: Bearer <admin_token>
  ```
- Response:
  ```json
  [
    {
      "_id": "userId",
      "username": "john_doe",
      "email": "john@example.com"
    }
  ]
  ```

#### Delete a user (Admin Only)
**DELETE** `/admin/users/:id`
- Response:
  ```json
  { "message": "User deleted successfully" }
  ```

## License
This project is licensed under the MIT License.

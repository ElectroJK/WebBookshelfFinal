# Library Management API

## Project Overview
Library Management API is a backend system designed to facilitate the management of books, authors, and borrowers. It enables users to perform CRUD (Create, Read, Update, Delete) operations on library resources while ensuring authentication, role-based access control, and efficient data retrieval. Built with Node.js, Express.js, and MongoDB, this API follows a modular structure for maintainability and scalability.

### Features:
- User authentication and JWT-based authorization
- Role-based access control (admin and user roles)
- Book management: adding, updating, deleting, and searching books
- Author management: storing author details and retrieving author-specific books
- Borrower management: tracking users borrowing books
- Secure password storage using bcrypt
- Input validation with middleware
- Global error-handling mechanism

## Authors
- Kadyrulan Tanatkanov
- Asanali Ashimov
- Miras Serikzhanuly

## Setup Instructions

### Prerequisites
- Node.js (v16 or later)
- MongoDB (local or cloud-based)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/library-management-api.git
   ```
2. Navigate to the project directory:
   ```sh
   cd library-management-api
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file and configure environment variables:
   ```sh
   MONGO_URI=mongodb://127.0.0.1:27017/libraryDB
   PORT=3000
   JWT_SECRET=your_secret_key
   ```
5. Start the server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

## API Documentation

### Authentication
- **POST /auth/register** - Register a new user
- **POST /auth/login** - Log in a user and receive a token
- **POST /auth/forgot-password** - Reset password

### Books
- **GET /books** - Retrieve all books
- **GET /books/:id** - Retrieve a specific book by ID
- **POST /books** - Add a new book
- **PUT /books/:id** - Update an existing book
- **DELETE /books/:id** - Remove a book
- **GET /books/search?q=title** - Search books by title or author
- **GET /books/filter?status=Read** - Filter books by reading status

### Authors
- **GET /authors** - Retrieve all authors
- **GET /authors/:id** - Retrieve a specific author by ID
- **POST /authors** - Add a new author
- **PUT /authors/:id** - Update an existing author
- **DELETE /authors/:id** - Remove an author

### Borrowers
- **GET /borrowers** - Retrieve all borrowers
- **GET /borrowers/:id** - Retrieve a specific borrower by ID
- **POST /borrowers** - Add a new borrower
- **PUT /borrowers/:id** - Update an existing borrower
- **DELETE /borrowers/:id** - Remove a borrower

## Request & Response Examples

### Register a New User
**Request:**
```json
POST /auth/register
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "message": "User registered successfully"
}
```

### Add a New Book
**Request:**
```json
POST /books
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publishedYear": 1925
}
```
**Response:**
```json
{
  "_id": "60f7a6e9b4d3c90017b0b5a1",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publishedYear": 1925
}
```

## License
This project is licensed under the [MIT License](LICENSE).

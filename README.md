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
   git clone https://github.com/ElectroJK/WebBookshelfFinal.git
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
   node server
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
### Get Your Token
**Request:** 
>Make sure you write your logged email and password!
```json
POST /auth/login
{
    "email": "Example@gmail.com",
    "password": "*************"
}
```
**Response:**
```json
{
    "token": "YourToken"
}
```

### Add a New Book
**Request:** 
>Token is needed for adding books!
```json
POST /books/add
{
  "title": "test",
  "author": "anon",
  "status": "Reading",
  "rating": 5
}
```
**Response:**
```json
{
    "title": "test",
    "author": "anon",
    "status": "Reading",
    "rating": 5,
    "userId": "67bb0a8134a5c808edc86d1f",
    "_id": "67bb40263f065bbf1de03d04",
    "createdAt": "2025-02-23T15:35:02.726Z",
    "updatedAt": "2025-02-23T15:35:02.726Z",
    "__v": 0
}
```

## License
This project is licensed under the [MIT License](LICENSE).

# Library Management API

## Project Overview
This project is a simple Library Management API built using Node.js and MongoDB. It allows users to manage books, authors, and borrowers by providing CRUD operations.

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
4. Start the server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

## API Documentation

### Endpoints

#### Books
- **GET /books** - Retrieve all books
- **GET /books/:id** - Retrieve a specific book by ID
- **POST /books** - Add a new book
- **PUT /books/:id** - Update an existing book
- **DELETE /books/:id** - Remove a book

#### Authors
- **GET /authors** - Retrieve all authors
- **GET /authors/:id** - Retrieve a specific author by ID
- **POST /authors** - Add a new author
- **PUT /authors/:id** - Update an existing author
- **DELETE /authors/:id** - Remove an author

#### Borrowers
- **GET /borrowers** - Retrieve all borrowers
- **GET /borrowers/:id** - Retrieve a specific borrower by ID
- **POST /borrowers** - Add a new borrower
- **PUT /borrowers/:id** - Update an existing borrower
- **DELETE /borrowers/:id** - Remove a borrower

### Request & Response Examples
#### Add a new book
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
This project is licensed under the MIT License.

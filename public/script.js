document.addEventListener("DOMContentLoaded", () => {
    checkAuth();
    loadBooks();
});

async function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        const res = await fetch("/auth/user", {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) {
            window.location.href = "login.html";
        }
    } catch {
        window.location.href = "login.html";
    }
}

async function loadBooks() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("No token found. Please log in.");
        window.location.href = "login.html";
        return;
    }

    try {
        const res = await fetch("/books", {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to load books");

        const books = await res.json();
        displayBooks(books);
    } catch (error) {
        alert("Error loading books: " + error.message);
    }
}

function displayBooks(books) {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    books.forEach(book => {
        const bookItem = document.createElement("li");
        bookItem.classList.add("book-item");

        const createdAt = new Date(book.createdAt).toLocaleString();
        const updatedAt = new Date(book.updatedAt).toLocaleString();

        bookItem.innerHTML = `
            <span class="book-title">${book.title} by ${book.author}</span>
            <small>Status: ${book.status} | Rating: ${book.rating || "N/A"}</small>
            <small>Created: ${createdAt} | Updated: ${updatedAt}</small>
            <div class="book-buttons">
                <button class="update-btn" onclick="updateBook('${book._id}')">✎</button>
                <button class="delete-btn" onclick="deleteBook('${book._id}', this)">🗑</button>
            </div>
        `;

        bookList.appendChild(bookItem);
    });
}


async function addBook() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("No token found. Please log in.");
        return;
    }

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const status = document.getElementById("status").value;
    const ratingInput = document.getElementById("rating").value.trim();
    const rating = ratingInput ? Number(ratingInput) : null;

    if (!title || !author) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const res = await fetch("/books/add", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, author, status, rating }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.error || "Error adding book");
        }

        loadBooks();
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("status").value = "Want to Read";
        document.getElementById("rating").value = "";
    } catch (error) {
        alert("Error adding book: " + error.message);
    }
}

async function updateBook(bookId) {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("No token found. Please log in.");
        return;
    }

    let newStatus = prompt("Enter new status (Want to Read, Reading, Read):")?.trim();
    const newRatingInput = prompt("Enter new rating (1-5):")?.trim();
    const newRating = newRatingInput ? Number(newRatingInput) : null;

    const validStatuses = ["Want to Read", "Reading", "Read"];
    newStatus = validStatuses.find(status => status.toLowerCase() === newStatus?.toLowerCase());

    if (!newStatus) {
        alert("Invalid status. Choose from: Want to Read, Reading, Read.");
        return;
    }

    if (newRating !== null && (isNaN(newRating) || newRating < 1 || newRating > 5)) {
        alert("Invalid rating. It must be a number between 1 and 5.");
        return;
    }

    try {
        const res = await fetch(`/books/update/${bookId}`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus, rating: newRating }),
        });

        if (!res.ok) throw new Error("Failed to update book");

        loadBooks();
    } catch (error) {
        alert("Error updating book: " + error.message);
    }
}

async function deleteBook(bookId, btn) {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("No token found. Please log in.");
        return;
    }

    try {
        const res = await fetch(`/books/delete/${bookId}`, { 
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Error deleting book");

        btn.parentElement.parentElement.remove();
    } catch (error) {
        alert(error.message);
    }
}

function logout() {
    localStorage.removeItem("token");
    fetch("/auth/logout", { method: "GET" }).then(() => {
        window.location.href = "login.html";
    });
}

async function searchBooks() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("No token found. Please log in.");
        return;
    }

    const query = document.getElementById("search").value.trim();
    if (!query) return loadBooks();

    try {
        const res = await fetch(`/books/search?q=${encodeURIComponent(query)}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to search books");

        const books = await res.json();
        displayBooks(books);
    } catch (error) {
        alert("Error searching books: " + error.message);
    }
}

async function filterBooks() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("No token found. Please log in.");
        return;
    }

    const status = document.getElementById("filterStatus").value;
    if (!status) return loadBooks();

    try {
        const res = await fetch(`/books/filter?status=${encodeURIComponent(status)}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to filter books");

        const books = await res.json();
        displayBooks(books);
    } catch (error) {
        alert("Error filtering books: " + error.message);
    }
}

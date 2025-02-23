document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Access Denied. Please log in.");
        window.location.href = "/login.html";
        return;
    }

    async function loadUsers() {
        try {
            const res = await fetch("/admin/users", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Failed to fetch users");

            const users = await res.json();
            const userList = document.getElementById("userList");
            userList.innerHTML = "";

            users.forEach((user) => {
                const li = document.createElement("li");
                li.textContent = `${user.username} (${user.email})`;

                if (user.email !== "admin@imadmin.com") {
                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "Delete";
                    deleteBtn.onclick = async () => {
                        if (confirm(`Are you sure you want to delete ${user.username}?`)) {
                            await deleteUser(user._id);
                        }
                    };
                    li.appendChild(deleteBtn);
                }
                userList.appendChild(li);
            });
        } catch (error) {
            alert("Error loading users: " + error.message);
        }
    }

    async function deleteUser(userId) {
        try {
            const res = await fetch(`/admin/users/${userId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Failed to delete user");

            alert("User deleted successfully");
            loadUsers();
        } catch (error) {
            alert("Error deleting user: " + error.message);
        }
    }

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        window.location.href = "/login.html";
    });

    loadUsers();
});

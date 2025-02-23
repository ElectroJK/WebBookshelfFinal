document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || (data.errors && data.errors[0]?.msg) || "Invalid credentials");
    }

    localStorage.setItem("token", data.token);
    window.location.href = email === "admin@imadmin.com" ? "/admin.html" : "/index.html";
  } catch (error) {
    alert("Login failed! " + error.message);
  }
});


document.querySelectorAll("#togglePassword, #toggleNewPassword").forEach(button => {
  button.addEventListener("click", () => {
    const passwordInput = button.previousElementSibling;
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      button.textContent = "Hide";
    } else {
      passwordInput.type = "password";
      button.textContent = "Show";
    }
  });
});


document.getElementById("forgotPasswordForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();

  try {
    const res = await fetch("/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || (data.errors && data.errors[0]?.msg) || "Password reset failed");
    }

    alert("Password reset successful! You can now log in.");
    window.location.href = "/login.html";
  } catch (error) {
    alert("Password reset failed! " + error.message);
  }
});


document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || (data.errors && data.errors[0]?.msg) || "Registration failed");
    }

    alert("Registration successful! Redirecting to login...");
    window.location.href = "/login.html";
  } catch (error) {
    alert("Registration failed! " + error.message);
  }
});


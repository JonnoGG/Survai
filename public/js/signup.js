const form = document.getElementById("signupForm");
const msg = document.getElementById("message");

form.addEventListener("submit", async e => {
    e.preventDefault();
    msg.textContent = "";
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
        msg.textContent = "Passwords do not match."
        return;
    }
    try {
        const res = await fetch("/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const body = await res.json();

        if (!res.ok) {
            msg.innerHTML = "";
            if (body.data && Array.isArray(body.data.errors)) {
                const ul = document.createElement("ul");
                body.data.errors.forEach(({ message }) => {
                    const li = document.createElement("li");
                    li.textContent = message;
                    ul.appendChild(li);
                });
                msg.appendChild(ul);
            } else {
                msg.textContent = body.message || "An error occurred during signup.";
            }
            return;
        }

        //successful login, JWT and redirect to dashboard
        localStorage.setItem("token", body.token);
        window.location.href = "/dashboard";
        
    } catch (err) {
        msg.textContent = "Something went wrong. Please try again later.";
        console.error("Signup error:", err);
    }
});
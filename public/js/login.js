const form = document.getElementById("loginForm");
const msg = document.getElementById("message");

form.addEventListener("submit", async e => {
    e.preventDefault();
    msg.textContent = "";
    const email = form.email.value;
    const password = form.password.value;

    try {
        const res = await fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const body = await res.json();

        if (!res.ok) {
            msg.innerHTML = "";
            if (body.data && body.data.errors) {
                const errors = body.data.errors;
                const ul = document.createElement("ul");
                Object.values(errors).forEach((err) => {
                    const li = document.createElement("li");
                    li.textContent = err;
                    ul.appendChild(li);
                });
                msg.appendChild(ul);
            } else {
                msg.textContent = body.message || "An error occurred during login.";
            }
            return;
        }

        //TODO: successful login, JWT and redirect to dashboard
        msg.textContent = body.message;
    } catch (err) {
        msg.textContent = "Something went wrong. Please try again later.";
        console.error("Login error:", err);
    }
});
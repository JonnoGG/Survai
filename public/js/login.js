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
            if (body.data && Array.isArray(body.data.errors)) {
                const ul = document.createElement("ul");
                body.data.errors.forEach(({ message }) => {
                    const li = document.createElement("li");
                    li.textContent = message;
                    ul.appendChild(li);
                });
                msg.appendChild(ul);
            } else {
                msg.textContent = body.message || "An error occurred during login.";
            }
            return;
        }

        //Successful login, store JWT and send to dashboard
        //TODO: remove this once redirect is in
        localStorage.setItem("token", body.token);
        window.location.href = "/dashboard";
        
    } catch (err) {
        msg.textContent = "Something went wrong. Please try again later.";
        console.error("Login error:", err);
    }
});
export async function redirectIfNotLoggedIn() {
    const token = localStorage.getItem("token");
    if (!token) {
        return (window.location.href = "/login");
    }
    const res = await fetch("/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
};

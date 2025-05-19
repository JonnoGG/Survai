class Sidebar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <aside class="w-64 bg-gray-50 p-6 flex flex-col justify-start">
                <site-logo class="text-3xl"></site-logo>
                <nav id= "sidebarNav" class="space-y-2 flex flex-col my-4">
                    <a href="/dashboard">Dashboard</a>
                    <a href="/surveys">Surveys</a>
                    <a href="/responses">Responses</a>
                    <a href="settings">Settings</a>
                    <a href="#">Log out</a>
                </nav>
            </aside>
        `;

        const nav = document.getElementById("sidebarNav");
        const path = window.location.pathname;

        if (nav) {
            const links = nav.querySelectorAll("a");

            links.forEach((link) => {
                const href = link.getAttribute("href");
                if (path === href) {
                    link.classList.add("bg-violet-200");
                } else {
                    link.classList.add("hover:bg-gray-200");
                }
                link.classList.add("w-full", "py-3", "px-4", "rounded-xl");
            });
        }
    }
}

customElements.define("site-sidebar", Sidebar);

import "/components/logo.js";

class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.style.display = "block";
        this.style.width = "100%";
        this.innerHTML = `
        <header class="w-full flex items-center justify-between border-b bg-white border-black-200 py-3 px-6">
            <a href="/" class="text-4xl font-bold transition-all duration-500 hover:brightness-150 cursor-pointer">
                <site-logo></site-logo>
            </a>

            <a
                href="/login"
                class="px-4 py-2 text-sm font-medium text-white rounded-full bg-violet-600 hover:bg-violet-700 transition"
            >
                Log in
            </a>
        </header>
      `;
    }
}

customElements.define("site-header", SiteHeader);

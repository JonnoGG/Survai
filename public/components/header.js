class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.style.display = "block";
        this.style.width = "100%";
        this.innerHTML = `
        <header class="w-full flex items-center justify-between border-b border-black-200 py-3 px-6 mb-3">
            <a href="/" class="text-4xl font-bold transition-all duration-500 hover:brightness-150 cursor-pointer">
                <span class="text-black">Surv</span
                ><span
                    class="text-transparent bg-clip-text bg-gradient-to-tr from-violet-500 to-fuchsia-500 "
                    >AI</span
                >
            </a>

            <a
                href="/login"
                class="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded hover:bg-violet-500 transition"
            >
                Log in
            </a>
        </header>
      `;
    }
}

customElements.define("site-header", SiteHeader);

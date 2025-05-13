class Logo extends HTMLElement {
    connectedCallback() {
        this.style.display = "block";
        this.style.width = "100%";
        this.innerHTML = `
            <a href="/" class="font-bold transition-all duration-500 hover:brightness-150 cursor-pointer inline-block">
                <span class="text-black leading-none">Surv</span><span class="leading-none text-transparent bg-clip-text bg-violet-600">AI</span>
            </a>
        `;
    }
}

customElements.define("site-logo", Logo);

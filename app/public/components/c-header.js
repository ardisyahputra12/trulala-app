class CHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <style>
                .nav-item {
                    text-decoration: none;
                }
                .nav-item:hover {
                    text-decoration: underline;
                }
            </style>
            <div class="d-flex align-items-center">
                <a href="/" class="text-white">
                    <h1 class="me-5">Trulala App</h1>
                </a>
                <div class="nav justify-content-end">
                    <a href="/home" class="nav-item ps-4 pe-4 text-white fs-5">
                        Home
                    </a>
                    <a href="/project" class="nav-item ps-4 pe-4 text-white fs-5">
                        Projek
                    </a>
                    <a href="/discuss" class="nav-item ps-4 pe-4 text-white fs-5">
                        Diskusi
                    </a>
                </div>
            </div>
        `;
    }
}

customElements.define("c-header", CHeader);
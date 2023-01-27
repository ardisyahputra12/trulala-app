class CBtnAddBacklog extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="d-flex justify-content-end me-5">
                <button class="add-backlog btn btn-primary fs-5 p-1 ps-4 pe-4 d-flex align-items-center">
                    <i class="bi bi-plus-circle me-3 fs-3"></i>
                    Tambah Backlog
                </button>
            </div>
        `;

        const addBacklog = document.querySelector(".add-backlog");
        addBacklog.addEventListener("click", () => {
            const title = prompt("Judul Backlog:");
            const desc = prompt("Deskripsi Backlog:");
            const add = confirm("Tambah Backlog?");
            if (add) {
                fetch("/backlog/add", {
                    method: 'POST',
                    headers: {
                        "Accept": "*/*",
                        "User-Agent": "*",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "title": title,
                        "desc": desc
                    }),
                }).then((result) => {
                    alert(`${result.status}\nBacklog berhasil ditambahkan.`);
                    location.reload();
                }).catch((err) => {
                    alert(`error: ${err}\nBacklog gagal ditambahkan!`);
                    location.reload();
                });
            };
        });
    };
};

customElements.define("c-btn-add-backlog", CBtnAddBacklog);

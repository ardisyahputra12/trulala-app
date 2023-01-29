class CCard extends HTMLElement {
    constructor() {
        super();
        this.items = [
            { title: "Backlog", color: "bg-dark" },
            { title: "Design", color: "bg-secondary" },
            { title: "ToDo", color: "bg-primary" },
            { title: "Doing", color: "bg-info" },
            { title: "CodeReview", color: "bg-warning" },
            { title: "Testing", color: "bg-danger" },
            { title: "Done", color: "bg-success" },
        ];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `<div class="card-wrapper d-flex mt-5 pb-5 overflow-auto"></div>`;
        const cardWrapper = document.querySelector(".card-wrapper");

        // create card
        this.items.forEach((item) => {
            cardWrapper.innerHTML += `
                <div class="card ${item.title} ${item.color} text-white me-2 ms-2 pb-5" style="min-width: 20rem;">
                    <div class="card-header fw-bold">
                        ${item.title}
                    </div>
                    <ul class="list-group list-group-flush"></ul>
                </div>
            `;
        });

        // Get all data
        fetch("/backlog")
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                return Promise.resolve(responseJson);
            })
            .then((object) => {
                // show data
                const items = object.Response;
                items.forEach((item) => {
                    const card = document.querySelector(`.${item.card}`);
                    const date = `${item.updatedAt}`.replace("T", " / ").split(".");
                    card.innerHTML += `
                        <li class="list-group-item m-2 text-start rounded" id="${item.id}">
                            <div class="card-body p-0">
                                <h5 class="card-title">${item.title}</h5>
                                <p class="card-text">${item.desc}</p>
                                <p class="mt-3">${date[0]}</p>
                                <div class="d-flex border-top pt-2">
                                    <div class="btn-group dropend me-2">
                                        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Move
                                        </button>
                                        <ul class="move-card dropdown-menu"></ul>
                                    </div>
                                    <Button class="edit-btn btn btn-warning btn-sm me-2">Edit</Button>
                                    <Button class="delete-btn btn btn-danger btn-sm me-2">Delete</Button>
                                </div>
                            </div>
                        </li>
                    `;
                });

                // delete item
                const deleteBtn = document.querySelectorAll(".delete-btn");
                deleteBtn.forEach((el) => {
                    const id = el.parentElement.parentElement.parentElement.id;
                    el.addEventListener("click", () => {
                        fetch(`/backlog/delete/${id}`, {
                            method: "DELETE",
                        })
                            .then((result) => {
                                alert(`${result.status}\nItem berhasil dihapus.`);
                                location.reload();
                            })
                            .catch((err) => {
                                alert(`error: ${err}\nItem gagal dihapus!`);
                                location.reload();
                            });
                    });
                });

                // edit item
                const editBtn = document.querySelectorAll(".edit-btn");
                editBtn.forEach((el) => {
                    const id = el.parentElement.parentElement.parentElement.id;
                    el.addEventListener("click", () => {
                        const title = prompt("Judul Backlog:");
                        const desc = prompt("Deskripsi Backlog:");
                        const edit = confirm("Edit Backlog?");
                        if (edit) {
                            fetch(`/backlog/edit/${id}`, {
                                method: "PUT",
                                headers: {
                                    Accept: "*/*",
                                    "User-Agent": "*",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    title: title,
                                    desc: desc,
                                }),
                            })
                                .then((result) => {
                                    alert(`${result.status}\nItem berhasil diubah.`);
                                    location.reload();
                                })
                                .catch((err) => {
                                    alert(`error: ${err}\nItem gagal diubah!`);
                                    location.reload();
                                });
                        }
                    });
                });

                // move item
                const moveCard = document.querySelectorAll(".move-card");
                moveCard.forEach(el => {
                    this.items.forEach((item) => {
                        el.innerHTML += `<li class="move-btn dropdown-item">${item.title}</li>`;
                    });
                    const id = el.parentElement.parentElement.parentElement.parentElement.id;
                    const listItem = el.childNodes
                    listItem.forEach(li => {
                        const card = li.textContent
                        li.addEventListener("click", () => {
                            fetch(`/backlog/move/${id}`, {
                                method: "PUT",
                                headers: {
                                    Accept: "*/*",
                                    "User-Agent": "*",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    card: card,
                                }),
                            })
                                .then((result) => {
                                    alert(`${result.status}\nItem berhasil dipindahkan.`);
                                    location.reload();
                                })
                                .catch((err) => {
                                    alert(`error: ${err}\nItem gagal dipindahkan!`);
                                    location.reload();
                                });
                        });
                    });
                });
            })
            .catch((err) => {
                alert(`error: ${err}\nData gagal dimuat!`);
            });
    }
}

customElements.define("c-card", CCard);

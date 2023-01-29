class CDiscuss extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="chat-container m-4">
                <main class="chat-main d-flex" style="border-radius: 12px; height: 400px;">
                    <div class="chat-sidebar w-25 rounded-3 overflow-auto p-2 me-3 bg-info text-white">
                        <h3><i class="bi bi-people-fill pe-2"></i>Pengguna</h3>
                        <ul id="users" class="text-start"></ul>
                    </div>
                    <div class="chat-messages w-75 p-2 rounded overflow-scroll" style='background-color: #eee; height: 400px;'></div>
                </main>
                <div class="chat-form-container position-absolute bottom-0 start-0 end-0 m-3 mb-0">
                    <form id="chat-form">
                        <div class="input-group mb-3">
                            <input id="msg" type="text" required autofocus autocomplete="off" class="form-control fs-5" placeholder="Ketik Pesan ..." aria-label="Recipient's username" aria-describedby="basic-addon2">
                            <button class="input-group-text btn btn-primary fs-5" id="basic-addon2">
                                <i class="bi bi-send"></i> Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        const chatForm = document.getElementById('chat-form');
        const chatMessages = document.querySelector('.chat-messages');
        const userList = document.getElementById('users');
        const username = document.querySelector('.user_name').textContent;
        const socket = io();

        socket.emit('discuss', username);
        socket.on('roomUsers', users => {
            outputUsers(users);
        });

        socket.on('message', message => {
            outputMessage(message);
        });

        chatMessages.scrollTop = chatMessages.scrollHeight;

        chatForm.addEventListener('submit', e => {
            e.preventDefault();

            const msg = e.target.elements.msg.value;

            socket.emit('chatMessage', { username, msg });

            e.target.elements.msg.value = '';
            e.target.elements.msg.focus();
        });

        function outputMessage(message) {
            message.forEach(el => {
                const div = document.createElement('div');
                div.classList.add('message', 'rounded', 'text-start', 'p-2', 'mb-3', 'ps-4', `${el.id}`);
                div.setAttribute("style", "background-color: #ccc");
                div.innerHTML = `
                    <p class="fs-5 m-0 fw-bold text-primary">${el.user_name} <span>${el.createdAt}</span></p>
                    <p class="text m-0 fs-6">
                        ${el.user_message}
                    </p>
                `;
                document.querySelector('.chat-messages').appendChild(div);
            });
        };

        function outputUsers(users) {
            userList.innerHTML = `
                ${users.map(user => `<li class="fs-4 text-capitalize list-group-item bg-info border-0 text-white ps-0">${user.user_name}</li>`).join('')}
            `;
        };
    }
}

customElements.define("c-discuss", CDiscuss);

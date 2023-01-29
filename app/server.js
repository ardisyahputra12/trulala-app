const express = require('express');
const session = require('express-session');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const login_routes = require('./routers/login.js');
const backlog_routes = require('./routers/backlog.js');
const formatMessage = require('./utils/messages.js');
const {
    getAllData,
    getNameData,
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'Trulala App',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 300 * 300 * 1000 } // 5 jam
}));

app.use('/auth', login_routes);
app.use('/backlog', backlog_routes);

app.set('view engine', 'ejs');

const discussRoom = 'Trulala Discuss';

io.on('connection', socket => {
    socket.on('discuss', async (username) => {
        const data = await getAllData();
        const nameData = await getNameData();
        socket.join(discussRoom);
        socket.emit('message', data);
        io.to(discussRoom).emit('roomUsers', nameData);
    });

    socket.on('chatMessage', async ({ username, msg }) => {
        let addData = await formatMessage(socket.id, username, msg);
        const nameData = await getNameData();
        io.to(discussRoom).emit('message', [addData]);
        io.to(discussRoom).emit('roomUsers', nameData);
    });
});

app.get('/home', (req, res) => res.render('index', { user: req.session.user || "" }));
app.get('/project', (req, res) => res.render('project', { user: req.session.user || "" }));
app.get('/discuss', (req, res) => res.render('discuss', { user: req.session.user || "" }));
app.get('*', (req, res) => res.redirect('/'));

server.listen(port, () => console.log(`Server running at ${hostname}:${port}`));
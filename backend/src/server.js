const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

let user = 'chinafox';
let pass = 'mellanis';
let database = 'dbwebapp';
let originLocal = 'http://localhost:3000';
mongoose.connect('mongodb+srv://' + user + ':' + pass + '@aplicativo-wiswx.mongodb.net/' + database + '?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


const connectedUsers = {};

io.on('connection', socket => {
    console.log(socket.handshake.query);
    console.log('Usuario conectado', socket.id);

    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;

});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers=connectedUsers;

    return next();
})

app.use(cors({ origin: originLocal }));
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(8080);
const express = require('express');
const apiRoutes = require('./routers/app.routers');
const { products, httpServer, io, app, chatMessagesArray } = require('./controllers/products.controller');

const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', apiRoutes);

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static('./public'));

// Templates Engines
app.set('view engine', 'ejs');
app.set('views', './views/layouts');

app.get('/', (req, res) => {
    return res.render('main', { body: '../pages/home', data: { products: products.getAll(), chatMessagesArray }});
})

httpServer.listen(PORT, () => console.log(`Server ON - Port: ${PORT}`));

httpServer.on('error', (error) => {
    console.log(error.message);
})

io.on('connection', (socket) => {
    io.sockets.emit('chat-server:loadMessages', chatMessagesArray);

    socket.on('chat-client:newMessage', (message) => {
        chatMessagesArray.push(message);
        io.sockets.emit('chat-server:newMessage', chatMessagesArray);
    })
})

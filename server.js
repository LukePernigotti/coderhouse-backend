const express = require('express');
const path = require('path');
const apiRoutes = require('./routers/app.routers');
const { products, httpServer, io, app } = require('./controllers/products.controller');
const chatMessagesArray = require('./models/chat');
const { engine } = require('express-handlebars');

const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', apiRoutes);

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static('./public'));

// Templates Engines
app.engine('handlebars', engine({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: path.resolve(__dirname, './views/layouts'),
    partialsDir: path.resolve(__dirname, './views/partials')
}))

app.set('view engine', 'handlebars');
app.set('views', './views/pages');

app.get('/', (req, res) => {
    return res.render('home', {
        data: { 
            products: products.getAll(), 
            chatMessagesArray 
        }
    });
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

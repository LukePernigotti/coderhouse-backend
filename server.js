const express = require('express');
const path = require('path');
const apiRoutes = require('./routers/app.routers');
const { products, httpServer, io, app } = require('./controllers/products.controller');
const { initChatController } = require('./controllers/chat.controller');
const { engine } = require('express-handlebars');

const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

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
            products: products.getAll() 
        }
    });
})

app.use((req, res) => {
    res.status(404).send({ error: 404, message: `Error 404. The path ${req.originalUrl} using method ${req.method} is not implemented.`});
});

httpServer.listen(PORT, () => console.log(`Server ON - Port: ${PORT}`));

httpServer.on('error', (error) => {
    console.log(error.message);
})

io.on('connection', initChatController);

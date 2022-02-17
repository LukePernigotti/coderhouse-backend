import express from 'express';
import path from 'path';
import { router } from './routers/app.routers.js';
import { app } from './app.js';
// const { products, httpServer, io, app } = require('./controllers/products.controller');
// const { initChatController } = require('./controllers/chat.controller');
import { engine } from 'express-handlebars';
import {fileURLToPath} from 'url';

const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// // Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

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

const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor activo y ejecutandose en el puerto ${PORT}`);
})

connectedServer.on('error', (error) => {
    console.error(error.message);
})

// io.on('connection', initChatController);

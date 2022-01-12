const express = require('express');
const apiRoutes = require('./routers/app.routers');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', apiRoutes);
const sharedDir = __dirname.replace('\\hbs', '');

app.use('/css', express.static(sharedDir + '/node_modules/bootstrap/dist/css'));
app.use(express.static(path.resolve(__dirname, './public')));

// Templates Engines
app.engine('handlebars', engine({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: path.resolve(__dirname, './views/layouts'),
    partialsDir: path.resolve(__dirname, './views/partials')
}))

app.set('view engine', 'handlebars');
app.set('views', './hbs/views/pages');

app.get('/', (req, res) => {
    return res.render('home');
})

const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor activo y escuchando en el puerto: ${PORT}`);
})

connectedServer.on('error', (error) => {
    console.log(error.message);
})

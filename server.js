const express = require('express');
const apiRoutes = require('./routers/app.routers');
const { products, IS_ADMIN } = require('./controllers/products.controller');

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static('./public'));

// Templates Engines
app.set('view engine', 'ejs');
app.set('views', './views/layouts');

app.get('/', async (req, res) => {
    return res.render('main', { body: '../pages/home', data: { products: await products.getAll(), isAdmin: IS_ADMIN }});
})

app.use((req, res) => {
    res.status(404).send({ error: 404, message: `Error 404. The path ${req._parsedOriginalUrl.path}, method ${req.method} is not implemented.`});
});

app.listen(PORT, () => console.log(`Server ON - Port: ${PORT}`));

app.on('error', (error) => {
    console.log(error.message);
})

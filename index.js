const express = require('express');
const { Contenedor } = require('./Container');

const app = express();
const PORT = process.env.PORT || 8080;
const products = new Contenedor('productos.txt');

app.get('/productos', (req, res) => {
    products.getAll().then((result) => {
      res.json(result);
   })
})

app.get('/productoRandom', (req, res) => {
    products.getAll().then((result) => {
        const randomNumber = Math.floor((Math.random() * result.length));
        res.send(result[randomNumber]);
    })
})

const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor activo y escuchando en el puerto: ${PORT}`);
})

connectedServer.on('error', (error) => {
    console.log(error.message);
})

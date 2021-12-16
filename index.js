const express = require('express');
const apiRoutes = require('./routers/app.routers');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    return res.sendFile(path.resolve(__dirname, './public/index.html'));
})

const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor activo y escuchando en el puerto: ${PORT}`);
})

connectedServer.on('error', (error) => {
    console.log(error.message);
})

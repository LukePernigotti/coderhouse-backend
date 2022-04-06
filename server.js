import express from 'express';
// import path from 'path';
import faker from 'faker';
// import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import flash from 'connect-flash';
import os from 'os';
import cluster from 'cluster';
import compression from 'compression';
import log4js from 'log4js';

import { config } from './db/config.js';
import { httpServer, io, app, args } from './app.js';
import router from './routers/app.routers.js';
import { initChatController } from './controllers/chat.controller.js';

const PORT = args.port || 8080;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
faker.locale = 'en'

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(compression());
app.use(router);
app.use(flash());

// app.use(express.static('./public'));

app.set('view engine', 'ejs');
app.set('views', './views/layouts');

log4js.configure({
    appenders: {
        console: { type: 'console' },
        warnFile: { type: 'file', filename: 'warn.log' },
        errorFile: { type: 'file', filename: 'error.log' }
    },
    categories: {
        default: { appenders: ['console'], level: 'info' },
        nonexistentPaths: { appenders: ['warnFile', 'console'], level: 'warn' },
        errors: { appenders: ['errorFile', 'console'], level: 'error' }
        // warn: { appenders: ['warnFile', 'console'], level: 'warn' },
        // info: { appenders: ['console'], level: 'info' },
        // error: { appenders: ['errorFile', 'console'], level: 'error' }
    }
})

// if (cluster.isPrimary) {
//     const NUM_WORKERS = os.cpus().length;

//     for (let i = 0; i < NUM_WORKERS; i++) cluster.fork()

//     cluster.on('exit', (worker, code) => {
//         console.log('Worker', worker.process.pid, `Exitted on ${new Date().toLocaleString()}`);
//     })

// } else {
    // faker
    app.get('/api/products-test', (req, res) => {
        const productsQuantity = 5
        const products = []

        for (let i = 1; i <= productsQuantity; i++) {
            const product = {
                id: i,
                title: faker.commerce.product(),
                price: faker.commerce.price(),
                thumbnail: `${faker.image.imageUrl()}?${i}`
            }
            products.push(product)
        }

        return res.render('main', { body: '../pages/products', data: { products }});
    })


    app.get('/data', (req, res) => {
        console.log(`port: ${PORT} -> Date: ${Date.now()}`);
        res.send(`Express Server <span style="color: blueviolet;">(Nginx)</span> on ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`)
    })


    app.use((req, res) => {
        const consoleLogger = log4js.getLogger('nonexistentPaths');
        consoleLogger.warn(`The path ${req.originalUrl} using method ${req.method} is not implemented.`);
        res.status(404).send({ error: 404, message: `Error 404. The path ${req.originalUrl} using method ${req.method} is not implemented.`});
    });

    httpServer.listen(PORT, async (error) => {
        mongoose.connect(config.mongodb.connectTo('ecommerce'))
        .then(() => {
            console.log('Connected to DB!');
        });
        console.log(`[${process.pid}] => Server is up and running on port: ${PORT}`);
    });

    httpServer.on('error', (error) => {
        const consoleLogger = log4js.getLogger('errors');
        consoleLogger.error(error.message);
        console.log(error.message);
    })

    io.on('connection', initChatController);

// }


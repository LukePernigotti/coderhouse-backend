import Koa from 'koa';
import koaBody from 'koa-body';
import faker from 'faker';

import mongoose from 'mongoose';

import log4js from 'log4js';

import { config } from './db/config.js';
import router from './routers/app.routers.js';

const app = new Koa();

const PORT = 8080;

faker.locale = 'en'

// Middlewares
app.use(koaBody());
app.use(router.routes());

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

app.use((ctx) => {
    const consoleLogger = log4js.getLogger('nonexistentPaths');
    consoleLogger.warn(`The path ${req.originalUrl} using method ${req.method} is not implemented.`);
    
    ctx.body = { error: 404, message: `Error 404. The path ${req.originalUrl} using method ${req.method} is not implemented.`};
    ctx.status(404);
});

app.listen(PORT, async (error) => {
    mongoose.connect(config.mongodb.connectTo('ecommerce'))
    .then(() => {
        console.log('Connected to DB!');
    });
    console.log(`[${process.pid}] => Server is up and running on port: ${PORT}`);
});

app.on('error', (error) => {
    const consoleLogger = log4js.getLogger('errors');
    consoleLogger.error(error.message);
    console.log(error.message);
})
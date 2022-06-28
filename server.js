const express = require('express');;

const flash = require('connect-flash');
const log4js = require('log4js');

const { httpServer, io, app, args } = require('./app.js');
const router = require('./routers/app.routers.js');
const { initChatController } = require('./controllers/chat.controller.js');
const passport = require('./middlewares/passport.js');

const PORT = args.port || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);
app.use(flash());

app.use(express.static('./public'));

app.set('view engine', 'pug');
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
    }
})

app.use((req, res) => {
    const consoleLogger = log4js.getLogger('nonexistentPaths');
    consoleLogger.warn(`The path ${req.originalUrl} using method ${req.method} is not implemented.`);
    res.status(404).send({ error: 404, message: `Error 404. The path ${req.originalUrl} using method ${req.method} is not implemented.`});
});


httpServer.listen(PORT, async (error) => {
    console.log(`[${process.pid}] => Server is up and running on port: ${PORT}`);
});

httpServer.on('error', (error) => {
    const consoleLogger = log4js.getLogger('errors');
    consoleLogger.error(error.message);
    console.log(error.message);
})

io.on('connection', initChatController);


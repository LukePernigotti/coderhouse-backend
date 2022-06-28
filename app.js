const express = require('express');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');

const minimist = require('minimist');
const args = minimist(process.argv.splice(2));

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

module.exports = { app, httpServer, io, args }
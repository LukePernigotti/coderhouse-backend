import express from 'express';
import { Server as IOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import minimist from 'minimist';
const args = minimist(process.argv.splice(2));

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

export { app, httpServer, io, args }
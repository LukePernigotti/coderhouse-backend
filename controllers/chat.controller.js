const { io } = require('./products.controller');
const { sqlite3Knex } = require('../db/config');
const knex = sqlite3Knex();

const tableName = 'chat';

// create chat table
(async () => {
    const exists = await knex.schema.hasTable(tableName);
    if (!exists) {
        await knex.schema.createTable(tableName, table => {
            table.increments('id').primary();
            table.string('email');
            table.string('message');
            table.date('date');
        });
        console.log(`${tableName} table was created`)
    } else {
        console.log(`${tableName} table already exists`)
    }
})();

const initChatController = async (socket) => {
    try {
        const chatMessages = await knex.from(tableName).select('*');
        io.sockets.emit('chat-server:loadMessages', chatMessages);
    } catch (error) {
        throw new Error(error.message);
    }

    socket.on('chat-client:newMessage', async (message) => {
        try {
            await knex(tableName).insert(message); // returns id
            io.sockets.emit('chat-server:newMessage', message);
        } catch (error) {
            throw new Error(error.message);
        }
    })
};

module.exports = {
    initChatController
}

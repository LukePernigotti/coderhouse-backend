const { normalize, schema } = require('normalizr');
const log4js = require('log4js');
const { io } = require('../app.js');
const ChatApi = require('../models/chat/chat.api.js');

const chatApi = new ChatApi();

// normalizr
const authorSchema = new schema.Entity('author', {});
const messageSchema = new schema.Entity('message', { author: authorSchema })
const messagesSchema = new schema.Entity('messages', { messages: [messageSchema] })

const normalizeMessages = (data) => normalize(data, messagesSchema)

async function getNormalizedMessages() {
    const messages = await chatApi.getAll()
    return normalizeMessages({ id: 'messages', messages });
}

const initChatController = async (socket) => {
    try {
        io.sockets.emit('chat-server:loadMessages', await getNormalizedMessages());
    } catch (error) {
        const logger = log4js.getLogger('default');
        logger.error(response.error);
        throw new Error(error.message);
    }

    socket.on('chat-client:newMessage', async (message) => {
        await chatApi.add(message)
        io.sockets.emit('chat-server:newMessage', await getNormalizedMessages());
    })
};

module.exports = { initChatController }

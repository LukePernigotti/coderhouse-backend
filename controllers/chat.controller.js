import { normalize, schema } from 'normalizr';
import { io } from '../app.js';
import ChatApi from '../models/chat/chat.api.js';

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
        // const chatMessages = await knex.from(tableName).select('*');
        io.sockets.emit('chat-server:loadMessages', await getNormalizedMessages());
    } catch (error) {
        throw new Error(error.message);
    }

    socket.on('chat-client:newMessage', async (message) => {
        await chatApi.add(message)
        io.sockets.emit('chat-server:newMessage', await getNormalizedMessages());

        // try {
        //     await knex(tableName).insert(message); // returns id
        //     io.sockets.emit('chat-server:newMessage', message);
        // } catch (error) {
        //     throw new Error(error.message);
        // }
    })
};

export { initChatController }

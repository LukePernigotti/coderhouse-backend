const fs = require('fs/promises');

const filePath = './db/';
const fileName = 'chatMessages.json'

class ChatApi {
    async getFileData() {
        try {
            const data = await fs.readFile(`${filePath}${fileName}`, 'utf-8');
            return JSON.parse(data);
        } catch(error) {
            console.error('getFileData() error:', error.message);
            return error;
        }
    }

    async saveFileData(data) {
        try {   
            await fs.writeFile(`${filePath}${fileName}`, JSON.stringify(data, null, 2));
            return data;
        } catch(error) {
            console.error('saveFileData() error:', error.message);
            return error;
        }
    }
    
    async getAll() {
        const data = await this.getFileData();
        if (data.length > 0) return data;
        return { error: 'There are no messages' }
    }
        
    async add(message) {
        const data = await this.getFileData();

        // message.id = ++data.lastId;
        message.id = data[data.length-1].id + 1;
        data.push(message);
        await this.saveFileData(data);
        
        return message;
    }
}

module.exports = ChatApi;
import mongoose from 'mongoose';
import config from '../config.js';

class MongoDBContainer {
    constructor(collection, Schema, options = {}) {
        this.validateUpdate = options.validateUpdate || function() {};

        try {
            mongoose.connect(config.mongodb.uri);
            this.model = mongoose.model(collection, Schema);
        } catch (error) {
            console.log(error.message);
        }
    }

    async getAll() {
        try {
            console.log('getAll()');
            const documents = await this.model.find({}, { __v: 0 });
            if (documents.length > 0) return documents;
            return { error: `There are no documents in the collection` }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async get(id) {
        try {
            const document = await this.model.findById(id)
            console.log('document get', document);
            if (!document) return { error: `Document with id ${id} not found` };
            return document;
        } catch (error) {
            throw new Error(error.message);
        }
    }
        
    async add(item) {
        try {
            const document = await this.model.create(item);
            return document;
        } catch (error) {
            if (error.code == 11000) return { error: `Duplicated key value ${JSON.stringify(error.keyValue)}` };
            else throw new Error(error.message);
        }
    }

    async update(id, data) {
        try {
            const validate = this.validateUpdate(data);
            if (validate.error) return validate.error;

            const response = await this.model.updateOne({ id }, { $set: data });
            console.log('update response', response);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(id) {
        try {
            const response = await this.model.deleteOne({ id });
            console.log('response', response);
            return response; // 0 or 1
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default MongoDBContainer;

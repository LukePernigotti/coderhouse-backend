import mongoose from 'mongoose';
import { config } from '../../db/config.js';

class MongoDBContainer {
    constructor(collection, Schema, options = {}) {
        this.validateUpdate = options.validateUpdate || function() {};

        try {
            mongoose.connect(config.mongodb.connectTo('ecommerce'));
            this.model = mongoose.model(collection, Schema);
        } catch (error) {
            console.log(error.message);
        }
    }

    async getAll() {
        try {
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
            if (!document) return { error: `Document with id ${id} not found` };
            return document;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async fiter(ids) {
        try {
            const documents = await this.model.find({ '_id': { $in: ids } })
            
            if (!documents) return { error: `Document with ids ${ids} not found` };

            return documents;
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
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(id) {
        try {
            const response = await this.model.deleteOne({ id });
            return response; // 0 or 1
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default MongoDBContainer;
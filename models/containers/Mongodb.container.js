import mongoose from 'mongoose';
import { formatErrorObject } from '../../utils/api.utils.js';
import { STATUS } from '../../constants/api.constants.js';
import { config } from '../../db/config.js'

const { INTERNAL_ERROR, NOT_FOUND, BAD_REQUEST } = STATUS;

try {
    mongoose.connect(config.mongodb.connectTo('ecommerce'));
} catch (error) {
    console.log(error.message);
}
class MongoDBContainer {
    static instance;
    constructor(collection, Schema) {
        this.model = mongoose.model(collection, Schema);
    }

    async getAll(filter = {}) {
        try {
            const documents = await this.model.find(filter, { __v: 0 }).lean();
            if (documents.length > 0) return documents;
            return { error: `There are no documents in the collection` };
        } catch (error) {
            const newError = formatErrorObject(
                INTERNAL_ERROR.tag,
                error.message
            );
            throw new Error(JSON.stringify(newError));
        }
    }

    async getById(id) {
        try {
            const document = await this.model.findById(id, { __v: 0 }).lean();
            if (!document) {
                const errorMessage = `Resource with id ${id} does not exist in our records`;
                const newError = formatErrorObject(NOT_FOUND.tag, errorMessage);
                throw new Error(JSON.stringify(newError));
            } else {
                return document;
            }
        } catch (error) {
            const newError = formatErrorObject(
                INTERNAL_ERROR.tag,
                error.message
            );
            throw new Error(JSON.stringify(newError));
        }
    }

    async fiterById(ids) {
        try {
            const documents = await this.model.find({ '_id': { $in: ids } })
            
            if (!documents) {
                const errorMessage = `Resource with id ${id} does not exist in our records`;
                const newError = formatErrorObject(NOT_FOUND.tag, errorMessage);
                throw new Error(JSON.stringify(newError));
            }

            return documents;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createItem(resourceItem) {
        try {
            const newItem = new this.model(resourceItem);
            await newItem.save();
            return newItem;
        } catch (err) {
            const newError = formatErrorObject(INTERNAL_ERROR.tag, err.message);
            throw new Error(JSON.stringify(newError));
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

    async updateById(id, data) {
        try {
            const validate = this.validateUpdate(data);
            if (validate.error) return validate.error;

            const response = await this.model.updateOne({ id }, { $set: data });
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteById(id) {
        try {
            const response = await this.model.deleteOne({ id });
            return response; // 0 or 1
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default MongoDBContainer;

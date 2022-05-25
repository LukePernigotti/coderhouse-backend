import mongoose from 'mongoose';
import { config } from '../../db/config.js'
import { STATUS } from '../../utils/constants/api.constants.js';
import CustomError from '../../utils/errors/CustomError.js';

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
            
            throw new CustomError(
                STATUS.NOT_FOUND.code,
                `${STATUS.NOT_FOUND.tag} There are no documents in the collection`,
                error
            );
        } catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR.code,
                `${STATUS.INTERNAL_ERROR.tag} ${error.message}`,
                error
            );
        }
    }

    async getById(id) {
        try {
            const document = await this.model.findById(id, { __v: 0 }).lean();
            if (!document) {
                throw new CustomError(
                    STATUS.NOT_FOUND.code,
                    `${STATUS.NOT_FOUND.tag} Resource with id ${id} does not exist in our records`
                );
            } else {
                return document;
            }
        } catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR.code,
                `${STATUS.INTERNAL_ERROR.tag} ${error.message}`,
                error
            );
        }
    }

    async fiterById(ids) {
        try {
            const documents = await this.model.find({ '_id': { $in: ids } })
            
            if (!documents) {
                throw new CustomError(
                    STATUS.NOT_FOUND.code,
                    `${STATUS.NOT_FOUND.tag} Resource with id ${id} does not exist in our records`
                );
            }

            return documents;
        } catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR.code,
                `${STATUS.INTERNAL_ERROR.tag} ${error.message}`,
                error
            );
        }
    }

    async createItem(resourceItem) {
        try {
            const newItem = new this.model(resourceItem);
            await newItem.save();
            return newItem;
        } catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR.code,
                `${STATUS.INTERNAL_ERROR.tag} ${error.message}`,
                error
            );
        }
    }

    async add(item) {
        try {
            const document = await this.model.create(item);
            return document;
        } catch (error) {
            if (error.code == 11000) {
                throw new CustomError(
                    STATUS.BAD_REQUEST.code,
                    `${STATUS.BAD_REQUEST.tag} Duplicated key value ${JSON.stringify(error.keyValue)}`
                );
            }
            else {
                throw new CustomError(
                    STATUS.INTERNAL_ERROR.code,
                    `${STATUS.INTERNAL_ERROR.tag} ${error.message}`,
                    error
                );
            }
        }
    }

    async updateById(id, data) {
        try {
            const response = await this.model.updateOne({ id }, { $set: data });
            return response;
        } catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR.code,
                `${STATUS.INTERNAL_ERROR.tag} ${error.message}`,
                error
            );
        }
    }

    async deleteById(id) {
        try {
            const response = await this.model.findOneAndDelete({ _id: id });
            return response;
        } catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR.code,
                `${STATUS.INTERNAL_ERROR.tag} ${error.message}`,
                error
            );
        }
    }
}

export default MongoDBContainer;

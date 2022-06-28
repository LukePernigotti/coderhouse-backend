const mongoose = require('mongoose');
const { config } = require('../../db/config.js');
const { STATUS } = require('../../utils/constants/api.constants.js');
const CustomError = require('../../utils/errors/CustomError.js');
const { NODE_ENV } = require('../../env.config.js');

try {
    mongoose.connect(config.mongodb.connectTo(NODE_ENV == 'production' ? 'prod' : 'dev'));
} catch (error) {
    console.log('Error while trying to connect to DB', error.message);
}
class MongoDBContainer {
    constructor(collection, Schema) {
        this.model = mongoose.model(collection, Schema);
    }

    /**
     * 
     * @returns an array of objects
     */
    async getAll(filter = {}) {
        let documents;
        try {
            documents = await this.model.find(filter, { __v: 0 }).lean();
            if (documents.length > 0) return documents;
            
            throw null;
        } catch (error) {
            if (documents.length === 0) {
                throw new CustomError(
                    STATUS.NOT_FOUND.code,
                    `${STATUS.NOT_FOUND.tag} There are no documents in the collection`,
                    error
                )
            }
            throw new CustomError(
                STATUS.INTERNAL_ERROR.code,
                `${STATUS.INTERNAL_ERROR.tag} ${error.message}`,
                error
            );
        }
    }

    /**
     * 
     * @param id id of the item to get
     * @returns get an element from the DB
     */
    async getById(id) {
        let document;
        try {
            document = await this.model.findById(id, { __v: 0 }).lean();
            if (!document) {
                throw null;
            } 
            return document;
        } catch (error) {
            if (!document) {
                throw new CustomError(
                    STATUS.NOT_FOUND.code,
                    `${STATUS.NOT_FOUND.tag} Resource with id ${id} does not exist in our records`
                );
            }
            throw new CustomError(
                STATUS.INTERNAL_ERROR.code,
                `${STATUS.INTERNAL_ERROR.tag} ${error.message}`,
                error
            );
        }
    }

    /**
     * 
     * @param resourceItem data object
     * @returns the item created (e.g. a user object)
     */
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

    /**
     * 
     * @param item object to add to the DB
     * @returns the object added
     */
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

    /**
     * 
     * @param id ID of the element to update
     * @param data properties to update
     * @returns item before update
     */
    async updateById(id, data) {
        try {
            const response = await this.model.findOneAndUpdate({ id }, { $set: data });
            return response;
        } catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR.code,
                `${STATUS.INTERNAL_ERROR.tag} ${error.message}`,
                error
            );
        }
    }

    /**
     * 
     * @param id ID of the item to delete
     * @returns removes an item from the DB
     */
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

module.exports = MongoDBContainer;

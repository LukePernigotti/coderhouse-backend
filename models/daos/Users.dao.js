const MongoDBContainer = require('../containers/Mongodb.container.js');
const UserSchema = require('../schemas/User.schema.js');
const CustomError = require('../../utils/errors/CustomError.js');
const { STATUS } = require('../../utils/constants/api.constants.js');

const collection = 'User';

class UsersDao extends MongoDBContainer {
    static instance;
    constructor() {
        if (!UsersDao.instance) {
            super(collection, UserSchema);
            UsersDao.instance = this;
            return this;
        } else {
            return UsersDao.instance;
        }
    }

    async createUser(userItem) {
        try {
            const user = await this.createItem(userItem);
            await user.save();
            return user;
        } catch (error) {
            if (
                error.message.toLowerCase().includes('e11000') ||
                error.message.toLowerCase().includes('duplicate')
            ) {
                throw new CustomError(
                    STATUS.BAD_REQUEST.code,
                    `${STATUS.BAD_REQUEST.tag} User with given email already exist`,
                    error
                );
            }
            throw new Error(error);
        }
    }

    async getById(id) {
        try {
            const document = await this.model.findById(id, { __v: 0 });
            if (!document) {
                throw new CustomError(
                    STATUS.NOT_FOUND.code,
                    `${STATUS.NOT_FOUND} Resource with id ${id} does not exist in our records`
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

    async getByEmail(email) {
        try {
            const document = await this.model.findOne({ email }, { __v: 0 });
            if (!document) {
                throw new CustomError(
                    STATUS.NOT_FOUND.code, 
                    `${STATUS.NOT_FOUND.tag} The email ${email} is not found in our records.`
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
}

module.exports = UsersDao;

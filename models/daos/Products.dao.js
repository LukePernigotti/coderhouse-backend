const { STATUS } = require('../../utils/constants/api.constants.js');
const CustomError = require('../../utils/errors/CustomError.js');
const MongoDBContainer = require('../containers/Mongodb.container.js');
const ProductSchema = require('../schemas/Product.schema.js');

const collection = 'products';

class ProductsDao extends MongoDBContainer {
    static instance;
    constructor() {
        if (!ProductsDao.instance) {
            super(collection, ProductSchema);
            
            ProductsDao.instance = this;
            return this;
        } else {
            return ProductsDao.instance;
        }
    }
}

module.exports = ProductsDao;
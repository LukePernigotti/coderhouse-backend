import { STATUS } from '../../utils/constants/api.constants.js';
import CustomError from '../../utils/errors/CustomError.js';
import MongoDBContainer from '../containers/Mongodb.container.js';
import ProductSchema from '../schemas/Product.schema.js';

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

export default ProductsDao;
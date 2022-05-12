import MongoDBContainer from '../containers/Mongodb.container.js';
import ProductSchema from '../schemas/Product.schema.js';

const collection = 'products';

class ProductsDao extends MongoDBContainer {
    static instance;
    constructor() {
        if (!ProductsDao.instance) {
            super(collection, ProductSchema, { validateUpdate: validateUpdate });

            function validateUpdate(data) {
                const { name, description, price, stock, thumbnail, code } = data;
                if (!name && !description && !price && !stock && !thumbnail && !code) {
                    return { error: 'Data not provided. Add a name, description, price, thumbnail, stock or code.' }
                }
                return true;
            }
            
            ProductsDao.instance = this;
            return this;
        } else {
            return ProductsDao.instance;
        }
    }
}

export default ProductsDao;
import MongoDBContainer from '../containers/MongodbContainer.js';
import ProductSchema from '../schemas/Product.schema.js';

const collection = 'products';

class ProductsApi extends MongoDBContainer {
    constructor() {
        super(collection, ProductSchema, { validateUpdate: validateUpdate });

        function validateUpdate(data) {
            const { name, description, price, stock, thumbnail, code } = data;
            if (!name && !description && !price && !stock && !thumbnail && !code) {
                return { error: 'Data not provided. Add a name, description, price, thumbnail, stock or code.' }
            }
            return true;
        }
    }
}

export default ProductsApi;
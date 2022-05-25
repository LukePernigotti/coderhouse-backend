import ProductsDao from './daos/Products.dao.js';
import CartsDao from './daos/Carts.dao.js';

class ApiFactory {
    static ApiTypes = {
        products: () => ApiFactory.getAPI('products'),
        carts: () => ApiFactory.getAPI('carts')
    }

    static getAPI(type) {
        switch (process.env.DATASOURCE) {
            case 'mongodb':
                if (type == 'products') return ProductsDao;
                else if (type == 'carts') return CartsDao
            break;
        
            default: 
                throw new Error('Datasource not valid or missing')
            break;
        }
    }

    createAPI(type) {
        return ApiFactory.ApiTypes[type]();
    }
}

const apiFactory = new ApiFactory();
const ProductsApi = apiFactory.createAPI('products');
const CartsApi = apiFactory.createAPI('carts');

export { ProductsApi, CartsApi }
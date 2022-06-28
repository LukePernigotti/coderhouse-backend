const ProductsDao = require('./daos/Products.dao.js');
const CartsDao = require('./daos/Carts.dao.js');
const OrdersDao = require('./daos/Orders.dao.js');

class ApiFactory {
    static ApiTypes = {
        products: () => ApiFactory.getAPI('products'),
        carts: () => ApiFactory.getAPI('carts'),
        orders: () => ApiFactory.getAPI('orders'),
    }

    static getAPI(type) {
        switch (process.env.DATASOURCE) {
            case 'mongodb':
                if (type == 'products') return ProductsDao;
                else if (type == 'carts') return CartsDao;
                else if (type == 'orders') return OrdersDao;
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
const OrdersApi = apiFactory.createAPI('orders');

module.exports = { ProductsApi, CartsApi, OrdersApi }

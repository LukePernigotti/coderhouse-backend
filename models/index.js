let productsDao;
let cartDao;

import ProductsDaoMongoDB from './daos/products/ProductsDaoMongoDB.js';
import CartsDaoMongoDB from './daos/carts/CartsDaoMongoDB.js';
import ProductsDaoFirebase from './daos/products/ProductsDaoFirebase.js';
import CartsDaoFirebase from './daos/carts/CartsDaoFirebase.js';


switch (process.env.DATASOURCE) {
    case 'mongodb':
        // This is throwing an error on npm start
        // const { default: ProductsDaoMongoDB } = await import('./daos/products/ProductsDaoMongoDB.js');
        // const { default: CartDaoMongoDB } = await import('./daos/cart/CartDaoMongoDB.js');
        
        productsDao = new ProductsDaoMongoDB();
        cartDao = new CartsDaoMongoDB();
    break;
        
    default: // firebase
        // This is throwing an error on npm start
        // const { default: ProductsDaoFirebase } = await import('./daos/products/ProductsDaoMongoDB.js');
        // const { default: CartDaoFirebase } = await import('./daos/cart/CartDaoMongoDB.js');

        productsDao = new ProductsDaoFirebase();
        cartDao = new CartsDaoFirebase();
    break;
}

export { productsDao, cartDao };

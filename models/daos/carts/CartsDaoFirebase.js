import FirebaseContainer from '../../containers/FirebaseContainer.js';
import { productsDao } from '../../index.js';

class CartsDaoFirebase extends FirebaseContainer {
    constructor() {
        super('carts')
    }

    async add(cartId, productId) {
        return super.add(cartId, productId, true)
    }
}

export default CartsDaoFirebase

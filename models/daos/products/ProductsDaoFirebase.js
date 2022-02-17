import FirebaseContainer from "../../containers/FirebaseContainer.js"

class ProductsDaoFirebase extends FirebaseContainer {
    constructor() {
        super('products', { validateUpdate: validateUpdate });

        function validateUpdate(data) {
            const { name, description, price, stock, thumbnail, code } = data;
            if (!name && !description && !price && !stock && !thumbnail && !code) {
                return { error: 'Data not provided. Add a name, description, price, thumbnail, stock or code.' }
            }
            return true;
        }
    }
}

export default ProductsDaoFirebase

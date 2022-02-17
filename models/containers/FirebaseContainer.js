import admin from 'firebase-admin';
import config from '../config.js';

admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore();

class FirebaseContainer {
    constructor(collection, options = {}) {
        this.validateUpdate = options.validateUpdate || function() {};
        this.collection = db.collection(collection);
    }

    async createCart() {
        const timestamp = Date.now();
        const cart = { timestamp, products: [] };

        try {
            const response = await this.collection.add(cart);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAll() {
        try {
            const documents = [];
            const response = await this.collection.get();
            response.forEach(document => {
                documents.push({ id: document.id , ...document.data() });
            });

            if (documents.length === 0) return { error: `There are no documents in the collection` }
            return documents;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async get(id) {
        try {
            const document = await this.collection.doc(id).get();
            if (document.exists) return { id: document.id, ...document.data()};
            return { error: `Document with id ${id} not found` };
        } catch (error) {
            throw new Error(error.message);
        }
    }
        
    async add(item, productId, isCart) {
        console.log('add item', item);
        try {
            let response;
            if (isCart) {
                const productsCollection = db.collection('products');
                const product = await productsCollection.doc(productId).get();
                
                response = await this.collection.doc(item).set(product.data());
            } else {
                response = await this.collection.add(item);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(id, data) {
        try {
            const validate = this.validateUpdate(data);
            if (validate.error) return validate.error;

            const response = await this.collection.doc(id).set(data);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(id) {
        try {
            const response = await this.collection.doc(id).delete();
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default FirebaseContainer;


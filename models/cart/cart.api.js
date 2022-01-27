const fs = require('fs/promises');
const ProductsApi = require('../products/products.api');

const filePath = './models/cart/';
const fileName = 'carts.txt'

class CartApi {
    async getFileData() {
        try {
            const data = await fs.readFile(`${filePath}${fileName}`, 'utf-8');
            return JSON.parse(data);
        } catch(error) {
            console.error('getFileData() error:', error.message);
            return error;
        }
    }

    async saveFileData(data) {
        try {   
            await fs.writeFile(`${filePath}${fileName}`, JSON.stringify(data, null, 2));
            return data;
        } catch(error) {
            console.error('saveFileData() error:', error.message);
            return error;
        }
    }

    async createCart() {
        const data = await this.getFileData();
        const timestamp = Date.now();
        const cart = { id: ++data.lastId, timestamp, products: [] };

        data.carts.push(cart);
        await this.saveFileData(data);

        return cart.id;
    }

    async deleteCart(id) {
        const data = await this.getFileData();
        const index = data.carts.findIndex(cart => cart.id === parseInt(id));
        if (index < 0) return { error: `Cart with id ${id} not found` };

        data.carts.splice(index, 1);

        return await this.saveFileData(data);
    }

    async getCart(id) {
        const data = await this.getFileData();
        const cart = data.carts.find(cart => cart.id === parseInt(id));
        if (cart) return cart;
        return { error: `Cart with id ${id} not found` };
    }

    async addProduct(cartId, productId) {
        const data = await this.getFileData();
        const cart = data.carts.find(cart => cart.id === parseInt(cartId));
        if (!cart) return { error: `Cart with id ${cartId} not found` }

        const products = new ProductsApi();
        const product = await products.get(productId);
        if (product.error) return { error: `Product with id ${productId} not found` }
        
        cart.products.push(product);
        await this.saveFileData(data);
        return cart;
    }

    async removeProduct(cartId, productId) {
        const data = await this.getFileData();
        const cart = data.carts.find(cart => cart.id === parseInt(cartId));
        if (!cart) return { error: `Cart with id ${cartId} not found` };
        const productIndex = cart.products.findIndex(product => product.id === parseInt(productId));

        cart.products.splice(productIndex, 1);

        await this.saveFileData(data);
        return cart;
    }
}

module.exports = CartApi;
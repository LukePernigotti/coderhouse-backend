const fs = require('fs/promises');

const filePath = './models/products/';
const fileName = 'products.txt'

class ProductsApi {
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
    
    async getAll() {
        const data = await this.getFileData();
        if (data.products.length > 0) return data.products;
        return { error: 'There are no products' }
    }

    async get(id) {
        const data = await this.getFileData();
        const product = data.products.find(product => product.id === parseInt(id));
        if (product) return product;
        return { error: `Product with id ${id} not found` };
    }
        
    async add(product) {
        const data = await this.getFileData();

        product.id = ++data.lastId;
        data.products.push(product);
        await this.saveFileData(data);
        
        return product;
    }

    async update(id, { title, description, price, thumbnail, stock }) {
        if (!title && !description && !price && !stock && !thumbnail )
            return {error: 'Data not provided. Add a title, description, price, thumbnail or stock.'}

        const data = await this.getFileData();
        const product = data.products.find(product => product.id === parseInt(id));
        if (!product) return { error: 'Product not found' };

        if (title) product.title = title;
        if (description) product.description = description;
        if (price) product.price = price;
        if (stock) product.stock = stock;
        if (thumbnail) product.thumbnail = thumbnail;

        await this.saveFileData(data);
        return product;
    }

    async delete(id) {
        const data = await this.getFileData();
        const index = data.products.findIndex(product => product.id === parseInt(id));
        if (index < 0) return { error: 'Product not found' };

        data.products.splice(index, 1);

        await this.saveFileData(data);
        return data.products;
    }
}

module.exports = ProductsApi;
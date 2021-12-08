const fs = require('fs/promises');

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
    }
    
    async save(product) {
        try {
            let lastId;
            let allProducts = await this.getAll();
            if (allProducts && allProducts.length > 0) {
                lastId = Number(allProducts[allProducts.length - 1].id);
            } else {
                console.log('No existe archivo o registros, se creará uno a continuación');
                allProducts = [];
                lastId = 0;
            }

            product.id = lastId + 1;
            allProducts.push(product);
            
            await fs.writeFile(`./${this.fileName}`, JSON.stringify(allProducts, null, 2));
            console.log('Producto guardado', allProducts);

            return product.id;
        } catch(error) {
            console.error('save() error:', error.message);
        }
    }

    async getById(id) {
        try {
            const products = await fs.readFile(`./${this.fileName}`, 'utf-8');
            const parsedProducts = JSON.parse(products);
            const product = parsedProducts.filter(product => product.id === id);

            console.log('Producto:', product);
            return product;
        } catch(error) {
            console.log('getById: No se encontró el producto.');
            console.error(error.message);
        }
    }

    async getAll() {
        try {
            const products = await fs.readFile(`./${this.fileName}`, 'utf-8');
            console.log('Productos actuales:', products);
            return JSON.parse(products);
        } catch(error) {
            console.error('getAll error:', error.message);
        }
    }

    async deleteById(id) {
        try {
            const products = await fs.readFile(`./${this.fileName}`, 'utf-8');
            const parsedProducts = JSON.parse(products);
            const resultProducts = parsedProducts.filter(product => product.id !== id);

            if (resultProducts.length > 0) {
                console.log('El producto ha sido eliminado.') 
                console.log('Productos actuales:', resultProducts); 
                await fs.writeFile(`./${this.fileName}`, JSON.stringify(resultProducts, null, 2))
            } else {
                console.log('No hay productos en la lista')
            }

        } catch(error) {
            console.log('deleteById: No se encontró el producto.');
            console.error(error.message);
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(`./${this.fileName}`, JSON.stringify([], null, 2));
            console.log('Todos los registros han sido eliminados.');
        } catch(error) {
            console.error(error.message);
        }
    }
}

module.exports = {
    Contenedor
};
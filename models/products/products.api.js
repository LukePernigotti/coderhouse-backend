class ProductsApi {
    constructor() {
        this.products = [
            {
                "title": "Escuadra",
                "price": 123.45,
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png",
                "id": 1
            },
            {
                "title": "Calculadora",
                "price": 234.56,
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png",
                "id": 2
            },
            {
                "title": "Globo Terráqueo",
                "price": 345.67,
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-128.png",
                "id": 3
            }
        ]
    }
    
    getAll() {
        if (this.products.length > 0) return this.products;
        return { error: 'No hay productos' }
    }

    getById(id) {
        const product = this.products.find(product => product.id === parseInt(id));
        if (product) return product;
        return { error: 'Producto no encontrado' };
    }
        
    add(product) {
        let lastId;
        if (this.products.length > 0) {
            lastId = this.products[this.products.length - 1].id;
        } else {
            lastId = 0;
        }
        product.id = lastId + 1;
        this.products.push(product);
        
        return product;
    }

    updateById(id, { title, price, thumbnail }) {
        if (!title && !price && !thumbnail ) return {error: 'Faltan agregar los datos'}

        const product = this.products.find(product => product.id === parseInt(id));

        if (!product) return { error: 'Producto no encontrado' };

        if (title) product.title = title;
        if (price) product.price = price;
        if (thumbnail) product.thumbnail = thumbnail;

        return product;
    }

    deleteById(id) {
        const index = this.products.findIndex(product => product.id === parseInt(id));
        if (index < 0) return { error: 'Producto no encontrado' };

        this.products.splice(index, 1);
        return this.products;
    }
}

module.exports = ProductsApi;
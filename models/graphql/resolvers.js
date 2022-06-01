import { v4 as uuid } from 'uuid';

class Product {
    constructor({id, name, description, price, stock, thumbnail, code}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.thumbnail = thumbnail;
        this.code = code;
    }
}

const productsMap = {};

const getAll = () => {
    const products = Object.values(productsMap);
    return products;
}

const getById = ({id}) => {
    const product = productsMap[id];
    if (!product) {
        throw new Error(`Product with id ${id} does not exist.`);
    }
    return product;
}

const add = (product) => {
    const id = uuid();
    const { name, description, price, stock, thumbnail, code } = product.data;
    const newProduct = new Product({id, name, description, price, stock, thumbnail, code});
    productsMap[id] = newProduct;
    return newProduct;
}

const updateById = ({ id, data }) => {
    if (!productsMap[id]) {
        throw new Error('Product not found');
    }
    const { name, description, price, stock, thumbnail, code } = data;
    // const updatedProduct = new Product({ id, ...data});
    if (name) productsMap[id].name
    return productsMap[id];
}

const deleteById = ({id}) =>{
    if (!productsMap[id]) {
        throw new Error('Product not found');
    }
    const deletedProduct = productsMap[id];
    delete productsMap[id];
    return deletedProduct;
}

export {
    getAll,
    getById,
    add,
    updateById,
    deleteById
}

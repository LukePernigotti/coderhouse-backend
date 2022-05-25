import axios from 'axios';

const getAllProducts = async () => {
    const response = await axios.get('http://localhost:8080/api/products');
    return response;
}

const getProduct = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/products/${id}`);
    return response;
}

const addProduct = async (product) => {
    const response = await axios.post('http://localhost:8080/api/products', product);
    return response;
}

const updateProduct = async (id, data) => {
    const response = await axios.put(`http://localhost:8080/api/products/${id}`, data);
    return response;
}

const deleteProduct = async (id) => {
    const response = await axios.delete(`http://localhost:8080/api/products/${id}`);
    return response;
}

export {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}


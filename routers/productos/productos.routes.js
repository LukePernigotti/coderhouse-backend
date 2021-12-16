const express = require('express');
const { Products } = require('../../Products');

const products = new Products();
const router = express.Router();

router.get('/', (req, res) => {
    const response = products.getAll();
    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
})

router.get('/:id', (req, res) => {
    const response = products.getById(req.params.id);
    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
})

router.post('/', (req, res) => {
    const { title, price, thumbnail } = req.body;
    
    if ( !title || !price || !thumbnail) {
        return res.status(400).send(`El cuerpo tiene un formato incorrecto: ${req.body}`)
    }

    const product = products.add({ title, price, thumbnail });
    return res.json(product);
})

router.put('/:id', (req, res) => {
    const response = products.updateById(req.params.id, req.body);
    
    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
})

router.delete('/:id', (req, res) => {
    const response = products.deleteById(req.params.id);

    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
})

module.exports = router;
const assert = require('assert/strict');
const { describe } = require('mocha');

describe('Products API test', async () => {
    it('Should get all products', async () => {
        const response = await getAllProducts();
        assert.notEqual(response.data.length, 0);
    })
    
    let addedProductId = '';
    const product = {
        name: 'Wheel Cylinder31',
        description: 'This is a wheel cylinder',
        price: 944,
        stock: 45,
        thumbnail: '/images/wheel-cylinder.webp',
        code: 'C-0031',
    }
    
    it('Should add a product', async () => {   
        const response = await addProduct(product);
        
        addedProductId = response.data._id;
        product._id = addedProductId;

        assert.deepStrictEqual(response.data, {...product, ...{__v: 0 }});
    })

    it('Should get a specific product', async () => {
        const response = await getProduct(addedProductId);
        assert.deepStrictEqual(response.data, product);
    })

    it('Should update a product', async () => {
        const response = await updateProduct(addedProductId, { price: 985 });
        assert.strictEqual(response.data.acknowledged, true);
    })

    it('Should delete a product', async () => {
        const response = await deleteProduct(addedProductId);
        assert.deepStrictEqual(response.data, {...product, ...{__v: 0}});
    })
})

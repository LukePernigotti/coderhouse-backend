const { mysqlKnex } = require('../../db/config');
const knex = mysqlKnex();

const tableName = 'products';

// create products table
(async () => {
    const exists = await knex.schema.hasTable(tableName);
    if (!exists) {
        await knex.schema.createTable(tableName, table => {
            table.increments('id').primary();
            table.string('name');
            table.string('description');
            table.integer('price');
            table.integer('stock');
            table.string('thumbnail');
            table.integer('timestamp');
            table.string('code');
        });
        console.log(`${tableName} table was created`)
    } else {
        console.log(`${tableName} table already exists`)
    }
})();

class ProductsApi {
    async getAll() {
        try {
            const products = await knex.from(tableName).select('*');
            if (products.length > 0) return products;
            return { error: `There are no products in the database table` }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async get(id) {
        try {
            const product = await knex.from(tableName).select('*').where('id', id);
            if (product[0]) return product[0];
            return { error: `Product with id ${id} not found` };
        } catch (error) {
            throw new Error(error.message);
        }
    }
        
    async add(product) {
        try {
            await knex(tableName).insert(product); // returns id
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(id, { name, description, price, stock, thumbnail, code }) {
        if (!name && !description && !price && !stock && !thumbnail && !code)
        return {error: 'Data not provided. Add a title, description, price, thumbnail, stock or code.'}

        try {
            const data = { name, description, price, stock, thumbnail, code };
            const response = await knex(tableName).update(data).where({id});

            return response; // 0 or 1
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(id) {
        try {
            const response = await knex(tableName).where({id}).delete();
            return response; // 0 or 1
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = ProductsApi;
const knex = require('knex');

const mysqlConfig = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ecommerce'
    }
};

const sqlite3Config = {
    client: 'sqlite3',
    connection: {
        filename: './db/ecommerce.sqlite'
    },
    useNullAsDefault: true
}
const mysqlKnex = () => knex(mysqlConfig)
const sqlite3Knex = () => knex(sqlite3Config)

module.exports = {
    mysqlKnex,
    sqlite3Knex
};

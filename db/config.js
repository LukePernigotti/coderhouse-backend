import knex from 'knex';

const config = {
    mysqlConfig: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'ecommerce'
        }
    },
    sqlite3Config: {
        client: 'sqlite3',
        connection: {
            filename: './db/ecommerce.sqlite'
        },
        useNullAsDefault: true
    },
    mongoAtlas: {
        client: 'mongodb',
        uri: `mongodb+srv://admin:${process.env.DB_PASSWORD}@coderhouseecommerceclus.ct8zd.mongodb.net/ecommerce?retryWrites=true&w=majority`
    }
}

const mysqlKnex = () => knex(config.mysqlConfig)
const sqlite3Knex = () => knex(config.sqlite3Config)

export {
    mysqlKnex,
    sqlite3Knex,
    config
};

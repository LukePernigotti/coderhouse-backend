import { buildSchema } from 'graphql';

const schema = buildSchema(`
    input ProductInput {
        name: String,
        description: String,
        price: Float,
        stock: Int,
        thumbnail: String,
        code: String
    }
    type Product {
        id: ID!,
        name: String,
        description: String,
        price: Float,
        stock: Int,
        thumbnail: String,
        code: String
    }
    type Query {
        getAll: [Product],
        getById(id: ID!): Product
    }
    type Mutation {
        add(data: ProductInput): Product,
        updateById(id: ID!, data: ProductInput): Product,
        deleteById(id: ID!): Product
    }
`);

export default schema;
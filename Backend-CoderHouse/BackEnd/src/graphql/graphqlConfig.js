const { buildSchema } = require('graphql');
const { addProduct, getProducts, } = require("./graphqlController/ProductFunctions")

const schema = buildSchema(`
    type Query {
        getProducts:[product]
        message: String
    }
    type Mutation{
        addProduct(nombre: String!, descripcion: String, marca: String, precio: Int!, fotoUrl: String!, color: String, stock: Int!, codigoP: String!): product
    }
    type product {
        nombre: String!
        descripcion: String
        marca: String
        precio: Int!
        fotoUrl: String!
        color: String
        stock: Int!
        codigoP: String!
        timestamp: String
    }
`)

const root = {
    getProducts: getProducts,
    message: () => "hello word!",
    addProduct: addProduct,
}

module.exports = { schema, root, }


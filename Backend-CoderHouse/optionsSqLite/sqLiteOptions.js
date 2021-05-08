const mensajesDB = {
    client: "sqlite3",
    connection: {
        filename: './DbSqLite/mensajes.sqlite'
    },
    useNullAsDefault: true,
}

const productosDB = {
    client: "sqlite3",
    connection: {
        filename: './DbSqLite/productos.sqlite'
    },
    useNullAsDefault: true,
}

module.exports = {mensajesDB,productosDB}
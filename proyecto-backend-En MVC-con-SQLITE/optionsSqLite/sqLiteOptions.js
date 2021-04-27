const mensajesDB = {
    client: "sqlite3",
    connection: {
        filename: './DB/mensajes.sqlite'
    },
    useNullAsDefault: true,
}

const productosDB = {
    client: "sqlite3",
    connection: {
        filename: './DB/productos.sqlite'
    },
    useNullAsDefault: true,
}

module.exports = {mensajesDB,productosDB}